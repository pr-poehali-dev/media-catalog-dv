import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';
import CampaignModal from '@/components/campaigns/CampaignModal';
import { BriefDraft, EMPTY_DRAFT } from '@/components/campaigns/briefTypes';
import { trackEvent } from '@/lib/analytics';
import {
  CAMPAIGN_FORMATS,
  CAMPAIGN_FAQ,
  CampaignIntent,
  CampaignFormat,
  getFormat,
} from '@/data/campaigns';

type View = 'details' | 'brief';

const LEGACY_HASH: Record<string, CampaignIntent> = {
  '#test': 'test',
  '#growth': 'growth',
  '#quarter': 'quarter',
  '#audit': 'audit',
  '#custom': 'custom',
};

export default function Campaigns() {
  useScrollReveal();
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<BriefDraft>(EMPTY_DRAFT);
  const openerRef = useRef<HTMLElement | null>(null);
  const seenRef = useRef<Set<string>>(new Set());

  const rawIntent = params.get('intent');
  const legacyIntent = LEGACY_HASH[location.hash] ?? null;
  const intent = getFormat(rawIntent)?.intent ?? legacyIntent;
  const format: CampaignFormat | null = getFormat(intent);
  const view: View = params.get('view') === 'brief' || location.hash === '#brief' ? 'brief' : 'details';

  // Совместимость со старыми хэш-ссылками: переводим их в параметры
  useEffect(() => {
    if (!legacyIntent && location.hash !== '#brief') return;
    const next = new URLSearchParams(params);
    if (legacyIntent) next.set('intent', legacyIntent);
    if (location.hash === '#brief') next.set('view', 'brief');
    navigate({ pathname: '/campaigns', search: `?${next.toString()}` }, { replace: true });
  }, [legacyIntent, location.hash, params, navigate]);

  const openModal = useCallback(
    (nextIntent: CampaignIntent, nextView: View, opener?: HTMLElement | null, placement = 'card') => {
      openerRef.current = opener ?? null;
      const next = new URLSearchParams(params);
      next.set('intent', nextIntent);
      next.set('view', nextView);
      setParams(next);
      trackEvent('campaign_modal_open', { intent: nextIntent, entry_view: nextView, placement });
    },
    [params, setParams],
  );

  const closeModal = useCallback(() => {
    const next = new URLSearchParams(params);
    next.delete('intent');
    next.delete('view');
    setParams(next, { replace: false });
    const opener = openerRef.current;
    if (opener) setTimeout(() => opener.focus({ preventScroll: true }), 0);
  }, [params, setParams]);

  const switchView = useCallback(
    (nextView: View) => {
      if (!intent) return;
      const next = new URLSearchParams(params);
      next.set('view', nextView);
      setParams(next, { replace: true });
    },
    [intent, params, setParams],
  );

  // Видимость карточек: campaign_card_view / audit_block_view
  const observe = useCallback((node: HTMLElement | null, key: string, event: string, extra?: Record<string, string>) => {
    if (!node || seenRef.current.has(key)) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            timer = window.setTimeout(() => {
              if (seenRef.current.has(key)) return;
              seenRef.current.add(key);
              trackEvent(event, extra);
              io.disconnect();
            }, 1000);
          } else if (timer) {
            window.clearTimeout(timer);
            timer = undefined;
          }
        });
      },
      { threshold: [0, 0.5, 1] },
    );
    io.observe(node);
  }, []);

  return (
    <div>
      {/* Компактный заголовок */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark hero-pad-top pb-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/70">Форматы</div>
          </div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-4">Форматы работы</h1>
          <p className="text-[#FBF8F3] text-base leading-relaxed max-w-2xl mb-3">
            Выберите задачу бизнеса. Мы подберём площадки, подготовим медиаплан и организуем кампанию
            под ваши сроки и бюджет.
          </p>
          <div className="text-[13px] text-[#FBF8F3]/70">Хабаровск · Владивосток · Комсомольск-на-Амуре</div>
        </div>
      </section>

      {/* Три карточки */}
      <section className="bg-[#FBF8F3] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#E8E2D8]">
            {CAMPAIGN_FORMATS.map((f) => (
              <FormatCard
                key={f.intent}
                format={f}
                onOpen={openModal}
                onMount={(node) => observe(node, `card-${f.intent}`, 'campaign_card_view', { intent: f.intent })}
              />
            ))}
          </div>

          <p className="mt-8 text-[14px] text-[#0A0A0A] leading-relaxed max-w-3xl">
            Ориентиры для одной задачи в одном городе. В бюджет входят согласованные размещения, ведение
            и подготовка материалов по смете. Точную стоимость определим после брифа.
          </p>
          <p className="mt-3 text-[14px] text-[#0A0A0A] leading-relaxed">
            Нужно отдельное размещение или у вас другой бюджет?{' '}
            <button
              type="button"
              onClick={(e) => openModal('custom', 'brief', e.currentTarget, 'custom_link')}
              className="text-[#A21D27] font-medium underline underline-offset-2 hover:text-[#831520] transition-colors"
            >
              Подберём подходящий вариант
            </button>
          </p>
        </div>
      </section>

      {/* Четвёртый сценарий */}
      <section
        className="bg-[#0A0A0A] pattern-dark py-14"
        ref={(node) => observe(node, 'audit-block', 'audit_block_view', { intent: 'audit' })}
      >
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-16 items-center">
            <div>
              <h2 className="section-title text-[#FBF8F3] mb-4">Не понимаете, работает ли ваша реклама?</h2>
              <p className="text-[#FBF8F3] leading-relaxed max-w-2xl">
                Уже размещались, но непонятно, что принесло результат? Посмотрим, какие данные есть,
                уточним цель и предложим план проверки или перезапуска.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={(e) => openModal('audit', 'brief', e.currentTarget, 'audit_block')}
                className="btn-carmine justify-center"
                style={{ minHeight: '48px' }}
              >
                Обсудить текущую рекламу
              </button>
              <button
                type="button"
                onClick={(e) => openModal('audit', 'details', e.currentTarget, 'audit_block')}
                className="inline-flex items-center justify-center gap-2 border border-[#FBF8F3]/30 text-[#FBF8F3] text-sm font-medium px-6 py-3.5 rounded hover:border-[#A21D27] hover:text-[#A21D27] transition-colors"
                style={{ minHeight: '48px', letterSpacing: '0.06em' }}
              >
                Как проходит разбор
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F2EDE4] py-14">
        <div className="max-w-7xl mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Вопросы</div>
          </div>
          <div className="flex flex-col">
            {CAMPAIGN_FAQ.map((item) => (
              <div key={item.q} className="border-t border-[#E8E2D8] py-5 last:border-b">
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-2 leading-snug" style={{ letterSpacing: '-0.01em' }}>
                  {item.q}
                </h3>
                <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{item.a}</p>
                {'action' in item && item.action && (
                  <button
                    type="button"
                    onClick={(e) => openModal(item.action as CampaignIntent, 'brief', e.currentTarget, 'faq')}
                    className="mt-3 text-[14px] font-medium text-[#A21D27] hover:text-[#831520] underline underline-offset-2 transition-colors"
                  >
                    {item.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[14px] text-[#0A0A0A]">
            Хотите обсудить голосом?{' '}
            <Link to="/contacts" className="text-[#A21D27] font-medium underline underline-offset-2">Контакты агентства</Link>
          </p>
        </div>
      </section>

      {format && (
        <CampaignModal
          format={format}
          view={view}
          draft={draft}
          onDraftChange={setDraft}
          onClose={closeModal}
          onSwitchView={switchView}
        />
      )}
    </div>
  );
}

function FormatCard({
  format,
  onOpen,
  onMount,
}: {
  format: CampaignFormat;
  onOpen: (i: CampaignIntent, v: View, el?: HTMLElement | null, p?: string) => void;
  onMount: (node: HTMLElement | null) => void;
}) {
  return (
    <article ref={onMount} className="bg-[#FBF8F3] p-7 sm:p-8 flex flex-col">
      <div className="font-display font-extrabold text-[#A21D27] text-4xl leading-none mb-5">{format.num}</div>
      <h2 className="font-display font-bold text-[#0A0A0A] text-2xl mb-3 leading-tight" style={{ letterSpacing: '-0.02em' }}>
        {format.title}
      </h2>
      <p className="text-[15px] text-[#0A0A0A] leading-relaxed mb-6">{format.description}</p>

      <ul className="flex flex-col gap-2.5 mb-6">
        {format.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[14px] text-[#0A0A0A] leading-relaxed">
            <Icon name="Check" size={15} className="text-[#A21D27] flex-shrink-0 mt-0.5" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="border-t border-[#E8E2D8] pt-5 mb-5">
          <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Срок</div>
          <div className="text-[15px] text-[#0A0A0A] font-medium">{format.term}</div>
          {format.termExtra && <div className="text-[13px] text-[#5a5347] mt-0.5">{format.termExtra}</div>}
        </div>
        <div className="mb-6">
          <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-1" style={{ letterSpacing: '0.16em' }}>Бюджет</div>
          <div className="font-display font-bold text-[#0A0A0A] text-2xl leading-none mb-1">{format.budget}</div>
          <div className="text-[13px] text-[#5a5347]">{format.budgetNote}</div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={(e) => onOpen(format.intent, 'brief', e.currentTarget, 'card')}
            className="btn-carmine justify-center w-full"
            style={{ minHeight: '48px' }}
          >
            {format.ctaPrimary}
          </button>
          <button
            type="button"
            onClick={(e) => onOpen(format.intent, 'details', e.currentTarget, 'card')}
            className="text-[14px] font-medium text-[#A21D27] hover:text-[#831520] underline underline-offset-2 transition-colors w-full text-center"
            style={{ minHeight: '44px' }}
          >
            {format.ctaSecondary}
          </button>
        </div>
      </div>
    </article>
  );
}
