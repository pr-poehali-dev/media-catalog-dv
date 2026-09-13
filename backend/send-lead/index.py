"""
Приём заявки с сайта: проверяет согласие и обязательные поля, отправляет заявку в Telegram.
"""
import json
import os
import re
import time
import requests

_RATE: dict = {}
RATE_WINDOW = 60
RATE_LIMIT = 5

MAX_LEN = {
    'name': 100,
    'phone': 100,
    'city': 60,
    'budget': 60,
    'startDate': 20,
    'task': 2000,
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


def _send_telegram(token: str, payload: dict) -> tuple:
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    try:
        resp = requests.post(url, json=payload, timeout=4)
        if resp.status_code == 200:
            return True, ''
        return False, f'HTTP {resp.status_code} {resp.text[:200]}'
    except Exception as e:
        return False, f'network_error: {type(e).__name__}: {str(e)[:150]}'


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

    token = os.environ['TELEGRAM_BOT_TOKEN'].strip()
    chat_id = os.environ['TELEGRAM_CHAT_ID'].strip()

    source_line = f"\U0001f3f7 *Источник:* {_esc(source)}\n" if source else ''
    page_line = f"\U0001f310 *Страница:* {_esc(page)}\n" if page else ''

    text = (
        "\U0001f4e5 *Новая заявка с сайта*\n\n"
        f"{selection_line}"
        f"{source_line}"
        f"{page_line}"
        f"{utm_line}"
        f"\U0001f464 *Имя:* {_esc(name)}\n"
        f"\U0001f4de *Телефон / Telegram:* {_esc(phone)}\n"
        f"\U0001f3d9 *Город:* {_esc(city)}\n"
        f"\U0001f4b0 *Бюджет:* {_esc(budget)}\n"
        f"\U0001f4c5 *Желаемая дата запуска:* {_esc(start_date)}\n"
        f"\U0001f4dd *Задача:* {_esc(task)}\n\n"
        f"\u2705 Согласие получено {_esc(time.strftime('%d.%m.%Y %H:%M UTC'))}, "
        f"редакция {_esc(consent_version)}"
    )

    payload = {'chat_id': chat_id, 'text': text, 'parse_mode': 'MarkdownV2'}

    ok, err = _send_telegram(token, payload)
    print(f"lead request_id={request_id} delivered={ok} error={err}")

    if not ok:
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