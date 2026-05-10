import { useState, useMemo } from 'react';
import { CASES, SOCIALS } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

const CITIES_FILTER = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'];
const NICHES_FILTER = ['Все ниши', 'HoReCa', 'Ритейл', 'Образование', 'Красота', 'Мероприятия'];
const SOCIALS_FILTER = ['Все соцсети', 'ВКонтакте', 'Telegram', 'TikTok', 'MAX', 'Одноклассники'];

export default function Cases() {
  const [city, setCity] = useState('Все города');
  const [niche, setNiche] = useState('Все ниши');
  const [socialLabel, setSocialLabel] = useState('Все соцсети');

  const filtered = useMemo(() => {
    return CASES.filter((c) => {
      if (city !== 'Все города' && c.city !== city) return false;
      if (niche !== 'Все ниши' && c.niche !== niche) return false;
      if (socialLabel !== 'Все соцсети' && SOCIALS[c.social].label !== socialLabel) return false;
      return true;
    });
  }, [city, niche, socialLabel]);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Опыт</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Кейсы</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Реальные результаты рекламных кампаний в городах Дальнего Востока
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3">
            <select value={city} onChange={(e) => setCity(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
              {CITIES_FILTER.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={niche} onChange={(e) => setNiche(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
              {NICHES_FILTER.map((n) => <option key={n}>{n}</option>)}
            </select>
            <select value={socialLabel} onChange={(e) => setSocialLabel(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 focus:outline-none bg-white">
              {SOCIALS_FILTER.map((s) => <option key={s}>{s}</option>)}
            </select>
            {(city !== 'Все города' || niche !== 'Все ниши' || socialLabel !== 'Все соцсети') && (
              <button
                onClick={() => { setCity('Все города'); setNiche('Все ниши'); setSocialLabel('Все соцсети'); }}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-orange transition-colors"
              >
                <Icon name="X" size={14} /> Сбросить
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-12 bg-brand-light min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-sm text-muted-foreground">
            Показано: <span className="font-semibold text-brand-dark">{filtered.length}</span> кейсов
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📂</div>
              <h3 className="font-display font-semibold text-brand-dark text-xl mb-2">Нет подходящих кейсов</h3>
              <p className="text-muted-foreground text-sm">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark p-5 text-white">
                    <div className="text-4xl mb-3">{c.emoji}</div>
                    <h3 className="font-display font-bold text-xl">{c.title}</h3>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md font-medium">{c.city}</span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{c.niche}</span>
                      <span className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-md">{SOCIALS[c.social].label}</span>
                      <span className="text-xs bg-white border border-border px-2 py-1 rounded-md text-muted-foreground">{c.format}</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Задача</div>
                      <p className="text-sm text-brand-dark leading-relaxed">{c.task}</p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                      <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-1">Результат</div>
                      <p className="text-sm text-green-900 leading-relaxed">{c.result}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground">Суммарный охват</div>
                        <div className="font-display font-bold text-brand-orange text-xl">{c.reach.toLocaleString('ru')}</div>
                      </div>
                      <div className="text-2xl">{SOCIALS[c.social].emoji}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContactForm dark title="Хотите похожий результат?" subtitle="Расскажите о вашем бизнесе — составим медиаплан" />
        </div>
      </section>
    </div>
  );
}
