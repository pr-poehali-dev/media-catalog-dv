import { useState, useRef, RefObject } from 'react';
import Icon from '@/components/ui/icon';
import { CONTACTS, CONSENT_VERSION } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { getSelection, collectUtm, clearSelection } from '@/lib/selection';
import {
  CampaignFormat,
  BUDGET_BANDS,
  CITY_OPTIONS,
  MEASURE_OPTIONS,
  DESTINATION_OPTIONS,
  EXPERIENCE_OPTIONS,
} from '@/data/campaigns';
import { BriefDraft } from './briefTypes';

const SEND_LEAD_URL = 'https://functions.poehali.dev/23c232dd-6c5c-4b01-82da-fa900e5b7087';

type Errors = Partial<Record<keyof BriefDraft, string>>;

interface Props {
  format: CampaignFormat;
  draft: BriefDraft;
  onDraftChange: (d: BriefDraft) => void;
  scrollBoxRef: RefObject<HTMLDivElement>;
}

const fieldCls =
  'w-full max-w-full min-w-0 box-border px-4 py-3 text-base bg-white border border-[#E8E2D8] text-[#0A0A0A] rounded-none transition-colors focus:outline-none focus:border-[#A21D27]';
const labelCls = 'block text-[13px] font-medium text-[#0A0A0A] mb-1.5';
const hintCls = 'block text-[12px] text-[#5a5347] mb-1.5';

export default function CampaignBrief({ format, draft, onDraftChange, scrollBoxRef }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof BriefDraft>(key: K, value: BriefDraft[K]) => {
    if (!touched) {
      setTouched(true);
      trackEvent('campaign_form_start', { intent: format.intent });
    }
    onDraftChange({ ...draft, [key]: value });
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const toggleMulti = (key: 'measures' | 'destinations', value: string, exclusive: string) => {
    const current = draft[key];
    let next: string[];
    if (value === exclusive) {
      next = current.includes(exclusive) ? [] : [exclusive];
    } else {
      next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current.filter((v) => v !== exclusive), value];
    }
    set(key, next);
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!draft.company.trim()) e.company = 'Укажите название компании или проекта';
    if (!draft.product.trim()) e.product = 'Опишите, что продвигаем';
    if (!draft.goal.trim()) e.goal = 'Опишите задачу и ожидаемый результат';
    if (!draft.city) e.city = 'Выберите город или зону продвижения';
    if (!draft.audience.trim() && !draft.audienceUnknown) e.audience = 'Опишите аудиторию или отметьте «Нужно определить вместе»';
    if (!draft.budget) e.budget = 'Выберите бюджет или «Пока не определён»';
    if (!draft.startDate && !draft.startFlexible) e.startDate = 'Укажите дату или отметьте «Срок обсудим»';
    if (!draft.experienceKind) e.experienceKind = 'Выберите вариант';
    if (draft.experienceKind === EXPERIENCE_OPTIONS[0] && !draft.experience.trim())
      e.experience = 'Расскажите, что уже пробовали';
    if (!draft.measures.length) e.measures = 'Выберите хотя бы один вариант';
    if (!draft.destinations.length) e.destinations = 'Выберите хотя бы один вариант';
    if (!draft.contactName.trim()) e.contactName = 'Укажите контактное лицо';
    const contact = draft.contact.trim();
    if (!contact) {
      e.contact = 'Укажите телефон или контакт в мессенджере';
    } else {
      const digits = contact.replace(/\D/g, '');
      const isPhone = digits.length >= 10 && digits.length <= 15;
      const isMessenger = /(@[A-Za-z0-9_]{4,}|t\.me\/|max\.ru\/)/i.test(contact);
      if (!isPhone && !isMessenger) e.contact = 'Укажите номер телефона или ник в мессенджере (например, @nickname)';
    }
    if (!draft.consent) e.consent = 'Нужно согласие на обработку данных';
    return e;
  };

  const focusFirstError = (e: Errors) => {
    const first = Object.keys(e)[0];
    const node = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    if (!node) return;
    const box = scrollBoxRef.current;
    if (box) box.scrollTo({ top: Math.max(0, node.offsetTop - 80), behavior: 'smooth' });
    setTimeout(() => node.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true }), 350);
  };

  const buildTask = (): string => {
    const L: string[] = [];
    L.push(`ФОРМАТ: ${format.modalTitle}`);
    L.push('');
    L.push('— Компания и задача —');
    L.push(`Компания / проект: ${draft.company.trim()}`);
    L.push(`Что продвигаем: ${draft.product.trim()}`);
    if (draft.links.trim()) L.push(`Сайт / соцсети: ${draft.links.trim()}`);
    L.push(`Задача и хороший результат: ${draft.goal.trim()}`);
    L.push(`Город / зона: ${draft.city}${draft.zone.trim() ? ` (${draft.zone.trim()})` : ''}`);
    L.push(`Аудитория: ${draft.audienceUnknown ? 'Нужно определить вместе' : draft.audience.trim()}`);
    L.push('');
    L.push('— Бюджет и прошлый опыт —');
    L.push(`Бюджет: ${draft.budget}${draft.budgetExact.trim() ? ` (точно: ${draft.budgetExact.trim()})` : ''}`);
    L.push(`Старт: ${draft.startFlexible ? 'Срок обсудим' : draft.startDate}`);
    if (draft.keyDates.trim()) L.push(`Важные даты: ${draft.keyDates.trim()}`);
    L.push(`Прошлый опыт: ${draft.experienceKind}${draft.experience.trim() ? ` — ${draft.experience.trim()}` : ''}`);
    L.push(`Как измеряют результат: ${draft.measures.join(', ')}`);
    L.push(`Куда ведём людей: ${draft.destinations.join(', ')}`);
    if (draft.materials.trim()) L.push(`Материалы: ${draft.materials.trim()}`);
    L.push('');
    L.push('— Контакт —');
    L.push(`Контактное лицо: ${draft.contactName.trim()}`);
    L.push(`Связь: ${draft.contact.trim()}`);
    if (draft.comment.trim()) L.push(`Комментарий и ограничения: ${draft.comment.trim()}`);
    return L.join('\n');
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sending || sent) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      focusFirstError(e);
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const selection = getSelection();
      const utm = collectUtm();
      const res = await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: draft.contactName.trim(),
          phone: draft.contact.trim(),
          city: draft.city,
          budget: draft.budget,
          startDate: draft.startFlexible ? 'Срок обсудим' : draft.startDate,
          task: buildTask(),
          consent: true,
          consentVersion: CONSENT_VERSION,
          source: `Форматы работы — ${format.modalTitle}`,
          page: window.location.pathname,
          intent: format.intent,
          brief: {
            company: draft.company.trim(),
            product: draft.product.trim(),
            links: draft.links.trim(),
            goal: draft.goal.trim(),
            city: draft.city,
            zone: draft.zone.trim(),
            audience: draft.audienceUnknown ? 'Нужно определить вместе' : draft.audience.trim(),
            budget: draft.budget,
            budgetExact: draft.budgetExact.trim(),
            start: draft.startFlexible ? 'Срок обсудим' : draft.startDate,
            keyDates: draft.keyDates.trim(),
            experienceKind: draft.experienceKind,
            experience: draft.experience.trim(),
            measures: draft.measures,
            destinations: draft.destinations,
            materials: draft.materials.trim(),
            contactName: draft.contactName.trim(),
            contact: draft.contact.trim(),
            comment: draft.comment.trim(),
          },
          ...(selection ? { selection } : {}),
          ...(Object.keys(utm).length ? { utm } : {}),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data || data.ok !== true) throw new Error('send_failed');
      clearSelection();
      setSent(true);
      trackEvent('campaign_submit_success', { intent: format.intent, budget_band: draft.budget });
    } catch {
      setSendError('Не удалось отправить бриф. Ответы сохранены — попробуйте ещё раз или напишите нам напрямую.');
      trackEvent('campaign_submit_error', { intent: format.intent, error_kind: 'network' });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="border border-[#E8E2D8] bg-white p-6 sm:p-8 text-center">
        <div className="w-11 h-11 bg-[#A21D27] flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={22} className="text-[#FBF8F3]" />
        </div>
        <h4 className="font-display font-bold text-[#0A0A0A] text-xl mb-2">Бриф отправлен</h4>
        <p className="text-[15px] text-[#0A0A0A] leading-relaxed max-w-md mx-auto">
          Изучим задачу и свяжемся с вами, чтобы уточнить детали и предложить план действий.
        </p>
      </div>
    );
  }

  const auditHint = format.intent === 'audit' && draft.experienceKind === EXPERIENCE_OPTIONS[1];

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      {/* ГРУППА 1 */}
      <Group title="Компания и задача">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Название компании / проекта" required name="company" error={errors.company}>
            <input type="text" value={draft.company} onChange={(e) => set('company', e.target.value)}
              placeholder="Например: кофейня «Пар»" className={fieldCls} />
          </Field>
          <Field label="Сайт или соцсети" name="links" hint="Можно несколько ссылок через запятую">
            <input type="text" value={draft.links} onChange={(e) => set('links', e.target.value)}
              placeholder="site.ru, vk.com/..." className={fieldCls} />
          </Field>
        </div>
        <Field label="Что продвигаем?" required name="product" hint="Продукт или услуга и суть предложения" error={errors.product}>
          <textarea rows={3} value={draft.product} onChange={(e) => set('product', e.target.value)}
            placeholder="Новая линейка сезонных напитков и завтраки до 12:00" className={`${fieldCls} resize-none`} />
        </Field>
        <Field label="Какую задачу решаем и что будет хорошим результатом?" required name="goal"
          hint="Обращения, записи, посещения, продажи, узнаваемость — или опишите своими словами" error={errors.goal}>
          <textarea rows={3} value={draft.goal} onChange={(e) => set('goal', e.target.value)}
            placeholder="Хотим 30–40 заявок на завтраки и рост посещаемости утром" className={`${fieldCls} resize-none`} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Город и зона продвижения" required name="city" error={errors.city}>
            <select value={draft.city} onChange={(e) => set('city', e.target.value)} className={fieldCls}
              style={{ color: draft.city ? '#0A0A0A' : '#767066' }}>
              <option value="">Выберите город</option>
              {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Район или зона обслуживания" name="zone">
            <input type="text" value={draft.zone} onChange={(e) => set('zone', e.target.value)}
              placeholder="Центр, Северный микрорайон" className={fieldCls} />
          </Field>
        </div>
        <Field label="Кто ваша целевая аудитория?" required name="audience" error={errors.audience}>
          <textarea rows={2} value={draft.audience} onChange={(e) => set('audience', e.target.value)}
            disabled={draft.audienceUnknown}
            placeholder="Женщины 25–40, работают в центре, заходят по пути на работу"
            className={`${fieldCls} resize-none ${draft.audienceUnknown ? 'opacity-50' : ''}`} />
          <Check checked={draft.audienceUnknown} onChange={(v) => set('audienceUnknown', v)} label="Нужно определить вместе" />
        </Field>
      </Group>

      {/* ГРУППА 2 */}
      <Group title="Бюджет и прошлый опыт">
        <Field label="Общий бюджет на кампанию" required name="budget"
          hint="На весь период кампании, включая размещения и подготовку" error={errors.budget}>
          <div className="flex flex-wrap gap-2">
            {BUDGET_BANDS.map((b) => (
              <Chip key={b} active={draft.budget === b} onClick={() => set('budget', b)} label={b} />
            ))}
          </div>
          <input type="text" value={draft.budgetExact} onChange={(e) => set('budgetExact', e.target.value)}
            placeholder="Точная сумма, если она известна" className={`${fieldCls} mt-3`} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Желаемый старт" required name="startDate" error={errors.startDate}>
            <input type="date" value={draft.startDate} onChange={(e) => set('startDate', e.target.value)}
              disabled={draft.startFlexible}
              className={`${fieldCls} ${draft.startFlexible ? 'opacity-50' : ''}`} />
            <Check checked={draft.startFlexible} onChange={(v) => set('startFlexible', v)} label="Срок обсудим" />
          </Field>
          <Field label="Важные даты" name="keyDates" hint="Открытие, мероприятие, сезон">
            <input type="text" value={draft.keyDates} onChange={(e) => set('keyDates', e.target.value)}
              placeholder="Открытие 15 октября" className={fieldCls} />
          </Field>
        </div>
        <Field label="Что уже пробовали и какой результат получили?" required name="experienceKind" error={errors.experienceKind}>
          <div className="flex flex-wrap gap-2 mb-3">
            {EXPERIENCE_OPTIONS.map((o) => (
              <Chip key={o} active={draft.experienceKind === o} onClick={() => set('experienceKind', o)} label={o} />
            ))}
          </div>
          {auditHint && (
            <p className="text-[13px] text-[#0A0A0A] bg-[#F2EDE4] border-l-2 border-[#A21D27] px-3 py-2 mb-3 leading-relaxed">
              Для первого запуска также подойдёт тест нового предложения — расскажем об этом при разборе.
            </p>
          )}
          {draft.experienceKind === EXPERIENCE_OPTIONS[0] && (
            <div data-field="experience">
              <textarea rows={3} value={draft.experience} onChange={(e) => set('experience', e.target.value)}
                placeholder="Площадки, примерные расходы, сколько было обращений, ссылка на прошлый отчёт"
                className={`${fieldCls} resize-none`} />
              {errors.experience && <ErrorText text={errors.experience} />}
            </div>
          )}
        </Field>
        <Field label="Как сейчас измеряете результат?" required name="measures"
          hint="Можно выбрать несколько; «Пока не считаем» исключает остальные" error={errors.measures}>
          <div className="flex flex-wrap gap-2">
            {MEASURE_OPTIONS.map((o) => (
              <Chip key={o} active={draft.measures.includes(o)}
                onClick={() => toggleMulti('measures', o, 'Пока не считаем')} label={o} />
            ))}
          </div>
        </Field>
        <Field label="Куда направляем людей?" required name="destinations" hint="Можно выбрать несколько" error={errors.destinations}>
          <div className="flex flex-wrap gap-2">
            {DESTINATION_OPTIONS.map((o) => (
              <Chip key={o} active={draft.destinations.includes(o)}
                onClick={() => toggleMulti('destinations', o, 'Нужно определить вместе')} label={o} />
            ))}
          </div>
        </Field>
        <Field label="Какие материалы готовы?" name="materials" hint="Фото, видео, макеты, ссылки — или «нужна подготовка»">
          <textarea rows={2} value={draft.materials} onChange={(e) => set('materials', e.target.value)}
            placeholder="Есть фото интерьера и логотип, макеты нужна подготовка" className={`${fieldCls} resize-none`} />
        </Field>
      </Group>

      {/* ГРУППА 3 */}
      <Group title="Контакт">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Контактное лицо" required name="contactName" error={errors.contactName}>
            <input type="text" value={draft.contactName} onChange={(e) => set('contactName', e.target.value)}
              placeholder="Иван" className={fieldCls} />
          </Field>
          <Field label="Телефон или контакт в мессенджере" required name="contact" error={errors.contact}>
            <input type="text" inputMode="text" value={draft.contact} onChange={(e) => set('contact', e.target.value)}
              placeholder="+7 914 000-00-00 или @nickname" className={fieldCls} />
          </Field>
        </div>
        <Field label="Комментарий и ограничения" name="comment" hint="Наличие, загрузка, что важно учесть">
          <textarea rows={2} value={draft.comment} onChange={(e) => set('comment', e.target.value)}
            placeholder="В выходные не работаем, заявки принимает один администратор" className={`${fieldCls} resize-none`} />
        </Field>

        <div data-field="consent">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={draft.consent} onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 w-5 h-5 accent-[#A21D27] flex-shrink-0" />
            <span className="text-[13px] text-[#0A0A0A] leading-relaxed">
              Согласен(а) с{' '}
              <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A21D27]">
                Политикой обработки персональных данных
              </a>{' '}
              и даю{' '}
              <a href="/legal/consent" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#A21D27]">
                согласие на обработку персональных данных
              </a>
            </span>
          </label>
          {errors.consent && <ErrorText text={errors.consent} />}
        </div>
      </Group>

      {sendError && (
        <div className="border border-[#A21D27]/40 bg-[#A21D27]/5 px-4 py-3">
          <p className="text-[14px] text-[#A21D27] leading-relaxed mb-2">{sendError}</p>
          <div className="flex flex-wrap gap-4 text-[13px]">
            <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent('campaign_contact_click', { intent: format.intent, placement: 'brief_error' })}
              className="text-[#A21D27] underline font-medium">Telegram</a>
            <a href={`tel:${CONTACTS.phone}`}
              onClick={() => trackEvent('campaign_contact_click', { intent: format.intent, placement: 'brief_error' })}
              className="text-[#A21D27] underline font-medium">{CONTACTS.phoneLabel}</a>
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <p className="text-[14px] text-[#A21D27]">Проверьте отмеченные поля — остальные ответы сохранены.</p>
      )}

      <button type="submit" disabled={sending} className="btn-carmine justify-center w-full sm:w-auto sm:self-start"
        style={{ opacity: sending ? 0.7 : 1, minHeight: '48px' }}>
        {sending ? 'Отправляем…' : 'Отправить бриф'}
      </button>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border border-[#E8E2D8] bg-white p-5 sm:p-6">
      <legend className="px-2 text-[11px] font-medium text-[#5a5347] uppercase" style={{ letterSpacing: '0.18em' }}>
        {title}
      </legend>
      <div className="flex flex-col gap-5 mt-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, required, name, hint, error, children }: {
  label: string; required?: boolean; name: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div data-field={name}>
      <label className={labelCls}>
        {label}
        {required && <span className="text-[#A21D27] ml-1">*</span>}
      </label>
      {hint && <span className={hintCls}>{hint}</span>}
      {children}
      {error && <ErrorText text={error} />}
    </div>
  );
}

function ErrorText({ text }: { text: string }) {
  return <p className="mt-1.5 text-[13px] text-[#A21D27] leading-snug">{text}</p>;
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`text-[13px] px-4 py-2.5 border transition-colors ${
        active
          ? 'bg-[#A21D27] border-[#A21D27] text-[#FBF8F3] font-medium'
          : 'bg-white border-[#E8E2D8] text-[#0A0A0A] hover:border-[#A21D27]'
      }`}
      style={{ minHeight: '44px' }}>
      {label}
    </button>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer mt-2" style={{ minHeight: '32px' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-[#A21D27] flex-shrink-0" />
      <span className="text-[13px] text-[#0A0A0A]">{label}</span>
    </label>
  );
}
