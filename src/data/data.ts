export type SocialNet = 'vk' | 'telegram' | 'ok' | 'max' | 'tiktok' | 'instagram';
export type City = 'Хабаровск' | 'Владивосток' | 'Комсомольск-на-Амуре' | 'Дальний Восток';
export type Format = 'Пост' | 'Пост + Сторис' | 'Видео' | 'Нативная публикация' | 'Обзор у блогера' | 'Подборка' | 'Спецпроект' | 'Пакет';

export type OutdoorType = 'Щит' | 'Суперсайт' | 'Ситиборд' | 'Пиллар' | 'Ситиформат' | 'Медиафасад' | 'Арка' | 'Брандмауэр';

export interface OutdoorFormat {
  id: string;
  name: OutdoorType;
  size: string;
  description: string;
  where: string;
  advantage: string;
  priceFrom: number;
  emoji: string;
}

export interface Blogger {
  id: string;
  name: string;
  social: SocialNet;
  city: 'Хабаровск' | 'Владивосток';
  category: string;
  description: string;
  subscribers: number;
  reach: number;
  priceFrom: number;
  emoji: string;
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
    question: 'Сколько денег нужно на запуск?',
    answer: 'А сколько у вас есть?) Или сколько вы готовы на это уделить.\n\nА если серьезно, работаем с разными бюджетами. Укажите цель запуска в комментарии к заявке, мы подберем наиболее релевантные инструменты, площадки и назовем требуемый бюджет.\n\nНа какие-то цели достаточно 15к. На какие-то 50к. А на какие-то и 300к будет мало.',
  },
  {
    question: 'Кто готовит рекламные материалы?',
    answer: 'Если у вас есть готовый материал для запусков, можем использовать его. А так, весь креатив берем на себя. Конечно же, согласовываем его с вами.',
  },
  {
    question: 'Можно ли разместить рекламу одновременно в нескольких городах?',
    answer: 'Конечно. Мы работаем с Хабаровском, Владивостоком и Комсомольском-на-Амуре. Можем сформировать пакет с охватом всего Дальнего Востока.',
  },
  {
    question: 'Отчётность, получение маркировки и прочая документация?',
    answer: 'Это все есть. Это все делаем.',
  },
  {
    question: 'Предоставляете ли вы статистику после размещения?',
    answer: 'Да. После каждого размещения предоставляем скриншот статистики: охват, просмотры, реакции, переходы. Для пакетных кампаний — сводный отчёт.',
  },
  {
    question: 'Нужна ли маркировка рекламы?',
    answer: 'Да. С 2023 года вся интернет-реклама в России должна быть промаркирована по закону о рекламе. Мы помогаем с маркировкой: регистрируем рекламный материал в ОРД и присваиваем токен erid.',
  },
  {
    question: 'Работаете ли вы с Instagram*?',
    answer: 'Стандартное рекламное размещение в Instagram* для продвижения товаров и услуг на территории РФ мы не предлагаем. Рекомендуем альтернативы: ВКонтакте, Telegram, MAX, TikTok, Одноклассники. *Instagram принадлежит Meta Platforms Inc., деятельность которой признана экстремистской и запрещена в РФ.',
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

export const OUTDOOR_FORMATS: OutdoorFormat[] = [
  {
    id: 'shield',
    name: 'Щит',
    size: '3×6 м',
    description: 'Классический билборд 3×6 м — самый распространённый формат наружной рекламы. Размещается на оживлённых магистралях и в жилых кварталах.',
    where: 'Дороги, перекрёстки, въезды в город',
    advantage: 'Широкий охват, низкая стоимость контакта',
    priceFrom: 12000,
    emoji: '🟦',
  },
  {
    id: 'supersite',
    name: 'Суперсайт',
    size: '12×5 м и более',
    description: 'Крупноформатная конструкция на федеральных трассах и вылетных магистралях. Максимальная видимость.',
    where: 'Въезды в город, федеральные трассы',
    advantage: 'Максимальный охват трафика, имиджевый эффект',
    priceFrom: 45000,
    emoji: '🟥',
  },
  {
    id: 'cityboard',
    name: 'Ситиборд',
    size: '3,7×2,7 м',
    description: 'Городской формат чуть меньше стандартного щита. Размещается в центре города, на пешеходных зонах и у торговых центров.',
    where: 'Центр города, ТЦ, пешеходные зоны',
    advantage: 'Точное попадание в городскую аудиторию',
    priceFrom: 18000,
    emoji: '🟨',
  },
  {
    id: 'pillar',
    name: 'Пиллар',
    size: '1,2×3,3 м',
    description: 'Двусторонняя тумба-стела на тротуарах и у входов в ТЦ. Охватывает пешеходный поток.',
    where: 'Тротуары, входные группы ТЦ, остановки',
    advantage: 'Близкий контакт с пешеходами, двустороннее размещение',
    priceFrom: 8000,
    emoji: '🟩',
  },
  {
    id: 'cityformat',
    name: 'Ситиформат',
    size: '1,2×1,8 м',
    description: 'Компактный формат у остановок общественного транспорта. Прямой контакт с ожидающими пассажирами.',
    where: 'Остановки, транспортные узлы',
    advantage: 'Долгий контакт с аудиторией на остановке',
    priceFrom: 5000,
    emoji: '🚌',
  },
  {
    id: 'mediafacade',
    name: 'Медиафасад',
    size: 'Индивидуально',
    description: 'LED-экран или проекция на фасаде здания. Динамическая реклама в центре города с высокой концентрацией трафика.',
    where: 'Центр города, фасады зданий',
    advantage: 'Динамика, яркость, запоминаемость',
    priceFrom: 35000,
    emoji: '💡',
  },
  {
    id: 'arch',
    name: 'Арка',
    size: 'Индивидуально',
    description: 'Рекламная арка над дорогой — трудно не заметить. Создаёт сильный имиджевый эффект.',
    where: 'Въезды в микрорайоны, главные магистрали',
    advantage: 'Максимальная видимость, имиджевый формат',
    priceFrom: 55000,
    emoji: '🌉',
  },
  {
    id: 'brandmauer',
    name: 'Брандмауэр',
    size: 'От 50 м²',
    description: 'Крупноформатное изображение на торцевой стене здания. Видно издалека, работает на имидж и узнаваемость.',
    where: 'Торцы зданий у дорог и перекрёстков',
    advantage: 'Огромная площадь, долговременный эффект',
    priceFrom: 80000,
    emoji: '🏢',
  },
];

export const BLOGGERS: Blogger[] = [
  {
    id: 'khb-blogger-city',
    name: 'Хабаровск Life',
    social: 'vk',
    city: 'Хабаровск',
    category: 'Городской лайфстайл',
    description: 'Блогер о жизни в Хабаровске: места, события, обзоры. Аудитория 20–40 лет, высокое вовлечение.',
    subscribers: 41000,
    reach: 95000,
    priceFrom: 6000,
    emoji: '🏙️',
  },
  {
    id: 'khb-blogger-food',
    name: 'Ем в Хабаровске',
    social: 'telegram',
    city: 'Хабаровск',
    category: 'Еда и рестораны',
    description: 'Гастрономический блог. Обзоры кафе, ресторанов и доставок. Честно и с ценами.',
    subscribers: 23000,
    reach: 48000,
    priceFrom: 4500,
    emoji: '🍽️',
  },
  {
    id: 'khb-blogger-tiktok',
    name: 'Хабаровск | Видео',
    social: 'tiktok',
    city: 'Хабаровск',
    category: 'Видеоблог',
    description: 'TikTok-блогер о городской жизни. Вирусные видео, обзоры мест, события.',
    subscribers: 67000,
    reach: 380000,
    priceFrom: 9000,
    emoji: '🎬',
  },
  {
    id: 'vld-blogger-food',
    name: 'Ем во Владивостоке',
    social: 'telegram',
    city: 'Владивосток',
    category: 'Еда и рестораны',
    description: 'Популярный гастрономический канал Владивостока. Честные обзоры заведений.',
    subscribers: 18500,
    reach: 34000,
    priceFrom: 3200,
    emoji: '🍜',
  },
  {
    id: 'vld-blogger-life',
    name: 'Влад|Жизнь',
    social: 'tiktok',
    city: 'Владивосток',
    category: 'Лайфстайл',
    description: 'TikTok-блогер о жизни во Владивостоке. Короткие видео о городе, заведениях, событиях.',
    subscribers: 55000,
    reach: 320000,
    priceFrom: 8000,
    emoji: '⚓',
  },
  {
    id: 'vld-blogger-beauty',
    name: 'Красота Владивостока',
    social: 'instagram',
    city: 'Владивосток',
    category: 'Красота и уход',
    description: 'Блогер о beauty-индустрии Владивостока. Обзоры салонов, мастеров, косметики.',
    subscribers: 29000,
    reach: 85000,
    priceFrom: 5000,
    emoji: '💅',
  },
];

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'gadgets',
    name: 'Аксессуары для гаджетов',
    description: 'Современный мерч, который люди действительно используют каждый день. Телефон всегда рядом — а вместе с ним и ваш бренд.',
    why: 'Высокая частота использования — бренд постоянно перед глазами и руками.',
    priceFrom: 150,
    emoji: '📱',
    image: 'https://downloader.disk.yandex.ru/disk/98e7f381650b6562bc8e8e9e9c21cc5c90e24b61279c6be78b110510d271c59e/6a0ee1ff/b9JV5vdQCf03SifGUCQL0-_q2hozJkxj7Yk5YA_dqlcLqXI9oOPpYQVcefhlOQcmy4UdTXYcyfCCv7jZWOhA_A%3D%3D?uid=0&filename=IMG_3976.PNG&disposition=attachment&hash=z9Q%2BxIyyKfxgzEi/1MD0uHYG0sn9MNtvMx/pGRK8%2BctSnYDefaCf7VY2exIGBmIwq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=4889162&hid=ec995c6639bdab3947b4c2935d68aacd&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'powerbank',
    name: 'Повербанки и технотовары',
    description: 'Практичные подарки с высокой ценностью.',
    why: 'Современный формат для технологичного и сильного бренда.',
    priceFrom: 1200,
    emoji: '🔋',
    image: 'https://downloader.disk.yandex.ru/disk/13477677f97575ee03fce711342fdb069bffc660ec903711c0395e721ca53891/6a0ee213/b9JV5vdQCf03SifGUCQL04PTvWQuAUaejnljrZE5evZMyW0f1XL2Ga-BsUrFFRgFqZvaecFJs4jsYUyJizuU9Q%3D%3D?uid=0&filename=IMG_3968.PNG&disposition=attachment&hash=g6xfRljkfsMqLrjMBW1qmCdWlfPF4ogF1Xi3SuJKUjxQ3aoi0E5fNfmwSGSonyrzq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=4251623&hid=53bea546f3818b7953a53f679d1e6f1e&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'tshirt',
    name: 'Футболки и толстовки',
    description: 'Носимый мерч превращает сотрудников и клиентов в амбассадоров бренда.',
    why: 'Формирует узнаваемость и создаёт ощущение принадлежности к компании.',
    priceFrom: 500,
    emoji: '👕',
    image: 'https://downloader.disk.yandex.ru/disk/78e088f29e9ecfea9d3044f09255768c7f530a3546bd29f90ac97b9923a61afe/6a0ee204/b9JV5vdQCf03SifGUCQL08Qp6b3drOT0-IvKEJvJj8sLfRwPEKd6CtWoLl_Efy19hgrMp3XVeQNc6-Cd8_Q-NA%3D%3D?uid=0&filename=IMG_3972.PNG&disposition=attachment&hash=5opwkySGUnPahLq/ALzGTeN5U0CJAFDOl%2Bfy3obXX3DqmPB1p7al3LGDR1oEptNHq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=3924918&hid=a0b4965989edc40b6617949079822c30&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'bag',
    name: 'Экосумки и шоперы',
    description: 'Практичный мерч с высокой частотой использования и большим рекламным охватом.',
    why: 'Бренд сопровождает человека в городе, магазинах и повседневной жизни.',
    priceFrom: 200,
    emoji: '🛍️',
    image: 'https://downloader.disk.yandex.ru/disk/9501bb65da7e22e125385bf0b666b9d06d937bed3ed94c7aca81a0191c7f2558/6a0ee207/b9JV5vdQCf03SifGUCQL0yqUOZUX2zKsv7SDbLatzuDlnWPL7-YTYqsKwMyhGJUHabeU_6H1XRfRcIogwf7q4Q%3D%3D?uid=0&filename=IMG_3973.PNG&disposition=attachment&hash=brvQqzeoVJ5D3nRUzWtotdFklkk29B9NwxBRsGajIGO86K7j4FKJKO4PE/BGuzx/q/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=5227248&hid=c4e8f3452a3bb6063fd8b9491424f94b&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'sticker',
    name: 'Стикеры и наклейки',
    description: 'Самый доступный мерч. Часто клеятся на ноутбуки, автомобили, телефоны.',
    why: 'Вирусное распространение. Стикеры видят все вокруг носителя.',
    priceFrom: 15,
    emoji: '🎨',
    image: 'https://downloader.disk.yandex.ru/disk/97e09c304f79bb811b06ecc7aec6c09c8e25100218f6e00f7d19200013fd629d/6a0ee216/b9JV5vdQCf03SifGUCQL06Gxce00pgkuyEmj03l7AHwdNh8NkGez59VHJficDLX_S8qRgvjsi6cuoxjT0s6wgA%3D%3D?uid=0&filename=IMG_3971.PNG&disposition=attachment&hash=RZGe4zeCzGOOkfBKzHCvMf6kxk3wOumsE4EOEBIWpzXo2gj7Xeg%2BdlTse2Oz59J%2Bq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=5240340&hid=f5ff73aebb07eccb5cb8b30a4c7dfa56&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'keychain',
    name: 'Брелоки и значки',
    description: 'Компактный сувенир, который остаётся с человеком каждый день.',
    why: 'Создаёт эмоциональную связь через повседневное использование.',
    priceFrom: 80,
    emoji: '🔑',
    image: 'https://downloader.disk.yandex.ru/disk/06435abe02496b4229718833fe3213877289f40387f9f626065ed247da205117/6a0ee211/b9JV5vdQCf03SifGUCQL0-EIKQrDxT-sa6ZCpJhsLYaeVCLT0n_whGxPkq4CNLPL2gVqwKmtbXGPGhsSNAGagQ%3D%3D?uid=0&filename=IMG_3970.PNG&disposition=attachment&hash=TBDTlTeG9OwvuQAkHodxbZny1863hkxbmNXdqR%2BeaE8N6L1R9Jlk3kNdoIzGkVzEq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=5319521&hid=8c70c5facecd139c68f1ff6407cc59b0&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'notebook',
    name: 'Блокноты и ежедневники',
    description: 'Корпоративный подарок, который остаётся на рабочем столе. Работает на имидж компании.',
    why: 'Подходит для партнёров, сотрудников и деловых мероприятий.',
    priceFrom: 300,
    emoji: '📓',
    image: 'https://downloader.disk.yandex.ru/disk/b892a80128744bfb96812eadf0d45f14cfac756af21a8d41344806811c152457/6a0ee20a/b9JV5vdQCf03SifGUCQL0xDfP-Y6CIIiCo9Vs3fhEQ1A4DkgAQNem6ZVspHlgpBWdCrW6gCaEmiNv7zMu8GZVg%3D%3D?uid=0&filename=IMG_3975.PNG&disposition=attachment&hash=HoHBGp%2BlHFnWD212cFmjUFYcmqEdRIsYZsZwOmeC2ugNeA5YXqyaA4ON/xnmsfZgq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=4922947&hid=0cb866ac6549f4fdbf7a8091400ac251&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'cup',
    name: 'Кружки и термокружки',
    description: 'Фирменная посуда, которая ежедневно напоминает о бренде — дома, в офисе и в дороге.',
    why: 'Постоянный визуальный контакт с брендом без навязчивой рекламы.',
    priceFrom: 350,
    emoji: '☕',
    image: 'https://downloader.disk.yandex.ru/disk/ba04310e91126b879259f9ac2537fe77a9bdf1536ccaeb3b810ca2db78cf0e8a/6a0ee202/b9JV5vdQCf03SifGUCQL0wCRt8QNGfxBR7y-TkiqTq9y52481WXPLgqpt8r1-z_HEZof44f6AGeSb1cmFrDQHA%3D%3D?uid=0&filename=IMG_3969.PNG&disposition=attachment&hash=Akd/ZmI5lkNsHVrPJ%2Bzy8YtQanSzYSoxvjcr%2BzHo2fOfdlf4IF7jI7EvtlDJwbNUq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=3758313&hid=efc2b415e7172d30a49a4f7ff5336f48&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
  {
    id: 'pen',
    name: 'Ручки и канцелярия',
    description: 'Массовый мерч для ежедневного использования.',
    why: 'Один из самых доступных способов регулярно напоминать о компании.',
    priceFrom: 30,
    emoji: '🖊️',
    image: 'https://downloader.disk.yandex.ru/disk/f370722709298537824bb7a09ddf6c705567d8e21de5cdca70c55c93aa3936cc/6a0ee20e/b9JV5vdQCf03SifGUCQL04f2vlNLB8vZuDkGQqEWTOwinuFo7Tjdx8C-1gbpHPtzEdC-OigqqY2NwQBMiaoHaw%3D%3D?uid=0&filename=IMG_3974.PNG&disposition=attachment&hash=qHQ6tlHBTC%2BqlsPcRjSSUSdFQTkhdLAlLCiOtDdk4ygwZv3tKHsrhN/uTL24hs7oq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=image%2Fpng&owner_uid=1948679689&fsize=4792507&hid=cf63838f99944184ab31a2d2366e0e87&media_type=image&tknv=v3&is_direct_zip_experiment=1',
  },
];