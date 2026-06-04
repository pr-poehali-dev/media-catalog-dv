import { useState, useMemo } from 'react';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, SOCIALS, Platform } from '@/data/data';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';

const CITIES_F = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре', 'Дальний Восток'];
const SOCIAL_KEYS = ['all', 'vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const;
const TYPES = ['Все', 'Сообщество', 'Блогер'];
const CATEGORIES = ['Все категории', 'Городские новости', 'Семья и дети', 'Еда и рестораны', 'Бизнес', 'Афиша и события', 'Лайфстайл', 'Красота и уход', 'Семья'];

const inputCls = 'text-sm border border-[#E8E2D8] bg-[#FBF8F3] text-[#0A0A0A] px-3 py-2 focus:outline-none focus:border-[#A21D27] transition-colors';

export default function Platforms() {
  const [city, setCity] = useState('Все города');
  const [social, setSocial] = useState<typeof SOCIAL_KEYS[number]>('all');
  const [type, setType] = useState('Все');
  const [category, setCategory] = useState('Все категории');
  const [search, setSearch] = useState('');

  const filtered = useMemo<Platform[]>(() => {
    return PLATFORMS.filter((p) => {
      if (city !== 'Все города' && p.city !== city) return false;
      if (social !== 'all' && p.social !== social) return false;
      if (type !== 'Все') {
        if (p.type !== (type === 'Сообщество' ? 'community' : 'blogger')) return false;
      }
      if (category !== 'Все категории' && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [city, social, type, category, search]);

  const hasFilters = city !== 'Все города' || social !== 'all' || type !== 'Все' || category !== 'Все категории' || search;

  useScrollReveal();

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark hero-pad-top pb-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
          </div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-4">Каталог площадок</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">
            Городские сообщества и блогеры Хабаровска, Владивостока и Комсомольска-на-Амуре.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5347]" />
              <input type="text" placeholder="Поиск..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputCls} pl-8 min-w-[140px] w-full sm:w-auto sm:min-w-[160px]`} />
            </div>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
              {CITIES_F.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={social} onChange={(e) => setSocial(e.target.value as typeof SOCIAL_KEYS[number])} className={inputCls}>
              <option value="all">Все соцсети</option>
              {(['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const).map((k) => (
                <option key={k} value={k}>{SOCIALS[k].label}</option>
              ))}
            </select>
            <div className="flex gap-0 border border-[#E8E2D8]">
              {TYPES.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`text-sm px-3 py-2 transition-colors ${type === t ? 'bg-[#A21D27] text-[#FBF8F3]' : 'bg-[#FBF8F3] text-[#0A0A0A] hover:bg-[#F2EDE4]'}`}>
                  {t}
                </button>
              ))}
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {hasFilters && (
              <button onClick={() => { setCity('Все города'); setSocial('all'); setType('Все'); setCategory('Все категории'); setSearch(''); }}
                className="flex items-center gap-1 text-xs text-[#5a5347] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.08em' }}>
                <Icon name="X" size={12} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#FBF8F3] py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>
            Найдено: {filtered.length} площадок
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-2">Ничего не найдено</h3>
              <p className="text-[#5a5347] text-sm">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="flex flex-col gap-px bg-[#E8E2D8]">
              {filtered.map((p, i) => (
                <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] pattern-dark py-16 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Не нашли подходящую площадку?" subtitle="Опишите задачу — подберём вручную под ваш бюджет" />
        </div>
      </section>
    </div>
  );
}