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
        const label = SOCIALS[s.social].label;
        return s.link ? (
          <a
            key={s.social}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] font-semibold uppercase hover:underline transition-opacity hover:opacity-80"
            style={{ color, letterSpacing: '0.08em' }}
          >
            {label}
          </a>
        ) : (
          <span
            key={s.social}
            className="text-[11px] font-semibold uppercase"
            style={{ color, letterSpacing: '0.08em' }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}

export default function BloggerCard({ blogger, onClick }: { blogger: Blogger; onClick: () => void }) {
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
        {/* Левая колонка / шапка на мобильном */}
        <div className="flex flex-row md:flex-col items-center md:items-center gap-3 md:gap-0 pt-5 md:pt-7 px-5 sm:px-7 pb-0 md:pb-7 md:w-[230px] flex-shrink-0">
          <div onClick={onClick} className="cursor-pointer flex-shrink-0 scale-[0.62] md:scale-100 origin-center -m-7 md:m-0" role="button" aria-label={`Открыть ${blogger.name}`}>
            <AvatarWithOrbit blogger={blogger} />
          </div>
          {/* Рядом с аватаром на мобильном */}
          <div className="min-w-0 flex-1 md:hidden">
            <h3
              onClick={onClick}
              className="font-display font-bold text-white leading-tight cursor-pointer mb-1"
              style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {blogger.name}
            </h3>
            <div
              className="text-[10px] font-medium text-white/40 uppercase mb-2.5 leading-snug"
              style={{ letterSpacing: '0.1em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {blogger.category}
            </div>
            <div className="text-[10px] text-white/30 uppercase mb-0.5" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
            <div className="font-display font-bold text-[#E0353F] text-lg leading-none whitespace-nowrap">{blogger.priceFromLabel}</div>
          </div>
          {/* Цена на десктопе */}
          <div className="hidden md:block md:mt-auto md:pt-4 md:self-start">
            <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
            <div className="font-display font-bold text-white text-xl leading-none">{blogger.priceFromLabel}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0 px-5 sm:px-6 pb-6 pt-4 md:pt-7 md:pl-0 md:pr-8 flex flex-col gap-4">
          {/* Название только на десктопе */}
          <div className="hidden md:flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                onClick={onClick}
                className="font-display font-bold text-white leading-tight mb-1 cursor-pointer hover:text-white/80 transition-colors inline-block"
                style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}
              >
                {blogger.name}
              </h3>
              <div className="text-[10px] font-medium text-white/40 uppercase" style={{ letterSpacing: '0.16em' }}>
                {blogger.category}
              </div>
            </div>
            <button
              onClick={onClick}
              className="flex-shrink-0 flex items-center gap-1 text-[11px] text-white/25 hover:text-white/70 transition-colors mt-1 cursor-pointer"
            >
              Подробнее <Icon name="ArrowRight" size={11} />
            </button>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed">{blogger.description}</p>
          <SocialLabels socials={blogger.socials} />
          <div className="grid grid-cols-2 self-stretch md:self-start md:flex" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
            <div className="min-w-0 px-3.5 py-3">
              <div className="text-[9px] text-white/35 uppercase mb-1.5" style={{ letterSpacing: '0.12em' }}>Подписчиков</div>
              <div
                className="font-display font-black leading-none whitespace-nowrap"
                style={{ fontSize: 'clamp(1.05rem, 5vw, 1.4rem)', letterSpacing: '-0.03em', color: '#E0353F' }}
              >
                {blogger.subscribersTotal}
              </div>
            </div>
            <div className="min-w-0 px-3.5 py-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-[9px] text-white/35 uppercase mb-1.5" style={{ letterSpacing: '0.12em' }}>Сред. охват</div>
              <div
                className="font-display font-black leading-none whitespace-nowrap"
                style={{ fontSize: 'clamp(1.05rem, 5vw, 1.4rem)', letterSpacing: '-0.03em', color: '#E0353F' }}
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
          <div>
            <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Кому подходит</div>
            <div className="text-[13px] text-white/40">{blogger.bestFor.slice(0, 4).join(' · ')}</div>
          </div>
          <div className="mt-2 md:mt-auto flex flex-col sm:flex-row md:justify-end gap-2.5">
            <button
              onClick={onClick}
              className="btn-outline-carmine justify-center w-full sm:w-auto md:hidden"
            >
              Подробнее
            </button>
            <button
              className="btn-carmine justify-center w-full sm:w-auto"
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