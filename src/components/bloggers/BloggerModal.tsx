import { useEffect } from 'react';
import { Blogger, SOCIALS } from '@/data/data';
import { AvatarSimple } from './BloggerAvatar';
import Icon from '@/components/ui/icon';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

export default function BloggerModal({ blogger, onClose }: { blogger: Blogger; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0A0A0A]/85 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-[#FBF8F3] w-full max-w-3xl my-8 flex flex-col">
        <div className="bg-[#0A0A0A] pattern-dark p-8 flex items-start gap-5">
          <div className="pattern-content flex items-start gap-5 w-full">
            <AvatarSimple blogger={blogger} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-2" style={{ letterSpacing: '0.18em' }}>{blogger.city} · {blogger.category}</div>
              <h2 className="font-display font-bold text-[#FBF8F3] text-2xl leading-tight mb-3" style={{ letterSpacing: '-0.02em' }}>{blogger.name}</h2>
              <p className="text-sm text-[#FBF8F3]/60 leading-relaxed">{blogger.fullDescription}</p>
            </div>
            <button onClick={onClose} className="flex-shrink-0 text-[#FBF8F3]/40 hover:text-[#FBF8F3] transition-colors mt-1" aria-label="Закрыть">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {blogger.audience && blogger.audience.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
              <div className="flex flex-col gap-1.5 text-sm text-[#0A0A0A]">
                {blogger.audience.map((a, i) => <div key={i}>{a}</div>)}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Соцсети и статистика</div>
            <div className="border border-[#E8E2D8] overflow-hidden">
              <div className="hidden sm:grid grid-cols-[140px_110px_1fr_1fr] bg-[#F2EDE4] border-b border-[#E8E2D8]">
                {['Площадка', 'Подписчики', 'Охват / просмотры', 'Вовлечённость'].map((h) => (
                  <div key={h} className="px-4 py-2.5 text-[10px] text-[#5a5347] uppercase font-medium" style={{ letterSpacing: '0.14em' }}>{h}</div>
                ))}
              </div>
              {blogger.socials.map((s) => {
                const info = SOCIALS[s.social];
                return (
                  <div key={s.social} className="grid grid-cols-1 sm:grid-cols-[140px_110px_1fr_1fr] border-b border-[#E8E2D8] last:border-b-0 hover:bg-[#F2EDE4]/40 transition-colors">
                    <div className="px-4 py-3 flex items-center">
                      {s.link
                        ? <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: info.color }}>{info.label}</a>
                        : <span className="text-sm font-medium" style={{ color: info.color }}>{info.label}</span>
                      }
                    </div>
                    <div className="px-4 py-3 font-display font-bold text-[#0A0A0A] text-sm">{fmtSubs(s.subscribers)}</div>
                    <div className="px-4 py-3 text-sm text-[#0A0A0A] whitespace-pre-line">{s.reachLabel}</div>
                    <div className="px-4 py-3 text-sm text-[#5a5347]">{s.engagementLabel || '—'}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Форматы размещения</div>
            <div className="flex flex-wrap gap-2">
              {blogger.formats.map((f) => (
                <span key={f} className="text-xs px-3 py-1.5 bg-[#F2EDE4] text-[#0A0A0A] border border-[#E8E2D8]">{f}</span>
              ))}
            </div>
            {blogger.formatsByPlatform && blogger.formatsByPlatform.length > 0 && (
              <div className="mt-4 flex flex-col gap-1.5 text-sm">
                {blogger.formatsByPlatform.map((fp) => (
                  <div key={fp.platform} className="flex gap-2">
                    <span className="font-medium text-[#0A0A0A]">{fp.platform}:</span>
                    <span className="text-[#5a5347]">{fp.formats}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {blogger.prices && blogger.prices.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Стоимость</div>
              <div className="border border-[#E8E2D8]">
                {blogger.prices.map((p, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2.5 border-b border-[#E8E2D8] last:border-b-0">
                    <div className="text-sm text-[#0A0A0A]">{p.label}</div>
                    <div className="font-display font-bold text-[#A21D27] text-sm">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {blogger.bestPerforming && blogger.bestPerforming.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Что лучше всего заходит</div>
              <div className="flex flex-wrap gap-2">
                {blogger.bestPerforming.map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 bg-[#0A0A0A] text-[#FBF8F3]/80">{p}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Особенно подходит</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {blogger.bestFor.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                  <span className="text-[#A21D27] font-bold flex-shrink-0">✔</span>
                  {b}
                </div>
              ))}
            </div>
            {blogger.doesntFit && (
              <p className="mt-4 text-xs text-[#5a5347] leading-relaxed">{blogger.doesntFit}</p>
            )}
          </div>

          <div className="border-t border-[#E8E2D8] pt-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#0A0A0A] text-2xl">{blogger.priceFromLabel}</div>
            </div>
            <a href="#form" onClick={onClose} className="btn-carmine">Оставить заявку</a>
          </div>
        </div>
      </div>
    </div>
  );
}