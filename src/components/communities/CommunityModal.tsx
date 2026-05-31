import { useEffect } from 'react';
import { Community, SOCIALS } from '@/data/data';
import { SOCIAL_ICONS, SOCIAL_ICON_COLORS } from '@/components/bloggers/BloggerAvatar';
import Icon from '@/components/ui/icon';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

function SocialIcon({ social }: { social: Community['social'] }) {
  const color = SOCIAL_ICON_COLORS[social] ?? '#888';
  const path = SOCIAL_ICONS[social];
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
      title={SOCIALS[social].label}
    >
      {social === 'max'
        ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/68ec529f-8f3c-44eb-bbad-44dd455d93e1.PNG" alt="MAX" className="w-full h-full object-cover rounded-full" />
        : path
          ? <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d={path} /></svg>
          : <span className="text-white text-sm font-bold">{SOCIALS[social].label[0]}</span>
      }
    </span>
  );
}

export default function CommunityModal({ community, onClose }: { community: Community; onClose: () => void }) {
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
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10 flex-shrink-0 flex items-center justify-center">
              {community.avatar
                ? <img src={community.avatar} alt={community.name} className="w-full h-full object-cover" />
                : <span className="text-4xl">{community.emoji}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium text-[#FBF8F3]/40 uppercase mb-2" style={{ letterSpacing: '0.18em' }}>{community.city}{community.category ? ` · ${community.category}` : ''}</div>
              <div className="flex items-center gap-2.5 mb-3">
                <SocialIcon social={community.social} />
                <h2 className="font-display font-bold text-[#FBF8F3] text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>{community.name}</h2>
              </div>
              {community.fullDescription && (
                <p className="text-sm text-[#FBF8F3]/60 leading-relaxed">{community.fullDescription}</p>
              )}
            </div>
            <button onClick={onClose} className="flex-shrink-0 text-[#FBF8F3]/40 hover:text-[#FBF8F3] transition-colors mt-1" aria-label="Закрыть">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="bg-[#FBF8F3] pattern-milk">
        <div className="pattern-content p-8 flex flex-col gap-8">
          {community.audience && community.audience.length > 0 && (
            <div>
              <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>Аудитория</div>
              <div className="flex flex-col gap-1.5 text-sm text-[#0A0A0A]">
                {community.audience.map((a, i) => <div key={i}>{a}</div>)}
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
              {community.socials.map((s) => {
                const info = SOCIALS[s.social];
                return (
                  <div key={s.social} className="grid grid-cols-1 sm:grid-cols-[140px_110px_1fr_1fr] border-b border-[#E8E2D8] last:border-b-0 hover:bg-[#F2EDE4]/40 transition-colors">
                    <div className="px-4 py-3 flex items-center">
                      {s.link
                        ? <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: info.color }}>{info.label}</a>
                        : <span className="text-sm font-medium" style={{ color: info.color }}>{info.label}</span>
                      }
                    </div>
                    <div className="px-4 py-3 font-display font-bold text-[#0A0A0A] text-sm">{s.subscribers ? fmtSubs(s.subscribers) : '—'}</div>
                    <div className="px-4 py-3 text-sm text-[#0A0A0A] whitespace-pre-line">{s.reachLabel || '—'}</div>
                    <div className="px-4 py-3 text-sm text-[#5a5347]">{s.engagementLabel || '—'}</div>
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
              <div className="border border-[#E8E2D8]">
                {community.prices.map((p, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2.5 border-b border-[#E8E2D8] last:border-b-0">
                    <div className="text-sm text-[#0A0A0A]">{p.label}</div>
                    <div className="font-display font-bold text-[#A21D27] text-sm">{p.price}</div>
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

          <div className="border-t border-[#E8E2D8] pt-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-[#0A0A0A] text-2xl">{community.priceFromLabel || '—'}</div>
            </div>
            <a href="#form" onClick={onClose} className="btn-carmine">Оставить заявку</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}