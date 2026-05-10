import { Link } from 'react-router-dom';
import { Platform, SOCIALS } from '@/data/data';
import Icon from '@/components/ui/icon';

interface PlatformCardProps {
  platform: Platform;
  reversed?: boolean;
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + ' млн';
  if (n >= 1000) return (n / 1000).toFixed(0) + ' тыс.';
  return n.toString();
}

export default function PlatformCard({ platform, reversed = false }: PlatformCardProps) {
  const social = SOCIALS[platform.social];

  return (
    <div className={`flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-border bg-white shadow-sm card-hover ${reversed ? 'md:flex-row-reverse' : ''}`}>
      {/* Visual side */}
      <div className="md:w-2/5 bg-gradient-to-br from-brand-light to-white flex items-center justify-center p-8 min-h-[180px] md:min-h-[220px]">
        <div className="text-center">
          <div className="text-6xl mb-3">{platform.emoji}</div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: social.bg, color: social.color }}>
            {social.emoji} {social.label}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{platform.city}</div>
        </div>
      </div>

      {/* Content side */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-display font-semibold text-brand-dark text-xl">{platform.name}</h3>
            <span className="flex-shrink-0 text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              {platform.type === 'community' ? 'Сообщество' : 'Блогер'}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mb-3">{platform.category}</div>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">{platform.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-brand-light rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-0.5">Подписчики</div>
              <div className="font-display font-bold text-brand-blue text-lg">{formatNumber(platform.subscribers)}</div>
            </div>
            <div className="bg-brand-light rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-0.5">Охват/мес.</div>
              <div className="font-display font-bold text-brand-blue text-lg">{formatNumber(platform.reach)}</div>
            </div>
          </div>

          {/* Formats */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {platform.formats.map((f) => (
              <span key={f} className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">от</div>
            <div className="font-display font-bold text-brand-orange text-lg">{platform.priceFrom.toLocaleString('ru')} ₽</div>
          </div>
          <Link
            to="/contacts"
            className="flex items-center gap-2 bg-brand-orange text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-orange-dark transition-colors"
          >
            <Icon name="MessageCircle" size={14} />
            Заявка
          </Link>
        </div>
      </div>
    </div>
  );
}
