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
    key: 'vk', title: 'ВКонтакте', subtitle: 'Локальный охват, городские сообщества, вовлечённость',
    description: 'ВКонтакте — главная соцсеть Дальнего Востока для локального бизнеса. Здесь сосредоточены крупнейшие городские сообщества с аудиторией от 30 до 100+ тысяч подписчиков.',
    why: ['Самая популярная соцсеть в городах ДВ', 'Городские сообщества с лояльной аудиторией', 'Разнообразие форматов: посты, сторис, клипы', 'Подробная статистика охватов'],
    pros: ['Широкий охват по городу', 'Доверие к местным сообществам', 'Работает для любой ниши'],
    cons: ['Алгоритмический охват снижается', 'Нужен качественный визуал'],
    goals: ['Информирование горожан', 'Акции и распродажи', 'Набор персонала', 'Анонсы событий'],
    niches: ['Кафе и рестораны', 'Ритейл', 'Недвижимость', 'Медицина', 'Образование', 'Мероприятия'],
    formats: ['Пост', 'Пост + Сторис', 'Нативная публикация', 'Подборка', 'Спецпроект'],
    faq: [{ q: 'Сколько стоит пост во ВКонтакте?', a: 'От 1 200 до 5 000 рублей в зависимости от размера сообщества и города.' }, { q: 'Как долго работает пост?', a: 'Активный охват — первые 24–48 часов. Пост остаётся в ленте навсегда.' }],
  },
  telegram: {
    key: 'telegram', title: 'Telegram', subtitle: 'Скорость, доверие, срочные анонсы',
    description: 'Telegram — самый быстрорастущий канал для новостей, анонсов и акций. Аудитория читает каналы внимательно. Высокий уровень доверия.',
    why: ['Самый высокий CTR среди соцсетей', 'Мгновенный охват без алгоритмов', 'Платёжеспособная аудитория', 'Без баннерного шума'],
    pros: ['Высокое доверие к контенту', 'Срочные акции работают мгновенно', 'Лучший канал для B2B'],
    cons: ['Аудитория меньше, чем ВКонтакте', 'Нет лайков и комментариев по умолчанию'],
    goals: ['Срочные акции', 'Новости и анонсы', 'B2B продвижение', 'Нативная реклама'],
    niches: ['Бизнес', 'Недвижимость', 'Образование', 'Медицина', 'HoReCa'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [{ q: 'Сколько стоит размещение в Telegram?', a: 'От 2 000 до 6 000 рублей в зависимости от канала и аудитории.' }],
  },
  ok: {
    key: 'ok', title: 'Одноклассники', subtitle: 'Взрослая аудитория, семья, локальные услуги',
    description: 'Одноклассники — недооценённая платформа с лояльной взрослой аудиторией 35–60 лет. Идеально для семейных товаров, здоровья, услуг для дома.',
    why: ['Аудитория 35–60 лет', 'Низкая конкуренция среди рекламодателей', 'Высокое доверие к контенту', 'Доступные цены'],
    pros: ['Дешевле ВКонтакте и Telegram', 'Лояльная аудитория', 'Хорошо для услуг 35+'],
    cons: ['Молодёжная аудитория почти отсутствует', 'Меньше форматов'],
    goals: ['Товары для дома', 'Здоровье и медицина', 'Семейные услуги'],
    niches: ['Медицина', 'Строительство', 'Ритейл', 'Гос. услуги'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [{ q: 'Для кого подходит ОК?', a: 'Для бизнесов с аудиторией 35+: медицина, услуги, ритейл, недвижимость.' }],
  },
  max: {
    key: 'max', title: 'MAX', subtitle: 'Растущая платформа, низкая конкуренция',
    description: 'MAX — молодая платформа от Mail.ru Group. Хорошая возможность занять нишу первыми. Невысокая стоимость при растущей аудитории.',
    why: ['Растущая аудитория', 'Интеграция с экосистемой Mail.ru', 'Подходит для городских новостей', 'Выгодные стартовые цены'],
    pros: ['Низкая стоимость', 'Минимальная конкуренция', 'Растущий органический охват'],
    cons: ['Аудитория пока меньше ВКонтакте', 'Платформа развивается'],
    goals: ['Тестирование новых каналов', 'Городские новости', 'Ранний выход на аудиторию'],
    niches: ['Новости', 'Гос. проекты', 'Любой бизнес для тестирования'],
    formats: ['Пост', 'Нативная публикация'],
    faq: [{ q: 'Стоит ли размещаться в MAX сейчас?', a: 'Да — низкие цены и возможность занять нишу до роста конкуренции.' }],
  },
  tiktok: {
    key: 'tiktok', title: 'TikTok', subtitle: 'Видео, блогеры, молодёжь, вирусный охват',
    description: 'TikTok — лучший инструмент для вирусного охвата молодой аудитории. Видео могут набирать сотни тысяч просмотров. Идеально для заведений, событий, визуальных продуктов.',
    why: ['Вирусный охват без ограничений', 'Молодёжь 18–35 лет', 'Нативные интеграции', 'Высокий CTR для заведений'],
    pros: ['Огромный органический охват', 'Высокое вовлечение', 'Доступные блогеры'],
    cons: ['Аудитория преимущественно молодёжная', 'Нужен видеоматериал'],
    goals: ['Продвижение заведений', 'События', 'Брендинг'],
    niches: ['HoReCa', 'Красота', 'Мода', 'Развлечения'],
    formats: ['Видео', 'Обзор у блогера'],
    faq: [{ q: 'Нужно ли снимать видео самому?', a: 'Нет, блогер снимает сам. Вы предоставляете продукт и бриф.' }],
  },
  instagram: { key: 'instagram', title: 'Instagram*', subtitle: '', description: '', why: [], pros: [], cons: [], goals: [], niches: [], formats: [], faq: [] },
};

function PageHero({ title, eyebrow, sub }: { title: string; eyebrow: string; sub?: string }) {
  return (
    <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
      <div className="pattern-content max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="section-rule" />
          <div className="eyebrow text-[#FBF8F3]/50">{eyebrow}</div>
        </div>
        <h1 className="section-title text-[#FBF8F3] mb-3">{title}</h1>
        {sub && <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">{sub}</p>}
      </div>
    </section>
  );
}

export default function SocialPage() {
  const { socialId } = useParams<{ socialId: string }>();
  const content = SOCIAL_CONTENT[socialId || ''];

  if (!content) return (
    <div className="pt-28 text-center py-24">
      <h2 className="font-display font-bold text-2xl text-[#0A0A0A] mb-2">Страница не найдена</h2>
      <Link to="/platforms" className="text-sm text-[#A21D27]">Вернуться в каталог</Link>
    </div>
  );

  const social = SOCIALS[content.key];
  const relevantPlatforms = PLATFORMS.filter((p) => p.social === content.key).slice(0, 4);

  if (socialId === 'instagram') {
    return (
      <div className="pt-16">
        <PageHero title="Instagram*" eyebrow="Ограничения" sub="Аудитория, правовые ограничения и возможные PR-форматы" />
        <section className="bg-[#FBF8F3] py-16">
          <div className="max-w-7xl mx-auto px-6 max-w-3xl">
            <div className="bg-[#F2EDE4] border-l-4 border-[#A21D27] p-6 mb-8">
              <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">
                *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-6 mb-10">
              <h3 className="font-display font-bold text-[#0A0A0A] mb-2">Важное уведомление</h3>
              <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">
                Стандартное рекламное размещение в Instagram* для продвижения товаров и услуг на территории РФ нами не предлагается.
                Использование Instagram* в коммерческих целях сопряжено с правовыми рисками согласно законодательству РФ.
              </p>
            </div>
            <h2 className="font-display font-bold text-2xl text-[#0A0A0A] mb-6" style={{ letterSpacing: '-0.02em' }}>Альтернативы Instagram* на Дальнем Востоке</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E8E2D8] mb-10">
              {(['vk', 'telegram', 'max', 'tiktok'] as const).map((key) => {
                const s = SOCIALS[key];
                const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', max: '/socials/max', tiktok: '/socials/tiktok' };
                return (
                  <Link key={key} to={paths[key]} className="bg-[#FBF8F3] p-6 text-center hover:bg-[#F2EDE4] transition-colors group">
                    <div className="text-3xl mb-2">{s.emoji}</div>
                    <div className="font-display font-bold text-sm text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors">{s.label}</div>
                  </Link>
                );
              })}
            </div>
            <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-6">
              <h3 className="font-display font-semibold text-[#0A0A0A] mb-3">Правовая информация</h3>
              <p className="text-sm text-[#5a5347] leading-relaxed">
                Meta Platforms Inc. признана экстремистской организацией. Использование Instagram* в коммерческих целях на территории РФ сопряжено с правовыми рисками. Данная информация предоставлена в ознакомительных целях.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#0A0A0A] pattern-dark py-14">
          <div className="pattern-content max-w-7xl mx-auto px-6 text-center text-[#FBF8F3]">
            <h2 className="font-display font-bold text-2xl mb-4" style={{ letterSpacing: '-0.02em' }}>Реклама без правовых рисков</h2>
            <p className="text-[#FBF8F3]/50 mb-6">Подберём площадки во ВКонтакте, Telegram или TikTok</p>
            <Link to="/contacts" className="btn-carmine">Получить консультацию</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PageHero title={content.title} eyebrow="Соцсеть" sub={content.subtitle} />

      {/* Description */}
      <section className="bg-[#FBF8F3] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">О площадке</div>
              </div>
              <p className="text-[#0A0A0A]/70 leading-relaxed mb-8">{content.description}</p>
              <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-4" style={{ letterSpacing: '-0.01em' }}>Почему {content.title}?</h3>
              <div className="flex flex-col gap-3">
                {content.why.map((w) => (
                  <div key={w} className="flex items-start gap-3 text-sm text-[#0A0A0A]/70">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-0.5" />
                    {w}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-6">
                <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Преимущества</div>
                {content.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm text-[#0A0A0A]/70 mb-2">
                    <Icon name="Plus" size={12} className="text-[#A21D27] flex-shrink-0 mt-0.5" /> {p}
                  </div>
                ))}
              </div>
              <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-6">
                <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Ограничения</div>
                {content.cons.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm text-[#0A0A0A]/70 mb-2">
                    <Icon name="Minus" size={12} className="text-[#5a5347] flex-shrink-0 mt-0.5" /> {c}
                  </div>
                ))}
              </div>
              <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-6">
                <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Цели</div>
                {content.goals.map((g) => <div key={g} className="text-sm text-[#0A0A0A]/70 mb-1.5">{g}</div>)}
              </div>
              <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-6">
                <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Ниши</div>
                <div className="flex flex-wrap gap-1.5">
                  {content.niches.map((n) => <span key={n} className="tag">{n}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-[#F2EDE4] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Форматы в {content.title}</div>
          <div className="flex flex-wrap gap-2">
            {content.formats.map((f) => (
              <span key={f} className="bg-[#FBF8F3] border border-[#E8E2D8] px-4 py-2 text-sm text-[#0A0A0A] font-medium">{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      {relevantPlatforms.length > 0 && (
        <section className="bg-[#FBF8F3] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.01em' }}>Площадки в {content.title}</h2>
              <Link to="/platforms" className="text-xs text-[#0A0A0A] hover:text-[#A21D27] transition-colors flex items-center gap-1" style={{ letterSpacing: '0.1em' }}>
                Все площадки <Icon name="ArrowRight" size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-px bg-[#E8E2D8]">
              {relevantPlatforms.map((p, i) => <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />)}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {content.faq.length > 0 && (
        <section className="bg-[#F2EDE4] py-12">
          <div className="max-w-7xl mx-auto px-6 max-w-2xl">
            <div className="text-[10px] text-[#5a5347] uppercase mb-6" style={{ letterSpacing: '0.18em' }}>FAQ по {content.title}</div>
            {content.faq.map((item, i) => (
              <details key={i} className="group border-t border-[#E8E2D8]">
                <summary className="flex items-start justify-between gap-4 py-4 cursor-pointer list-none text-sm font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors">
                  {item.q}
                  <Icon name="Plus" size={14} className="flex-shrink-0 text-[#5a5347] group-open:hidden mt-0.5" />
                  <Icon name="Minus" size={14} className="flex-shrink-0 text-[#A21D27] hidden group-open:block mt-0.5" />
                </summary>
                <div className="pb-4 text-sm text-[#5a5347] leading-relaxed">{item.a}</div>
              </details>
            ))}
            <div className="border-t border-[#E8E2D8]" />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0A0A0A] pattern-dark py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title={`Разместиться в ${content.title}`} subtitle="Составим медиаплан и подберём площадки" />
        </div>
      </section>
    </div>
  );
}
