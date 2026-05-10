import { useParams, Link } from 'react-router-dom';
import { PLATFORMS, SOCIALS, SocialNet } from '@/data/data';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

const SOCIAL_CONTENT: Record<string, {
  key: SocialNet;
  title: string;
  subtitle: string;
  description: string;
  why: string[];
  pros: string[];
  cons: string[];
  goals: string[];
  niches: string[];
  formats: string[];
  faq: { q: string; a: string }[];
}> = {
  vk: {
    key: 'vk',
    title: 'ВКонтакте',
    subtitle: 'Локальный охват, городские сообщества, вовлечённость',
    description: 'ВКонтакте — главная соцсеть Дальнего Востока для локального бизнеса. Здесь сосредоточены крупнейшие городские сообщества с аудиторией от 30 до 100+ тысяч подписчиков. Высокая вовлечённость, точечный охват по городу.',
    why: ['Самая популярная соцсеть в городах ДВ', 'Городские сообщества с лояльной аудиторией', 'Разнообразие форматов: посты, сторис, клипы', 'Подробная статистика охватов'],
    pros: ['Широкий охват по городу', 'Доверие к местным сообществам', 'Возможность обсуждений', 'Подходит для любого бюджета'],
    cons: ['Алгоритмический охват снижается', 'Нужен качественный визуал'],
    goals: ['Информирование горожан', 'Акции и распродажи', 'Набор персонала', 'Анонсы событий'],
    niches: ['Кафе и рестораны', 'Ритейл', 'Недвижимость', 'Медицина', 'Образование', 'Мероприятия'],
    formats: ['Пост', 'Пост + Сторис', 'Нативная публикация', 'Подборка', 'Спецпроект'],
    faq: [
      { q: 'Сколько стоит пост во ВКонтакте?', a: 'От 1 200 до 5 000 рублей в зависимости от размера сообщества и города.' },
      { q: 'Как долго висит пост?', a: 'Пост остаётся в ленте навсегда, активный охват — первые 24–48 часов.' },
    ],
  },
  telegram: {
    key: 'telegram',
    title: 'Telegram',
    subtitle: 'Скорость, доверие, срочные анонсы',
    description: 'Telegram — самый быстрорастущий канал для новостей, анонсов и акций. Аудитория читает каналы внимательно и целенаправленно. Высокий уровень доверия и вовлечённости.',
    why: ['Самый высокий CTR среди соцсетей', 'Мгновенный охват без алгоритмов', 'Аудитория активная и платёжеспособная', 'Без рекламного баннерного шума'],
    pros: ['Высокое доверие к контенту', 'Срочные акции работают мгновенно', 'Нет алгоритмов — все видят пост', 'Лучший канал для B2B'],
    cons: ['Аудитория меньше, чем ВКонтакте', 'Нет лайков и комментариев по умолчанию'],
    goals: ['Срочные акции', 'Новости и анонсы', 'B2B продвижение', 'Нативная реклама'],
    niches: ['Бизнес', 'Недвижимость', 'Образование', 'Медицина', 'HoReCa'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [
      { q: 'Сколько стоит размещение в Telegram?', a: 'От 2 000 до 6 000 рублей в зависимости от канала и аудитории.' },
      { q: 'Можно ли разместить ссылку?', a: 'Да, ссылки в Telegram работают отлично и дают высокий CTR.' },
    ],
  },
  ok: {
    key: 'ok',
    title: 'Одноклассники',
    subtitle: 'Взрослая аудитория, семья, локальные услуги',
    description: 'Одноклассники — недооценённая платформа с лояльной взрослой аудиторией 35–60 лет. Идеально для семейных товаров, здоровья, услуг для дома и локального бизнеса с широкой аудиторией.',
    why: ['Аудитория 35–60 лет с высокой покупательской способностью', 'Низкая конкуренция среди рекламодателей', 'Высокое доверие к контенту', 'Доступные цены на размещение'],
    pros: ['Дешевле ВКонтакте и Telegram', 'Лояльная вовлечённая аудитория', 'Низкая конкуренция рекламодателей', 'Хорошо работает для услуг и товаров 35+'],
    cons: ['Молодёжная аудитория почти отсутствует', 'Меньше форматов'],
    goals: ['Товары для дома', 'Здоровье и медицина', 'Семейные услуги', 'Бытовые сервисы'],
    niches: ['Медицина', 'Строительство', 'Ритейл', 'Образование для взрослых', 'Гос. услуги'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [
      { q: 'Для кого лучше всего подходит ОК?', a: 'Для бизнесов, чья аудитория 35+: медицина, услуги, ритейл, недвижимость.' },
    ],
  },
  max: {
    key: 'max',
    title: 'MAX',
    subtitle: 'Растущая платформа для тестов и первопроходцев',
    description: 'MAX — молодая и быстрорастущая платформа от Mail.ru Group. Хорошая возможность занять нишу в новостных и городских каналах первыми. Невысокая стоимость при растущей аудитории.',
    why: ['Растущая аудитория, низкая конкуренция', 'Интеграция с экосистемой Mail.ru', 'Подходит для городских новостей', 'Выгодные стартовые цены'],
    pros: ['Низкая стоимость размещения', 'Минимальная рекламная конкуренция', 'Растущий органический охват'],
    cons: ['Аудитория пока меньше ВКонтакте', 'Платформа только развивается'],
    goals: ['Тестирование новых каналов', 'Городские новости и анонсы', 'Ранний выход на аудиторию'],
    niches: ['Новости', 'Гос. проекты', 'Любой бизнес для тестирования'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [
      { q: 'Стоит ли сейчас размещаться в MAX?', a: 'Да — низкие цены и возможность занять нишу до роста конкуренции.' },
    ],
  },
  tiktok: {
    key: 'tiktok',
    title: 'TikTok',
    subtitle: 'Короткие видео, блогеры, молодёжь, вирусный охват',
    description: 'TikTok — лучший инструмент для вирусного охвата молодой аудитории. Видео могут набирать сотни тысяч просмотров без вложений. Идеально для заведений, событий и визуальных продуктов.',
    why: ['Вирусный охват без алгоритмических ограничений', 'Молодёжь 18–35 лет', 'Лучший формат для заведений и услуг', 'Нативные интеграции с высоким доверием'],
    pros: ['Огромный органический охват', 'Высокое вовлечение', 'Доступные блогеры с реальной аудиторией', 'Отличный CTR для заведений'],
    cons: ['Аудитория преимущественно молодёжная', 'Нужен хороший видеоматериал'],
    goals: ['Продвижение заведений', 'События и фестивали', 'Продукты для молодёжи', 'Брендинг и охват'],
    niches: ['HoReCa', 'Красота', 'Мода', 'Фитнес', 'Развлечения'],
    formats: ['Видео', 'Обзор у блогера'],
    faq: [
      { q: 'Нужно ли снимать видео самому?', a: 'Нет, блогер снимает сам. Вы предоставляете продукт или услугу и кратко бриф.' },
    ],
  },
  instagram: {
    key: 'instagram',
    title: 'Instagram*',
    subtitle: 'Аудитория, ограничения и возможные PR-форматы',
    description: '',
    why: [],
    pros: [],
    cons: [],
    goals: [],
    niches: [],
    formats: [],
    faq: [],
  },
};

export default function SocialPage() {
  const { socialId } = useParams<{ socialId: string }>();
  const content = SOCIAL_CONTENT[socialId || ''];

  if (!content) {
    return (
      <div className="pt-28 text-center py-20">
        <div className="text-5xl mb-4">🤔</div>
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-2">Страница не найдена</h2>
        <Link to="/platforms" className="text-brand-blue hover:text-brand-orange">Вернуться в каталог</Link>
      </div>
    );
  }

  const social = SOCIALS[content.key];
  const relevantPlatforms = PLATFORMS.filter((p) => p.social === content.key).slice(0, 4);

  // Instagram special page
  if (socialId === 'instagram') {
    return (
      <div className="pt-16">
        <section className="bg-gradient-to-br from-pink-900 to-purple-900 text-white py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-4xl mb-4">📷</div>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Instagram*: аудитория, ограничения и PR-форматы</h1>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white/80 leading-relaxed">
              *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
              <div className="flex gap-3">
                <Icon name="AlertTriangle" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Важное уведомление</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Стандартное рекламное размещение в Instagram* для продвижения товаров и услуг на территории РФ нами не предлагается.
                    Использование Instagram* в коммерческих целях сопряжено с правовыми рисками согласно законодательству РФ.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Альтернативы Instagram* на Дальнем Востоке</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Мы предлагаем эффективные альтернативы, которые обеспечивают сопоставимый или больший охват без правовых рисков:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {(['vk', 'telegram', 'max', 'tiktok'] as const).map((key) => {
                const s = SOCIALS[key];
                const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', max: '/socials/max', tiktok: '/socials/tiktok' };
                return (
                  <Link key={key} to={paths[key]} className="flex flex-col items-center p-4 rounded-xl border border-border card-hover text-center">
                    <div className="text-3xl mb-2">{s.emoji}</div>
                    <div className="font-medium text-sm text-brand-dark">{s.label}</div>
                  </Link>
                );
              })}
            </div>

            <div className="bg-brand-light border border-border rounded-xl p-5">
              <h3 className="font-display font-semibold text-brand-dark mb-3">Правовая информация</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meta Platforms Inc. признана экстремистской организацией решением суда на территории Российской Федерации.
                Деятельность компании запрещена. Использование сервисов Instagram* и Facebook* в коммерческих целях
                (реклама, монетизация) на территории РФ сопряжено с правовыми рисками. Данная информация предоставлена
                в ознакомительных целях.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 gradient-hero">
          <div className="container mx-auto px-4 max-w-lg text-center text-white">
            <h2 className="font-display font-bold text-2xl mb-4">Нужна реклама без рисков?</h2>
            <p className="text-white/60 mb-6">Подберём лучшие площадки ВКонтакте, Telegram или TikTok под вашу аудиторию</p>
            <Link to="/contacts" className="inline-flex items-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-orange-dark transition-colors">
              <Icon name="MessageCircle" size={16} /> Получить консультацию
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-5xl mb-4">{social.emoji}</div>
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Соцсеть</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">{content.title}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{content.subtitle}</p>
        </div>
      </section>

      {/* Description + Why */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-2xl text-brand-dark mb-4">О площадке</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{content.description}</p>
              <h3 className="font-display font-semibold text-brand-dark mb-3">Почему {content.title}?</h3>
              <div className="flex flex-col gap-2">
                {content.why.map((w) => (
                  <div key={w} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {w}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-display font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Icon name="ThumbsUp" size={16} /> Плюсы
                </h3>
                <div className="flex flex-col gap-2">
                  {content.pros.map((p) => (
                    <div key={p} className="text-sm text-green-800 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">+</span> {p}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <h3 className="font-display font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <Icon name="ThumbsDown" size={16} /> Ограничения
                </h3>
                <div className="flex flex-col gap-2">
                  {content.cons.map((c) => (
                    <div key={c} className="text-sm text-red-800 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">—</span> {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-light border border-border rounded-xl p-5">
                <h3 className="font-display font-semibold text-brand-dark mb-3">Цели</h3>
                <div className="flex flex-col gap-1">
                  {content.goals.map((g) => (
                    <div key={g} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Icon name="Target" size={12} className="text-brand-orange" /> {g}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-light border border-border rounded-xl p-5">
                <h3 className="font-display font-semibold text-brand-dark mb-3">Ниши</h3>
                <div className="flex flex-wrap gap-1.5">
                  {content.niches.map((n) => (
                    <span key={n} className="text-xs bg-white border border-border px-2 py-1 rounded-md text-muted-foreground">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-12 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Форматы в {content.title}</h2>
          <div className="flex flex-wrap gap-3">
            {content.formats.map((f) => (
              <div key={f} className="bg-white border border-border rounded-xl px-5 py-3 text-sm font-medium text-brand-dark card-hover">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      {relevantPlatforms.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl text-brand-dark">Площадки в {content.title}</h2>
              <Link to="/platforms" className="text-brand-blue text-sm font-medium hover:text-brand-orange transition-colors flex items-center gap-1">
                Все площадки <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {relevantPlatforms.map((p, i) => (
                <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faq.length > 0 && (
        <section className="py-12 bg-brand-light">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">FAQ по {content.title}</h2>
            <div className="flex flex-col gap-3">
              {content.faq.map((item, i) => (
                <details key={i} className="group border border-border bg-white rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none font-medium text-brand-dark hover:text-brand-orange transition-colors">
                    {item.q}
                    <Icon name="ChevronDown" size={16} className="flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContactForm dark title={`Разместиться в ${content.title}`} subtitle="Составим медиаплан и подберём площадки" />
        </div>
      </section>
    </div>
  );
}
