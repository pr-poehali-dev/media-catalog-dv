import { useParams, Link } from 'react-router-dom';
import { PLATFORMS, SOCIALS, CASES, CITIES_INFO } from '@/data/data';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

const CITY_ROUTES: Record<string, string> = {
  khabarovsk: 'Хабаровск',
  vladivostok: 'Владивосток',
  komsomolsk: 'Комсомольск-на-Амуре',
};

const CITY_CONTENT: Record<string, {
  audience: string;
  bestSocials: string[];
  formats: string[];
  niches: string[];
  gradient: string;
}> = {
  'Хабаровск': {
    audience: 'Активные горожане 20–50 лет, предприниматели, семьи. Хабаровск — административный и деловой центр ДФО. Аудитория хорошо реагирует на локальный контент, городские новости и предложения.',
    bestSocials: ['vk', 'telegram', 'ok'],
    formats: ['Пост', 'Нативная публикация', 'Пост + Сторис', 'Подборка'],
    niches: ['Кафе и рестораны', 'Образование', 'Недвижимость', 'Медицина', 'Мероприятия', 'Вакансии'],
    gradient: 'from-blue-700 to-blue-900',
  },
  'Владивосток': {
    audience: 'Молодёжь, студенты ДВФУ, предприниматели, туристы. Владивосток — самый «молодёжный» город ДВ с активным HoReCa-сегментом и туристическим потоком. Высокое потребление видеоконтента.',
    bestSocials: ['vk', 'tiktok', 'telegram'],
    formats: ['Видео', 'Обзор у блогера', 'Пост + Сторис', 'Нативная публикация'],
    niches: ['HoReCa', 'Туризм', 'Красота', 'Мода', 'Мероприятия', 'Доставка'],
    gradient: 'from-cyan-600 to-blue-800',
  },
  'Комсомольск-на-Амуре': {
    audience: 'Компактный промышленный город с высокой долей семей и работников предприятий. Аудитория 25–55 лет, высокая лояльность к местным сообществам. Широкий охват достигается меньшим числом размещений.',
    bestSocials: ['vk', 'ok', 'telegram'],
    formats: ['Пост', 'Нативная публикация', 'Подборка'],
    niches: ['Ритейл', 'Медицина', 'Образование', 'Автосфера', 'Бытовые услуги', 'Вакансии'],
    gradient: 'from-indigo-700 to-blue-900',
  },
};

const FAR_EAST_PAGE = () => (
  <div className="pt-16">
    <section className="gradient-hero text-white py-14">
      <div className="container mx-auto px-4">
        <div className="text-5xl mb-4">🗺️</div>
        <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Регион</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Дальний Восток</h1>
        <p className="text-white/70 text-lg max-w-2xl">Охват трёх крупнейших городов региона одним медиапланом</p>
      </div>
    </section>
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
          Мы работаем с Хабаровском, Владивостоком и Комсомольском-на-Амуре — тремя крупнейшими городами Дальнего Востока.
          Вместе это 1,5 млн+ человек, охват 3,5 млн+ в месяц.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([
            { name: 'Хабаровск', emoji: '🏙️', path: '/cities/khabarovsk', pop: '620 000+' },
            { name: 'Владивосток', emoji: '⚓', path: '/cities/vladivostok', pop: '600 000+' },
            { name: 'Комсомольск-на-Амуре', emoji: '⚙️', path: '/cities/komsomolsk', pop: '240 000+' },
          ] as const).map((city) => (
            <Link key={city.name} to={city.path} className="border border-border rounded-2xl p-6 card-hover group">
              <div className="text-4xl mb-3">{city.emoji}</div>
              <h3 className="font-display font-bold text-brand-dark text-xl mb-1 group-hover:text-brand-orange transition-colors">{city.name}</h3>
              <div className="text-muted-foreground text-sm">{city.pop} жителей</div>
              <Icon name="ArrowRight" size={16} className="mt-3 text-muted-foreground group-hover:text-brand-orange transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="py-12 gradient-hero">
      <div className="container mx-auto px-4 max-w-2xl">
        <ContactForm dark title="Охватить весь Дальний Восток" subtitle="Составим пакетный медиаплан по всем трём городам" />
      </div>
    </section>
  </div>
);

export default function CityPage() {
  const { cityId } = useParams<{ cityId: string }>();

  if (cityId === 'far-east') return <FAR_EAST_PAGE />;

  const cityName = CITY_ROUTES[cityId || ''];
  if (!cityName) {
    return (
      <div className="pt-28 text-center py-20">
        <div className="text-5xl mb-4">🤔</div>
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-2">Город не найден</h2>
        <Link to="/platforms" className="text-brand-blue hover:text-brand-orange">Вернуться в каталог</Link>
      </div>
    );
  }

  const cityInfo = CITIES_INFO[cityName];
  const content = CITY_CONTENT[cityName];
  const cityPlatforms = PLATFORMS.filter((p) => p.city === cityName).slice(0, 4);
  const cityCases = CASES.filter((c) => c.city === cityName).slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${content.gradient} text-white py-14`}>
        <div className="container mx-auto px-4">
          <div className="text-5xl mb-4">{cityInfo.emoji}</div>
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Город</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">{cityName}</h1>
          <p className="text-white/70 text-lg mb-4">{cityInfo.tagline}</p>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80">
            <Icon name="Users" size={14} /> {cityInfo.population} жителей
          </div>
        </div>
      </section>

      {/* Audience + Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-2xl text-brand-dark mb-4">Аудитория города</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{content.audience}</p>
              <div className="grid grid-cols-2 gap-3">
                {cityInfo.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Icon name="Check" size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-brand-dark mb-4">Лучшие соцсети для {cityName}</h3>
              <div className="flex flex-col gap-3">
                {(content.bestSocials as string[]).map((key) => {
                  const s = SOCIALS[key as keyof typeof SOCIALS];
                  const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', tiktok: '/socials/tiktok', max: '/socials/max' };
                  return (
                    <Link key={key} to={paths[key]} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-brand-orange transition-colors group">
                      <span className="text-2xl">{s.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-brand-dark group-hover:text-brand-orange transition-colors">{s.label}</div>
                      </div>
                      <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-brand-orange transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-10 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-semibold text-brand-dark mb-4">Популярные форматы</h3>
              <div className="flex flex-wrap gap-2">
                {content.formats.map((f) => (
                  <span key={f} className="bg-white border border-border text-sm text-brand-dark px-3 py-1.5 rounded-lg">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-brand-dark mb-4">Подходящие ниши</h3>
              <div className="flex flex-wrap gap-2">
                {content.niches.map((n) => (
                  <span key={n} className="bg-brand-orange/10 text-brand-orange text-sm px-3 py-1.5 rounded-lg font-medium">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      {cityPlatforms.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl text-brand-dark">Площадки в {cityName}</h2>
              <Link to="/platforms" className="text-sm text-brand-blue font-medium hover:text-brand-orange transition-colors flex items-center gap-1">
                Все площадки <Icon name="ArrowRight" size={14} />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {cityPlatforms.map((p, i) => (
                <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cases */}
      {cityCases.length > 0 && (
        <section className="py-12 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Кейсы из {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cityCases.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-border p-5 card-hover">
                  <div className="text-3xl mb-3">{c.emoji}</div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{c.niche}</span>
                    <span className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-md">{SOCIALS[c.social].label}</span>
                  </div>
                  <h3 className="font-display font-semibold text-brand-dark text-lg mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{c.result}</p>
                  <div className="text-xs text-muted-foreground">Охват: <span className="font-bold text-brand-orange">{c.reach.toLocaleString('ru')}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContactForm dark title={`Реклама в ${cityName}`} subtitle="Подберём лучшие площадки вашего города" />
        </div>
      </section>
    </div>
  );
}
