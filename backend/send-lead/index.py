"""
Отправка заявки с сайта в Telegram-бот.
"""
import json
import os
import time
import urllib.request
import urllib.error


def _send_telegram(token: str, payload: dict, attempts: int = 3) -> tuple:
    data = json.dumps(payload).encode('utf-8')
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    last_err = ''
    for i in range(attempts):
        try:
            req = urllib.request.Request(url, data=data, method='POST')
            req.add_header('Content-Type', 'application/json')
            resp = urllib.request.urlopen(req, timeout=25)
            body = resp.read().decode('utf-8')
            return True, body
        except urllib.error.HTTPError as e:
            err_body = ''
            try:
                err_body = e.read().decode('utf-8')
            except Exception:
                pass
            last_err = f'HTTP {e.code}: {err_body}'
        except Exception as e:
            last_err = str(e)
        if i < attempts - 1:
            time.sleep(1.5)
    return False, last_err


def handler(event: dict, context) -> dict:
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    city = body.get('city') or '—'
    task = body.get('task') or '—'
    source = body.get('source', '')

    token = os.environ['TELEGRAM_BOT_TOKEN'].strip()
    chat_id = os.environ['TELEGRAM_CHAT_ID'].strip()

    source_line = f"\U0001f3f7 *Источник:* {source}\n" if source else ""

    text = (
        "\U0001f4e5 *Новая заявка с сайта*\n\n"
        f"{source_line}"
        f"\U0001f464 *Имя:* {name}\n"
        f"\U0001f4de *Телефон / Telegram:* {phone}\n"
        f"\U0001f3d9 *Город:* {city}\n"
        f"\U0001f4dd *Задача:* {task}"
    )

    payload = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
    }

    ok, info = _send_telegram(token, payload)
    print(f"DEBUG tg_ok={ok} info={info[:300]}")

    if not ok:
        return {
            'statusCode': 502,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': False, 'error': 'telegram_failed'}),
        }

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True}),
    }
