import { useState, useMemo } from 'react';
import { BLOGGERS, Blogger } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import BloggerCard from '@/components/bloggers/BloggerCard';
import BloggerModal from '@/components/bloggers/BloggerModal';

const ADVANTAGES = [
  { num: '01', title: 'Доверие', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
  { num: '02', title: 'Вовлечённость', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
  { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат как для простых, так и для сложных продуктов.' },
  { num: '04', title: 'Долгий эффект', desc: 'Хорошие обзоры продолжают набирать просмотры неделями и месяцами после публикации.' },
];

const CITY_FILTERS: Array<'Все города' | 'Хабаровск' | 'Владивосток'> = ['Все города', 'Хабаровск', 'Владивосток'];

export default function Bloggers() {
  const [selected, setSelected] = useState<Blogger | null>(null);
  const [city, setCity] = useState<'Все города' | 'Хабаровск' | 'Владивосток'>('Все города');

  const filtered = useMemo(() => {
    if (city === 'Все города') return BLOGGERS;
    return BLOGGERS.filter((b) => b.city === city);
  }, [city]);

  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 02</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Реклама у блогеров</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-6">
            Люди доверяют людям, а не баннерам. Поэтому реклама у блогеров работает лучше обычных объявлений.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
            {[
              { value: '6', label: 'проектов' },
              { value: '26', label: 'площадок' },
              { value: '32 млн+', label: 'охвата в месяц' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#FBF8F3]/15 text-sm">·</span>}
                <span className="font-display font-black text-[#A21D27] text-xl leading-none" style={{ letterSpacing: '-0.02em' }}>{s.value}</span>
                <span className="text-xs text-[#FBF8F3]/35 uppercase" style={{ letterSpacing: '0.12em' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#form" className="btn-carmine">Подобрать блогера</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в MAX</a>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE4] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Преимущества</div>
          </div>
          <div className="grid gap-px bg-[#E8E2D8]" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            {ADVANTAGES.map((item, i) => (
              <div key={item.num} className="bg-[#F2EDE4] flex flex-col p-7" style={i === 0 ? { paddingLeft: '64px' } : undefined}>
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-5">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-xl leading-tight whitespace-nowrap" style={{ letterSpacing: '-0.01em', height: '2rem', display: 'flex', alignItems: 'center' }}>{item.title}</h3>
                <div className="mt-3 w-6 border-t border-[#A21D27]/30 mb-3" />
                <p className="text-base text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="section-rule" />
              <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 rounded-full">
              {CITY_FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className="text-[11px] font-medium uppercase px-4 py-2 transition-colors rounded-full"
                  style={{
                    letterSpacing: '0.12em',
                    background: city === c ? '#A21D27' : 'transparent',
                    color: city === c ? '#FBF8F3' : 'rgba(251,248,243,0.5)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#FBF8F3]/40">Ничего не найдено</div>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map((b) => (
                <BloggerCard key={b.id} blogger={b} onClick={() => setSelected(b)} />
              ))}
            </div>
          )}

          <p className="mt-5 mb-5 text-[11px] text-[#FBF8F3]/25 leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.
          </p>
        </div>
      </section>

      <section id="form" className="bg-[#0A0A0A] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <ContactForm dark title="Подобрать блогера" subtitle="Расскажите о продукте — подберём подходящего блогера и соцсеть" source="Блогеры" />
        </div>
      </section>

      {selected && <BloggerModal blogger={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}