import { useEffect, useState } from 'react';
import { Blogger, SOCIALS, parseReach } from '@/data/data';
import { AvatarSimple } from './BloggerAvatar';
import AudienceCharts from './AudienceCharts';
import Icon from '@/components/ui/icon';
import { downloadBloggerMediakit } from '@/lib/mediakit';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

export default function BloggerModal({ blogger, onClose }: { blogger: Blogger; onClose: () => void }) {
  const [loadingPdf, setLoadingPdf] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleMediakit = async () => {
    setLoadingPdf(true);
    try {
      await downloadBloggerMediakit(blogger);
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#0A0A0A]/85 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-[#FBF8F3] w-full max-w-3xl my-4 sm:my-8 flex flex-col">
        <div className="bg-[#0A0A0A] pattern-dark p-5 sm:p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex-shrink-0 text-[#FBF8F3]/40 hover:text-[#FBF8F3] transition-colors" aria-label="Закрыть">
            <Icon name="X" size={22} />
          </button>
          <div className="pattern-content flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 w-full">
            <div className="flex items-center gap-4 sm:block">
              <AvatarSimple blogger={blogger} />
              <div className="min-w-0 sm:hidden">
                <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase truncate" style={{ letterSpacing: '0.14em' }}>{blogger.city}</div>
                <div className="text-[11px] text-[#FBF8F3]/35">{blogger.category}</div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="hidden sm:block text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-2" style={{ letterSpacing: '0.18em' }}>{blogger.city} · {blogger.category}</div>
              <h2 className="font-display font-bold text-[#FBF8F3] text-xl sm:text-2xl leading-tight mb-3 pr-8 sm:pr-0" style={{ letterSpacing: '-0.02em' }}>{blogger.name}</h2>
              <p className="text-sm text-[#FBF8F3]/60 leading-relaxed max-w-prose">{blogger.fullDescription}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FBF8F3] pattern-milk">
        <div className="pattern-content p-5 sm:p-8 flex flex-col gap-8">
          {blogger.audienceCharts ? (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
              <AudienceCharts data={blogger.audienceCharts} />
            </div>
          ) : blogger.audience && blogger.audience.length > 0 ? (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
              <div className="flex flex-col gap-1.5 text-sm text-[#0A0A0A]">
                {blogger.audience.map((a, i) => <div key={i}>{a}</div>)}
              </div>
            </div>
          ) : null}

          {(() => {
            const detailed = blogger.socials.some((s) => s.viewsLabel !== undefined);
            const cols = detailed ? 'sm:grid-cols-[100px_80px_1fr_1fr_1fr]' : 'sm:grid-cols-[100px_1fr_1.4fr_1fr]';
            const headers = detailed
              ? ['Площадка', 'Подписчики', 'Просмотры / 30 дн.', 'Охват', 'Вовлечённость']
              : ['Площадка', 'Подписчики', 'Сред. охват публикации', 'Вовлечённость'];
            const sortedSocials = [...blogger.socials].sort(
              (a, b) => parseReach(detailed ? b.viewsLabel : b.reachLabel) - parseReach(detailed ? a.viewsLabel : a.reachLabel)
            );
            return (
              <div>
                <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Соцсети и статистика</div>
                <div className="border border-[#E8E2D8] overflow-hidden bg-[#FBF8F3]">
                  <div className={`hidden sm:grid ${cols} bg-[#F2EDE4] border-b border-[#E8E2D8]`}>
                    {headers.map((h, hi) => (
                      <div key={h} className={`px-3 py-2.5 text-[10px] text-[#5a5347] uppercase font-medium ${hi === 0 ? '' : 'text-center'}`} style={{ letterSpacing: '0.14em' }}>{h}</div>
                    ))}
                  </div>
                  {sortedSocials.map((s) => {
                    const info = SOCIALS[s.social];
                    const cell = 'px-3 py-2 sm:py-3 text-sm text-[#0A0A0A] flex items-center justify-between sm:justify-center sm:text-center whitespace-nowrap';
                    const lbl = 'text-[10px] text-[#5a5347] uppercase sm:hidden';
                    return (
                      <div key={s.social} className={`grid grid-cols-1 ${cols} border-b border-[#E8E2D8] last:border-b-0 hover:bg-[#F2EDE4]/40 transition-colors`}>
                        <div className="px-3 pt-3 pb-2 sm:py-3 flex items-center border-b border-[#E8E2D8]/60 sm:border-b-0">
                          {s.link
                            ? <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline" style={{ color: info.color }}>{info.label}</a>
                            : <span className="text-sm font-semibold" style={{ color: info.color }}>{info.label}</span>
                          }
                        </div>
                        <div className={cell}>
                          <span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[1]}</span>
                          <span className="font-display font-bold">{fmtSubs(s.subscribers)}</span>
                        </div>
                        {detailed ? (
                          <>
                            <div className={cell}><span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[2]}</span><span>{s.viewsLabel || '—'}</span></div>
                            <div className={cell}><span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[3]}</span><span>{s.reachOnlyLabel || '—'}</span></div>
                            <div className={`${cell} pb-3`}><span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[4]}</span><span className="text-[#5a5347]">{s.engagementLabel || '—'}</span></div>
                          </>
                        ) : (
                          <>
                            <div className={cell}><span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[2]}</span><span>{s.reachLabel}</span></div>
                            <div className={`${cell} pb-3`}><span className={lbl} style={{ letterSpacing: '0.1em' }}>{headers[3]}</span><span className="text-[#5a5347]">{s.engagementLabel || '—'}</span></div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

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
              <div className="border border-[#E8E2D8] bg-[#FBF8F3]">
                {blogger.prices.map((p, i) => (
                  <div key={i} className="border-b border-[#E8E2D8] last:border-b-0">
                    <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2.5">
                      <div className="text-sm font-medium text-[#0A0A0A]">{p.label}</div>
                      {p.price && <div className="font-display font-bold text-[#A21D27] text-sm">{p.price}</div>}
                    </div>
                    {p.sub && p.sub.length > 0 && (
                      <div className="pb-2">
                        {p.sub.map((s, j) => (
                          <div key={j} className="grid grid-cols-[1fr_auto] gap-4 pl-8 pr-4 py-1.5">
                            <div className="flex items-center gap-2 text-[13px] text-[#5a5347]">
                              <span className="text-[#A21D27]">—</span>{s.label}
                            </div>
                            <div className="font-display font-semibold text-[#A21D27]/80 text-[13px]">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Подходит</div>
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

          {blogger.bestPerforming && blogger.bestPerforming.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Лучше всего заходит</div>
              <div className="flex flex-wrap gap-2">
                {blogger.bestPerforming.map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 bg-[#0A0A0A] text-[#FBF8F3]/80">{p}</span>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E8E2D8] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#0A0A0A] text-2xl">{blogger.priceFromLabel}</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
              <button onClick={handleMediakit} disabled={loadingPdf} className="btn-outline-dark justify-center w-full sm:w-auto">
                <Icon name={loadingPdf ? 'Loader' : 'Download'} size={16} className={loadingPdf ? 'animate-spin' : ''} />
                {loadingPdf ? 'Готовим…' : 'Скачать медиакит'}
              </button>
              <a href="#form" onClick={onClose} className="btn-carmine justify-center w-full sm:w-auto">Оставить заявку</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}