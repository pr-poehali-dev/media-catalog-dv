import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ContactForm from '@/components/ContactForm';
import { FAQ_DATA, WORK_STEPS } from '@/data/data';

const DIRECTIONS = [
  {
    num: '01',
    title: 'Городские сообщества',
    path: '/communities',
    desc: 'Побуждение к действию через новости об открытии бизнеса, акциях и нововведениях перед живой и лояльной аудиторией.',
    stats: 'Запрещеннограм · ВКонтакте · Telegram · Одноклассники · MAX · TikTok',
    emoji: '📢',
  },
  {
    num: '02',
    title: 'Блогеры',
    path: '/bloggers',
    desc: 'Формирование доверия через видео-обзоры, сторитейлы и фото-отзывы от блогеров.',
    stats: 'Запрещеннограм · ВКонтакте · Telegram · TikTok · MAX',
    emoji: '📲',
  },
  {
    num: '03',
    title: 'Наружная реклама',
    path: '/outdoor',
    desc: 'Привлечение внимания, повышение узнаваемости бренда и стимулирование интереса потребителей через рекламу на щитах, медиафасадах, остановках и других видах наружной рекламы.',
    stats: '8 форматов · видимость 24/7',
    emoji: '🏙️',
  },
  {
    num: '04',
    title: 'Брендированная продукция',
    path: '/merch',
    desc: 'Поддержка лояльности через подарки и собственный мерч. Им пользуются регулярно, а значит о бренде помнят и рассказывают о нём в своём окружении.',
    stats: 'Худи и футболки · Экосумки и шоперы · Брелоки и значки · Стикеры и наклейки',
    emoji: '🎁',
  },
];

const STATS = [
  { value: '1к+', label: 'Вариантов подарков' },
  { value: '1,9+ млн', label: 'Подписчиков' },
  { value: '45+', label: 'Интернет-площадок' },
  { value: '4,5+ млн', label: 'Охват в месяц' },
  { value: '2к+', label: 'Рекламных поверхностей' },
];

export default function Home() {
  const faqPreview = FAQ_DATA.filter(f => [
    'Что именно вы делаете?',
    'Сколько стоят наши услуги?',
    'Гарантируете ли вы результат?',
    'С каким бюджетом имеет смысл заходить?',
    'Кто ведёт мой проект?',
    'Предоставляете ли вы отчётность?',
  ].includes(f.question));

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>

      {/* ======== HERO ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark overflow-hidden sm:min-h-screen flex items-start sm:items-center">
        <div className="pattern-content max-w-7xl mx-auto px-6 hero-pad-top pb-10 sm:pb-12 w-full">
          <div className="eyebrow text-[#A21D27] mb-2 sm:mb-3 anim-d1 animate-fade-up">
            Локальный медиабайер и интегратор
          </div>
          <div className="eyebrow hero-cities text-[#FBF8F3]/70 sm:text-[#FBF8F3]/50 mb-3 sm:mb-5 anim-d1 animate-fade-up">
            Хабаровск · Владивосток · Комсомольск-на-Амуре
          </div>
          <h1 className="home-hero-title text-[#FBF8F3] mb-4 sm:mb-5 anim-d2 animate-fade-up">
            Комплексные<br />
            рекламные кампании<br />
            на <span className="text-[#A21D27]">Дальнем Востоке</span>
          </h1>
          <p className="text-[#FBF8F3]/55 leading-relaxed mb-4 max-w-lg anim-d3 animate-fade-up"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}>
            Объединяем наружную рекламу, городские сообщества, блогеров
            и брендированную продукцию в единую систему продвижения.
          </p>
          <p className="text-[#FBF8F3]/45 leading-relaxed mb-6 sm:mb-8 max-w-lg anim-d3 animate-fade-up"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 0.98rem)' }}>
            Подбираем площадки, договариваемся с подрядчиками, готовим медиаплан,
            запускаем кампанию и контролируем каждое размещение.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 anim-d4 animate-fade-up">
            <a href="#cta" className="btn-carmine justify-center w-full sm:w-auto">Получить медиаплан</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center w-full sm:w-auto">
              Написать в Telegram
            </a>
            <a href="https://max.ru/u/f9LHodD0cOLXB3nv5Syhf3yuHh7KUUzhvhTbBbfeUi4f-OZffgk_ZagdxQ4" target="_blank" rel="noopener noreferrer" className="btn-outline justify-center w-full sm:w-auto">
              Написать в MAX
            </a>
          </div>
        </div>
      </section>

      {/* ======== STATS ======== */}
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] pattern-milk reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-10">
          {/* Мобильная сетка */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 mb-6">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-extrabold text-[#A21D27] text-2xl leading-none mb-1.5 whitespace-nowrap">{s.value}</div>
                  <div className="text-[10px] text-[#5a5347] uppercase leading-tight" style={{ letterSpacing: '0.08em' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-[300px] mx-auto">
              {STATS.slice(3).map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-extrabold text-[#A21D27] text-2xl leading-none mb-1.5 whitespace-nowrap">{s.value}</div>
                  <div className="text-[10px] text-[#5a5347] uppercase leading-tight" style={{ letterSpacing: '0.08em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Десктопная строка */}
          <div className="hidden md:flex items-start justify-between gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center flex-1">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl md:text-4xl leading-none mb-1 whitespace-nowrap">{s.value}</div>
                <div className="text-[10px] text-[#5a5347] uppercase whitespace-nowrap" style={{ letterSpacing: '0.16em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ОДИН ПОДРЯДЧИК ======== */}
      <section className="bg-[#FBF8F3] pt-12 pb-14 pattern-milk reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Подход</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-8">Один подрядчик вместо десятка</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <p className="text-[#5a5347] leading-relaxed">
              Вам не нужно отдельно искать блогеров, запрашивать цены у городских сообществ,
              обзванивать операторов наружной рекламы и самостоятельно контролировать каждый выход.
            </p>
            <p className="text-[#5a5347] leading-relaxed">
              Вы рассказываете нам о задаче, аудитории, сроках и бюджете. Мы собираем подходящую
              комбинацию площадок, согласовываем условия, запускаем размещения и предоставляем
              итоговую отчётность.
            </p>
          </div>
        </div>
      </section>

      {/* ======== 4 НАПРАВЛЕНИЯ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark pt-10 pb-12 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Услуги</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">4 направления продвижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#FBF8F3]/10">
            {DIRECTIONS.map((dir) => (
              <Link key={dir.num} to={dir.path}
                className="group bg-[#0A0A0A] hover:bg-[#111111] transition-colors p-8 flex flex-col min-h-[240px]">
                <div className="flex items-start justify-between mb-5">
                  <div className="font-display font-extrabold text-[#A21D27] text-4xl leading-none">{dir.num}</div>
                  <span className="text-3xl">{dir.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-[#FBF8F3] text-2xl mb-3 group-hover:text-[#A21D27] transition-colors leading-tight"
                  style={{ letterSpacing: '-0.02em' }}>
                  {dir.title}
                </h3>
                <p className="text-sm text-[#FBF8F3]/50 leading-relaxed mb-4 flex-1">{dir.desc}</p>
                <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-0" style={{ letterSpacing: '0.14em' }}>{dir.stats}</div>
                <div className="flex items-center gap-2 mt-6 text-[11px] font-medium text-[#FBF8F3]/40 group-hover:text-[#A21D27] transition-colors uppercase"
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
      <section className="bg-[#FBF8F3] pt-10 pb-20 pattern-milk reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Механика</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-8">Не набор размещений, а последовательность касаний</h2>
          <p className="text-[#5a5347] max-w-2xl mb-12 leading-relaxed">
            Инструменты работают по отдельности, но в связке дают накопительный эффект:
            один и тот же человек встречает вас на улице, у блогера, в городских сообществах
            и в повседневных вещах с вашим логотипом.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { icon: '🏙️', step: '→ Внимание', title: 'Наружная реклама', desc: 'Помогает привлечь внимание и повысить узнаваемость: щиты, медиафасады, остановки на ежедневных маршрутах.' },
              { icon: '🎙️', step: '→ Доверие', title: 'Блогеры', desc: 'Формируют доверие через личную рекомендацию: обзоры, сторис и отзывы от знакомых аудитории авторов.' },
              { icon: '📱', step: '→ Действие', title: 'Сообщества', desc: 'Знакомят аудиторию с предложением и подталкивают к действию: новости об открытии, акции, нововведения.' },
              { icon: '🎁', step: '→ Лояльность', title: 'Брендированная продукция', desc: 'Поддерживает лояльность и регулярно напоминает о компании: мерч и подарки, которыми пользуются каждый день.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#FBF8F3] p-7 flex flex-col">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-[10px] text-[#A21D27] uppercase mb-2 font-medium" style={{ letterSpacing: '0.16em' }}>{item.step}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-3" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#5a5347] max-w-2xl mt-8 leading-relaxed text-sm border-l-2 border-[#A21D27] pl-5">
            Мы не добавляем все инструменты в каждую кампанию. Состав медиаплана зависит
            от вашей задачи, аудитории, срока и бюджета.
          </p>
        </div>
      </section>

      {/* ======== КАК РАБОТАЕМ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark pt-10 pb-16 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Процесс</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">Как проходит работа</h2>
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

      {/* ======== FAQ ======== */}
      <section className="bg-[#F2EDE4] pt-6 pb-16 pattern-milk reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">FAQ</div>
              </div>
              <h2 className="section-title text-[#0A0A0A] mb-6">Частые вопросы</h2>
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
                  <div className="pb-4 text-sm text-[#5a5347] leading-relaxed whitespace-pre-line">{item.answer}</div>
                </details>
              ))}
              <div className="border-t border-[#E8E2D8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== КТО МЫ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark pt-6 pb-6 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Кто ведёт проект</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">За каждый проект отвечает один человек</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#FBF8F3]/70 leading-relaxed mb-6">
                Каждую рекламную кампанию лично ведёт основатель агентства <span className="text-[#FBF8F3] font-semibold">Илья Москаленко</span> —
                от первого брифа и подбора площадок до запуска и итоговой отчётности.
              </p>
              <p className="text-[#FBF8F3]/50 leading-relaxed text-sm mb-5">
                Опыт, на котором строится работа агентства:
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  '6 лет в продажах и маркетинге — от первого контакта до сделки',
                  'Практика в рекламе, медиа и производстве брендированной продукции',
                  'Руководит отделом продаж в компании с оборотом свыше 500 млн ₽ в год',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[#FBF8F3]/65 text-sm">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-1" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-l-2 border-[#A21D27] pl-6">
                <p className="text-[#FBF8F3]/70 leading-relaxed text-sm">
                  Для реализации подключаются проверенные владельцы сообществ, блогеры,
                  операторы наружной рекламы, дизайнеры и производители брендированной продукции.
                </p>
              </div>
              <div className="border-l-2 border-[#FBF8F3]/15 pl-6">
                <p className="text-[#FBF8F3]/70 leading-relaxed text-sm">
                  У клиента остаётся одно ответственное лицо вместо отдельных переговоров
                  с десятком подрядчиков.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA ======== */}
      <section id="cta" className="bg-[#0A0A0A] pattern-dark min-h-screen flex items-center reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-[#FBF8F3]">
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#FBF8F3]/50">Начать</div>
              </div>
              <h2 className="section-title text-[#FBF8F3] mb-6">
                Готовы запустить<br /><span className="text-[#A21D27]">рекламную кампанию</span>?
              </h2>
              <p className="text-[#FBF8F3]/50 leading-relaxed mb-6 max-w-md">
                Оставьте заявку — уточним детали и пришлём предварительный медиаплан.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Медиаплан — бесплатно',
                  'Ответ в течение 2 часов',
                  'Отвечаем за подбор, организацию, выходы и отчётность',
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-[#FBF8F3]/55">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <ContactForm dark source="Главная" />
          </div>
        </div>
      </section>
    </div>
  );
}