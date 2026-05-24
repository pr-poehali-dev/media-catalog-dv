"""
Загружает фотографии форматов наружной рекламы в S3 и возвращает постоянные CDN-ссылки.
"""
import json
import os
import urllib.request
import boto3


IMAGES = {
    'shield': 'https://downloader.disk.yandex.ru/disk/88e9364f6c3dafc5b9b54f91acb168cbda3d803ed20cd0d2769d629a0bc4e784/6a12ab85/b9JV5vdQCf03SifGUCQL02UvV-tBsasTMh9KeauGTnvCS9eLDWp7o5Y0_lI7lKGXdvXDfK5gVuozQY4gR1vEVA%3D%3D?uid=0&filename=photo-output%20%281%29.png&disposition=attachment&hash=7cQ06/q557ToxqswfOaBWdXNPnWdQK0zirp6G5e7oqyT1L8njv%2Buo2T0EPNzWPDVq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4508312&hid=30683fbad8472a003ad9fb887316e4cf&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'supersite': 'https://downloader.disk.yandex.ru/disk/4cb6ecdbd1d5bbde1d7f0898234f8a30c6a76815f303dc9682182dc13577d645/6a12ab8e/b9JV5vdQCf03SifGUCQL0_z7cGaKnD8mPrKYz5isMmAGCpNe1k4HjzTqttYvLZSIzZBGUzU568en7SxR9_B38Q%3D%3D?uid=0&filename=photo-output%20%283%29.png&disposition=attachment&hash=sXOTIB4ZMA8SaqrxZXQhpW1wnA82J3NsYorNvPwWMrueTenXOSyzGsTgSzDH7L0%2Bq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4366299&hid=de6f3dd29ff544af26b428d858284ba3&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'cityboard': 'https://downloader.disk.yandex.ru/disk/841bb5c7cb220c2fd49677f7a95419226fd28ae2aa78299da432cc58df54f016/6a12ab9b/b9JV5vdQCf03SifGUCQL0_gEUSYO-IIe6fk553YdUfNAguPtFNxdGW0qx0Ep_2LsDb_o2qj-W4VfFG98R5epKg%3D%3D?uid=0&filename=photo-output.png&disposition=attachment&hash=BlUd/%2BnD9UHdpVHt74MYPhGH32vxacP0e8FErHHRkevUis2CKOf9Ndze7btTN%2Bwoq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4700052&hid=aebfc4e5922335f2605c81fac29a5164&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'pillar': 'https://downloader.disk.yandex.ru/disk/6e8f3cd241520bec8431181cc4c0ca4fcad21d61dca70821800166ffe79fe71b/6a12aba2/b9JV5vdQCf03SifGUCQL05-n2r1O5xDlrpCXzul2Oa3kzqWtFldF57jL62t8wUmj7cjFcws5_c5_fINzHbQKJA%3D%3D?uid=0&filename=photo-output%20%282%29.png&disposition=attachment&hash=soGnaOLCAJhCRqpURcQ1AJ%2BPNRbeH7mkRhBx4NwGiY6/s407iTq/2ckB8QFCr%2BtCq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4406105&hid=3da92d018473b8a19ae01a1bed62560d&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'cityformat': 'https://downloader.disk.yandex.ru/disk/93605a1a5efe7090f3e985615d78e2b7848cad154037594356aa7d944cf4acba/6a12abaa/b9JV5vdQCf03SifGUCQL02M0cyMAuK_Hn9J0kw--u4eGaCZ6u3ZnZMqC843IHntz2Gc0LcGCLcBQsX5blQNxKA%3D%3D?uid=0&filename=photo-output%20%286%29.png&disposition=attachment&hash=rnrUmcksjzJw9bKITi%2BaTXRid0QMW4CVPN5iNUtCwbsCK/HlfhfrGOxwM5hEnzjbq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4379282&hid=db999d3cfedf56763e06e762496e8843&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'mediafacade': 'https://downloader.disk.yandex.ru/disk/06f2ea99efa21144f6221a255f7d3a53db120e00068dfad3d3727a9b60685042/6a12abb2/b9JV5vdQCf03SifGUCQL04Ui1uBw4CsWpQpnTVDCcAt5o415d4_-hyMQ1KCsm4GWGNxC5WAj1xq-IvYWnyO57g%3D%3D?uid=0&filename=photo-output%20%287%29.png&disposition=attachment&hash=AMLFigCEc3RkGrftajRaWsVq5UwlexWG/LY9yTtMOctOnZM1Pj%2BjlAELxSvH9cUvq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=3720119&hid=702744f2d8d2ba69b710d5ed0071808c&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'arch': 'https://downloader.disk.yandex.ru/disk/634fe267a3729bc748d3ef9248dd05087da73459d822d491a6f364871c857fb5/6a12abb9/b9JV5vdQCf03SifGUCQL0_yzL-_32EshxcGGO2L2s72M54goEBjLw86IThGnTa5_5hWUs3Jxqe4t_yeD-wrSNA%3D%3D?uid=0&filename=photo-output%20%284%29.png&disposition=attachment&hash=qSuw1obP%2BbiURQmq5ZGHNNLCq5vW4JhPOtAugHdujJ0noICkaQkiNNajP%2Bpml13hq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4060523&hid=f57fade31485a412c86474f6b438077b&media_type=image&tknv=v3&is_direct_zip_experiment=1',
    'brandmauer': 'https://downloader.disk.yandex.ru/disk/4289f36148097c8cd3d856f44b92201010f534722a47334f27fd89a47cb47e83/6a12abc3/b9JV5vdQCf03SifGUCQL05msSQyFDkS_6UwhuYgCmdRXO4AR2YV4YTz6YES86STmNrFTx8TaD1BdJ4tHqiq8ww%3D%3D?uid=0&filename=photo-output%20%285%29.png&disposition=attachment&hash=0ol5VPOHgzA5PadObVTV8mN48c85en0GIqB5a%2Bu/muAq5c42ZHfWjI3Usnltat3Eq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=790528803&fsize=4294661&hid=9d058f213b8b04f7a2b1e7a4605edd74&media_type=image&tknv=v3&is_direct_zip_experiment=1',
}


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
    for key, direct_url in IMAGES.items():
        print(f'Processing {key}...')
        with urllib.request.urlopen(direct_url, timeout=30) as resp:
            image_data = resp.read()
        s3_key = f'outdoor/{key}.png'
        s3.put_object(Bucket='files', Key=s3_key, Body=image_data, ContentType='image/png')
        cdn_url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{s3_key}'
        results[key] = cdn_url
        print(f'{key} -> {cdn_url}')

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(results),
    }
