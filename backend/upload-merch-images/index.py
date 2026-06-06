"""
Загружает фотографии мерча с Яндекс.Диска в S3 и возвращает постоянные CDN-ссылки.
"""
import json
import os
import urllib.request
import boto3


IMAGES = {
    'notebooks-v2': 'https://disk.yandex.ru/i/UPRQp5toiolryg',
    'pens-v2': 'https://disk.yandex.ru/i/TduCYedqIFePiw',
    'bags-v2': 'https://disk.yandex.ru/i/PfyhfTkamXdjXA',
    'tshirts-v2': 'https://disk.yandex.ru/i/zFAe2Eo_hsoZNA',
    'stickers-v2': 'https://disk.yandex.ru/i/5Jk8z6-Cd2oR3w',
    'keychains-v2': 'https://disk.yandex.ru/i/c42MXDWPhoTaCA',
    'powerbanks-v2': 'https://disk.yandex.ru/i/sxGnz52xLMwFTg',
    'cups-v2': 'https://disk.yandex.ru/i/XWf6KKCFkm71Rw',
    'gadgets-v2': 'https://disk.yandex.ru/i/rTE2aPGcWLMXlA',
}


def get_direct_url(public_key: str) -> str:
    api_url = f'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key={urllib.request.quote(public_key, safe="")}'
    req = urllib.request.Request(api_url)
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    return data['href']


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': '',
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    access_key = os.environ['AWS_ACCESS_KEY_ID']

    results = {}
    for key, public_url in IMAGES.items():
        print(f'Processing {key}...')
        direct_url = get_direct_url(public_url)
        with urllib.request.urlopen(direct_url, timeout=30) as resp:
            image_data = resp.read()
        ext = 'webp'
        lower = direct_url.lower()
        if '.png' in lower:
            ext = 'png'
        elif '.jpg' in lower or '.jpeg' in lower:
            ext = 'jpg'
        s3_key = f'merch/{key}.{ext}'
        content_type = f'image/{ext if ext != "jpg" else "jpeg"}'
        s3.put_object(Bucket='files', Key=s3_key, Body=image_data, ContentType=content_type)
        cdn_url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}'
        results[key] = cdn_url
        print(f'{key} -> {cdn_url}')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(results),
    }