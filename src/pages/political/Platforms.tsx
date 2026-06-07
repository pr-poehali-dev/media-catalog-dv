import { useState, useMemo } from 'react';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, SOCIALS, Platform } from '@/data/political-data';
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
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] sticky z-40" style={{ top: 'calc(4rem + env(safe-area-inset-top))' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2.5 lg:gap-3 lg:items-center">
            {/* Поиск — на всю ширину на мобильном */}
            <div className="relative w-full lg:w-auto">
              <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5347]" />
              <input type="text" placeholder="Поиск..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${inputCls} pl-8 w-full lg:w-auto lg:min-w-[160px]`} />
            </div>
            {/* Селекты — по 2 в ряд на мобильном */}
            <div className="grid grid-cols-2 lg:flex gap-2.5 lg:gap-3">
              <select value={city} onChange={(e) => setCity(e.target.value)} className={`${inputCls} w-full lg:w-auto`}>
                {CITIES_F.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={social} onChange={(e) => setSocial(e.target.value as typeof SOCIAL_KEYS[number])} className={`${inputCls} w-full lg:w-auto`}>
                <option value="all">Все соцсети</option>
                {(['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const).map((k) => (
                  <option key={k} value={k}>{SOCIALS[k].label}</option>
                ))}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputCls} col-span-2 lg:col-span-1 w-full lg:w-auto`}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            {/* Тип — кнопки во всю ширину на мобильном */}
            <div className="grid grid-cols-3 lg:flex gap-0 border border-[#E8E2D8] w-full lg:w-auto">
              {TYPES.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`text-sm px-3 py-2.5 lg:py-2 transition-colors text-center ${type === t ? 'bg-[#A21D27] text-[#FBF8F3]' : 'bg-[#FBF8F3] text-[#0A0A0A] hover:bg-[#F2EDE4]'}`}>
                  {t}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button onClick={() => { setCity('Все города'); setSocial('all'); setType('Все'); setCategory('Все категории'); setSearch(''); }}
                className="flex items-center justify-center gap-1 text-xs text-[#5a5347] hover:text-[#A21D27] transition-colors py-1.5" style={{ letterSpacing: '0.08em' }}>
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
