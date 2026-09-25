"""
Приём заявки с сайта: проверяет согласие и обязательные поля, сохраняет заявку в базу
и отправляет уведомление в Telegram и MAX. Заявка не теряется, даже если мессенджер недоступен.
"""
import json
import os
import re
import time
import requests
import psycopg2
from psycopg2.extras import Json

_RATE: dict = {}
RATE_WINDOW = 60
RATE_LIMIT = 5

MAX_LEN = {
    'name': 100,
    'phone': 100,
    'city': 60,
    'budget': 60,
    'startDate': 20,
    'task': 6000,
    'source': 120,
    'page': 200,
}


def _esc(value: str) -> str:
    return re.sub(r'([_*\[\]()~`>#+\-=|{}.!\\])', r'\\\1', str(value))


def _clean(value, limit: int) -> str:
    if not isinstance(value, str):
        return ''
    return value.strip()[:limit]


def _rate_limited(ip: str) -> bool:
    now = time.time()
    hits = [t for t in _RATE.get(ip, []) if now - t < RATE_WINDOW]
    if len(hits) >= RATE_LIMIT:
        _RATE[ip] = hits
        return True
    hits.append(now)
    _RATE[ip] = hits
    return False


def _bad(cors: dict, message: str) -> dict:
    return {
        'statusCode': 400,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': False, 'error': message}, ensure_ascii=False),
    }


TG_LIMIT = 3900


def _chunks(text: str) -> list:
    if len(text) <= TG_LIMIT:
        return [text]
    parts = []
    rest = text
    while rest:
        if len(rest) <= TG_LIMIT:
            parts.append(rest)
            break
        cut = rest.rfind('\n', 0, TG_LIMIT)
        if cut < TG_LIMIT // 2:
            cut = TG_LIMIT
        parts.append(rest[:cut])
        rest = rest[cut:].lstrip('\n')
    return parts


def _send_telegram(token: str, chat_id: str, text: str) -> tuple:
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    try:
        for part in _chunks(text):
            payload = {'chat_id': chat_id, 'text': part, 'parse_mode': 'MarkdownV2'}
            resp = requests.post(url, json=payload, timeout=4)
            if resp.status_code != 200:
                return False, f'HTTP {resp.status_code} {resp.text[:200]}'
        return True, ''
    except Exception as e:
        return False, f'network_error: {type(e).__name__}: {str(e)[:150]}'


def _plain(text: str) -> str:
    """Убирает разметку MarkdownV2 — MAX принимает обычный текст."""
    text = re.sub(r'\\([_*\[\]()~`>#+\-=|{}.!\\])', r'\1', text)
    return text.replace('*', '')


def _send_max(text: str) -> tuple:
    token = os.environ.get('MAX_BOT_TOKEN', '').strip()
    chat_id = os.environ.get('MAX_CHAT_ID', '').strip()
    if not token or not chat_id:
        return False, 'max_not_configured'
    url = 'https://botapi.max.ru/messages'
    try:
        for part in _chunks(_plain(text)):
            resp = requests.post(
                url,
                params={'access_token': token, 'chat_id': chat_id},
                json={'text': part},
                timeout=5,
            )
            if resp.status_code not in (200, 201):
                return False, f'HTTP {resp.status_code} {resp.text[:200]}'
        return True, ''
    except Exception as e:
        return False, f'network_error: {type(e).__name__}: {str(e)[:150]}'


def _save_lead(data: dict) -> tuple:
    dsn = os.environ.get('DATABASE_URL', '').strip()
    if not dsn:
        return False, 'no_database'
    try:
        with psycopg2.connect(dsn) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO leads (
                        name, contact, city, budget, start_date, task, intent,
                        source, page, brief, selection, utm, consent_version,
                        delivered_telegram, delivered_max, delivery_error, request_id
                    ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                    RETURNING id
                    """,
                    (
                        data['name'], data['contact'], data['city'], data['budget'],
                        data['start_date'], data['task'], data['intent'], data['source'],
                        data['page'], Json(data['brief']) if data['brief'] else None,
                        Json(data['selection']) if data['selection'] else None,
                        Json(data['utm']) if data['utm'] else None,
                        data['consent_version'], data['tg_ok'], data['max_ok'],
                        data['delivery_error'], data['request_id'],
                    ),
                )
                return True, str(cur.fetchone()[0])
    except Exception as e:
        return False, f'{type(e).__name__}: {str(e)[:150]}'


def handler(event: dict, context) -> dict:
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    method = event.get('httpMethod')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'method_not_allowed'}),
        }

    request_id = getattr(context, 'request_id', 'unknown')

    ip = (event.get('requestContext') or {}).get('identity', {}).get('sourceIp', 'unknown')
    if _rate_limited(ip):
        return {
            'statusCode': 429,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'too_many_requests'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except (ValueError, TypeError):
        return _bad(cors, 'invalid_json')
    if not isinstance(body, dict):
        return _bad(cors, 'invalid_json')

    if body.get('consent') is not True:
        return _bad(cors, 'consent_required')

    name = _clean(body.get('name'), MAX_LEN['name'])
    phone = _clean(body.get('phone'), MAX_LEN['phone'])
    if len(name) < 2:
        return _bad(cors, 'name_required')
    if len(phone) < 5:
        return _bad(cors, 'contact_required')

    has_phone = len(re.sub(r'\D', '', phone)) >= 10
    has_telegram = bool(re.search(r'(@[A-Za-z0-9_]{4,}|t\.me/)', phone))
    if not has_phone and not has_telegram:
        return _bad(cors, 'contact_invalid')

    city = _clean(body.get('city'), MAX_LEN['city']) or '—'
    budget = _clean(body.get('budget'), MAX_LEN['budget']) or '—'
    start_date = _clean(body.get('startDate'), MAX_LEN['startDate']) or '—'
    task = _clean(body.get('task'), MAX_LEN['task']) or '—'
    source = _clean(body.get('source'), MAX_LEN['source'])
    page = _clean(body.get('page'), MAX_LEN['page'])
    consent_version = _clean(body.get('consentVersion'), 40) or '—'

    selection = body.get('selection') if isinstance(body.get('selection'), dict) else None
    selection_line = ''
    if selection:
        parts = [_clean(selection.get('name'), 120)]
        for key in ('social', 'format', 'city'):
            val = _clean(selection.get(key), 60)
            if val:
                parts.append(val)
        parts = [p for p in parts if p]
        if parts:
            selection_line = "\U0001f3af *Выбранная площадка:* " + _esc(' · '.join(parts)) + "\n"

    utm = body.get('utm') if isinstance(body.get('utm'), dict) else None
    utm_line = ''
    if utm:
        pairs = [f"{_clean(k, 30)}={_clean(v, 80)}" for k, v in list(utm.items())[:5]]
        pairs = [p for p in pairs if '=' in p and not p.endswith('=')]
        if pairs:
            utm_line = "\U0001f9ed *UTM:* " + _esc(', '.join(pairs)) + "\n"

    intent = _clean(body.get('intent'), 30)
    intent_line = f"\U0001f3af *Формат:* {_esc(intent)}\n" if intent else ''

    brief = body.get('brief') if isinstance(body.get('brief'), dict) else None
    brief_block = ''
    if brief:
        def bf(key, limit=1500):
            return _clean(brief.get(key), limit)

        def bl(key, limit=300):
            val = brief.get(key)
            if isinstance(val, list):
                items = [_clean(v, 80) for v in val[:10]]
                return ', '.join([i for i in items if i])[:limit]
            return _clean(val, limit)

        rows = [
            ('Компания / проект', bf('company', 200)),
            ('Что продвигаем', bf('product')),
            ('Сайт / соцсети', bf('links', 400)),
            ('Задача и результат', bf('goal')),
            ('Город / зона', ' · '.join([v for v in [bf('city', 80), bf('zone', 200)] if v])),
            ('Аудитория', bf('audience')),
            ('Бюджет', ' · '.join([v for v in [bf('budget', 80), bf('budgetExact', 80)] if v])),
            ('Старт', ' · '.join([v for v in [bf('start', 60), bf('keyDates', 200)] if v])),
            ('Прошлый опыт', ' — '.join([v for v in [bf('experienceKind', 100), bf('experience')] if v])),
            ('Как измеряют результат', bl('measures')),
            ('Куда ведём людей', bl('destinations')),
            ('Материалы', bf('materials')),
            ('Комментарий', bf('comment')),
        ]
        lines = [f"*{_esc(title)}:* {_esc(value)}" for title, value in rows if value]
        if lines:
            brief_block = "\n\n\U0001f4cb *Бриф*\n" + "\n".join(lines)

    token = os.environ['TELEGRAM_BOT_TOKEN'].strip()
    chat_id = os.environ['TELEGRAM_CHAT_ID'].strip()

    source_line = f"\U0001f3f7 *Источник:* {_esc(source)}\n" if source else ''
    page_line = f"\U0001f310 *Страница:* {_esc(page)}\n" if page else ''

    head = "\U0001f4cb *Новый бриф с сайта*" if brief else "\U0001f4e5 *Новая заявка с сайта*"
    task_line = '' if brief else f"\U0001f4dd *Задача:* {_esc(task)}\n"

    text = (
        f"{head}\n\n"
        f"{intent_line}"
        f"{selection_line}"
        f"{source_line}"
        f"{page_line}"
        f"{utm_line}"
        f"\U0001f464 *Имя:* {_esc(name)}\n"
        f"\U0001f4de *Телефон / Telegram:* {_esc(phone)}\n"
        f"\U0001f3d9 *Город:* {_esc(city)}\n"
        f"\U0001f4b0 *Бюджет:* {_esc(budget)}\n"
        f"\U0001f4c5 *Желаемая дата запуска:* {_esc(start_date)}\n"
        f"{task_line}"
        f"{brief_block}\n\n"
        f"\u2705 Согласие получено {_esc(time.strftime('%d.%m.%Y %H:%M UTC'))}, "
        f"редакция {_esc(consent_version)}"
    )

    tg_ok, tg_err = _send_telegram(token, chat_id, text)
    max_ok, max_err = _send_max(text)

    delivery_error = '; '.join([e for e in [
        f'telegram: {tg_err}' if tg_err else '',
        f'max: {max_err}' if max_err else '',
    ] if e])[:500]

    saved, saved_info = _save_lead({
        'name': name, 'contact': phone, 'city': city, 'budget': budget,
        'start_date': start_date, 'task': task, 'intent': intent,
        'source': source, 'page': page, 'brief': brief, 'selection': selection,
        'utm': utm, 'consent_version': consent_version,
        'tg_ok': tg_ok, 'max_ok': max_ok,
        'delivery_error': delivery_error, 'request_id': request_id,
    })

    print(
        f"lead request_id={request_id} telegram={tg_ok} max={max_ok} "
        f"saved={saved}:{saved_info} error={delivery_error}"
    )

    # Заявка принята, если доставлена хотя бы одним способом ИЛИ надёжно сохранена в базе
    if not (tg_ok or max_ok or saved):
        return {
            'statusCode': 502,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'delivery_failed'}),
        }

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True, 'requestId': request_id}),
    }