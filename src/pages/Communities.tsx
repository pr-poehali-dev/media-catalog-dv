import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, SOCIALS, Platform } from '@/data/data';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';

const CITIES_F = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'];
const SOCIALS_F = ['Все соцсети', 'vk', 'telegram', 'ok', 'max', 'tiktok'] as const;
const CATEGORIES = ['Все категории', 'Городские новости', 'Семья и дети', 'Еда и рестораны', 'Бизнес', 'Афиша и события', 'Лайфстайл'];

const inputCls = 'text-sm border border-[#E8E2D8] bg-[#FBF8F3] text-[#0A0A0A] px-3 py-2 focus:outline-none focus:border-[#A21D27] transition-colors';

const CITY_SOCIALS: Record<string, string[]> = {
  'Хабаровск': ['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'],
  'Владивосток': ['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'],
  'Комсомольск-на-Амуре': ['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'],
};

export default function Communities() {
  const [city, setCity] = useState('Все города');
  const [social, setSocial] = useState('Все соцсети');
  const [category, setCategory] = useState('Все категории');
  const [search, setSearch] = useState('');

  const communities = PLATFORMS.filter((p) => p.type === 'community');

  const filtered = useMemo<Platform[]>(() => {
    return communities.filter((p) => {
      if (city !== 'Все города' && p.city !== city) return false;
      if (social !== 'Все соцсети' && p.social !== social) return false;
      if (category !== 'Все категории' && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [communities, city, social, category, search]);

  useScrollReveal();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 01</div>
          </div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-4">
            Реклама в городских<br />сообществах
          </h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Размещение рекламы во ВКонтакте, Telegram, Одноклассниках, MAX и TikTok.
            Городские сообщества с живой и лояльной аудиторией.
            Хабаровск, Владивосток, Комсомольск-на-Амуре.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contacts" className="btn-carmine">Получить медиаплан</Link>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
          </div>
        </div>
      </section>

      {/* Разделение по соцсетям и городам */}
      <section className="bg-[#F2EDE4] py-14 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* По соцсетям */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">По соцсетям</div>
              </div>
              <div className="flex flex-col gap-px bg-[#E8E2D8]">
                {(['vk', 'telegram', 'ok', 'max', 'tiktok'] as const).map((key) => {
                  const s = SOCIALS[key];
                  const count = communities.filter((p) => p.social === key).length;
                  const paths: Record<string, string> = { vk: '/socials/vk', telegram: '/socials/telegram', ok: '/socials/ok', max: '/socials/max', tiktok: '/socials/tiktok' };
                  return (
                    <Link key={key} to={paths[key]}
                      className="flex items-center gap-4 p-4 bg-[#F2EDE4] hover:bg-[#FBF8F3] transition-colors group">
                      <span className="text-2xl">{s.emoji}</span>
                      <span className="font-medium text-sm text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors flex-1">{s.label}</span>
                      <span className="text-xs text-[#5a5347]">{count} площадок</span>
                      <Icon name="ArrowRight" size={12} className="text-[#E8E2D8] group-hover:text-[#A21D27] transition-colors" />
                    </Link>
                  );
                })}
                <Link to="/socials/instagram"
                  className="flex items-center gap-4 p-4 bg-[#F2EDE4] hover:bg-[#FBF8F3] transition-colors group">
                  <span className="text-2xl">{SOCIALS.instagram.emoji}</span>
                  <span className="font-medium text-sm text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors flex-1">Instagram*</span>
                  <span className="text-xs text-[#5a5347]">Ограничения</span>
                  <Icon name="ArrowRight" size={12} className="text-[#E8E2D8] group-hover:text-[#A21D27] transition-colors" />
                </Link>
              </div>
            </div>
            {/* По городам */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">По городам</div>
              </div>
              <div className="flex flex-col gap-px bg-[#E8E2D8]">
                {[
                  { name: 'Хабаровск', path: '/cities/khabarovsk', pop: '620 000+' },
                  { name: 'Владивосток', path: '/cities/vladivostok', pop: '600 000+' },
                  { name: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk', pop: '240 000+' },
                ].map((c) => {
                  const count = communities.filter((p) => p.city === c.name).length;
                  const socials = [...new Set(communities.filter((p) => p.city === c.name).map((p) => p.social))];
                  return (
                    <Link key={c.name} to={c.path}
                      className="flex items-center gap-4 p-4 bg-[#F2EDE4] hover:bg-[#FBF8F3] transition-colors group">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors mb-1">{c.name}</div>
                        <div className="flex gap-1">
                          {socials.map((k) => (
                            <span key={k} className="text-xs">{SOCIALS[k].emoji}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#A21D27] font-display font-bold">{c.pop}</div>
                        <div className="text-xs text-[#5a5347]">{count} площадок</div>
                      </div>
                      <Icon name="ArrowRight" size={12} className="text-[#E8E2D8] group-hover:text-[#A21D27] transition-colors" />
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-[#FBF8F3] border border-[#E8E2D8]">
                <div className="text-xs text-[#5a5347] mb-1" style={{ letterSpacing: '0.1em' }}>Политическая реклама</div>
                <p className="text-sm text-[#0A0A0A]/50">Размещение политической рекламы — по отдельному запросу.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог с фильтрами */}
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5347]" />
              <input type="text" placeholder="Поиск..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputCls} pl-8 min-w-[140px]`} />
            </div>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
              {CITIES_F.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={social} onChange={(e) => setSocial(e.target.value)} className={inputCls}>
              <option>Все соцсети</option>
              {(['vk', 'telegram', 'ok', 'max', 'tiktok'] as const).map((k) => (
                <option key={k} value={k}>{SOCIALS[k].label}</option>
              ))}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {(city !== 'Все города' || social !== 'Все соцсети' || category !== 'Все категории' || search) && (
              <button onClick={() => { setCity('Все города'); setSocial('Все соцсети'); setCategory('Все категории'); setSearch(''); }}
                className="flex items-center gap-1 text-xs text-[#5a5347] hover:text-[#A21D27] transition-colors">
                <Icon name="X" size={12} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-12 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>
            Найдено: {filtered.length} площадок
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5a5347]">Ничего не найдено. Попробуйте изменить фильтры.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-px bg-[#E8E2D8]">
              {filtered.map((p, i) => <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />)}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-16 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Подобрать сообщества" subtitle="Составим медиаплан под ваш город, бюджет и задачу" />
        </div>
      </section>
    </div>
  );
}