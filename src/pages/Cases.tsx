import { useState, useMemo } from 'react';
import { CASES, SOCIALS } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';

const CITIES_F = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'];
const NICHES_F = ['Все ниши', 'HoReCa', 'Ритейл', 'Образование', 'Красота', 'Мероприятия'];
const SOCIALS_F = ['Все соцсети', 'ВКонтакте', 'Telegram', 'TikTok', 'MAX', 'Одноклассники'];

const inputCls = 'text-sm border border-[#E8E2D8] bg-[#FBF8F3] text-[#0A0A0A] px-3 py-2 focus:outline-none focus:border-[#A21D27] transition-colors';

export default function Cases() {
  const [city, setCity] = useState('Все города');
  const [niche, setNiche] = useState('Все ниши');
  const [socialLabel, setSocialLabel] = useState('Все соцсети');

  const filtered = useMemo(() => CASES.filter((c) => {
    if (city !== 'Все города' && c.city !== city) return false;
    if (niche !== 'Все ниши' && c.niche !== niche) return false;
    if (socialLabel !== 'Все соцсети' && SOCIALS[c.social].label !== socialLabel) return false;
    return true;
  }), [city, niche, socialLabel]);

  const hasFilters = city !== 'Все города' || niche !== 'Все ниши' || socialLabel !== 'Все соцсети';

  useScrollReveal();

  return (
    <div>
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark hero-pad-top pb-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Опыт</div></div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-3">Кейсы</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">Реальные результаты рекламных кампаний в городах Дальнего Востока</p>
        </div>
      </section>

      <section className="bg-[#F2EDE4] border-b border-[#E8E2D8] sticky z-40" style={{ top: 'calc(4rem + env(safe-area-inset-top))' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 sm:py-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 sm:items-center">
            <select value={city} onChange={(e) => setCity(e.target.value)} className={`${inputCls} w-full sm:w-auto`}>
              {CITIES_F.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={niche} onChange={(e) => setNiche(e.target.value)} className={`${inputCls} w-full sm:w-auto`}>
              {NICHES_F.map((n) => <option key={n}>{n}</option>)}
            </select>
            <select value={socialLabel} onChange={(e) => setSocialLabel(e.target.value)} className={`${inputCls} col-span-2 sm:col-span-1 w-full sm:w-auto`}>
              {SOCIALS_F.map((s) => <option key={s}>{s}</option>)}
            </select>
            {hasFilters && (
              <button onClick={() => { setCity('Все города'); setNiche('Все ниши'); setSocialLabel('Все соцсети'); }}
                className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-1 text-xs text-[#5a5347] hover:text-[#A21D27] transition-colors py-1.5" style={{ letterSpacing: '0.08em' }}>
                <Icon name="X" size={12} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 text-xs text-[#5a5347] uppercase" style={{ letterSpacing: '0.16em' }}>
            Показано: {filtered.length} кейсов
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="font-display font-bold text-[#0A0A0A] text-2xl mb-2">Нет подходящих кейсов</h3>
              <p className="text-[#5a5347] text-sm">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8E2D8]">
              {filtered.map((c) => (
                <div key={c.id} className="bg-[#FBF8F3] flex flex-col">
                  {/* Header */}
                  <div className="bg-[#0A0A0A] p-7">
                    <div className="text-3xl mb-3">{c.emoji}</div>
                    <h3 className="font-display font-bold text-[#FBF8F3] text-lg sm:text-xl leading-tight" style={{ letterSpacing: '-0.01em' }}>{c.title}</h3>
                  </div>
                  {/* Body */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <span className="tag">{c.city}</span>
                      <span className="tag">{c.niche}</span>
                      <span className="tag tag-carmine">{SOCIALS[c.social].label}</span>
                      <span className="tag">{c.format}</span>
                    </div>
                    <div className="mb-4">
                      <div className="text-[10px] text-[#5a5347] uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Задача</div>
                      <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">{c.task}</p>
                    </div>
                    <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-4 mb-4 flex-1">
                      <div className="text-[10px] text-[#5a5347] uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Результат</div>
                      <p className="text-sm text-[#0A0A0A] leading-relaxed">{c.result}</p>
                    </div>
                    <div className="border-t border-[#E8E2D8] pt-4">
                      <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Суммарный охват</div>
                      <div className="font-display font-bold text-[#A21D27] text-2xl sm:text-3xl">{c.reach.toLocaleString('ru')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-14 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Хотите похожий результат?" subtitle="Расскажите о вашем бизнесе — составим медиаплан" />
        </div>
      </section>
    </div>
  );
}