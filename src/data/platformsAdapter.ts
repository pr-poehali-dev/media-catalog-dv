import { COMMUNITIES, Community, Platform, Format, parseReach } from './data';

const DEFAULT_FORMATS: Format[] = ['Пост'];

function priceFromLabel(label: string): number {
  const m = label.replace(/\u00a0/g, ' ').match(/[\d\s]+/);
  if (!m) return 0;
  const n = parseInt(m[0].replace(/\s/g, ''), 10);
  return isNaN(n) ? 0 : n;
}

function mapFormats(formats: string[]): Format[] {
  const known: Format[] = ['Пост', 'Пост + Сторис', 'Видео', 'Нативная публикация', 'Обзор у блогера', 'Подборка', 'Спецпроект', 'Пакет'];
  const result = formats.filter((f): f is Format => (known as string[]).includes(f));
  return result.length > 0 ? result : DEFAULT_FORMATS;
}

export function communityToPlatform(c: Community): Platform {
  const main = c.socials[0];
  const reach = c.reachSummary.length > 0 ? parseReach(c.reachSummary[0]) : -1;
  return {
    id: c.id,
    name: c.name,
    social: c.social,
    city: c.city,
    category: c.category,
    type: 'community',
    description: c.description,
    subscribers: main?.subscribers ?? 0,
    reach: reach > 0 ? reach : 0,
    formats: mapFormats(c.formats),
    priceFrom: priceFromLabel(c.priceFromLabel),
    tags: [],
    emoji: c.emoji,
  };
}

export const REAL_PLATFORMS: Platform[] = COMMUNITIES.map(communityToPlatform);
