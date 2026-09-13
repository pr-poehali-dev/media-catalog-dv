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

export function trackEvent(name: string) {
  if (getConsent() !== 'accepted') return;
  if (typeof window.ym === 'function') {
    window.ym(YM_COUNTER_ID, 'reachGoal', name);
  }
}
