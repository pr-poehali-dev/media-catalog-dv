import { useEffect, useState } from 'react';
import { Community, SOCIALS, parseReach } from '@/data/data';
import { SOCIAL_ICONS, SOCIAL_ICON_COLORS } from '@/components/bloggers/BloggerAvatar';
import AudienceCharts from '@/components/bloggers/AudienceCharts';
import { downloadCommunityMediakit } from '@/lib/mediakit';
import Icon from '@/components/ui/icon';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

function SocialIcon({ social, size = 'md' }: { social: Community['social']; size?: 'sm' | 'md' }) {
  const color = SOCIAL_ICON_COLORS[social] ?? '#888';
  const path = SOCIAL_ICONS[social];
  const box = size === 'sm' ? 'w-6 h-6' : 'w-9 h-9';
  const svg = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <span
      className={`inline-flex items-center justify-center ${box} rounded-full flex-shrink-0`}
      style={{ backgroundColor: color }}
      title={SOCIALS[social].label}
    >
      {social === 'max'
        ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/68ec529f-8f3c-44eb-bbad-44dd455d93e1.PNG" alt="MAX" className="w-full h-full object-cover rounded-full" />
        : path
          ? <svg viewBox="0 0 24 24" className={`${svg} fill-white`}><path d={path} /></svg>
          : <span className="text-white text-xs font-bold">{SOCIALS[social].label[0]}</span>
      }
    </span>
  );
}

export default function CommunityModal({ community, onClose }: { community: Community; onClose: () => void }) {
  const [loadingPdf, setLoadingPdf] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleMediakit = async () => {
    setLoadingPdf(true);
    try {
      await downloadCommunityMediakit(community);
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
          <div className="pattern-content w-full">
            {/* Шапка: аватар слева, справа — иконка+название, город, тематика */}
            <div className="flex flex-row items-start gap-4 pr-8 sm:pr-10">
              {/* Аватар проекта */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10 flex-shrink-0 flex items-center justify-center">
                {community.avatar
                  ? <img src={community.avatar} alt={community.name} className="w-full h-full object-cover" />
                  : <span className="text-3xl sm:text-4xl">{community.emoji}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                {/* Иконка соцсети + название */}
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="mt-0.5"><SocialIcon social={community.social} size="sm" /></span>
                  <h2 className="min-w-0 font-display font-bold text-[#FBF8F3] text-xl sm:text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>{community.name}</h2>
                </div>
                {/* Город */}
                <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-1" style={{ letterSpacing: '0.16em' }}>{community.city}</div>
                {/* Тематика */}
                {community.category && (
                  <div className="text-[13px] text-[#FBF8F3]/55 leading-snug">{community.category}</div>
                )}
              </div>
            </div>
            {/* Описание — на всю ширину */}
            {community.fullDescription && (
              <p className="mt-4 text-sm text-[#FBF8F3]/60 leading-relaxed whitespace-pre-line">{community.fullDescription}</p>
            )}
            {community.social === 'instagram' && (
              <p className="mt-3 text-[11px] text-[#FBF8F3]/40 leading-relaxed">
                Стандартное рекламное размещение в Instagram* на территории РФ не предлагаем. Присутствие в соцсети возможно только в информационном формате с учётом правовых ограничений.
              </p>
            )}
            {community.rkn && (
              <p className="mt-3 text-[11px] text-[#FBF8F3]/40 leading-relaxed">
                Включена Роскомнадзором в перечень персональных страниц:<br />
                <a href={community.rkn} target="_blank" rel="noopener noreferrer" className="text-[#FBF8F3]/70 underline hover:text-[#FBF8F3] break-all">{community.rkn}</a>
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#FBF8F3] pattern-milk">
        <div className="pattern-content p-5 sm:p-8 flex flex-col gap-8">
          {community.audienceCharts ? (
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-[10px] font-medium text-[#5a5347] uppercase" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
                {community.statsLink && (
                  <a
                    href={community.statsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#5a5347] hover:text-[#A21D27] border border-[#E8E2D8] hover:border-[#A21D27] rounded-full px-3 py-1.5 transition-colors"
                  >
                    <Icon name="BarChart3" size={13} />
                    Полная статистика
                  </a>
                )}
              </div>
              <AudienceCharts data={community.audienceCharts} />
            </div>
          ) : community.audience && community.audience.length > 0 ? (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
              <div className="flex flex-col gap-1.5 text-sm text-[#0A0A0A]">
                {community.audience.map((a, i) => <div key={i}>{a}</div>)}
              </div>
            </div>
          ) : null}

          <div>
            <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Соцсети и статистика</div>
            <div className="border border-[#E8E2D8] overflow-hidden">
              <div className="hidden sm:grid grid-cols-[110px_90px_1fr_1fr] bg-[#F2EDE4] border-b border-[#E8E2D8]">
                {['Площадка', 'Подписчики', 'Сред. охват публикации', 'Вовлечённость'].map((h, hi) => (
                  <div key={h} className={`px-4 py-2.5 text-[10px] text-[#5a5347] uppercase font-medium ${hi === 0 ? '' : 'text-center'}`} style={{ letterSpacing: '0.14em' }}>{h}</div>
                ))}
              </div>
              {[...community.socials].sort((a, b) => parseReach(b.reachLabel) - parseReach(a.reachLabel)).map((s) => {
                const info = SOCIALS[s.social];
                return (
                  <div key={s.social} className="grid grid-cols-1 sm:grid-cols-[110px_90px_1fr_1fr] border-b border-[#E8E2D8] last:border-b-0 hover:bg-[#F2EDE4]/40 transition-colors">
                    <div className="px-4 pt-3 pb-2 sm:py-3 flex items-center border-b border-[#E8E2D8]/60 sm:border-b-0">
                      {s.link
                        ? <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline" style={{ color: info.color }}>{info.label}</a>
                        : <span className="text-sm font-semibold" style={{ color: info.color }}>{info.label}</span>
                      }
                    </div>
                    <div className="px-4 py-2 sm:py-3 flex items-center justify-between sm:justify-center text-center">
                      <span className="text-[10px] text-[#5a5347] uppercase sm:hidden" style={{ letterSpacing: '0.1em' }}>Подписчики</span>
                      <span className="font-display font-bold text-[#0A0A0A] text-sm">{s.subscribers ? fmtSubs(s.subscribers) : '—'}</span>
                    </div>
                    <div className="px-4 py-2 sm:py-3 flex items-center justify-between sm:justify-center text-center">
                      <span className="text-[10px] text-[#5a5347] uppercase sm:hidden" style={{ letterSpacing: '0.1em' }}>Сред. охват</span>
                      <span className="text-sm text-[#0A0A0A] whitespace-pre-line">{s.reachLabel || '—'}</span>
                    </div>
                    <div className="px-4 pt-2 pb-3 sm:py-3 flex items-center justify-between sm:justify-center text-center">
                      <span className="text-[10px] text-[#5a5347] uppercase sm:hidden" style={{ letterSpacing: '0.1em' }}>Вовлечённость</span>
                      <span className="text-sm text-[#5a5347]">{s.engagementLabel || '—'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {community.formats.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Форматы размещения</div>
              <div className="flex flex-wrap gap-2">
                {community.formats.map((f) => (
                  <span key={f} className="text-xs px-3 py-1.5 bg-[#F2EDE4] text-[#0A0A0A] border border-[#E8E2D8]">{f}</span>
                ))}
              </div>
            </div>
          )}

          {community.prices && community.prices.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Стоимость</div>
              <div className="border border-[#E8E2D8] bg-[#FBF8F3]">
                {community.prices.map((p, i) => (
                  <div key={i} className="border-b border-[#E8E2D8] last:border-b-0">
                    <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2.5">
                      <div className="text-sm font-medium text-[#0A0A0A]">{p.label}</div>
                      {p.price && <div className="font-display font-bold text-[#A21D27] text-sm whitespace-nowrap">{p.price}</div>}
                    </div>
                    {p.sub && p.sub.length > 0 && (
                      <div className="pb-2">
                        {p.sub.map((s, j) => (
                          <div key={j} className="grid grid-cols-[1fr_auto] gap-4 pl-8 pr-4 py-1.5">
                            <div className="flex items-center gap-2 text-[13px] text-[#5a5347]">
                              <span className="text-[#A21D27]">—</span>{s.label}
                            </div>
                            <div className="font-display font-semibold text-[#A21D27]/80 text-[13px] whitespace-nowrap">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {community.bestFor.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Особенно подходит</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {community.bestFor.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-[#0A0A0A]">
                    <span className="text-[#A21D27] font-bold flex-shrink-0">✔</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E8E2D8] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#0A0A0A] text-2xl">{community.priceFromLabel || '—'}</div>
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