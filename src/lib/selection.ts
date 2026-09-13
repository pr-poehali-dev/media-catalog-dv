export interface PlatformSelection {
  id: string;
  name: string;
  social?: string;
  format?: string;
  city?: string;
  direction?: string;
}

const KEY = 'lead_selection';
const EVENT = 'lead-selection-change';

export function setSelection(sel: PlatformSelection) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(sel));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function getSelection(): PlatformSelection | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlatformSelection;
    if (!parsed || typeof parsed.name !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSelection() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function subscribeSelection(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function readSelectionFromUrl(): PlatformSelection | null {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('platform');
  const name = params.get('platform_name');
  if (!id && !name) return null;
  return {
    id: id || '',
    name: name || id || '',
    social: params.get('social') || undefined,
    city: params.get('city') || undefined,
    direction: params.get('direction') || undefined,
  };
}

export function collectUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}
