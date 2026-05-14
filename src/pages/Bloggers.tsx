import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '@/components/ContactForm';
import { BLOGGERS, SOCIALS, Blogger } from '@/data/data';
import Icon from '@/components/ui/icon';

const CITIES_F = ['Все города', 'Хабаровск', 'Владивосток'];
const SOCIALS_F = ['Все соцсети', 'vk', 'telegram', 'tiktok', 'instagram'] as const;

const inputCls = 'text-sm border border-[#E8E2D8] bg-[#FBF8F3] text-[#0A0A0A] px-3 py-2 focus:outline-none focus:border-[#A21D27] transition-colors';

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return Math.round(n / 1000) + ' тыс.';
  return String(n);
}

function BloggerCard({ blogger }: { blogger: Blogger }) {
  const social = SOCIALS[blogger.social];
  return (
    <div className="pcard overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-[200px] flex flex-col items-center justify-center p-8 bg-[#F2EDE4] flex-shrink-0">
        <div className="text-4xl mb-3">{blogger.emoji}</div>
        <div className="text-[11px] font-medium text-[#5a5347] uppercase text-center mb-1" style={{ letterSpacing: '0.14em' }}>{blogger.city}</div>
        <div className="text-[11px] font-medium uppercase text-center" style={{ color: social.color, letterSpacing: '0.12em' }}>{social.label}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="font-display font-bold text-[#0A0A0A] text-xl leading-tight" style={{ letterSpacing: '-0.01em' }}>
              {blogger.name}
            </h3>
            <span className="tag flex-shrink-0 mt-1">{blogger.category}</span>
          </div>
          <p className="text-sm text-[#0A0A0A]/65 leading-relaxed mb-4">{blogger.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Подписчики</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.subscribers)}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Охват / мес.</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(blogger.reach)}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E8E2D8]">
          <div>
            <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.14em' }}>от</div>
            <div className="font-display font-bold text-[#0A0A0A] text-xl">{blogger.priceFrom.toLocaleString('ru')} ₽</div>
          </div>
          <Link to="/contacts" className="btn-carmine">Оставить заявку</Link>
        </div>
      </div>
    </div>
  );
}

export default function Bloggers() {
  const [city, setCity] = useState('Все города');
  const [social, setSocial] = useState('Все соцсети');

  const filtered = useMemo<Blogger[]>(() => {
    return BLOGGERS.filter((b) => {
      if (city !== 'Все города' && b.city !== city) return false;
      if (social !== 'Все соцсети' && b.social !== social) return false;
      return true;
    });
  }, [city, social]);

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
            Личные рекомендации — самый доверенный формат рекламы.
            Работаем с блогерами ВКонтакте, Telegram, TikTok и Instagram*
            в Хабаровске и Владивостоке.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contacts" className="btn-carmine">Подобрать блогера</Link>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
          </div>
        </div>
      </section>

      {/* Почему блогеры */}
      <section className="bg-[#F2EDE4] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Преимущества</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { num: '01', title: 'Доверие аудитории', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
              { num: '02', title: 'Живой охват', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
              { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат для сложных продуктов.' },
              { num: '04', title: 'Органика', desc: 'Хороший обзор живёт в выдаче и рекомендациях долгое время.' },
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

      {/* Города */}
      <section className="bg-[#FBF8F3] py-10 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Хабаровск', desc: 'ВКонтакте, Telegram, TikTok', count: BLOGGERS.filter((b) => b.city === 'Хабаровск').length },
              { name: 'Владивосток', desc: 'Telegram, TikTok, Instagram*', count: BLOGGERS.filter((b) => b.city === 'Владивосток').length },
            ].map((c) => (
              <div key={c.name} className="bg-[#F2EDE4] border border-[#E8E2D8] p-6 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-[#0A0A0A] text-xl mb-1" style={{ letterSpacing: '-0.01em' }}>{c.name}</div>
                  <div className="text-sm text-[#5a5347]">{c.desc}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-[#A21D27] text-3xl">{c.count}</div>
                  <div className="text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.12em' }}>блогера</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Фильтры */}
      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
              {CITIES_F.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={social} onChange={(e) => setSocial(e.target.value)} className={inputCls}>
              <option>Все соцсети</option>
              {(['vk', 'telegram', 'tiktok', 'instagram'] as const).map((k) => (
                <option key={k} value={k}>{SOCIALS[k].label}</option>
              ))}
            </select>
            {(city !== 'Все города' || social !== 'Все соцсети') && (
              <button onClick={() => { setCity('Все города'); setSocial('Все соцсети'); }}
                className="flex items-center gap-1 text-xs text-[#5a5347] hover:text-[#A21D27] transition-colors">
                <Icon name="X" size={12} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className="bg-[#FBF8F3] py-12 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>
            Найдено: {filtered.length} блогеров
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#5a5347]">Ничего не найдено. Попробуйте изменить фильтры.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-px bg-[#E8E2D8]">
              {filtered.map((b) => <BloggerCard key={b.id} blogger={b} />)}
            </div>
          )}
        </div>
      </section>

      {/* Instagram дисклеймер */}
      <section className="bg-[#F2EDE4] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] text-[#5a5347] leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.
          </p>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Подобрать блогера" subtitle="Расскажите о продукте — подберём подходящего блогера" />
        </div>
      </section>
    </div>
  );
}
