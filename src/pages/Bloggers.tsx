import { BLOGGERS, SOCIALS, Blogger } from '@/data/data';
import ContactForm from '@/components/ContactForm';

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return Math.round(n / 1000) + ' тыс.';
  return String(n);
}

function BloggerCard({ blogger }: { blogger: Blogger }) {
  const social = SOCIALS[blogger.social];
  return (
    <div className="overflow-hidden flex flex-col md:flex-row bg-[#161616]">
      <div className="md:w-[200px] flex flex-col items-center justify-center p-8 bg-[#1E1E1E] flex-shrink-0">
        <div className="text-4xl mb-3">{blogger.emoji}</div>
        <div className="text-[11px] font-medium text-[#FBF8F3]/50 uppercase text-center mb-1" style={{ letterSpacing: '0.14em' }}>{blogger.city}</div>
        <div className="text-[11px] font-medium uppercase text-center" style={{ color: social.color, letterSpacing: '0.12em' }}>{social.label}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-display font-bold text-[#FBF8F3] text-xl leading-tight" style={{ letterSpacing: '-0.01em' }}>
              {blogger.name}
            </h3>
            <span className="flex-shrink-0 mt-1 text-[10px] font-medium uppercase px-2 py-0.5 bg-[#FBF8F3]/10 text-[#FBF8F3]/60 border border-[#FBF8F3]/10" style={{ letterSpacing: '0.12em' }}>{blogger.category}</span>
          </div>
          <p className="text-sm text-[#FBF8F3]/50 leading-relaxed mb-4">{blogger.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-[10px] text-[#FBF8F3]/40 uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Подписчики</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.subscribers)}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#FBF8F3]/40 uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Охват / мес.</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.reach)}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#FBF8F3]/10">
          <div>
            <div className="text-[10px] text-[#FBF8F3]/40 uppercase" style={{ letterSpacing: '0.14em' }}>от</div>
            <div className="font-display font-bold text-[#FBF8F3] text-xl">{blogger.priceFrom.toLocaleString('ru')} ₽</div>
          </div>
          <a href="#form" className="btn-carmine">Оставить заявку</a>
        </div>
      </div>
    </div>
  );
}

export default function Bloggers() {
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
            Реклама у блогеров работает лучше обычных объявлений, потому что люди доверяют людям, а не баннерам. Особенно в локальных городских проектах, где аудитория знает автора и следит за ним ежедневно.
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
            {[
              { num: '01', title: 'Доверие аудитории', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
              { num: '02', title: 'Вовлечённая аудитория', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
              { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат для сложных продуктов.' },
              { num: '04', title: 'Долгий эффект', desc: 'Хорошие обзоры продолжают набирать просмотры неделями и месяцами после публикации.' },
            ].map((item) => (
              <div key={item.num} className="bg-[#F2EDE4] p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-2" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
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
            {BLOGGERS.map((b) => <BloggerCard key={b.id} blogger={b} />)}
          </div>

          {/* Instagram дисклеймер */}
          <p className="mt-8 text-[11px] text-[#FBF8F3]/30 leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.
          </p>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-[#F2EDE4] pattern-milk py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#E8E2D8]">
            {[
              { value: '3', label: 'проекта' },
              { value: '11', label: 'площадок' },
              { value: '1,2 млн+', label: 'охвата в месяц' },
            ].map((s) => (
              <div key={s.label} className="bg-[#F2EDE4] p-8 text-center">
                <div className="font-display font-black text-[#A21D27] text-4xl leading-none mb-2" style={{ letterSpacing: '-0.02em' }}>{s.value}</div>
                <div className="text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма */}
      <section id="form" className="bg-[#0A0A0A] pattern-dark py-16 border-t border-[#FBF8F3]/5">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <ContactForm dark title="Подобрать блогера" subtitle="Расскажите о продукте — подберём подходящего блогера и соцсеть для рекламы" source="Блогеры" />
        </div>
      </section>
    </div>
  );
}
