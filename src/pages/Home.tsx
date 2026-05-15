import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ContactForm from '@/components/ContactForm';
import { CASES, FAQ_DATA, WORK_STEPS, SOCIALS } from '@/data/data';

const DIRECTIONS = [
  {
    num: '01',
    title: 'Городские сообщества',
    path: '/communities',
    desc: 'Новости об открытии, акциях, нововведениях перед живой и лояльной аудиторией.',
    stats: 'Запрещеннограм · ВКонтакте · Telegram · Одноклассники · MAX · TikTok',
    emoji: '📢',
  },
  {
    num: '02',
    title: 'Блогеры',
    path: '/bloggers',
    desc: 'Видео-обзоры и сторитейлы с личной рекомендацией блогера — самый доверенный формат.',
    stats: 'Запрещеннограм · ВКонтакте · Telegram · TikTok · MAX',
    emoji: '📲',
  },
  {
    num: '03',
    title: 'Наружная реклама',
    path: '/outdoor',
    desc: 'Внимание большого количества людей, повышение узнаваемости бренда и стимулирование интереса потребителей.',
    stats: '8 форматов · видимость 24/7',
    emoji: '🏙️',
  },
  {
    num: '04',
    title: 'Брендированная продукция',
    path: '/merch',
    desc: 'Мерч — единственная реклама, за которую говорят спасибо. Мерчом пользуются регулярно, значит о бренде всегда помнят и рекламируют его в своём окружении.',
    stats: 'Худи и футболки · Экосумки и шоперы · Брелоки и значки · Стикеры и наклейки',
    emoji: '🎁',
  },
];

const STATS = [
  { value: '1,2 млн', label: 'Подписчиков' },
  { value: '3,5 млн', label: 'Охват в месяц' },
  { value: '40+', label: 'Площадок' },
  { value: '3', label: 'Города' },
  { value: '4', label: 'Направления' },
  { value: '100+', label: 'Кампаний' },
];

export default function Home() {
  const previewCases = CASES.slice(0, 3);
  const faqPreview = FAQ_DATA.slice(0, 5);

  return (
    <div className="pt-16">

      {/* ======== HERO ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="eyebrow text-[#FBF8F3]/50 mb-5 anim-d1 animate-fade-up">
            Хабаровск · Владивосток · Комсомольск-на-Амуре
          </div>
          <h1 className="text-[#FBF8F3] mb-5 anim-d2 animate-fade-up"
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 0.97,
              letterSpacing: '-0.03em',
              maxWidth: '820px',
            }}>
            Заинтересуем.<br />
            Вызовем доверие.<br />
            Приведём и <span className="text-[#A21D27]">удержим</span><br />
            клиентов.
          </h1>
          <p className="text-[#FBF8F3]/55 leading-relaxed mb-8 max-w-lg anim-d3 animate-fade-up"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
            Наружная реклама, обзоры у блогеров, городские сообщества
            и брендированная продукция — полный цикл работы с клиентами
            на Дальнем Востоке.
          </p>
          <div className="flex flex-wrap gap-3 anim-d4 animate-fade-up">
            <a href="#cta" className="btn-carmine">Получить медиаплан</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Написать в Telegram
            </a>
            <a href="https://max.ru/u/f9LHodD0cOLXB3nv5Syhf3yuHh7KUUzhvhTbBbfeUi4f-OZffgk_ZagdxQ4" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Написать в MAX
            </a>
          </div>
        </div>
      </section>

      {/* ======== STATS ======== */}
      <section className="bg-[#FBF8F3] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl md:text-4xl leading-none mb-1">{s.value}</div>
                <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 4 НАПРАВЛЕНИЯ ======== */}
      <section className="bg-[#F2EDE4] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Услуги</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-6">4 направления продвижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E2D8]">
            {DIRECTIONS.map((dir) => (
              <Link key={dir.num} to={dir.path}
                className="group bg-[#F2EDE4] hover:bg-[#FBF8F3] transition-colors p-8 flex flex-col justify-between min-h-[240px]">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className="font-display font-extrabold text-[#A21D27] text-4xl leading-none">{dir.num}</div>
                    <span className="text-3xl">{dir.emoji}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-3 group-hover:text-[#A21D27] transition-colors leading-tight"
                    style={{ letterSpacing: '-0.02em' }}>
                    {dir.title}
                  </h3>
                  <p className="text-sm text-[#5a5347] leading-relaxed mb-4">{dir.desc}</p>
                  <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.14em' }}>{dir.stats}</div>
                </div>
                <div className="flex items-center gap-2 mt-6 text-[11px] font-medium text-[#5a5347] group-hover:text-[#A21D27] transition-colors uppercase"
                  style={{ letterSpacing: '0.12em' }}>
                  Подробнее
                  <Icon name="ArrowRight" size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== КАК ЭТО РАБОТАЕТ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-20">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Механика</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-4">Как это работает вместе</h2>
          <p className="text-[#FBF8F3]/50 max-w-2xl mb-12 leading-relaxed">
            Каждый инструмент работает отдельно. Но в связке они дают синергию:
            один и тот же человек видит вас на улице, у блогера, в сообществе
            и каждый день берёт в руки ваш мерч.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#FBF8F3]/10">
            {[
              { icon: '🏙️', step: '→ Заметил', title: 'Наружная реклама', desc: 'Клиент увидел ваш щит или медиафасад по дороге домой.' },
              { icon: '🎙️', step: '→ Заинтересовался', title: 'Блогер', desc: 'Знакомый блогер сделал честный обзор — это не реклама, это рекомендация.' },
              { icon: '📱', step: '→ Вспомнил', title: 'Сообщества', desc: 'Пост в городском сообществе напомнил об акции. Перешёл.' },
              { icon: '🎁', step: '→ Вернулся', title: 'Мерч', desc: 'Купил — получил подарок с логотипом. Возвращается и рекомендует.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#0A0A0A] p-7">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-[10px] text-[#A21D27] uppercase mb-2 font-medium" style={{ letterSpacing: '0.16em' }}>{item.step}</div>
                <h3 className="font-display font-bold text-[#FBF8F3] text-lg mb-3" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm text-[#FBF8F3]/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== СОЦСЕТИ — быстрый доступ ======== */}
      <section className="bg-[#FBF8F3] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="section-rule" />
              <div className="eyebrow text-[#5a5347]">Соцсети</div>
            </div>
            <Link to="/communities" className="text-xs text-[#0A0A0A] hover:text-[#A21D27] transition-colors flex items-center gap-1" style={{ letterSpacing: '0.1em' }}>
              Все площадки <Icon name="ArrowRight" size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#E8E2D8]">
            {(['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const).map((key) => {
              const s = SOCIALS[key];
              const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', max: '/socials/max', tiktok: '/socials/tiktok', instagram: '/socials/instagram' };
              return (
                <Link key={key} to={paths[key]}
                  className="group bg-[#FBF8F3] p-6 flex flex-col items-center text-center hover:bg-[#F2EDE4] transition-colors">
                  <div className="text-2xl mb-2">{s.emoji}</div>
                  <div className="font-display font-bold text-[#0A0A0A] text-xs group-hover:text-[#A21D27] transition-colors"
                    style={{ letterSpacing: '-0.01em' }}>{s.label}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== ГОРОДА ======== */}
      <section className="bg-[#F2EDE4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Города</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D8]">
            {[
              { name: 'Хабаровск', path: '/cities/khabarovsk', pop: '620 000+', desc: 'Столица Дальнего Востока. Административный и деловой центр региона.' },
              { name: 'Владивосток', path: '/cities/vladivostok', pop: '600 000+', desc: 'Морские ворота России. Молодёжь, туризм, HoReCa.' },
              { name: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk', pop: '240 000+', desc: 'Компактный охват. Лояльная промышленная аудитория.' },
            ].map((city) => (
              <Link key={city.name} to={city.path}
                className="group bg-[#F2EDE4] p-8 hover:bg-[#FBF8F3] transition-colors flex flex-col justify-between min-h-[180px]">
                <div>
                  <div className="font-display font-bold text-[#0A0A0A] text-xl mb-1 group-hover:text-[#A21D27] transition-colors"
                    style={{ letterSpacing: '-0.02em' }}>{city.name}</div>
                  <div className="text-[#A21D27] font-display font-bold text-2xl mb-3">{city.pop}</div>
                  <p className="text-sm text-[#5a5347] leading-relaxed">{city.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#5a5347] group-hover:text-[#A21D27] transition-colors mt-5 uppercase"
                  style={{ letterSpacing: '0.12em' }}>
                  Площадки <Icon name="ArrowRight" size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== КАК РАБОТАЕМ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Процесс</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-10">Как проходит работа</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#FBF8F3]/10">
            {WORK_STEPS.map((step) => (
              <div key={step.step} className="bg-[#0A0A0A] p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-4xl leading-none mb-4">
                  {String(step.step).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-[#FBF8F3] text-lg mb-2" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p className="text-sm text-[#FBF8F3]/45 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== КЕЙСЫ ======== */}
      <section className="bg-[#FBF8F3] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">Опыт</div>
              </div>
              <h2 className="section-title text-[#0A0A0A]">Реальные результаты</h2>
            </div>
            <Link to="/cases" className="hidden md:flex items-center gap-2 text-sm text-[#0A0A0A] hover:text-[#A21D27] transition-colors mt-4">
              Все кейсы <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D8]">
            {previewCases.map((c) => (
              <div key={c.id} className="bg-[#FBF8F3] p-7 flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="tag">{c.city}</span>
                  <span className="tag">{c.niche}</span>
                  <span className="tag tag-carmine">{SOCIALS[c.social].label}</span>
                </div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-3 leading-tight flex-1" style={{ letterSpacing: '-0.01em' }}>
                  {c.title}
                </h3>
                <div className="border-t border-[#E8E2D8] pt-4">
                  <p className="text-sm text-[#5a5347] mb-3 leading-relaxed">{c.result}</p>
                  <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.14em' }}>Охват</div>
                  <div className="font-display font-bold text-[#A21D27] text-2xl">{c.reach.toLocaleString('ru')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="bg-[#F2EDE4] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">FAQ</div>
              </div>
              <h2 className="section-title text-[#0A0A0A] mb-4">Частые вопросы</h2>
              <p className="text-[#5a5347] leading-relaxed text-sm mb-6 max-w-sm">
                Без воды и корпоративных формулировок.
              </p>
              <Link to="/faq" className="btn-outline-dark">Все вопросы</Link>
            </div>
            <div className="flex flex-col">
              {faqPreview.map((item, i) => (
                <details key={i} className="group border-t border-[#E8E2D8]">
                  <summary className="flex items-start justify-between gap-4 py-4 cursor-pointer list-none font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors text-sm leading-snug">
                    {item.question}
                    <Icon name="Plus" size={15} className="flex-shrink-0 text-[#5a5347] group-open:hidden mt-0.5" />
                    <Icon name="Minus" size={15} className="flex-shrink-0 text-[#A21D27] hidden group-open:block mt-0.5" />
                  </summary>
                  <div className="pb-4 text-sm text-[#5a5347] leading-relaxed">{item.answer}</div>
                </details>
              ))}
              <div className="border-t border-[#E8E2D8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section id="cta" className="bg-[#0A0A0A] pattern-dark min-h-screen flex items-center">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-[#FBF8F3]">
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#FBF8F3]/50">Начать</div>
              </div>
              <h2 className="section-title text-[#FBF8F3] mb-6">
                Готовы запустить рекламу<br />на Дальнем Востоке?
              </h2>
              <p className="text-[#FBF8F3]/50 leading-relaxed mb-6 max-w-md">
                Оставьте заявку — пришлём подборку площадок и предварительный
                медиаплан. Бесплатно. Без обязательств.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Медиаплан — бесплатно',
                  'Ответ в течение 2 часов',
                  'Работаем с бюджетами от 3 000 рублей',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-[#FBF8F3]/55">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <ContactForm dark />
          </div>
        </div>
      </section>
    </div>
  );
}