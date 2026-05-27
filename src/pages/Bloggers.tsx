import { useState } from 'react';
import { BLOGGERS, SOCIALS, Blogger } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return Math.round(n / 1000) + ' тыс.';
  return String(n);
}

function BloggerModal({ blogger, onClose }: { blogger: Blogger; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0A0A0A]/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-[#FBF8F3] w-full max-w-2xl my-8 flex flex-col">
        {/* Шапка */}
        <div className="bg-[#0A0A0A] p-8 flex items-start gap-5">
          <div className="text-5xl flex-shrink-0">{blogger.emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-1" style={{ letterSpacing: '0.18em' }}>{blogger.city} · {blogger.category}</div>
            <h2 className="font-display font-bold text-[#FBF8F3] text-2xl leading-tight mb-2" style={{ letterSpacing: '-0.02em' }}>{blogger.name}</h2>
            <p className="text-sm text-[#FBF8F3]/60 leading-relaxed">{blogger.fullDescription}</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 text-[#FBF8F3]/40 hover:text-[#FBF8F3] transition-colors mt-1">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Соцсети */}
          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Соцсети</div>
            <div className="border border-[#E8E2D8]">
              <div className="grid grid-cols-3 bg-[#F2EDE4] border-b border-[#E8E2D8]">
                <div className="px-4 py-2 text-[10px] text-[#5a5347] uppercase font-medium" style={{ letterSpacing: '0.14em' }}>Площадка</div>
                <div className="px-4 py-2 text-[10px] text-[#5a5347] uppercase font-medium text-right" style={{ letterSpacing: '0.14em' }}>Подписчики</div>
                <div className="px-4 py-2 text-[10px] text-[#5a5347] uppercase font-medium text-right" style={{ letterSpacing: '0.14em' }}>Охват / мес.</div>
              </div>
              {blogger.socials.map((s) => (
                <div key={s.social} className="grid grid-cols-3 border-b border-[#E8E2D8] last:border-b-0">
                  <div className="px-4 py-3 flex items-center">
                    <span className="text-sm font-medium" style={{ color: SOCIALS[s.social].color }}>{SOCIALS[s.social].label}</span>
                  </div>
                  <div className="px-4 py-3 text-right font-display font-bold text-[#0A0A0A] text-sm">{fmt(s.subscribers)}</div>
                  <div className="px-4 py-3 text-right font-display font-bold text-[#A21D27] text-sm">{fmt(s.reach)}</div>
                </div>
              ))}
              <div className="grid grid-cols-3 bg-[#F2EDE4]">
                <div className="px-4 py-2.5 text-[10px] text-[#5a5347] uppercase font-medium" style={{ letterSpacing: '0.14em' }}>Итого</div>
                <div className="px-4 py-2.5 text-right font-display font-bold text-[#0A0A0A] text-sm">{fmt(blogger.subscribers)}</div>
                <div className="px-4 py-2.5 text-right font-display font-bold text-[#A21D27] text-sm">{fmt(blogger.reach)}</div>
              </div>
            </div>
          </div>

          {/* Форматы */}
          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Форматы размещения</div>
            <div className="flex flex-wrap gap-2">
              {blogger.formats.map((f) => (
                <span key={f} className="text-xs px-3 py-1.5 bg-[#F2EDE4] text-[#0A0A0A] border border-[#E8E2D8]">{f}</span>
              ))}
            </div>
          </div>

          {/* Что рекламировали */}
          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Что рекламировали ранее</div>
            <div className="flex flex-wrap gap-2">
              {blogger.promoted.map((p) => (
                <span key={p} className="text-xs px-3 py-1.5 bg-[#0A0A0A] text-[#FBF8F3]/70">{p}</span>
              ))}
            </div>
          </div>

          {/* Кому подходит */}
          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Особенно подходит</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {blogger.bestFor.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                  <span className="text-[#A21D27] font-bold flex-shrink-0">✔</span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-[#E8E2D8] pt-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#0A0A0A] text-2xl">от {blogger.priceFrom.toLocaleString('ru')} ₽</div>
            </div>
            <a href="#form" onClick={onClose} className="btn-carmine">Оставить заявку</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BloggerCard({ blogger, onClick }: { blogger: Blogger; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="overflow-hidden bg-[#161616] cursor-pointer group hover:bg-[#1a1a1a] transition-colors"
    >
      <div className="flex flex-col md:flex-row">
        {/* Левая панель */}
        <div className="md:w-[180px] flex flex-col items-center justify-center p-6 bg-[#1E1E1E] flex-shrink-0 gap-3">
          <div className="text-4xl">{blogger.emoji}</div>
          <div className="text-center">
            <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>{blogger.city}</div>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5">
              {blogger.socials.map((s) => (
                <span key={s.social} className="text-[10px] font-medium" style={{ color: SOCIALS[s.social].color }}>{SOCIALS[s.social].label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Основная часть */}
        <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-display font-bold text-[#FBF8F3] text-xl leading-tight mb-0.5" style={{ letterSpacing: '-0.01em' }}>{blogger.name}</h3>
                <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase" style={{ letterSpacing: '0.12em' }}>{blogger.category}</div>
              </div>
              <span className="flex-shrink-0 flex items-center gap-1 text-[11px] text-[#FBF8F3]/30 group-hover:text-[#FBF8F3]/60 transition-colors mt-1">
                Подробнее <Icon name="ArrowRight" size={11} />
              </span>
            </div>
            <p className="text-sm text-[#FBF8F3]/50 leading-relaxed mb-5">{blogger.description}</p>

            {/* Метрики */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Подписчиков всего</div>
                <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.subscribers)}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Охват / мес.</div>
                <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.reach)}</div>
              </div>
            </div>

            {/* Форматы */}
            <div className="mb-4">
              <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Форматы</div>
              <div className="flex flex-wrap gap-1.5">
                {blogger.formats.slice(0, 4).map((f) => (
                  <span key={f} className="text-[10px] px-2 py-1 bg-[#ffffff08] text-[#FBF8F3]/50 border border-[#FBF8F3]/10">{f}</span>
                ))}
                {blogger.formats.length > 4 && (
                  <span className="text-[10px] px-2 py-1 text-[#FBF8F3]/30">+{blogger.formats.length - 4}</span>
                )}
              </div>
            </div>

            {/* Кому подходит */}
            <div>
              <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Кому подходит</div>
              <div className="text-sm text-[#FBF8F3]/40">{blogger.bestFor.slice(0, 3).join(' · ')}</div>
            </div>
          </div>

          {/* Футер карточки */}
          <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-[#FBF8F3]/10">
            <div>
              <div className="text-[10px] text-[#FBF8F3]/30 uppercase mb-0.5" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#FBF8F3] text-xl">от {blogger.priceFrom.toLocaleString('ru')} ₽</div>
            </div>
            <button
              className="btn-carmine"
              onClick={(e) => { e.stopPropagation(); window.location.hash = 'form'; }}
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ADVANTAGES = [
  { num: '01', title: 'Доверие аудитории', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
  { num: '02', title: 'Вовлечённость', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
  { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат как для простых, так и для сложных продуктов.' },
  { num: '04', title: 'Долгий эффект', desc: 'Хорошие обзоры продолжают набирать просмотры неделями и месяцами после публикации.' },
];

export default function Bloggers() {
  const [selected, setSelected] = useState<Blogger | null>(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 02</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Реклама у блогеров</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Люди доверяют людям, а не баннерам. Поэтому реклама у блогеров работает лучше обычных объявлений.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#form" className="btn-carmine">Подобрать блогера</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в MAX</a>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-[#F2EDE4] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Преимущества</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {ADVANTAGES.map((item) => (
              <div key={item.num} className="bg-[#F2EDE4] p-7 flex flex-col">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.num}</div>
                <h3
                  className="font-display font-bold text-[#0A0A0A] text-lg leading-snug"
                  style={{ letterSpacing: '-0.01em', minHeight: '3.5rem' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className="bg-[#0A0A0A] pattern-dark py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
          </div>
          <div className="flex flex-col gap-px bg-[#FBF8F3]/5">
            {BLOGGERS.map((b) => (
              <BloggerCard key={b.id} blogger={b} onClick={() => setSelected(b)} />
            ))}
          </div>

          <p className="mt-8 text-[11px] text-[#FBF8F3]/30 leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.
          </p>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-[#F2EDE4] pattern-milk py-6">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-px bg-[#E8E2D8]">
            {[
              { value: '3', label: 'проекта' },
              { value: '11', label: 'площадок' },
              { value: '1,2 млн+', label: 'охвата в месяц' },
            ].map((s) => (
              <div key={s.label} className="bg-[#F2EDE4] py-5 px-6 flex items-center gap-3">
                <div className="font-display font-black text-[#A21D27] text-3xl leading-none" style={{ letterSpacing: '-0.02em' }}>{s.value}</div>
                <div className="text-xs text-[#5a5347] uppercase leading-tight" style={{ letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма */}
      <section id="form" className="bg-[#0A0A0A] pattern-dark py-16 border-t border-[#FBF8F3]/5">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <ContactForm dark title="Подобрать блогера" subtitle="Расскажите о продукте — подберём подходящего блогера и соцсеть" source="Блогеры" />
        </div>
      </section>

      {/* Modal */}
      {selected && <BloggerModal blogger={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
