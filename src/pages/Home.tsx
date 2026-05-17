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
    desc: 'Удержание клиентов через подарки и собственный мерч. Им пользуются регулярно, а значит о бренде помнят и рекламируют его в своём окружении.',
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
  const faqPreview = FAQ_DATA.slice(0, 5);

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
              fontSize: 'clamp(1.75rem, 3.8vw, 4.5rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}>
            Привлечём внимание.<br />
            Сформируем доверие.<br />
            <span style={{ whiteSpace: 'nowrap' }}>Приведём и <span className="text-[#A21D27]">удержим</span></span><br />
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
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] pattern-milk reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-10">
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
          <h2 className="section-title text-[#0A0A0A] mb-8">Как это работает вместе</h2>
          <p className="text-[#5a5347] max-w-2xl mb-12 leading-relaxed">
            Перечисленные выше инструменты хорошо работают по отдельности. Но в связке они дают кратный рост получаемых результатов.
            Один и тот же человек видит вас на улице, у блогера, в сообществах и почти каждый день носит с собой ваш мерч.
            Клиент помнит о вас. И он возвращается к вам снова. И снова.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { icon: '🏙️', step: '→ Заметил', title: 'Наружная реклама', desc: 'Клиент увидел ваш щит или медиафасад по дороге домой.' },
              { icon: '🎙️', step: '→ Заинтересовался', title: 'Блогер', desc: 'Увидел честный обзор с рекомендацией к посещению от знакомого блогера.' },
              { icon: '📱', step: '→ Решился', title: 'Сообщества', desc: 'Увидел пост с акцией или нововведением в городском сообществе и решил прийти / перейти на вашу страницу.' },
              { icon: '🎁', step: '→ Вернулся', title: 'Мерч', desc: 'Совершил покупку и получил подарок с логотипом. Использует его, часто возвращается, потому что регулярно вспоминает вас.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#FBF8F3] p-7 flex flex-col">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="text-[10px] text-[#A21D27] uppercase mb-2 font-medium" style={{ letterSpacing: '0.16em' }}>{item.step}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-3" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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
                  <div className="pb-4 text-sm text-[#5a5347] leading-relaxed">{item.answer}</div>
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
            <div className="eyebrow text-[#FBF8F3]/50">Кстати</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">А кто мы вообще такие?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#FBF8F3]/70 leading-relaxed mb-6">
                Сейчас «мы» — это один я, <span className="text-[#FBF8F3] font-semibold">Илья Москаленко</span>. Коротко о себе:
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  '6 лет в продажах и маркетинге',
                  'Опыт работы в рекламе, медиа и мерче',
                  'Руковожу отделом продаж в компании с оборотом свыше 500 млн ₽ в год',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-[#FBF8F3]/65">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-1" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#FBF8F3]/55 leading-relaxed">
                И да, мне 23. Не привык тратить время на бесполезную суету.<br />
                Приятно познакомиться)
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="border-l-2 border-[#A21D27] pl-6">
                <p className="text-[#FBF8F3]/70 leading-relaxed">
                  За последние годы я понял простую вещь: бизнесам не нужны ещё одни подрядчики. Бизнесам нужен человек, который понимает, как привести клиентов, удержать их и не слить бюджет в пустоту. А, ну и чтобы подешевле это всё было.
                </p>
              </div>
              <div className="border-l-2 border-[#FBF8F3]/15 pl-6">
                <p className="text-[#FBF8F3]/70 leading-relaxed">
                  Именно поэтому я собрал вокруг себя систему из проверенных подрядчиков, медиа, рекламных площадок и производств. И договорился с ними об агентском вознаграждении или скидках — чтобы закрывать задачи бизнеса под ключ и без наценки для бизнеса.
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
                Готовы запустить рекламу<br />и <span className="text-[#A21D27]">удержать</span> пришедших клиентов?
              </h2>
              <p className="text-[#FBF8F3]/50 leading-relaxed mb-6 max-w-md">
                Оставьте заявку — уточним детали и пришлём предварительный медиаплан.
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