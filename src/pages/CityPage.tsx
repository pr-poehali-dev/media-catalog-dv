import { useParams, Link } from 'react-router-dom';
import { PLATFORMS, SOCIALS, CASES, CITIES_INFO } from '@/data/data';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';

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
}> = {
  'Хабаровск': {
    audience: 'Активные горожане 20–50 лет, предприниматели, семьи. Хабаровск — административный и деловой центр ДФО. Аудитория хорошо реагирует на локальный контент и городские новости.',
    bestSocials: ['vk', 'telegram', 'ok'],
    formats: ['Пост', 'Нативная публикация', 'Пост + Сторис', 'Подборка'],
    niches: ['Кафе и рестораны', 'Образование', 'Недвижимость', 'Медицина', 'Мероприятия'],
  },
  'Владивосток': {
    audience: 'Молодёжь, студенты ДВФУ, предприниматели, туристы. Самый «молодёжный» город ДВ с активным HoReCa-сегментом. Высокое потребление видеоконтента.',
    bestSocials: ['vk', 'tiktok', 'telegram'],
    formats: ['Видео', 'Обзор у блогера', 'Пост + Сторис', 'Нативная публикация'],
    niches: ['HoReCa', 'Туризм', 'Красота', 'Мода', 'Мероприятия'],
  },
  'Комсомольск-на-Амуре': {
    audience: 'Компактный промышленный город с высокой долей семей и работников предприятий. Аудитория 25–55 лет, высокая лояльность к местным сообществам.',
    bestSocials: ['vk', 'ok', 'telegram'],
    formats: ['Пост', 'Нативная публикация', 'Подборка'],
    niches: ['Ритейл', 'Медицина', 'Образование', 'Вакансии', 'Бытовые услуги'],
  },
};

const FAR_EAST_PAGE = () => (
  <div className="pt-16">
    <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
      <div className="pattern-content max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Регион</div></div>
        <h1 className="section-title text-[#FBF8F3] mb-3">Дальний Восток</h1>
        <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">Охват трёх крупнейших городов региона одним медиапланом</p>
      </div>
    </section>
    <section className="bg-[#FBF8F3] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[#0A0A0A]/65 mb-10 max-w-2xl leading-relaxed">
          Работаем с Хабаровском, Владивостоком и Комсомольском-на-Амуре. Вместе — 1,5 млн+ жителей, охват 3,5 млн+ в месяц.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D8]">
          {([
            { name: 'Хабаровск', path: '/cities/khabarovsk', pop: '620 000+', desc: 'Столица Дальнего Востока' },
            { name: 'Владивосток', path: '/cities/vladivostok', pop: '600 000+', desc: 'Морские ворота России' },
            { name: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk', pop: '240 000+', desc: 'Промышленный центр' },
          ]).map((city) => (
            <Link key={city.name} to={city.path} className="bg-[#FBF8F3] p-8 hover:bg-[#F2EDE4] transition-colors group">
              <div className="font-display font-bold text-[#0A0A0A] text-xl mb-1 group-hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '-0.02em' }}>{city.name}</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl mb-3">{city.pop}</div>
              <div className="text-sm text-[#5a5347]">{city.desc}</div>
              <div className="flex items-center gap-1 text-[#5a5347] group-hover:text-[#A21D27] transition-colors mt-4 text-xs uppercase" style={{ letterSpacing: '0.12em' }}>
                Площадки <Icon name="ArrowRight" size={11} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-[#0A0A0A] pattern-dark py-14">
      <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
        <ContactForm dark title="Охватить весь Дальний Восток" subtitle="Пакетный медиаплан по всем трём городам" />
      </div>
    </section>
  </div>
);

export default function CityPage() {
  const { cityId } = useParams<{ cityId: string }>();
  useScrollReveal();
  if (cityId === 'far-east') return <FAR_EAST_PAGE />;

  const cityName = CITY_ROUTES[cityId || ''];
  if (!cityName) return (
    <div className="pt-28 text-center py-24">
      <h2 className="font-display font-bold text-2xl text-[#0A0A0A] mb-2">Город не найден</h2>
      <Link to="/platforms" className="text-sm text-[#A21D27]">Вернуться в каталог</Link>
    </div>
  );

  const cityInfo = CITIES_INFO[cityName];
  const content = CITY_CONTENT[cityName];
  const cityPlatforms = PLATFORMS.filter((p) => p.city === cityName).slice(0, 4);
  const cityCases = CASES.filter((c) => c.city === cityName).slice(0, 3);

  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Город</div></div>
          <h1 className="section-title text-[#FBF8F3] mb-2">{cityName}</h1>
          <p className="text-[#FBF8F3]/50 text-base mb-3">{cityInfo.tagline}</p>
          <div className="font-display font-bold text-[#A21D27] text-3xl">{cityInfo.population} жителей</div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-16 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6"><div className="section-rule" /><div className="eyebrow text-[#5a5347]">Аудитория</div></div>
              <p className="text-[#0A0A0A]/65 leading-relaxed mb-6">{content.audience}</p>
              <div className="grid grid-cols-2 gap-2">
                {cityInfo.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-[#5a5347]">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-0.5" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-5" style={{ letterSpacing: '0.18em' }}>Лучшие соцсети</div>
              <div className="flex flex-col gap-px bg-[#E8E2D8] mb-8">
                {content.bestSocials.map((key) => {
                  const s = SOCIALS[key as keyof typeof SOCIALS];
                  const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', tiktok: '/socials/tiktok', max: '/socials/max' };
                  return (
                    <Link key={key} to={paths[key]} className="flex items-center gap-3 p-4 bg-[#FBF8F3] hover:bg-[#F2EDE4] transition-colors group">
                      <span className="text-xl">{s.emoji}</span>
                      <span className="font-medium text-sm text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors flex-1">{s.label}</span>
                      <Icon name="ArrowRight" size={12} className="text-[#5a5347] group-hover:text-[#A21D27] transition-colors" />
                    </Link>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Форматы</div>
                  <div className="flex flex-wrap gap-1.5">
                    {content.formats.map((f) => <span key={f} className="tag">{f}</span>)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Ниши</div>
                  <div className="flex flex-wrap gap-1.5">
                    {content.niches.slice(0, 4).map((n) => <span key={n} className="tag tag-carmine">{n}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cityPlatforms.length > 0 && (
        <section className="bg-[#F2EDE4] py-16 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.01em' }}>Площадки в {cityName}</h2>
              <Link to="/platforms" className="text-xs text-[#0A0A0A] hover:text-[#A21D27] transition-colors flex items-center gap-1" style={{ letterSpacing: '0.1em' }}>
                Все площадки <Icon name="ArrowRight" size={12} />
              </Link>
            </div>
            <div className="flex flex-col gap-px bg-[#E8E2D8]">
              {cityPlatforms.map((p, i) => <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />)}
            </div>
          </div>
        </section>
      )}

      {cityCases.length > 0 && (
        <section className="bg-[#FBF8F3] py-16 reveal">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display font-bold text-[#0A0A0A] text-xl mb-8" style={{ letterSpacing: '-0.01em' }}>Кейсы из {cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E2D8]">
              {cityCases.map((c) => (
                <div key={c.id} className="bg-[#FBF8F3] p-7">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="tag">{c.niche}</span>
                    <span className="tag tag-carmine">{SOCIALS[c.social].label}</span>
                  </div>
                  <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-2 leading-tight" style={{ letterSpacing: '-0.01em' }}>{c.title}</h3>
                  <p className="text-sm text-[#5a5347] mb-4 leading-relaxed">{c.result}</p>
                  <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.14em' }}>Охват</div>
                  <div className="font-display font-bold text-[#A21D27] text-2xl">{c.reach.toLocaleString('ru')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#0A0A0A] pattern-dark py-14 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title={`Реклама в ${cityName}`} subtitle="Подберём лучшие площадки вашего города" />
        </div>
      </section>
    </div>
  );
}