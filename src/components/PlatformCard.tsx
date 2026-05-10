import { Link } from 'react-router-dom';
import { Platform, SOCIALS } from '@/data/data';

interface PlatformCardProps {
  platform: Platform;
  reversed?: boolean;
}

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return Math.round(n / 1000) + ' тыс.';
  return String(n);
}

export default function PlatformCard({ platform, reversed = false }: PlatformCardProps) {
  const social = SOCIALS[platform.social];

  return (
    <div className={`flex flex-col md:flex-row pcard overflow-hidden ${reversed ? 'md:flex-row-reverse' : ''}`}>
      {/* Visual side */}
      <div
        className="md:w-2/5 flex flex-col items-center justify-center p-10 min-h-[200px] md:min-h-[240px]"
        style={{ background: '#F2EDE4' }}
      >
        <div className="text-5xl mb-4" role="img" aria-label={platform.name}>{platform.emoji}</div>
        <div
          className="text-[11px] font-medium tracking-widest uppercase mb-2"
          style={{ color: social.color, letterSpacing: '0.16em' }}
        >
          {social.label}
        </div>
        <div className="text-[11px] text-[#5a5347] tracking-wider uppercase" style={{ letterSpacing: '0.14em' }}>
          {platform.city}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-display font-bold text-[#0A0A0A] text-xl leading-tight" style={{ letterSpacing: '-0.01em' }}>
              {platform.name}
            </h3>
            <span className="tag flex-shrink-0 mt-1">
              {platform.type === 'community' ? 'Сообщество' : 'Блогер'}
            </span>
          </div>
          <div className="text-[11px] text-[#5a5347] mb-3 tracking-wider uppercase" style={{ letterSpacing: '0.14em' }}>
            {platform.category}
          </div>
          <p className="text-sm text-[#0A0A0A]/65 leading-relaxed mb-5">{platform.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Подписчики</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(platform.subscribers)}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Охват / мес.</div>
              <div className="font-display font-bold text-[#A21D27] text-2xl">{fmt(platform.reach)}</div>
            </div>
          </div>

          {/* Formats */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {platform.formats.map((f) => (
              <span key={f} className="tag">{f}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-5 border-t border-[#E8E2D8]">
          <div>
            <div className="text-[10px] text-[#5a5347] uppercase" style={{ letterSpacing: '0.14em' }}>от</div>
            <div className="font-display font-bold text-[#0A0A0A] text-xl">{platform.priceFrom.toLocaleString('ru')} ₽</div>
          </div>
          <Link to="/contacts" className="btn-carmine">
            Оставить заявку
          </Link>
        </div>
      </div>
    </div>
  );
}
