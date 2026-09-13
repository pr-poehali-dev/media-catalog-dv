import { SITE_URL } from '@/config/site';

interface PageMeta {
  title: string;
  description: string;
}

const DEFAULT_META: PageMeta = {
  title: 'Комплексные рекламные кампании на Дальнем Востоке — Media 2.7',
  description:
    'Подбираем и запускаем рекламу в сообществах, у блогеров, на наружных конструкциях и через брендированную продукцию в Хабаровске, Владивостоке и Комсомольске-на-Амуре.',
};

const STATIC_META: Record<string, PageMeta> = {
  '/': DEFAULT_META,
  '/communities': {
    title: 'Реклама в городских сообществах Дальнего Востока — Media 2.7',
    description:
      'Размещение в городских сообществах ВКонтакте, Telegram, MAX и Одноклассников в Хабаровске, Владивостоке и Комсомольске-на-Амуре.',
  },
  '/bloggers': {
    title: 'Реклама у блогеров Дальнего Востока — Media 2.7',
    description:
      'Интеграции у локальных блогеров Хабаровска и Владивостока: обзоры, сторис и видеоформаты с реальной статистикой площадок.',
  },
  '/outdoor': {
    title: 'Наружная реклама в Хабаровске и на Дальнем Востоке — Media 2.7',
    description:
      'Щиты, суперсайты, ситиборды, пиллары и медиафасады: подбор конструкций, печать, монтаж и фотоотчёт.',
  },
  '/merch': {
    title: 'Брендированная продукция и мерч на заказ — Media 2.7',
    description:
      'Брендированная продукция для бизнеса и мероприятий: подбор позиций, тираж, нанесение и производство.',
  },
  '/platforms': {
    title: 'Каталог рекламных площадок Дальнего Востока — Media 2.7',
    description:
      'Каталог городских сообществ Хабаровска, Владивостока и Комсомольска-на-Амуре с аудиторией, форматами и ценами.',
  },
  '/formats': {
    title: 'Форматы рекламных размещений — Media 2.7',
    description:
      'Посты, нативные публикации, сторис, видео и пакетные размещения: чем отличаются форматы и под какие задачи подходят.',
  },
  '/faq': {
    title: 'Частые вопросы о рекламе на Дальнем Востоке — Media 2.7',
    description: 'Ответы на вопросы о подборе площадок, сроках, маркировке рекламы и работе агентства Медиа 2.7.',
  },
  '/contacts': {
    title: 'Контакты рекламного агентства Медиа 2.7',
    description: 'Телефон, почта и мессенджеры Медиа 2.7. Реквизиты ИП и режим работы.',
  },
};

const SOCIAL_TITLES: Record<string, PageMeta> = {
  vk: { title: 'Реклама во ВКонтакте на Дальнем Востоке — Media 2.7', description: 'Размещение во ВКонтакте: городские сообщества, форматы и аудитория Хабаровска, Владивостока и Комсомольска-на-Амуре.' },
  telegram: { title: 'Реклама в Telegram на Дальнем Востоке — Media 2.7', description: 'Размещение в локальных Telegram-каналах Дальнего Востока: форматы, аудитория и условия.' },
  ok: { title: 'Реклама в Одноклассниках на Дальнем Востоке — Media 2.7', description: 'Размещение в сообществах Одноклассников Дальнего Востока: форматы, аудитория и условия.' },
  max: { title: 'Реклама в MAX на Дальнем Востоке — Media 2.7', description: 'Размещение в каналах MAX Хабаровска и Дальнего Востока: форматы, аудитория и условия.' },
  tiktok: { title: 'Реклама в TikTok на Дальнем Востоке — Media 2.7', description: 'Видеоформаты в TikTok у локальных авторов Дальнего Востока: аудитория и условия размещения.' },
  instagram: { title: 'Instagram* и правовые ограничения — Media 2.7', description: 'Правила работы с Instagram*: рекламные материалы не размещаются, возможно предложить информационный материал редакции.' },
};

const CITY_TITLES: Record<string, PageMeta> = {
  khabarovsk: { title: 'Реклама в Хабаровске — Media 2.7', description: 'Городские сообщества, блогеры, наружная реклама и мерч в Хабаровске: подбор площадок под задачу и бюджет.' },
  vladivostok: { title: 'Реклама во Владивостоке — Media 2.7', description: 'Городские сообщества, блогеры, наружная реклама и мерч во Владивостоке: подбор площадок под задачу и бюджет.' },
  komsomolsk: { title: 'Реклама в Комсомольске-на-Амуре — Media 2.7', description: 'Городские сообщества, блогеры, наружная реклама и мерч в Комсомольске-на-Амуре: подбор площадок под задачу и бюджет.' },
  'far-east': { title: 'Реклама на Дальнем Востоке — Media 2.7', description: 'Охват Хабаровска, Владивостока и Комсомольска-на-Амуре одним медиапланом.' },
};

const LEGAL_TITLES: Record<string, PageMeta> = {
  privacy: { title: 'Политика обработки персональных данных — Media 2.7', description: 'Как Медиа 2.7 обрабатывает и защищает персональные данные посетителей сайта.' },
  consent: { title: 'Согласие на обработку персональных данных — Media 2.7', description: 'Текст согласия на обработку персональных данных при отправке заявки на сайте Медиа 2.7.' },
  cookies: { title: 'Политика использования cookie — Media 2.7', description: 'Какие cookie использует сайт Медиа 2.7 и как отказаться от аналитических cookie.' },
  'ad-marking': { title: 'Маркировка рекламы — Media 2.7', description: 'Как маркируется реклама по ФЗ «О рекламе» №38-ФЗ при размещении через Медиа 2.7.' },
  info: { title: 'Правовая информация — Media 2.7', description: 'Реквизиты ИП Москаленко Илья Денисович, дисклеймер по Meta/Instagram* и контактные данные.' },
};

export function resolveMeta(pathname: string): PageMeta {
  if (STATIC_META[pathname]) return STATIC_META[pathname];

  const social = pathname.match(/^\/socials\/([^/]+)$/);
  if (social && SOCIAL_TITLES[social[1]]) return SOCIAL_TITLES[social[1]];

  const city = pathname.match(/^\/cities\/([^/]+)$/);
  if (city && CITY_TITLES[city[1]]) return CITY_TITLES[city[1]];

  const legal = pathname.match(/^\/legal\/([^/]+)$/);
  if (legal && LEGAL_TITLES[legal[1]]) return LEGAL_TITLES[legal[1]];

  return DEFAULT_META;
}

function upsertMeta(selector: string, attr: string, name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applyMeta(pathname: string) {
  const meta = resolveMeta(pathname);
  const canonical = SITE_URL + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));

  document.title = meta.title;
  upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonical;
}
