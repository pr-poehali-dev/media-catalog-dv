export const YM_COUNTER_ID = 109797633;

const CONSENT_KEY = 'cookie_consent';

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    __ymLoaded?: boolean;
  }
}

export function getConsent(): 'accepted' | 'rejected' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  if (value === 'accepted') loadAnalytics();
}

export function loadAnalytics() {
  if (typeof window === 'undefined') return;
  if (window.__ymLoaded) return;
  if (getConsent() !== 'accepted') return;
  window.__ymLoaded = true;

  const src = `https://mc.yandex.ru/metrika/tag.js?id=${YM_COUNTER_ID}`;
  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      ((window.ym as unknown as { a: unknown[][] }).a =
        (window.ym as unknown as { a?: unknown[][] }).a || []).push(args);
    };
  (window.ym as unknown as { l: number }).l = Date.now();

  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);

  window.ym(YM_COUNTER_ID, 'init', {
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  });
}

export function trackHit(url: string) {
  if (getConsent() !== 'accepted') return;
  if (typeof window.ym === 'function') {
    window.ym(YM_COUNTER_ID, 'hit', url);
  }
}

export const LAYOUT_VERSION = 'campaigns_v2_modal';

type EventParams = Record<string, string | undefined>;

const ALLOWED_PARAMS = ['intent', 'placement', 'entry_view', 'page', 'budget_band', 'error_kind'];


export function trackEvent(name: string, params?: EventParams) {
  if (getConsent() !== 'accepted') return;
  if (typeof window.ym !== 'function') return;
  const payload: Record<string, string> = { layout_version: LAYOUT_VERSION };
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v && ALLOWED_PARAMS.includes(k)) payload[k] = String(v).slice(0, 80);
    });
  }
  window.ym(YM_COUNTER_ID, 'reachGoal', name, payload);
}
