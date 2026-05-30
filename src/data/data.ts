export type SocialNet = 'vk' | 'telegram' | 'ok' | 'max' | 'tiktok' | 'instagram' | 'youtube';
export type City = 'Хабаровск' | 'Владивосток' | 'Комсомольск-на-Амуре' | 'Дальний Восток';
export type Format = 'Пост' | 'Пост + Сторис' | 'Видео' | 'Нативная публикация' | 'Обзор у блогера' | 'Подборка' | 'Спецпроект' | 'Пакет';

export type OutdoorType = 'Щит' | 'Суперсайт' | 'Ситиборд' | 'Пиллар' | 'Ситиформат' | 'Медиафасад' | 'Арка' | 'Брандмауэр';

export interface OutdoorFormat {
  id: string;
  name: OutdoorType;
  size: string;
  description: string;
  where?: string;
  fits?: string;
  advantage: string;
  priceFrom: number;
  emoji: string;
  image?: string;
}

export interface BloggerSocialStat {
  social: SocialNet;
  subscribers: number;
  reachLabel: string;
  engagementLabel?: string;
  link?: string;
}

export interface BloggerPriceItem {
  label: string;
  price: string;
}

export interface Blogger {
  id: string;
  name: string;
  social: SocialNet;
  city: 'Хабаровск' | 'Владивосток';
  category: string;
  description: string;
  fullDescription: string;
  subscribersTotal: string;
  reachSummary: string[];
  engagementSummary?: string[];
  audience?: string[];
  socials: BloggerSocialStat[];
  formats: string[];
  formatsByPlatform?: { platform: string; formats: string }[];
  bestPerforming?: string[];
  bestFor: string[];
  doesntFit?: string;
  prices: BloggerPriceItem[];
  priceFromLabel: string;
  emoji: string;
  avatar?: string;
}

export interface MerchItem {
  id: string;
  name: string;
  description: string;
  why: string;
  priceFrom: number;
  emoji: string;
  image?: string;
}

export interface Platform {
  id: string;
  name: string;
  social: SocialNet;
  city: City;
  category: string;
  type: 'community' | 'blogger';
  description: string;
  subscribers: number;
  reach: number;
  formats: Format[];
  priceFrom: number;
  tags: string[];
  emoji: string;
}

export interface Case {
  id: string;
  title: string;
  niche: string;
  city: City;
  social: SocialNet;
  format: Format;
  task: string;
  result: string;
  reach: number;
  emoji: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const SOCIALS: Record<SocialNet, { label: string; emoji: string; color: string; bg: string }> = {
  vk: { label: 'ВКонтакте', emoji: '💙', color: '#0077FF', bg: '#e8f0fe' },
  telegram: { label: 'Telegram', emoji: '✈️', color: '#229ED9', bg: '#e3f5fd' },
  ok: { label: 'Одноклассники', emoji: '🟠', color: '#EE8208', bg: '#fef3e2' },
  max: { label: 'MAX', emoji: '🟣', color: '#7C3AED', bg: '#f3e8ff' },
  tiktok: { label: 'TikTok', emoji: '🎵', color: '#010101', bg: '#f0f0f0' },
  instagram: { label: 'Instagram*', emoji: '📷', color: '#C13584', bg: '#fce8f3' },
  youtube: { label: 'YouTube', emoji: '▶️', color: '#FF0000', bg: '#fee2e2' },
};

export const CITIES_INFO: Record<string, { emoji: string; tagline: string; population: string; features: string[] }> = {
  'Хабаровск': {
    emoji: '🏙️',
    tagline: 'Столица Дальнего Востока',
    population: '620 000+',
    features: ['Крупнейший город ДФО', 'Административный центр', 'Активная бизнес-среда', 'Развитый онлайн-сегмент'],
  },
  'Владивосток': {
    emoji: '⚓',
    tagline: 'Морские ворота России',
    population: '600 000+',
    features: ['Портовый город', 'ДВФУ — молодёжь', 'Туризм и HoReCa', 'Азиатское влияние'],
  },
  'Комсомольск-на-Амуре': {
    emoji: '⚙️',
    tagline: 'Город на Амуре',
    population: '240 000+',
    features: ['Промышленный центр', 'Компактная аудитория', 'Высокий охват', 'Лояльные подписчики'],
  },
};

export const PLATFORMS: Platform[] = [
  {
    id: 'khb-news-vk',
    name: 'Хабаровск Онлайн',
    social: 'vk',
    city: 'Хабаровск',
    category: 'Городские новости',
    type: 'community',
    description: 'Главное городское сообщество Хабаровска. Новости, события, объявления. Активная аудитория 25–45 лет.',
    subscribers: 87000,
    reach: 210000,
    formats: ['Пост', 'Пост + Сторис', 'Нативная публикация'],
    priceFrom: 3500,
    tags: ['новости', 'события', 'объявления'],
    emoji: '📰',
  },
  {
    id: 'khb-mama-vk',
    name: 'Мамы Хабаровска',
    social: 'vk',
    city: 'Хабаровск',
    category: 'Семья и дети',
    type: 'community',
    description: 'Сообщество для мам и семей с детьми. Аудитория 24–40 лет, женщины 85%. Высокое доверие и вовлечённость.',
    subscribers: 43000,
    reach: 95000,
    formats: ['Пост', 'Нативная публикация', 'Подборка'],
    priceFrom: 2200,
    tags: ['мамы', 'дети', 'семья', 'образование'],
    emoji: '👶',
  },
  {
    id: 'khb-tg-news',
    name: 'Хабаровск | Новости',
    social: 'telegram',
    city: 'Хабаровск',
    category: 'Городские новости',
    type: 'community',
    description: 'Оперативные новости Хабаровска. Канал доверия и скорости. Читают чиновники, бизнес и активные горожане.',
    subscribers: 31000,
    reach: 62000,
    formats: ['Пост', 'Нативная публикация'],
    priceFrom: 4000,
    tags: ['новости', 'политика', 'бизнес'],
    emoji: '⚡',
  },
  {
    id: 'vld-news-vk',
    name: 'Владивосток | Главное',
    social: 'vk',
    city: 'Владивосток',
    category: 'Городские новости',
    type: 'community',
    description: 'Крупнейшее городское сообщество Владивостока. Широкая аудитория 18–50 лет.',
    subscribers: 102000,
    reach: 260000,
    formats: ['Пост', 'Пост + Сторис', 'Нативная публикация', 'Подборка'],
    priceFrom: 4500,
    tags: ['новости', 'Владивосток', 'объявления'],
    emoji: '⚓',
  },
  {
    id: 'vld-food-tg',
    name: 'Ем во Владивостоке',
    social: 'telegram',
    city: 'Владивосток',
    category: 'Еда и рестораны',
    type: 'blogger',
    description: 'Гастрономический канал. Обзоры кафе, новые заведения, акции. Аудитория — молодёжь и офисные работники.',
    subscribers: 18500,
    reach: 34000,
    formats: ['Пост', 'Обзор у блогера', 'Нативная публикация'],
    priceFrom: 3200,
    tags: ['еда', 'рестораны', 'кафе', 'HoReCa'],
    emoji: '🍜',
  },
  {
    id: 'vld-tiktok-blogger',
    name: 'Влад|Жизнь',
    social: 'tiktok',
    city: 'Владивосток',
    category: 'Лайфстайл',
    type: 'blogger',
    description: 'Блогер о жизни во Владивостоке. Короткие видео о городе, заведениях, событиях. Охват 18–30 лет.',
    subscribers: 55000,
    reach: 320000,
    formats: ['Видео', 'Обзор у блогера'],
    priceFrom: 8000,
    tags: ['лайфстайл', 'видео', 'заведения', 'события'],
    emoji: '🎬',
  },
  {
    id: 'kms-city-vk',
    name: 'Комсомольск-на-Амуре | KMS',
    social: 'vk',
    city: 'Комсомольск-на-Амуре',
    category: 'Городские новости',
    type: 'community',
    description: 'Главное сообщество Комсомольска. Новости, афиша, объявления. Высокая вовлечённость.',
    subscribers: 38000,
    reach: 74000,
    formats: ['Пост', 'Пост + Сторис', 'Нативная публикация'],
    priceFrom: 1800,
    tags: ['новости', 'афиша', 'КнА'],
    emoji: '⚙️',
  },
  {
    id: 'kms-ok-community',
    name: 'Комсомольск Семейный',
    social: 'ok',
    city: 'Комсомольск-на-Амуре',
    category: 'Семья',
    type: 'community',
    description: 'Сообщество в Одноклассниках для жителей 35+. Семейные темы, здоровье, дом. Очень высокое доверие.',
    subscribers: 22000,
    reach: 41000,
    formats: ['Пост', 'Нативная публикация'],
    priceFrom: 1200,
    tags: ['семья', 'здоровье', 'дом'],
    emoji: '🏠',
  },
  {
    id: 'dv-max-news',
    name: 'ДВ Новости MAX',
    social: 'max',
    city: 'Дальний Восток',
    category: 'Городские новости',
    type: 'community',
    description: 'Новостной канал на платформе MAX. Охват всего Дальнего Востока. Растущая аудитория.',
    subscribers: 14000,
    reach: 28000,
    formats: ['Пост', 'Нативная публикация'],
    priceFrom: 1500,
    tags: ['новости', 'ДВ', 'MAX'],
    emoji: '🟣',
  },
  {
    id: 'khb-business-tg',
    name: 'Бизнес Хабаровска',
    social: 'telegram',
    city: 'Хабаровск',
    category: 'Бизнес',
    type: 'community',
    description: 'Канал для предпринимателей Хабаровска. Вакансии, тендеры, новости бизнеса, нетворкинг.',
    subscribers: 8700,
    reach: 19000,
    formats: ['Пост', 'Нативная публикация', 'Подборка'],
    priceFrom: 2800,
    tags: ['бизнес', 'вакансии', 'нетворкинг'],
    emoji: '💼',
  },
  {
    id: 'vld-beauty-insta',
    name: 'Красота Владивостока',
    social: 'instagram',
    city: 'Владивосток',
    category: 'Красота и уход',
    type: 'blogger',
    description: 'Блогер о beauty-индустрии Владивостока. Обзоры салонов, мастеров, косметики.',
    subscribers: 29000,
    reach: 85000,
    formats: ['Пост', 'Обзор у блогера'],
    priceFrom: 5000,
    tags: ['красота', 'салоны', 'уход'],
    emoji: '💅',
  },
  {
    id: 'khb-events-vk',
    name: 'Афиша Хабаровска',
    social: 'vk',
    city: 'Хабаровск',
    category: 'Афиша и события',
    type: 'community',
    description: 'Всё о мероприятиях Хабаровска: концерты, выставки, фестивали, спорт. Аудитория 18–35 лет.',
    subscribers: 56000,
    reach: 130000,
    formats: ['Пост', 'Пост + Сторис', 'Видео'],
    priceFrom: 2800,
    tags: ['афиша', 'события', 'концерты', 'спорт'],
    emoji: '🎭',
  },
];

export const CASES: Case[] = [
  {
    id: 'case-1',
    title: 'Открытие кафе в Хабаровске',
    niche: 'HoReCa',
    city: 'Хабаровск',
    social: 'vk',
    format: 'Пост + Сторис',
    task: 'Сообщить об открытии нового кафе, привлечь гостей в первую неделю',
    result: 'Охват 47 000 человек, 380 переходов на карту, 210 человек в первые 3 дня',
    reach: 47000,
    emoji: '☕',
  },
  {
    id: 'case-2',
    title: 'Акция для строительного магазина',
    niche: 'Ритейл',
    city: 'Владивосток',
    social: 'telegram',
    format: 'Нативная публикация',
    task: 'Продвижение скидочной акции на стройматериалы',
    result: 'Охват 28 000 человек, 650 переходов по ссылке, продажи выросли на 34%',
    reach: 28000,
    emoji: '🏗️',
  },
  {
    id: 'case-3',
    title: 'Набор студентов в онлайн-школу',
    niche: 'Образование',
    city: 'Хабаровск',
    social: 'vk',
    format: 'Подборка',
    task: 'Набрать студентов на курсы программирования',
    result: '12 000 охват, 94 заявки на курс, стоимость заявки — 420 руб.',
    reach: 12000,
    emoji: '🎓',
  },
  {
    id: 'case-4',
    title: 'Продвижение студии красоты',
    niche: 'Красота',
    city: 'Комсомольск-на-Амуре',
    social: 'vk',
    format: 'Обзор у блогера',
    task: 'Привлечь новых клиентов в новую студию',
    result: '22 000 охват, 45 новых записей за 2 недели, рост подписчиков паблика на 800+',
    reach: 22000,
    emoji: '✂️',
  },
  {
    id: 'case-5',
    title: 'Анонс ивента в Владивостоке',
    niche: 'Мероприятия',
    city: 'Владивосток',
    social: 'telegram',
    format: 'Пост',
    task: 'Анонсировать городской фестиваль, собрать максимум участников',
    result: 'Охват 55 000 человек, 1 200 переходов на регистрацию, зал заполнен на 100%',
    reach: 55000,
    emoji: '🎪',
  },
  {
    id: 'case-6',
    title: 'Реклама доставки суши',
    niche: 'HoReCa',
    city: 'Хабаровск',
    social: 'tiktok',
    format: 'Видео',
    task: 'Рост заказов, охват молодёжи 18–30 лет',
    result: '180 000 просмотров ролика, 420 новых заказов за неделю, +62% к трафику',
    reach: 180000,
    emoji: '🍣',
  },
];

export const FORMATS_INFO = [
  {
    id: 'post',
    name: 'Пост',
    emoji: '📝',
    description: 'Классическая рекламная публикация в ленте сообщества или канала',
    purpose: 'Информирование, анонсы, акции',
    pros: ['Быстрое размещение', 'Гибкость в тексте', 'Работает для любой ниши'],
    example: 'Магазин публикует пост об акции с промокодом и ссылкой на сайт',
  },
  {
    id: 'post-stories',
    name: 'Пост + Сторис',
    emoji: '📱',
    description: 'Публикация в ленте плюс упоминание в сторис для максимального охвата',
    purpose: 'Усиленное продвижение, максимальный охват за бюджет',
    pros: ['Двойной охват', 'Разные форматы подачи', 'Выше конверсия'],
    example: 'Кафе размещает пост о меню и сторис со свайпом на бронирование',
  },
  {
    id: 'video',
    name: 'Видео',
    emoji: '🎬',
    description: 'Короткий видеоролик: обзор, интеграция, рилс, клип',
    purpose: 'Демонстрация продукта, заведения, услуги',
    pros: ['Высокий охват в TikTok/Reels', 'Запоминаемость', 'Вовлечённость'],
    example: 'Ресторан снимает видео с блюдами и атмосферой, публикует через блогера',
  },
  {
    id: 'native',
    name: 'Нативная публикация',
    emoji: '✍️',
    description: 'Публикация в стиле редакционного контента площадки — без явных признаков рекламы',
    purpose: 'Доверие аудитории, сложные продукты, B2B',
    pros: ['Высокое доверие', 'Нет баннерной слепоты', 'Лучше для дорогих продуктов'],
    example: 'Статья «Где в Хабаровске лучшие курсы английского» с нативным упоминанием школы',
  },
  {
    id: 'blogger-review',
    name: 'Обзор у блогера',
    emoji: '🎙️',
    description: 'Личная рекомендация от блогера со своей аудиторией',
    purpose: 'Продукты, услуги, заведения требующие доверия',
    pros: ['Максимальное доверие', 'Живой отклик', 'Органика в комментариях'],
    example: 'Блогер посещает салон красоты и делает честный обзор для подписчиков',
  },
  {
    id: 'collection',
    name: 'Подборка',
    emoji: '📋',
    description: 'Тематическая подборка с вашим продуктом или услугой в числе лучших',
    purpose: 'Образование, выбор, сравнение',
    pros: ['Органичный вид', 'Польза для читателя', 'Высокие сохранения'],
    example: '«10 лучших кофеен Владивостока» — ваша кофейня в топе списка',
  },
  {
    id: 'special',
    name: 'Спецпроект',
    emoji: '⭐',
    description: 'Комплексная рекламная кампания с несколькими форматами и площадками',
    purpose: 'Открытие, ребрендинг, крупные события',
    pros: ['Максимальный эффект', 'Несколько волн охвата', 'Запоминаемость'],
    example: 'Открытие ТЦ: серия постов + видео + сторис + блогеры на протяжении 2 недель',
  },
  {
    id: 'package',
    name: 'Пакетные размещения',
    emoji: '📦',
    description: 'Размещение сразу на нескольких площадках по выгодной цене',
    purpose: 'Максимальный охват, регулярная реклама',
    pros: ['Скидка от объёма', 'Единое управление', 'Синергия площадок'],
    example: 'Размещение в 5 сообществах трёх городов с единым медиапланом',
  },
];

export const NICHES = [
  { id: 'horeca', name: 'Кафе и рестораны', emoji: '🍽️', socials: ['vk', 'telegram', 'tiktok', 'instagram'] as SocialNet[], description: 'Идеально для анонсов блюд, акций, открытий и мероприятий' },
  { id: 'retail', name: 'Магазины', emoji: '🛍️', socials: ['vk', 'ok', 'telegram'] as SocialNet[], description: 'Акции, распродажи, новинки, сезонные предложения' },
  { id: 'events', name: 'Мероприятия', emoji: '🎪', socials: ['vk', 'telegram', 'tiktok'] as SocialNet[], description: 'Концерты, фестивали, выставки, спортивные события' },
  { id: 'realty', name: 'Недвижимость', emoji: '🏠', socials: ['vk', 'telegram', 'ok'] as SocialNet[], description: 'Жилые комплексы, аренда, коммерческая недвижимость' },
  { id: 'beauty', name: 'Красота и уход', emoji: '💅', socials: ['vk', 'instagram', 'tiktok'] as SocialNet[], description: 'Салоны, мастера, косметика, студии' },
  { id: 'medicine', name: 'Медицина', emoji: '⚕️', socials: ['vk', 'ok', 'telegram'] as SocialNet[], description: 'Клиники, стоматологии, оптика, аптеки' },
  { id: 'education', name: 'Образование', emoji: '🎓', socials: ['vk', 'telegram', 'ok'] as SocialNet[], description: 'Курсы, школы, репетиторы, онлайн-обучение' },
  { id: 'jobs', name: 'Вакансии', emoji: '💼', socials: ['vk', 'telegram', 'ok'] as SocialNet[], description: 'Подбор персонала, HR-бренд, работодатели' },
  { id: 'auto', name: 'Авто', emoji: '🚗', socials: ['vk', 'ok', 'telegram'] as SocialNet[], description: 'Дилеры, автосервисы, запчасти, тюнинг' },
  { id: 'gov', name: 'Гос. и общественные', emoji: '🏛️', socials: ['vk', 'ok', 'telegram', 'max'] as SocialNet[], description: 'Информирование, проекты, социальная реклама' },
];

export const FAQ_DATA: FAQ[] = [
  {
    question: 'Сколько стоят наши услуги?',
    answer: 'Нисколько. Мы берем процент с владельцев площадок, блогеров и компаний, кто производит мерч. Для вас цены будут такие же, как если бы вы обратились к ним сами.',
  },
  {
    question: 'С каким бюджетом имеет смысл заходить?',
    answer: 'Зависит от задачи.\n\nДля локального запуска иногда достаточно 15–30 тыс. ₽.\nДля комплексной кампании по нескольким площадкам бюджет может составлять 100–300 тыс. ₽ и выше.\n\nОпишите задачу — подберём реалистичный вариант под ваш бюджет.',
  },
  {
    question: 'Вы работаете только с интернет-рекламой?',
    answer: 'Нет. Мы работаем сразу с несколькими направлениями:\n• городские сообщества\n• блогеры\n• наружная реклама\n• мерч и корпоративная продукция\n• спецпроекты и интеграции\n\nМожно запускать как один формат, так и комбинировать несколько одновременно. Намного лучше комбинировать.',
  },
  {
    question: 'Кто готовит дизайн и рекламные материалы?',
    answer: 'Если у вас уже есть готовые материалы — используем их.\n\nЕсли нет — поможем с дизайном, адаптацией макетов, текстами и подготовкой материалов под конкретные площадки и форматы.',
  },
  {
    question: 'Можно ли разместиться сразу в нескольких городах?',
    answer: 'Да. Работаем с Хабаровском, Владивостоком и Комсомольском-на-Амуре.\n\nПри необходимости можем собрать размещение сразу по нескольким городам и площадкам в рамках одной кампании.',
  },
  {
    question: 'Помогаете ли вы с наружной рекламой и адресной программой?',
    answer: 'Да. Подбираем конкретные поверхности под задачу и бюджет: щиты, ситиборды, медиафасады, пиллары, ситиформаты и другие конструкции.\n\nПеред запуском отправляем адреса, фото поверхностей и условия размещения.',
  },
  {
    question: 'Можно ли заказать только мерч без рекламы?',
    answer: 'Да. Можем отдельно изготовить корпоративный мерч, подарки, welcome-наборы, одежду, упаковку и брендированную продукцию.\n\nТакже помогаем с концепцией, дизайном и подбором позиций под бюджет.',
  },
  {
    question: 'Предоставляете ли вы отчётность?',
    answer: 'Да. После размещений предоставляем статистику, фотоотчёты, ссылки, скриншоты или сводные отчёты — в зависимости от формата рекламы.',
  },
  {
    question: 'Нужна ли маркировка рекламы?',
    answer: 'Для интернет-рекламы — да. Работаем с маркировкой по требованиям ФЗ «О рекламе».\n\nРегистрацию материалов в ОРД и присвоение токена (erid) берем на себя.',
  },
  {
    question: 'Работаете ли вы с Instagram*?',
    answer: 'Стандартные рекламные размещения для продвижения товаров и услуг на территории РФ в Instagram* не предлагаем.\n\nПри необходимости можем обсудить альтернативные форматы присутствия и другие площадки.\n\n*Instagram принадлежит Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.',
  },
];

export const WORK_STEPS = [
  { step: 1, emoji: '📝', title: 'Заявка', desc: 'Вы оставляете заявку или пишете в Telegram. Мы отвечаем в течение 2 часов. Максимум.' },
  { step: 2, emoji: '📋', title: 'Бриф', desc: 'Уточняем задачу: цель, аудитория, бюджет, сроки, город и соцсеть.' },
  { step: 3, emoji: '🔍', title: 'Подбор инструментов', desc: 'Формируем медиаплан с конкретными способами продвижения, площадками, ожидаемыми охватами и ценами.' },
  { step: 4, emoji: '✅', title: 'Согласование', desc: 'Вы утверждаете медиаплан и рекламный материал. Вносим правки.' },
  { step: 5, emoji: '🚀', title: 'Реализация', desc: 'Реализуем медиаплан в согласованное время. Делимся ссылками и фото-отчетами после реализации каждого пункта плана.' },
  { step: 6, emoji: '📊', title: 'Отчёт', desc: 'Формируем и высылаем полный отчёт о запуске и полученных результатах.' },
];

const OUTDOOR_CDN = 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/outdoor';

export const OUTDOOR_FORMATS: OutdoorFormat[] = [
  {
    id: 'shield',
    name: 'Щит',
    size: '3×6 м',
    description: 'Классический билборд 3×6 м — самый распространённый формат наружной рекламы. Размещается на оживлённых магистралях и в жилых кварталах.',
    fits: 'ЖК, ресторанам, автосалонам, локальному бизнесу, мероприятиям',
    advantage: 'Широкий охват, низкая стоимость контакта',
    priceFrom: 12000,
    emoji: '🟦',
    image: `${OUTDOOR_CDN}/shield.png`,
  },
  {
    id: 'supersite',
    name: 'Суперсайт',
    size: '12×5 м и более',
    description: 'Крупноформатная конструкция на федеральных трассах и вылетных магистралях. Максимальная видимость.',
    fits: 'Крупным брендам, девелоперам, банкам, федеральным компаниям, автодилерам',
    advantage: 'Максимальный охват трафика, имиджевый эффект',
    priceFrom: 45000,
    emoji: '🟥',
    image: `${OUTDOOR_CDN}/supersite.png`,
  },
  {
    id: 'cityboard',
    name: 'Ситиборд',
    size: '3,7×2,7 м',
    description: 'Городской формат чуть меньше стандартного щита. Размещается в центре города, на пешеходных зонах и у торговых центров.',
    fits: 'Ресторанам и кофейням, фитнес-клубам, медицинским центрам, салонам красоты',
    advantage: 'Точное попадание в городскую аудиторию',
    priceFrom: 18000,
    emoji: '🟨',
    image: `${OUTDOOR_CDN}/cityboard.png`,
  },
  {
    id: 'pillar',
    name: 'Пиллар',
    size: '1,2×3,3 м',
    description: 'Двусторонняя тумба-стела на тротуарах и у входов в ТЦ. Охватывает пешеходный поток.',
    fits: 'Кофейням, пекарням, аптекам, локальным акциям, мероприятиям',
    advantage: 'Близкий контакт с пешеходами, двустороннее размещение',
    priceFrom: 8000,
    emoji: '🟩',
    image: `${OUTDOOR_CDN}/pillar.png`,
  },
  {
    id: 'cityformat',
    name: 'Ситиформат',
    size: '1,2×1,8 м',
    description: 'Компактный формат у остановок общественного транспорта. Прямой контакт с ожидающими пассажирами.',
    fits: 'Ресторанам и доставкам, фитнесу, онлайн-сервисам, концертам и мероприятиям',
    advantage: 'Долгий контакт с аудиторией на остановке',
    priceFrom: 6000,
    emoji: '🚌',
    image: `${OUTDOOR_CDN}/cityformat.png`,
  },
  {
    id: 'mediafacade',
    name: 'Медиафасад',
    size: 'Индивидуально',
    description: 'LED-экран или проекция на фасаде здания. Динамическая реклама в центре города с высокой концентрацией трафика.',
    fits: 'Премиум-сегменту, застройщикам, автосалонам, мероприятиям, ресторанам',
    advantage: 'Динамика, яркость, запоминаемость',
    priceFrom: 27000,
    emoji: '💡',
    image: `${OUTDOOR_CDN}/mediafacade.png`,
  },
  {
    id: 'arch',
    name: 'Арка',
    size: 'Индивидуально',
    description: 'Рекламная арка над дорогой — трудно не заметить. Создаёт сильный имиджевый эффект.',
    fits: 'ЖК, ТЦ, автосалонам, городским проектам, масштабным мероприятиям',
    advantage: 'Максимальная видимость, имиджевый формат',
    priceFrom: 35000,
    emoji: '🌉',
    image: `${OUTDOOR_CDN}/arch.png`,
  },
  {
    id: 'brandmauer',
    name: 'Брандмауэр',
    size: 'От 50 м²',
    description: 'Крупноформатное изображение на торцевой стене здания. Видно издалека, работает на имидж и узнаваемость.',
    fits: 'Федеральным компаниям, девелоперам, банкам, крупным сетям',
    advantage: 'Огромная площадь, долговременный эффект',
    priceFrom: 80000,
    emoji: '🏢',
    image: `${OUTDOOR_CDN}/brandmauer.png`,
  },
];

export const BLOGGERS: Blogger[] = [
  {
    id: 'khb-zhensovet',
    name: 'Женсовет',
    social: 'instagram',
    city: 'Хабаровск',
    category: 'Женское lifestyle-медиа',
    description: 'Проект в формате городского женского журнала, где собраны новости о звёздах, событиях Хабаровска и Дальнего Востока, обзоры мест и бьюти-советы, темы для мам и повседневная жизнь города.',
    fullDescription: 'Проект в формате городского женского журнала. Собирает новости о звёздах, событиях Хабаровска и Дальнего Востока, обзоры мест и бьюти-советы, темы для мам, лайфстайл и повседневную жизнь города.',
    subscribersTotal: '52,5 тыс.',
    reachSummary: ['94,4 тыс.'],
    audience: ['Хабаровск · Москва · Владивосток', '85% женщины, 15% мужчины', 'Возраст: 18–54'],
    socials: [
      { social: 'instagram', subscribers: 47000, reachLabel: '21,98 млн просмотров / 30 дн.\n7,97 млн охваченных аккаунтов', link: 'https://www.instagram.com/woman_hbk?igsh=cmk5YXBqZXZ4eGZq&utm_source=qr' },
      { social: 'telegram', subscribers: 2546, reachLabel: '636 просмотров постов / нед.', engagementLabel: '13 реакций, 2 пересылки', link: 'https://t.me/womanhbk' },
      { social: 'tiktok', subscribers: 2516, reachLabel: '33 000 просмотров / 7 дн.', engagementLabel: '2 297 лайков, 16 комм., 319 репостов', link: 'https://www.tiktok.com/@womankhv?_r=1&_t=ZS-96heN3ZVP8S' },
      { social: 'max', subscribers: 470, reachLabel: 'не используется для рекламы', link: 'https://max.ru/join/OA58aztk99_o1j871jzoOj-cw6gV1U8XuUN1E76peUk' },
    ],
    formats: ['Обзор в Reels', 'Фото-отзыв', 'Серия сторис', 'Кружки и посты в TG', 'Новости в ленту и сторис'],
    bestPerforming: ['Сфера питания', 'Караоке', 'Клубы', 'Одежда'],
    bestFor: ['Ресторанам и кафе', 'Караоке и клубам', 'Одежде', 'Beauty', 'Мамским/семейным проектам', 'Сфере услуг'],
    prices: [
      { label: 'Обзор в Instagram*', price: '15 000 ₽' },
      { label: 'Пост-отзыв', price: '8 000 ₽' },
      { label: 'Сторис', price: '6 000 ₽' },
      { label: 'Выезд для сторис', price: '+2 000 ₽' },
      { label: 'Telegram: кружок + пост', price: '2 500 ₽' },
      { label: 'Дубль обзора в TikTok', price: '+1 500 ₽ к обзору' },
      { label: 'MAX', price: 'рекламы нет' },
    ],
    priceFromLabel: 'от 3 000 ₽',
    emoji: '👩‍💼',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/zhensovet.jpg',
  },
  {
    id: 'khb-myday',
    name: 'Мой день. Хабаровский край',
    social: 'instagram',
    city: 'Хабаровск',
    category: 'Информационно-развлекательный городской проект',
    description: 'Проект о местах, мероприятиях и жизни Хабаровска. Делает развлекательные ролики, обзоры локаций и стриттоки с жителями города.',
    fullDescription: 'Городской информационно-развлекательный проект о местах, мероприятиях и жизни Хабаровска. Делает развлекательные ролики, обзоры локаций, стриттоки с жителями города и нативные видеоформаты.',
    subscribersTotal: '131,3 тыс.',
    reachSummary: ['50,5 тыс.'],
    engagementSummary: [
      'Instagram*: 494 действия на пост',
      'TikTok: 1 000 действий на пост',
      'ВКонтакте: 23 действия на пост',
    ],
    socials: [
      { social: 'instagram', subscribers: 64800, reachLabel: '32 742 на пост', engagementLabel: '494 на пост', link: 'https://www.instagram.com/myday.27?igsh=NHZnMTYxcmpzcXI3' },
      { social: 'tiktok', subscribers: 13200, reachLabel: '16 500 на пост', engagementLabel: '1 000 на пост', link: 'https://www.tiktok.com/@myday.khv?_r=1&_t=ZN-96hLqHUhHWg' },
      { social: 'vk', subscribers: 53300, reachLabel: '1 440 на пост', engagementLabel: '23 на пост', link: 'https://vk.ru/my_day27' },
    ],
    formats: ['Обзор в Reels', 'Стриттоки', 'Репортаж в сторис', 'Новости в ленту и сторис'],
    bestPerforming: ['Кафе', 'Активный отдых'],
    bestFor: ['Кафе и ресторанам', 'Активному отдыху', 'Мероприятиям', 'Городским проектам', 'Локальному бизнесу'],
    prices: [
      { label: 'Новость в ленте', price: '4 000 ₽' },
      { label: 'Сторис', price: '1 250 ₽' },
      { label: 'Лента + сторис', price: '5 000 ₽' },
      { label: 'Обзор в Reels + история + TikTok', price: '15 000 ₽' },
      { label: 'Закрепление на 3 дня', price: '2 000 ₽' },
      { label: 'Репортаж: 2–3 выездных сторис', price: '4 000 ₽' },
      { label: 'Срочный запуск за 24 часа', price: '+3 000 ₽' },
      { label: 'Выбор конкретной даты', price: '+2 000 ₽' },
      { label: 'Коммерческая лицензия на видео', price: '+10 000 ₽' },
    ],
    priceFromLabel: 'от 4 000 ₽',
    emoji: '📅',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/myday.jpg',
  },
  {
    id: 'khb-life',
    name: 'Хабаровск Life',
    social: 'instagram',
    city: 'Хабаровск',
    category: 'Городское lifestyle-медиа',
    description: 'Блог о Хабаровске, его местах, жизни и людях. Рассказывает о городе интересно: через обзоры, анонсы, подборки, посты и видеоформаты.',
    fullDescription: 'Хабаровск Life — блог о Хабаровске, его местах, жизни и людях. Рассказывает о городе интересно: через обзоры, анонсы, подборки, посты и видеоформаты.',
    subscribersTotal: '233,5 тыс.',
    reachSummary: ['77,7 тыс.'],
    engagementSummary: [
      'Instagram*: ER 31%',
      'TikTok: ER 11,8%',
      'ВКонтакте: ER 44,8%',
      'Telegram: ER 3,32%',
    ],
    socials: [
      { social: 'instagram', subscribers: 63900, reachLabel: '1,5 млн просмотров / мес.', engagementLabel: 'ER 31%', link: 'https://www.instagram.com/khab_life_?igsh=MWMwYjhlNG5qeDBjbA%3D%3D&utm_source=qr' },
      { social: 'tiktok', subscribers: 151500, reachLabel: '1,1 млн просмотров / мес.', engagementLabel: 'ER 11,8%', link: 'https://www.tiktok.com/@khab_life_?_r=1&_t=ZS-96hPpz7VVhN' },
      { social: 'vk', subscribers: 12500, reachLabel: '78,5 тыс. просмотров / мес.', engagementLabel: 'ER 44,8%', link: 'https://vk.ru/khab.life' },
      { social: 'telegram', subscribers: 4891, reachLabel: '~1,5 тыс. просмотров на пост', engagementLabel: 'ER 3,32%', link: 'https://t.me/khablife' },
      { social: 'max', subscribers: 753, reachLabel: '~500 просмотров на пост', link: 'https://max.ru/join/L8YE8ffiQ92vZbpBiuFEYuJBXNscyQOUdsg5JLDSc08' },
    ],
    formats: ['Обзор в Reels', 'Обзор в TikTok', 'Пост в TG и MAX', 'Сторис', 'Подборка в карусели'],
    formatsByPlatform: [
      { platform: 'Instagram*', formats: 'обзоры, анонсы, карусели, сторис' },
      { platform: 'TikTok', formats: 'обзоры, анонсы, карусели' },
      { platform: 'ВКонтакте', formats: 'обзоры, посты' },
      { platform: 'Telegram', formats: 'посты' },
      { platform: 'MAX', formats: 'посты' },
    ],
    bestPerforming: ['Общепит', 'Развлечения', 'Застройщики', 'Городские проекты', 'Локальный бизнес'],
    bestFor: ['Ресторанам и кафе', 'Развлечениям', 'Застройщикам', 'Мероприятиям', 'Локальному ритейлу', 'Городским брендам'],
    doesntFit: 'Не подходит / не берём: медицина, ногти, ресницы, инфобизнес, риелторы.',
    prices: [
      { label: 'Обзор в Instagram*', price: '23 000 ₽' },
      { label: 'Обзор на все соцсети', price: '25 000 ₽' },
      { label: 'Пост в Telegram + MAX', price: '3 000 ₽' },
      { label: 'Сторис', price: '3 000 ₽' },
      { label: 'Карусель / подборка', price: '3 000 ₽ за место' },
    ],
    priceFromLabel: 'от 3 000 ₽',
    emoji: '🏙️',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/khablife.jpg',
  },
  {
    id: 'khb-dalvostok',
    name: 'Хабаровск | Дальний Восток',
    social: 'instagram',
    city: 'Хабаровск',
    category: 'Городское новостное сообщество',
    description: 'Городское медиа, где публикуют городскую повестку, федеральные и региональные новости в формате постов и видео с телеведущим Алексеем Кухарем.',
    fullDescription: 'Городское медиа, где публикуют городскую повестку, федеральные и региональные новости в формате постов и видео с телеведущим Алексеем Кухарем.',
    subscribersTotal: '137,2 тыс.',
    reachSummary: ['56,2 тыс.'],
    engagementSummary: ['до 1 427 действий на пост в Instagram*'],
    audience: [],
    socials: [
      { social: 'instagram', subscribers: 121814, reachLabel: '46 509 на пост', engagementLabel: '1 427 на пост · ER 3,1%', link: 'https://www.instagram.com/dal__hab?igsh=M2l5bGs2Z3pyZnRw&utm_source=qr' },
      { social: 'telegram', subscribers: 12675, reachLabel: '989 на пост', engagementLabel: '10 на пост · ER 1,0%', link: 'https://t.me/dalha_b' },
      { social: 'max', subscribers: 2737, reachLabel: '9 709 на пост', engagementLabel: '20 на пост · ER 0,2%', link: 'https://max.ru/dalha_b' },
    ],
    formats: ['Обзор в Reels', 'Репортаж в сторис', 'Новости в ленту и сторис', 'Посты в TG и MAX'],
    formatsByPlatform: [
      { platform: 'Instagram*', formats: 'Reels, фотопосты, карусели, сторис, видео' },
      { platform: 'Telegram', formats: 'новости, посты, текстовые публикации' },
      { platform: 'MAX', formats: 'новости, посты, текстовые публикации' },
    ],
    bestPerforming: ['Мероприятия', 'Недвижимость', 'Крупные акции города', 'Магазины одежды'],
    bestFor: ['Мероприятиям', 'Застройщикам', 'Городским акциям', 'Семейным магазинам'],
    prices: [
      { label: 'Reels', price: '10 000 ₽' },
      { label: 'Новость в ленту', price: '3 500 ₽' },
      { label: 'Новость в сторис', price: '1 000 ₽' },
      { label: 'Новость в ленту + сторис', price: '4 250 ₽' },
    ],
    priceFromLabel: 'от 1 250 ₽',
    emoji: '📰',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/dalvostok.jpg',
  },
  {
    id: 'vld-charlesrus',
    name: 'Чёрный русский',
    social: 'tiktok',
    city: 'Владивосток',
    category: 'Персональный инфлюенсер',
    description: 'Авторский видеоблогер с крупной аудиторией в нескольких соцсетях. Подходит для брендов, которым нужен широкий охват через узнаваемого автора.',
    fullDescription: 'Авторский видеоблогер с крупной аудиторией в нескольких соцсетях. Подходит для брендов, которым нужна личная рекомендация, видеоконтент и широкий охват через узнаваемого автора.',
    subscribersTotal: '1,09 млн.',
    reachSummary: ['380,9 тыс.'],
    engagementSummary: [
      'до 7 565 действий на YouTube',
      'до 4 958 действий во ВКонтакте',
      'до 3 270 действий в Instagram*',
    ],
    socials: [
      { social: 'tiktok', subscribers: 479200, reachLabel: '18 334 средних просмотров', engagementLabel: '1 222 действия · ER 6,7%', link: 'https://www.tiktok.com/@charlesrus' },
      { social: 'instagram', subscribers: 116267, reachLabel: '61 968 средних просмотров', engagementLabel: '3 270 действий · ER 5,3%', link: 'https://www.instagram.com/charlesrus25' },
      { social: 'youtube', subscribers: 308000, reachLabel: '241 709 средних просмотров', engagementLabel: '7 565 действий · ER 3,1%', link: 'https://youtube.com/@charlesrus25?si=5-Kf_BMRxKNNnfBQ' },
      { social: 'vk', subscribers: 179017, reachLabel: '57 193 средних просмотров', engagementLabel: '4 958 действий · ER 8,7%', link: 'https://vk.com/charlesrus25' },
      { social: 'telegram', subscribers: 4065, reachLabel: '570 средних просмотров', engagementLabel: '42 действия · ER 7,4%', link: 'https://t.me/Charlesrus25' },
      { social: 'max', subscribers: 1509, reachLabel: '1 198 средних просмотров', engagementLabel: '147 действий · ER 12,3%', link: 'https://max.ru/charlesrus25' },
    ],
    formats: ['Ролики в Клипы, Reels, Short\'s и TikTok', 'Посты в TG, ВК и MAX', 'Интеграции на YT', 'Сторис'],
    formatsByPlatform: [
      { platform: 'TikTok', formats: 'ролики, сторис' },
      { platform: 'Instagram*', formats: 'ролики, сторис' },
      { platform: 'YouTube', formats: 'ролики, сторис' },
      { platform: 'ВКонтакте', formats: 'ролики, текст, фото, сторис' },
      { platform: 'Telegram', formats: 'ролики, текст, фото, сторис' },
      { platform: 'MAX', formats: 'ролики, текст, фото, сторис' },
    ],
    bestPerforming: ['Развлекательные услуги', 'Питание', 'Автоуслуги', 'Одежда', 'Потребительские товары'],
    bestFor: ['Брендам домашней техники', 'Автобизнесу', 'Развлекательным проектам'],
    prices: [
      { label: 'Ролик', price: 'от 40 000 ₽' },
      { label: 'Пост', price: 'от 10 000 ₽' },
      { label: 'Сторис', price: 'от 5 000 ₽' },
    ],
    priceFromLabel: 'от 5 000 ₽',
    emoji: '🎥',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/charlesrus.jpg',
  },
  {
    id: 'vld-zharovdv',
    name: 'Жаров ДВ',
    social: 'tiktok',
    city: 'Владивосток',
    category: 'Viral creator / видеоблогер',
    description: 'StandUp-комик и видеоблогер с высокими просмотрами и вовлечённой аудиторией. Подходит для охватных кампаний, вирусных роликов и проектов, где важно массовое внимание.',
    fullDescription: 'Видеоблогер с сильными средними просмотрами и высокой вовлечённостью в TikTok, Instagram*, YouTube и ВКонтакте. Подходит для охватных кампаний, вирусных роликов и проектов, где важны видеоформат и массовое внимание.',
    subscribersTotal: '624,7 тыс.',
    reachSummary: ['2,43 млн'],
    engagementSummary: [
      'до 122,2 тыс. действий в TikTok',
      'до 87,2 тыс. действий в Instagram*',
      'до 34,1 тыс. действий на YouTube',
    ],
    socials: [
      { social: 'tiktok', subscribers: 270100, reachLabel: '1 049 725 средних просмотров', engagementLabel: '122 240 действий · ER 11,6%', link: 'https://www.tiktok.com/@zharovdv' },
      { social: 'instagram', subscribers: 267103, reachLabel: '783 423 средних просмотров', engagementLabel: '87 212 действий · ER 11,1%', link: 'https://www.instagram.com/zharov.dv' },
      { social: 'youtube', subscribers: 79400, reachLabel: '586 925 средних просмотров', engagementLabel: '34 130 действий · ER 5,8%', link: 'https://youtube.com/@zharovdv' },
      { social: 'vk', subscribers: 8091, reachLabel: '12 543 средних просмотров', engagementLabel: '2 308 действий · ER 18,4%', link: 'https://vk.ru/zharovdv' },
    ],
    formats: ['Ролики в Клипы, Reels, Short\'s и TikTok', 'Интеграции на YT', 'Сторис'],
    formatsByPlatform: [
      { platform: 'TikTok', formats: 'ролики, сторис' },
      { platform: 'Instagram*', formats: 'ролики, сторис' },
      { platform: 'YouTube', formats: 'ролики, сторис, горизонтальные видео' },
      { platform: 'ВКонтакте', formats: 'ролики, сторис, горизонтальные видео' },
    ],
    bestPerforming: ['Рекламы пока практически не было, успешные сферы не зафиксированы'],
    bestFor: ['Массовым брендам', 'Крупным событиям и мероприятиям'],
    prices: [
      { label: 'Размещение', price: 'По запросу' },
    ],
    priceFromLabel: 'по запросу',
    emoji: '🔥',
    avatar: 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/bloggers/zharovdv.jpg',
  },
];

const CDN = 'https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/merch';

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'gadgets',
    name: 'Аксессуары для гаджетов',
    description: 'Современный мерч, который люди действительно используют каждый день.',
    why: 'Телефон всегда рядом — а вместе с ним и ваш бренд.',
    priceFrom: 150,
    emoji: '📱',
    image: `${CDN}/gadgets.png`,
  },
  {
    id: 'powerbank',
    name: 'Повербанки и технотовары',
    description: 'Практичные подарки с высокой ценностью.',
    why: 'Современный формат для технологичного и сильного бренда.',
    priceFrom: 1200,
    emoji: '🔋',
    image: `${CDN}/powerbanks.png`,
  },
  {
    id: 'tshirt',
    name: 'Футболки и толстовки',
    description: 'Носимый мерч превращает сотрудников и клиентов в амбассадоров бренда.',
    why: 'Формирует узнаваемость и создаёт ощущение принадлежности к компании.',
    priceFrom: 500,
    emoji: '👕',
    image: `${CDN}/tshirts.png`,
  },
  {
    id: 'bag',
    name: 'Экосумки и шоперы',
    description: 'Практичный мерч с высокой частотой использования и большим рекламным охватом.',
    why: 'Бренд сопровождает человека в городе, магазинах и повседневной жизни.',
    priceFrom: 200,
    emoji: '🛍️',
    image: `${CDN}/bags.png`,
  },
  {
    id: 'sticker',
    name: 'Стикеры и наклейки',
    description: 'Самый доступный мерч. Часто клеятся на ноутбуки, автомобили, телефоны.',
    why: 'Вирусное распространение. Стикеры видят все вокруг носителя.',
    priceFrom: 15,
    emoji: '🎨',
    image: `${CDN}/stickers.png`,
  },
  {
    id: 'keychain',
    name: 'Брелоки и значки',
    description: 'Компактный сувенир, который остаётся с человеком каждый день.',
    why: 'Создаёт эмоциональную связь через повседневное использование.',
    priceFrom: 80,
    emoji: '🔑',
    image: `${CDN}/keychains.png`,
  },
  {
    id: 'notebook',
    name: 'Блокноты и ежедневники',
    description: 'Корпоративный подарок, который остаётся на рабочем столе. Работает на имидж компании.',
    why: 'Подходит для партнёров, сотрудников и деловых мероприятий.',
    priceFrom: 300,
    emoji: '📓',
    image: `${CDN}/notebooks.png`,
  },
  {
    id: 'cup',
    name: 'Кружки и термокружки',
    description: 'Фирменная посуда, которая ежедневно напоминает о бренде — дома, в офисе и в дороге.',
    why: 'Постоянный визуальный контакт с брендом без навязчивой рекламы.',
    priceFrom: 350,
    emoji: '☕',
    image: `${CDN}/cups.png`,
  },
  {
    id: 'pen',
    name: 'Ручки и канцелярия',
    description: 'Массовый мерч для ежедневного использования.',
    why: 'Один из самых доступных способов регулярно напоминать о компании.',
    priceFrom: 30,
    emoji: '🖊️',
    image: `${CDN}/pens.png`,
  },
];