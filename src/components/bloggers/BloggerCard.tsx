import { Blogger, SOCIALS } from '@/data/data';
import { AvatarWithOrbit, SOCIAL_ICON_COLORS } from './BloggerAvatar';
import Icon from '@/components/ui/icon';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

function SocialLabels({ socials }: { socials: Blogger['socials'] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {socials.map((s) => {
        const color = s.social === 'tiktok' ? '#888' : (SOCIAL_ICON_COLORS[s.social] ?? '#aaa');
        return (
          <span
            key={s.social}
            className="text-[11px] font-semibold uppercase"
            style={{ color, letterSpacing: '0.08em' }}
          >
            {SOCIALS[s.social].label}
          </span>
        );
      })}
    </div>
  );
}

export default function BloggerCard({ blogger, onClick }: { blogger: Blogger; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #1c1c1e 0%, #161618 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.13)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.07) inset';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset';
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center pt-7 px-7 pb-7 md:w-[230px] flex-shrink-0">
          <AvatarWithOrbit blogger={blogger} />
          <div className="mt-auto pt-4 self-start">
            <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
            <div className="font-display font-bold text-white text-xl leading-none">{blogger.priceFromLabel}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0 px-6 pb-7 pt-2 md:pt-7 md:pl-0 md:pr-8 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className="font-display font-bold text-white leading-tight mb-1"
                style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}
              >
                {blogger.name}
              </h3>
              <div className="text-[10px] font-medium text-white/40 uppercase" style={{ letterSpacing: '0.16em' }}>
                {blogger.category}
              </div>
            </div>
            <span className="flex-shrink-0 flex items-center gap-1 text-[11px] text-white/25 group-hover:text-white/60 transition-colors mt-1">
              Подробнее <Icon name="ArrowRight" size={11} />
            </span>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed">{blogger.description}</p>
          <SocialLabels socials={blogger.socials} />
          <div className="flex" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="flex-1 px-4 py-3">
              <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Подписчиков</div>
              <div
                className="font-display font-black leading-none"
                style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', color: '#C0202A' }}
              >
                {blogger.subscribersTotal}
              </div>
            </div>
            <div className="flex-1 px-4 py-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Сред. охват публикаций</div>
              <div
                className="font-display font-black leading-none"
                style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', color: '#C0202A' }}
              >
                {blogger.reachSummary.join('')}
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-white/30 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Форматы</div>
            <div className="flex flex-wrap gap-1.5">
              {blogger.formats.slice(0, 6).map((f) => (
                <span
                  key={f}
                  className="text-[11px] px-2.5 py-1 text-white/60"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '999px',
                  }}
                >
                  {f}
                </span>
              ))}
              {blogger.formats.length > 6 && (
                <span className="text-[11px] px-2.5 py-1 text-white/30">+{blogger.formats.length - 6}</span>
              )}
            </div>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Кому подходит</div>
              <div className="text-[13px] text-white/40">{blogger.bestFor.slice(0, 4).join(' · ')}</div>
            </div>
            <button
              className="btn-carmine flex-shrink-0"
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