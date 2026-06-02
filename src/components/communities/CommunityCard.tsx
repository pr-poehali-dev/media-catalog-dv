import { Community, SOCIALS } from '@/data/data';
import { SOCIAL_ICONS, SOCIAL_ICON_COLORS } from '@/components/bloggers/BloggerAvatar';
import Icon from '@/components/ui/icon';

function SocialIcon({ social }: { social: Community['social'] }) {
  const color = SOCIAL_ICON_COLORS[social] ?? '#888';
  const path = SOCIAL_ICONS[social];
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0"
      style={{ backgroundColor: color }}
      title={SOCIALS[social].label}
    >
      {social === 'max'
        ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/68ec529f-8f3c-44eb-bbad-44dd455d93e1.PNG" alt="MAX" className="w-full h-full object-cover rounded-full" />
        : path
          ? <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white"><path d={path} /></svg>
          : <span className="text-white text-[10px] font-bold">{SOCIALS[social].label[0]}</span>
      }
    </span>
  );
}

function Avatar({ community }: { community: Community }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
      <div className="w-full h-full rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10 flex items-center justify-center">
        {community.avatar
          ? <img src={community.avatar} alt={community.name} className="w-full h-full object-cover" />
          : <span className="text-5xl">{community.emoji}</span>
        }
      </div>
    </div>
  );
}

export default function CommunityCard({ community, onClick }: { community: Community; onClick: () => void }) {
  return (
    <div
      className="group"
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
        <div className="flex flex-col items-center md:items-start pt-6 px-7 pb-6 md:w-[230px] flex-shrink-0">
          <div onClick={onClick} className="cursor-pointer self-center" role="button" aria-label={`Открыть ${community.name}`}>
            <Avatar community={community} />
          </div>
          <div className="mt-5 md:mt-auto md:pt-5">
            <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
            <div className="font-display font-bold text-white text-xl leading-none">{community.priceFromLabel || '—'}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0 px-6 pb-6 pt-2 md:pt-6 md:pl-0 md:pr-8 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <SocialIcon social={community.social} />
                <h3
                  onClick={onClick}
                  className="font-display font-bold text-white leading-tight cursor-pointer hover:text-white/80 transition-colors"
                  style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}
                >
                  {community.name}
                </h3>
              </div>
              <div className="text-[10px] font-medium text-white/40 uppercase" style={{ letterSpacing: '0.16em' }}>
                {community.category || community.city}
              </div>
            </div>
            <button
              onClick={onClick}
              className="flex-shrink-0 flex items-center gap-1 text-[11px] text-white/25 hover:text-white/70 transition-colors mt-1 cursor-pointer"
            >
              Подробнее <Icon name="ArrowRight" size={11} />
            </button>
          </div>
          {community.description && (
            <p className="text-[13px] text-white/50 leading-relaxed">{community.description}</p>
          )}
          <div className="inline-flex self-start" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="px-3 py-2.5">
              <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Подписчиков</div>
              <div
                className="font-display font-black leading-none"
                style={{ fontSize: '1.45rem', letterSpacing: '-0.03em', color: '#C0202A' }}
              >
                {community.subscribersTotal || '—'}
              </div>
            </div>
            <div className="px-3 py-2.5" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Сред. охват публикаций</div>
              <div
                className="font-display font-black leading-none"
                style={{ fontSize: '1.45rem', letterSpacing: '-0.03em', color: '#C0202A' }}
              >
                {community.reachSummary.join('') || '—'}
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] text-white/30 uppercase mb-2" style={{ letterSpacing: '0.14em' }}>Форматы</div>
              <div className="flex flex-wrap gap-1.5">
                {community.formats.length > 0 ? community.formats.slice(0, 6).map((f) => (
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
                )) : <span className="text-[11px] text-white/25">—</span>}
              </div>
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