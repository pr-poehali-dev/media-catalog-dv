import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, CASES, FAQ_DATA, WORK_STEPS, NICHES, SOCIALS } from '@/data/data';

const STATS = [
  { value: '1.2 млн+', label: 'Подписчиков суммарно', emoji: '👥' },
  { value: '3.5 млн+', label: 'Охват в месяц', emoji: '📡' },
  { value: '40+', label: 'Площадок в каталоге', emoji: '📋' },
  { value: '3', label: 'Города', emoji: '🏙️' },
  { value: '6', label: 'Соцсетей', emoji: '📱' },
  { value: '100+', label: 'Кампаний проведено', emoji: '🚀' },
];

const TASKS = [
  { emoji: '📣', title: 'Рассказать о себе', desc: 'Новый бизнес, открытие, ребрендинг — о вас узнает весь город' },
  { emoji: '🛍️', title: 'Продать товар или услугу', desc: 'Акции, спецпредложения, сезонные распродажи' },
  { emoji: '🎪', title: 'Продвинуть событие', desc: 'Концерт, выставка, мастер-класс — заполним зал' },
  { emoji: '💼', title: 'Нанять сотрудников', desc: 'Точное попадание в целевую аудиторию соискателей' },
  { emoji: '🏠', title: 'Продать недвижимость', desc: 'Новостройки, аренда, коммерческая недвижимость' },
  { emoji: '🎓', title: 'Набрать учеников', desc: 'Курсы, школы, репетиторство — привлечём студентов' },
];

export default function Home() {
  const previewPlatforms = PLATFORMS.slice(0, 4);
  const previewCases = CASES.slice(0, 3);
  const faqPreview = FAQ_DATA.slice(0, 5);

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              Дальний Восток · Хабаровск · Владивосток · Комсомольск-на-Амуре
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Реклама в городских<br />
              <span className="text-brand-orange">сообществах</span> и у<br />
              блогеров Дальнего Востока
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
              Размещаем рекламу во ВКонтакте, Telegram, Одноклассниках, MAX и TikTok.
              Подбираем площадки под задачи бизнеса, составляем медиаплан и берём на себя организацию.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contacts"
                className="flex items-center gap-2 bg-brand-orange text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-orange-dark transition-colors shadow-lg"
              >
                <Icon name="FileText" size={16} />
                Получить подборку площадок
              </Link>
              <Link
                to="/platforms"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Icon name="Grid3X3" size={16} />
                Смотреть каталог
              </Link>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-5 py-3.5 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Icon name="Send" size={16} />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-display font-bold text-2xl text-brand-blue">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TASKS */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Задачи</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-3">Что вы хотите достичь?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Подберём площадки и форматы под любую бизнес-задачу</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASKS.map((task) => (
              <div key={task.title} className="bg-white rounded-xl p-5 border border-border card-hover">
                <div className="text-3xl mb-3">{task.emoji}</div>
                <h3 className="font-display font-semibold text-brand-dark text-lg mb-2">{task.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{task.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Площадки</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-3">6 соцсетей — один контакт</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Работаем со всеми ключевыми платформами Дальнего Востока</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(['vk', 'telegram', 'ok', 'max', 'tiktok'] as const).map((key) => {
              const s = SOCIALS[key];
              const paths: Record<string, string> = {
                vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', max: '/socials/max', tiktok: '/socials/tiktok',
              };
              return (
                <Link key={key} to={paths[key]} className="group flex flex-col items-center p-5 rounded-xl border border-border hover:border-transparent card-hover text-center"
                  style={{ '--hover-bg': s.bg } as React.CSSProperties}>
                  <div className="text-4xl mb-3">{s.emoji}</div>
                  <div className="font-display font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">{s.label}</div>
                  <Icon name="ArrowRight" size={14} className="mt-2 text-muted-foreground group-hover:text-brand-orange transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Города</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-3">Три города присутствия</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Хабаровск', emoji: '🏙️', path: '/cities/khabarovsk', pop: '620 000+', desc: 'Столица ДФО, крупнейший бизнес-центр', color: 'from-blue-600 to-blue-800' },
              { name: 'Владивосток', emoji: '⚓', path: '/cities/vladivostok', pop: '600 000+', desc: 'Морской город, молодёжь, туризм, HoReCa', color: 'from-cyan-600 to-blue-700' },
              { name: 'Комсомольск-на-Амуре', emoji: '⚙️', path: '/cities/komsomolsk', pop: '240 000+', desc: 'Компактный охват, лояльная аудитория', color: 'from-indigo-600 to-blue-800' },
            ].map((city) => (
              <Link key={city.name} to={city.path} className="group relative overflow-hidden rounded-2xl text-white card-hover">
                <div className={`bg-gradient-to-br ${city.color} p-6 min-h-[180px] flex flex-col justify-between`}>
                  <div className="text-5xl">{city.emoji}</div>
                  <div>
                    <h3 className="font-display font-bold text-xl mb-1">{city.name}</h3>
                    <div className="text-white/70 text-sm mb-2">{city.pop} жителей</div>
                    <p className="text-white/60 text-sm">{city.desc}</p>
                  </div>
                  <Icon name="ArrowRight" size={20} className="absolute top-5 right-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Каталог</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark">Популярные площадки</h2>
            </div>
            <Link to="/platforms" className="hidden md:flex items-center gap-2 text-brand-blue font-medium hover:text-brand-orange transition-colors">
              Все площадки <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {previewPlatforms.map((p, i) => (
              <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/platforms"
              className="inline-flex items-center gap-2 border-2 border-brand-blue text-brand-blue font-semibold px-6 py-3 rounded-xl hover:bg-brand-blue hover:text-white transition-colors"
            >
              <Icon name="Grid3X3" size={16} />
              Смотреть весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* WORK STEPS */}
      <section className="py-16 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Процесс</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl">Как проходит работа</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORK_STEPS.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-orange flex items-center justify-center font-display font-bold text-white text-base">
                    {step.step}
                  </div>
                  <div>
                    <div className="text-xl mb-1">{step.emoji}</div>
                    <h3 className="font-display font-semibold text-white text-base mb-1">{step.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NICHES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Кому подходим</div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark mb-3">Для любого бизнеса</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Подбираем площадки под специфику ниши и аудиторию</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {NICHES.map((niche) => (
              <div key={niche.id} className="bg-brand-light border border-border rounded-xl p-4 text-center card-hover">
                <div className="text-3xl mb-2">{niche.emoji}</div>
                <div className="font-medium text-brand-dark text-sm">{niche.name}</div>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {niche.socials.slice(0, 3).map((s) => (
                    <span key={s} className="text-xs text-muted-foreground">{SOCIALS[s].emoji}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Кейсы</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark">Реальные результаты</h2>
            </div>
            <Link to="/cases" className="hidden md:flex items-center gap-2 text-brand-blue font-medium hover:text-brand-orange transition-colors">
              Все кейсы <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previewCases.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-border p-5 card-hover">
                <div className="text-3xl mb-3">{c.emoji}</div>
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md font-medium">{c.city}</span>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{c.niche}</span>
                  <span className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-md">{SOCIALS[c.social].label}</span>
                </div>
                <h3 className="font-display font-semibold text-brand-dark text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{c.task}</p>
                <div className="bg-brand-light rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">Результат</div>
                  <p className="text-sm font-medium text-brand-dark">{c.result}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground">Охват</div>
                  <div className="font-display font-bold text-brand-orange text-lg">{c.reach.toLocaleString('ru')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">FAQ</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-dark">Частые вопросы</h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqPreview.map((item, i) => (
                <details key={i} className="group border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none font-medium text-brand-dark hover:text-brand-orange transition-colors">
                    {item.question}
                    <Icon name="ChevronDown" size={16} className="flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/faq" className="text-brand-blue font-medium hover:text-brand-orange transition-colors inline-flex items-center gap-1">
                Все вопросы <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FORM */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-4">Начать работу</div>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">Готовы запустить рекламу<br />на Дальнем Востоке?</h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Оставьте заявку — в течение 2 часов пришлём подборку площадок и предварительный медиаплан. Бесплатно.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0" />
                  Медиаплан с подборкой площадок — бесплатно
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0" />
                  Ответ в течение 2 часов в рабочее время
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0" />
                  Работаем с бюджетами от 3 000 рублей
                </div>
              </div>
            </div>
            <ContactForm dark />
          </div>
        </div>
      </section>
    </div>
  );
}
