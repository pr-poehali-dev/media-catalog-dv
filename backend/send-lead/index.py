"""
Отправка заявки с сайта в Telegram-бот.
"""
import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    city = body.get('city', '—')
    task = body.get('task', '—')
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

    data = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
    }).encode('utf-8')

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=data,
        method='POST',
    )
    req.add_header('Content-Type', 'application/json')
    resp = urllib.request.urlopen(req, timeout=10)
    print(f"DEBUG tg_status={resp.status}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }