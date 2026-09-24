import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { CampaignFormat, COMMON_TERMS } from '@/data/campaigns';
import CampaignBrief from './CampaignBrief';
import { trackEvent } from '@/lib/analytics';
import type { BriefDraft } from './briefTypes';

interface Props {
  format: CampaignFormat;
  view: 'details' | 'brief';
  draft: BriefDraft;
  onDraftChange: (d: BriefDraft) => void;
  onClose: () => void;
  onSwitchView: (v: 'details' | 'brief') => void;
}

export default function CampaignModal({ format, view, draft, onDraftChange, onClose, onSwitchView }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const briefRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [briefSeen, setBriefSeen] = useState(false);

  const scrollToBrief = useCallback((smooth = true) => {
    const box = scrollRef.current;
    const target = briefRef.current;
    if (!box || !target) return;
    const delta = target.getBoundingClientRect().top - box.getBoundingClientRect().top;
    box.scrollTo({ top: box.scrollTop + delta - 16, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  const scrollToTop = useCallback((smooth = true) => {
    scrollRef.current?.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // Блокируем прокрутку фона, сохраняя позицию страницы
  useEffect(() => {
    const y = window.scrollY;
    const { overflow, position, top, width } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, y);
    };
  }, []);

  // Начальная позиция прокрутки задаётся кнопкой, а не «прошлым разом»
  useEffect(() => {
    if (view === 'brief') {
      requestAnimationFrame(() => scrollToBrief(false));
    } else {
      requestAnimationFrame(() => scrollToTop(false));
    }
    closeRef.current?.focus({ preventScroll: true });
  }, [view, format.intent, scrollToBrief, scrollToTop]);

  // Escape + удержание фокуса внутри окна
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  // campaign_brief_view — один раз за открытие
  useEffect(() => {
    setBriefSeen(false);
  }, [format.intent, view]);

  useEffect(() => {
    const target = briefRef.current;
    if (!target || briefSeen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setBriefSeen(true);
          trackEvent('campaign_brief_view', { intent: format.intent, entry_view: view });
          io.disconnect();
        }
      },
      { root: scrollRef.current, threshold: 0.4 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [format.intent, view, briefSeen]);

  const hasBudget = Boolean(format.budgetFull);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0A0A0A]/85 backdrop-blur-sm p-0 sm:p-4"
      // Нажатие на затемнение НЕ закрывает окно — чтобы не потерять заполненный бриф
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={format.modalTitle}
        className="relative bg-[#FBF8F3] w-full sm:max-w-[920px] flex flex-col shadow-2xl"
        style={{
          maxHeight: '100dvh',
          height: '100dvh',
        }}
      >
        {/* Закреплённая шапка */}
        <div className="bg-[#0A0A0A] px-5 sm:px-8 py-4 sm:py-5 flex items-start justify-between gap-4 flex-shrink-0"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
          <div className="min-w-0">
            <div className="text-[10px] font-medium text-[#FBF8F3]/70 uppercase mb-1" style={{ letterSpacing: '0.18em' }}>
              Формат работы
            </div>
            <h2 className="font-display font-bold text-[#FBF8F3] text-lg sm:text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {format.modalTitle}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="flex-shrink-0 w-11 h-11 -mr-2 flex items-center justify-center text-[#FBF8F3] hover:text-[#A21D27] transition-colors rounded"
            aria-label="Закрыть окно"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Единственный внутренний скролл */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <div ref={topRef} className="px-5 sm:px-8 py-6 sm:py-8">
            {/* 2. Кому подходит и какую задачу решает */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button type="button" onClick={() => { onSwitchView('brief'); scrollToBrief(); }} className="btn-carmine text-[13px] py-2.5 px-5">
                Перейти к брифу
                <Icon name="ArrowDown" size={14} />
              </button>
            </div>

            <Block title="Задача">
              <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{format.goal}</p>
            </Block>

            {/* 3. Состав работ */}
            <Block title={format.intent === 'audit' ? 'Как проходит разбор' : 'Состав работ'}>
              <ol className="flex flex-col gap-2.5">
                {format.scope.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#0A0A0A] leading-relaxed">
                    <span className="font-display font-bold text-[#A21D27] text-sm flex-shrink-0 mt-0.5 w-5">
                      {format.intent === 'audit' ? `${i + 1}.` : '—'}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </Block>

            {/* 4. Срок, подготовка, бюджет */}
            <Block title={format.intent === 'audit' || format.intent === 'custom' ? 'Условия' : 'Срок и бюджет'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-4">
                  <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-2" style={{ letterSpacing: '0.16em' }}>
                    {format.intent === 'audit' || format.intent === 'custom' ? 'Порядок работы' : 'Сроки'}
                  </div>
                  <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{format.termFull}</p>
                </div>
                {hasBudget && (
                  <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-4">
                    <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-2" style={{ letterSpacing: '0.16em' }}>
                      Ориентир бюджета
                    </div>
                    <p className="text-[15px] text-[#0A0A0A] leading-relaxed font-medium">{format.budgetFull}</p>
                  </div>
                )}
              </div>
            </Block>

            {/* 5. Ответственность */}
            <Block title="Ответственность сторон">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-l-2 border-[#A21D27] pl-4">
                  <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-1.5" style={{ letterSpacing: '0.16em' }}>Агентство</div>
                  <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{format.agencySide}</p>
                </div>
                <div className="border-l-2 border-[#0A0A0A]/25 pl-4">
                  <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-1.5" style={{ letterSpacing: '0.16em' }}>Клиент</div>
                  <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{format.clientSide}</p>
                </div>
              </div>
            </Block>

            {/* 6. Отчётность */}
            <Block title={format.intent === 'audit' ? 'Что вы получите' : 'Отчётность и оценка результата'}>
              <p className="text-[15px] text-[#0A0A0A] leading-relaxed">{format.reporting}</p>
            </Block>

            {/* 7. Короткие условия */}
            {format.showCommonTerms && (
              <Block title="Условия">
                <ul className="flex flex-col gap-2">
                  {COMMON_TERMS.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-[14px] text-[#0A0A0A] leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-[#A21D27] flex-shrink-0 mt-2" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {/* 8. Бриф */}
            <div ref={briefRef} className="pt-8 border-t border-[#E8E2D8]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="font-display font-bold text-[#0A0A0A] text-xl sm:text-2xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Расскажите о вашей задаче
                </h3>
                <button
                  type="button"
                  onClick={() => { onSwitchView('details'); scrollToTop(); }}
                  className="text-[13px] font-medium text-[#A21D27] hover:text-[#831520] underline underline-offset-2 transition-colors py-2"
                >
                  Посмотреть условия
                </button>
              </div>
              <p className="text-[14px] text-[#5a5347] leading-relaxed mb-6">
                Формат: <span className="text-[#0A0A0A] font-medium">{format.modalTitle}</span>. Ответы помогут подготовить
                предложение — если чего-то ещё не знаете, так и отметьте.
              </p>
              <CampaignBrief
                format={format}
                draft={draft}
                onDraftChange={onDraftChange}
                scrollBoxRef={scrollRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="text-[10px] font-medium text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.18em' }}>
        {title}
      </div>
      {children}
    </div>
  );
}
