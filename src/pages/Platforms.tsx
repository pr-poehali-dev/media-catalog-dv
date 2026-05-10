import { useState, useMemo } from 'react';
import PlatformCard from '@/components/PlatformCard';
import ContactForm from '@/components/ContactForm';
import { PLATFORMS, SOCIALS, Platform } from '@/data/data';
import Icon from '@/components/ui/icon';

const CITIES = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре', 'Дальний Восток'];
const SOCIAL_KEYS = ['all', 'vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const;
const TYPES = ['Все', 'Сообщество', 'Блогер'];
const CATEGORIES = ['Все категории', 'Городские новости', 'Семья и дети', 'Еда и рестораны', 'Бизнес', 'Афиша и события', 'Лайфстайл', 'Красота и уход', 'Семья'];

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
        const typeMap: Record<string, string> = { 'Сообщество': 'community', 'Блогер': 'blogger' };
        if (p.type !== typeMap[type]) return false;
      }
      if (category !== 'Все категории' && p.category !== category) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [city, social, type, category, search]);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-4">Каталог</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Каталог площадок</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Городские сообщества и блогеры Хабаровска, Владивостока и Комсомольска-на-Амуре.
            Фильтруйте по городу, соцсети и формату.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск площадки..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
              />
            </div>

            {/* City */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 bg-white"
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            {/* Social */}
            <select
              value={social}
              onChange={(e) => setSocial(e.target.value as typeof SOCIAL_KEYS[number])}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 bg-white"
            >
              <option value="all">Все соцсети</option>
              {(['vk', 'telegram', 'ok', 'max', 'tiktok', 'instagram'] as const).map((k) => (
                <option key={k} value={k}>{SOCIALS[k].label}</option>
              ))}
            </select>

            {/* Type */}
            <div className="flex gap-1 bg-brand-light rounded-lg p-0.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`text-sm px-3 py-1.5 rounded-md transition-colors ${type === t ? 'bg-white shadow-sm text-brand-dark font-medium' : 'text-muted-foreground hover:text-brand-dark'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 bg-white"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>

            {/* Reset */}
            {(city !== 'Все города' || social !== 'all' || type !== 'Все' || category !== 'Все категории' || search) && (
              <button
                onClick={() => { setCity('Все города'); setSocial('all'); setType('Все'); setCategory('Все категории'); setSearch(''); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-orange transition-colors"
              >
                <Icon name="X" size={14} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-10 bg-brand-light min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Найдено: <span className="font-semibold text-brand-dark">{filtered.length}</span> площадок
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-display font-semibold text-brand-dark text-xl mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground text-sm">Попробуйте изменить фильтры или запрос</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filtered.map((p, i) => (
                <PlatformCard key={p.id} platform={p} reversed={i % 2 !== 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl text-center text-white">
          <h2 className="font-display font-bold text-3xl mb-4">Не нашли подходящую площадку?</h2>
          <p className="text-white/60 mb-8">Напишите нам — подберём вручную под вашу задачу и бюджет</p>
          <ContactForm dark title="Подобрать площадку" subtitle="Опишите задачу — мы найдём лучшие варианты" />
        </div>
      </section>
    </div>
  );
}
