"""
Отправка заявки с сайта в Telegram-бот.
Принимает данные формы и пересылает сообщение в указанный чат.
"""
import json
import os
import urllib.request
import urllib.parse


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

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    text = (
        f"📥 *Новая заявка с сайта*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон / Telegram:* {phone}\n"
        f"🏙 *Город:* {city}\n"
        f"📝 *Задача:* {task}"
    )

    payload = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
    }).encode()

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=payload,
        method='POST',
    )
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    urllib.request.urlopen(req, timeout=10)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }
