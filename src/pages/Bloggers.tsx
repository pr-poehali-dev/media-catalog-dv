import { useState, useMemo, useEffect } from 'react';
import { BLOGGERS, SOCIALS, Blogger } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';


function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

const SOCIAL_ICONS: Record<string, string> = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  tiktok: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.21 8.21 0 004.84 1.56V7.07a4.85 4.85 0 01-1.07-.38z',
  vk: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.713-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.712-.576.712z',
  telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  max: 'M4 4h4l4 6 4-6h4L14 12l6 8h-4l-4-6-4 6H4l6-8z',
  ok: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm3.75 8.75l-1.5-1.5a4.5 4.5 0 01-4.5 0l-1.5 1.5L7 14l1.75-1.75A6.5 6.5 0 0012 13a6.5 6.5 0 003.25-.75L17 14l-1.25 1.25z',
};

const SOCIAL_ICON_COLORS: Record<string, string> = {
  instagram: '#C13584',
  tiktok: '#010101',
  vk: '#0077FF',
  telegram: '#229ED9',
  youtube: '#FF0000',
  max: '#7C3AED',
  ok: '#EE8208',
};

const ORBIT_POSITIONS = [
  { top: '-14%', left: '62%' },
  { top: '74%',  left: '-4%' },
  { top: '-10%', left: '14%' },
  { top: '74%',  left: '66%' },
  { top: '38%',  left: '-12%' },
  { top: '-16%', left: '38%' },
];

function SocialOrbit({ socials }: { socials: Blogger['socials'] }) {
  return (
    <>
      {socials.map((s, i) => {
        const pos = ORBIT_POSITIONS[i % ORBIT_POSITIONS.length];
        const color = SOCIAL_ICON_COLORS[s.social] ?? '#555';
        const path = SOCIAL_ICONS[s.social];
        return (
          <div
            key={s.social}
            className="absolute w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{ top: pos.top, left: pos.left, backgroundColor: color, zIndex: 10 }}
          >
            {s.social === 'max'
              ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/7a2573ac-3a6b-46f3-9cdc-c3a29fa952a9.png" alt="MAX" className="w-full h-full object-cover rounded-full" />
              : path
                ? <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d={path} /></svg>
                : <span className="text-white text-xs font-bold">{SOCIALS[s.social].label[0]}</span>
            }
          </div>
        );
      })}
    </>
  );
}

function AvatarWithOrbit({ blogger }: { blogger: Blogger }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
      <div className="w-full h-full rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10">
        {blogger.avatar
          ? <img src={blogger.avatar} alt={blogger.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-5xl">{blogger.emoji}</div>
        }
      </div>
      <SocialOrbit socials={blogger.socials} />
    </div>
  );
}

function AvatarSimple({ blogger }: { blogger: Blogger }) {
  return (
    <div className="w-20 h-20 rounded-full overflow-hidden bg-[#111] ring-2 ring-white/10 flex-shrink-0">
      {blogger.avatar
        ? <img src={blogger.avatar} alt={blogger.name} className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center text-4xl">{blogger.emoji}</div>
      }
    </div>
  );
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

function BloggerModal({ blogger, onClose }: { blogger: Blogger; onClose: () => void }) {
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
        <div className="bg-[#0A0A0A] p-8 flex items-start gap-5">
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

function BloggerCard({ blogger, onClick }: { blogger: Blogger; onClick: () => void }) {
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
        {/* Левая колонка: только аватар */}
        <div className="flex items-start justify-center pt-7 px-7 md:pt-7 md:w-[200px] flex-shrink-0">
          <AvatarWithOrbit blogger={blogger} />
        </div>

        {/* Правая колонка */}
        <div className="flex-1 min-w-0 px-6 pb-7 pt-2 md:pt-7 md:pl-0 md:pr-8 flex flex-col gap-4">

          {/* Уровень 1: Название + hint */}
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

          {/* Описание */}
          <p className="text-[13px] text-white/50 leading-relaxed">{blogger.description}</p>

          {/* Соцсети */}
          <SocialLabels socials={blogger.socials} />

          {/* Уровень 2: Метрики */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Подписчиков</div>
              <div
                className="font-display font-black text-[#A21D27] leading-none"
                style={{ fontSize: '1.7rem', letterSpacing: '-0.03em' }}
              >
                {blogger.subscribersTotal}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Охват</div>
              <div className="text-[13px] text-white/65 leading-snug">
                {blogger.reachSummary.map((r, i) => <div key={i}>{r}</div>)}
              </div>
            </div>
          </div>

          {/* Уровень 3: Форматы */}
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

          {/* Уровень 3: Кому подходит */}
          <div>
            <div className="text-[10px] text-white/30 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Кому подходит</div>
            <div className="text-[13px] text-white/40">{blogger.bestFor.slice(0, 4).join(' · ')}</div>
          </div>

          {/* Уровень 4: Стоимость + кнопка */}
          <div className="flex items-end justify-between gap-4 pt-1">
            <div>
              <div className="text-[10px] text-white/30 uppercase mb-1" style={{ letterSpacing: '0.14em' }}>Стоимость</div>
              <div className="font-display font-bold text-white text-xl leading-none">{blogger.priceFromLabel}</div>
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

const ADVANTAGES = [
  { num: '01', title: 'Доверие аудитории', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
  { num: '02', title: 'Вовлечённость', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
  { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат как для простых, так и для сложных продуктов.' },
  { num: '04', title: 'Долгий эффект', desc: 'Хорошие обзоры продолжают набирать просмотры неделями и месяцами после публикации.' },
];

const CITY_FILTERS: Array<'Все города' | 'Хабаровск' | 'Владивосток'> = ['Все города', 'Хабаровск', 'Владивосток'];

export default function Bloggers() {
  const [selected, setSelected] = useState<Blogger | null>(null);
  const [city, setCity] = useState<'Все города' | 'Хабаровск' | 'Владивосток'>('Все города');

  const filtered = useMemo(() => {
    if (city === 'Все города') return BLOGGERS;
    return BLOGGERS.filter((b) => b.city === city);
  }, [city]);

  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 02</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Реклама у блогеров</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Люди доверяют людям, а не баннерам. Поэтому реклама у блогеров работает лучше обычных объявлений.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#form" className="btn-carmine">Подобрать блогера</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в MAX</a>
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE4] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Преимущества</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {ADVANTAGES.map((item) => (
              <div key={item.num} className="bg-[#F2EDE4] p-7 flex flex-col">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg leading-snug" style={{ letterSpacing: '-0.01em', minHeight: '3.5rem' }}>{item.title}</h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="section-rule" />
              <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 rounded-full">
              {CITY_FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className="text-[11px] font-medium uppercase px-4 py-2 transition-colors rounded-full"
                  style={{
                    letterSpacing: '0.12em',
                    background: city === c ? '#A21D27' : 'transparent',
                    color: city === c ? '#FBF8F3' : 'rgba(251,248,243,0.5)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#FBF8F3]/40">Ничего не найдено</div>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map((b) => (
                <BloggerCard key={b.id} blogger={b} onClick={() => setSelected(b)} />
              ))}
            </div>
          )}

          <p className="mt-10 text-[11px] text-[#FBF8F3]/25 leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
            Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.
          </p>
        </div>
      </section>

      <section className="bg-[#F2EDE4] pattern-milk py-6">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-px bg-[#E8E2D8]">
            {[
              { value: '6', label: 'проектов' },
              { value: '26', label: 'площадок' },
              { value: '32 млн+', label: 'охвата в месяц' },
            ].map((s) => (
              <div key={s.label} className="bg-[#F2EDE4] py-5 px-6 flex items-center gap-3">
                <div className="font-display font-black text-[#A21D27] text-3xl leading-none" style={{ letterSpacing: '-0.02em' }}>{s.value}</div>
                <div className="text-xs text-[#5a5347] uppercase leading-tight" style={{ letterSpacing: '0.12em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="bg-[#0A0A0A] pattern-dark py-16 border-t border-[#FBF8F3]/5">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <ContactForm dark title="Подобрать блогера" subtitle="Расскажите о продукте — подберём подходящего блогера и соцсеть" source="Блогеры" />
        </div>
      </section>

      {selected && <BloggerModal blogger={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}