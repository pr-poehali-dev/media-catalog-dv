import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, CASES, FAQ_DATA, WORK_STEPS, NICHES, SOCIALS } from '@/data/data';

const STATS = [
  { value: '1,2 млн', label: 'Подписчиков' },
  { value: '3,5 млн', label: 'Охват в месяц' },
  { value: '40+', label: 'Площадок' },
  { value: '3', label: 'Города' },
  { value: '6', label: 'Соцсетей' },
  { value: '100+', label: 'Кампаний' },
];

const TASKS = [
  { title: 'Рассказать о себе', desc: 'Новый бизнес, открытие, ребрендинг — о вас узнает весь город' },
  { title: 'Продать товар или услугу', desc: 'Акции, спецпредложения, сезонные предложения' },
  { title: 'Продвинуть событие', desc: 'Концерт, выставка, мастер-класс — заполним зал' },
  { title: 'Нанять сотрудников', desc: 'Точное попадание в аудиторию соискателей' },
  { title: 'Продать недвижимость', desc: 'Новостройки, аренда, коммерческая недвижимость' },
  { title: 'Набрать учеников', desc: 'Курсы, школы, репетиторство — привлечём студентов' },
];

export default function Home() {
  const previewPlatforms = PLATFORMS.slice(0, 4);
  const previewCases = CASES.slice(0, 3);
  const faqPreview = FAQ_DATA.slice(0, 5);

  return (
    <div className="pt-16">

      {/* ======== HERO ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark overflow-hidden">
        <div className="pattern-content max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="animate-fade-up">
            <div className="eyebrow text-[#FBF8F3]/50 mb-8 anim-d1 animate-fade-up">
              Хабаровск · Владивосток · Комсомольск-на-Амуре
            </div>
            <h1 className="hero-title text-[#FBF8F3] mb-6 anim-d2 animate-fade-up" style={{ maxWidth: '900px' }}>
              Реклама<br />
              в городских<br />
              <span className="text-[#A21D27]">сообществах</span><br />
              Дальнего Востока
            </h1>
            <p className="text-[#FBF8F3]/55 text-lg leading-relaxed mb-10 max-w-xl anim-d3 animate-fade-up">
              Размещаем рекламу во ВКонтакте, Telegram, Одноклассниках,
              MAX и TikTok. Подбираем площадки, составляем медиаплан,
              берём организацию на себя.
            </p>
            <div className="flex flex-wrap gap-3 anim-d4 animate-fade-up">
              <Link to="/contacts" className="btn-carmine">
                Получить медиаплан
              </Link>
              <Link to="/platforms" className="btn-outline">
                Каталог площадок
              </Link>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======== STATS ======== */}
      <section className="bg-[#FBF8F3] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
            {STATS.map((s, i) => (
              <div key={s.label} className={`text-center anim-d${i + 1} animate-fade-up`}>
                <div className="font-display font-extrabold text-[#A21D27] text-3xl md:text-4xl leading-none mb-1">{s.value}</div>
                <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ЗАДАЧИ ======== */}
      <section className="bg-[#F2EDE4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Задачи</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-12" style={{ maxWidth: '640px' }}>
            Что вы хотите достичь?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E2D8]">
            {TASKS.map((task) => (
              <div key={task.title} className="bg-[#F2EDE4] p-7 hover:bg-[#FBF8F3] transition-colors">
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-3 leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  {task.title}
                </h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{task.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== СОЦСЕТИ ======== */}
      <section className="bg-[#FBF8F3] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Площадки</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-12">
            6 соцсетей — один контакт
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#E8E2D8]">
            {(['vk', 'telegram', 'ok', 'max', 'tiktok'] as const).map((key) => {
              const s = SOCIALS[key];
              const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', max: '/socials/max', tiktok: '/socials/tiktok' };
              return (
                <Link key={key} to={paths[key]}
                  className="group bg-[#FBF8F3] p-8 flex flex-col items-center text-center hover:bg-[#F2EDE4] transition-colors">
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <div className="font-display font-bold text-[#0A0A0A] text-sm group-hover:text-[#A21D27] transition-colors mb-2"
                    style={{ letterSpacing: '-0.01em' }}>{s.label}</div>
                  <Icon name="ArrowUpRight" size={14} className="text-[#E8E2D8] group-hover:text-[#A21D27] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== ГОРОДА ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-20">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Города</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">Три города присутствия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#FBF8F3]/10">
            {[
              { name: 'Хабаровск', path: '/cities/khabarovsk', pop: '620 000+', desc: 'Столица Дальнего Востока. Административный и деловой центр региона.' },
              { name: 'Владивосток', path: '/cities/vladivostok', pop: '600 000+', desc: 'Морские ворота России. Молодёжь, туризм, HoReCa, азиатское влияние.' },
              { name: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk', pop: '240 000+', desc: 'Компактный охват. Лояльная промышленная аудитория.' },
            ].map((city) => (
              <Link key={city.name} to={city.path}
                className="group bg-[#0A0A0A] p-8 hover:bg-[#1a1a1a] transition-colors flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="font-display font-bold text-[#FBF8F3] text-2xl mb-2 group-hover:text-[#A21D27] transition-colors"
                    style={{ letterSpacing: '-0.02em' }}>{city.name}</div>
                  <div className="text-[#A21D27] font-display font-bold text-2xl mb-4">{city.pop}</div>
                  <p className="text-sm text-[#FBF8F3]/45 leading-relaxed">{city.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-[#FBF8F3]/30 group-hover:text-[#A21D27] transition-colors mt-6 text-xs uppercase"
                  style={{ letterSpacing: '0.14em' }}>
                  Площадки города
                  <Icon name="ArrowRight" size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== КАТАЛОГ ПРЕВЬЮ ======== */}
      <section className="bg-[#FBF8F3] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">Каталог</div>
              </div>
              <h2 className="section-title text-[#0A0A0A]">Популярные площадки</h2>
            </div>
            <Link to="/platforms" className="hidden md:flex items-center gap-2 text-sm text-[#0A0A0A] hover:text-[#A21D27] transition-colors mt-4"
              style={{ letterSpacing: '0.06em' }}>
              Все площадки
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-px bg-[#E8E2D8]">
            {previewPlatforms.map((p, i) => (
              <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/platforms" className="btn-outline-dark">
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* ======== КАК РАБОТАЕМ ======== */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-20">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Процесс</div>
          </div>
          <h2 className="section-title text-[#FBF8F3] mb-12">Как проходит работа</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#FBF8F3]/10">
            {WORK_STEPS.map((step) => (
              <div key={step.step} className="bg-[#0A0A0A] p-8">
                <div className="font-display font-extrabold text-[#A21D27] text-4xl leading-none mb-4">
                  {String(step.step).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-[#FBF8F3] text-lg mb-3" style={{ letterSpacing: '-0.01em' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-[#FBF8F3]/45 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== ДЛЯ КОГО ======== */}
      <section className="bg-[#F2EDE4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Аудитория</div>
          </div>
          <h2 className="section-title text-[#0A0A0A] mb-12">Для любого бизнеса</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {NICHES.map((niche) => (
              <div key={niche.id} className="bg-[#FBF8F3] border border-[#E8E2D8] p-5 hover:border-[#A21D27] transition-colors">
                <div className="text-2xl mb-2">{niche.emoji}</div>
                <div className="font-medium text-[#0A0A0A] text-sm">{niche.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== КЕЙСЫ ======== */}
      <section className="bg-[#FBF8F3] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between mb-12">
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
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="tag">{c.city}</span>
                  <span className="tag">{c.niche}</span>
                  <span className="tag tag-carmine">{SOCIALS[c.social].label}</span>
                </div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-xl mb-3 leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  {c.title}
                </h3>
                <p className="text-sm text-[#5a5347] leading-relaxed mb-4 flex-1">{c.task}</p>
                <div className="border-t border-[#E8E2D8] pt-4">
                  <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Результат</div>
                  <p className="text-sm text-[#0A0A0A] mb-3 leading-relaxed">{c.result}</p>
                  <div>
                    <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>Охват</div>
                    <div className="font-display font-bold text-[#A21D27] text-2xl">{c.reach.toLocaleString('ru')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="bg-[#F2EDE4] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">FAQ</div>
              </div>
              <h2 className="section-title text-[#0A0A0A] mb-4">Частые вопросы</h2>
              <p className="text-[#5a5347] leading-relaxed text-sm mb-8 max-w-sm">
                Отвечаем конкретно. Без воды и корпоративных формулировок.
              </p>
              <Link to="/faq" className="btn-outline-dark">
                Все вопросы
              </Link>
            </div>
            <div className="flex flex-col gap-0">
              {faqPreview.map((item, i) => (
                <details key={i} className="group border-t border-[#E8E2D8]">
                  <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors text-sm leading-snug">
                    {item.question}
                    <Icon name="Plus" size={16} className="flex-shrink-0 mt-0.5 text-[#5a5347] group-open:hidden" />
                    <Icon name="Minus" size={16} className="flex-shrink-0 mt-0.5 text-[#A21D27] hidden group-open:block" />
                  </summary>
                  <div className="pb-5 text-sm text-[#5a5347] leading-relaxed border-none">
                    {item.answer}
                  </div>
                </details>
              ))}
              <div className="border-t border-[#E8E2D8]" />
            </div>
          </div>
        </div>
      </section>

      {/* ======== CTA ФОРМА ======== */}
      <section className="bg-[#0A0A0A] pattern-dark py-20">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-[#FBF8F3]">
              <div className="flex items-center gap-4 mb-3">
                <div className="section-rule" />
                <div className="eyebrow text-[#FBF8F3]/50">Начать работу</div>
              </div>
              <h2 className="section-title text-[#FBF8F3] mb-6">
                Готовы запустить рекламу<br />на Дальнем Востоке?
              </h2>
              <p className="text-[#FBF8F3]/50 leading-relaxed mb-8 max-w-md">
                Оставьте заявку — в течение 2 часов пришлём подборку
                площадок и предварительный медиаплан. Без обязательств.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Медиаплан с подборкой площадок — бесплатно',
                  'Ответ в течение 2 часов в рабочее время',
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
