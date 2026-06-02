import { useState, useMemo } from 'react';
import { COMMUNITIES, SOCIALS, Community, SocialNet, parseReach } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import CommunityCard from '@/components/communities/CommunityCard';
import CommunityModal from '@/components/communities/CommunityModal';
import useScrollReveal from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';
import { SOCIAL_ICONS, SOCIAL_ICON_COLORS } from '@/components/bloggers/BloggerAvatar';

function SocialBadge({ social, size = 'md' }: { social: SocialNet; size?: 'md' | 'lg' }) {
  const color = SOCIAL_ICON_COLORS[social] ?? '#888';
  const path = SOCIAL_ICONS[social];
  const box = size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const svg = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  return (
    <span
      className={`inline-flex items-center justify-center ${box} rounded-full flex-shrink-0`}
      style={{ backgroundColor: color }}
      title={SOCIALS[social].label}
    >
      {social === 'max'
        ? <img src="https://cdn.poehali.dev/projects/3a8ab50f-d23f-4a7d-acb1-36a45f5028da/bucket/68ec529f-8f3c-44eb-bbad-44dd455d93e1.PNG" alt="MAX" className="w-full h-full object-cover rounded-full" />
        : path
          ? <svg viewBox="0 0 24 24" className={`${svg} fill-white`}><path d={path} /></svg>
          : <span className="text-white text-sm font-bold">{SOCIALS[social].label[0]}</span>
      }
    </span>
  );
}

const WHY = [
  { num: '01', title: 'Локальная аудитория', desc: 'Реклама попадает жителям конкретного города: Хабаровска, Владивостока или Комсомольска-на-Амуре.' },
  { num: '02', title: 'Быстрый запуск', desc: 'Размещение можно запустить в разы быстрее, чем в других каналах. Подходит для срочных акций, мероприятий, открытий и срочных анонсов.' },
  { num: '03', title: 'Доверие к площадке', desc: 'Городские сообщества читают как источник новостей и локальной повестки. Рекламное сообщение здесь воспринимается мягче, чем обычный баннер.' },
  { num: '04', title: 'Усиление других каналов', desc: 'Городские сообщества хорошо работают в связке с другими рекламными каналами: человек видит бренд в нескольких местах и быстрее его запоминает.' },
];

const PLACEMENT: { key: SocialNet; desc: string; formats: string[] }[] = [
  {
    key: 'max',
    desc: 'Новый канал для дополнительного охвата и тестирования альтернативных площадок. И самый легальный!',
    formats: ['Фото или видео-посты в ленту'],
  },
  {
    key: 'telegram',
    desc: 'Каналы с вовлечённой аудиторией и быстрым контактом с подписчиками. 80% охватов поста собираются уже в первые сутки размещения.',
    formats: ['Фото или видео-посты в ленту'],
  },
  {
    key: 'instagram',
    desc: 'Стандартное рекламное размещение в Instagram* на территории РФ не предлагаем. Присутствие в соцсети возможно только в информационном формате с учётом правовых ограничений.',
    formats: ['Новость в ленту', 'Новость в сторис'],
  },
  {
    key: 'vk',
    desc: 'Крупные городские сообщества для охвата новостей об открытиях, акциях и мероприятиях.',
    formats: ['Пост в ленту', 'Видео в Клипы', 'История'],
  },
  {
    key: 'ok',
    desc: 'Здесь собрана более взрослая аудитория. Подходит для локальных новостей, сферы услуг и городских мероприятий.',
    formats: ['Фото или видео-посты в ленту'],
  },
];

const SOCIAL_FILTERS: Array<'Все соцсети' | SocialNet> = ['Все соцсети', 'max', 'telegram', 'instagram', 'vk', 'ok'];

const CITY_FILTERS = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'] as const;

type SortKey = 'subscribers' | 'reach' | 'price';
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'subscribers', label: 'По подписчикам' },
  { key: 'reach', label: 'По сред. охвату' },
  { key: 'price', label: 'По стоимости' },
];

function priceValue(label?: string): number {
  if (!label) return -1;
  const digits = label.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : -1;
}

function sortValue(c: Community, key: SortKey): number {
  if (key === 'subscribers') return parseReach(c.subscribersTotal);
  if (key === 'reach') return parseReach(c.reachSummary.join(''));
  return priceValue(c.priceFromLabel);
}

export default function Communities() {
  const [selected, setSelected] = useState<Community | null>(null);
  const [city, setCity] = useState<'Все города' | 'Хабаровск' | 'Владивосток' | 'Комсомольск-на-Амуре'>('Все города');
  const [social, setSocial] = useState<'Все соцсети' | SocialNet>('Все соцсети');
  const [activeSocial, setActiveSocial] = useState<SocialNet>('vk');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortAsc, setSortAsc] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const filtered = useMemo(() => {
    const list = COMMUNITIES.filter(
      (c) =>
        (city === 'Все города' || c.city === city) &&
        (social === 'Все соцсети' || c.social === social)
    );
    if (!sortKey) return list;
    return [...list].sort((a, b) => {
      const diff = sortValue(a, sortKey) - sortValue(b, sortKey);
      return sortAsc ? diff : -diff;
    });
  }, [city, social, sortKey, sortAsc]);

  useScrollReveal();

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 01</div>
          </div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-4">
            Реклама в городских<br />сообществах
          </h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Реклама там, где жители каждый день читают новости, обсуждают события и ищут рекомендации.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#form" className="btn-carmine">Получить медиаплан</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в MAX</a>
          </div>
        </div>
      </section>

      {/* Почему городские сообщества работают */}
      <section className="bg-[#F2EDE4] pattern-milk py-14 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Почему городские сообщества работают</div>
          </div>
          <div className="grid gap-px bg-[#E8E2D8] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <div key={item.num} className="bg-[#F2EDE4] flex flex-col p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-5">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg leading-tight min-h-[2.75rem] flex items-start" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <div className="mt-3 w-6 border-t border-[#A21D27]/30 mb-3" />
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Где и как можно разместиться */}
      <section className="relative bg-[#FBF8F3] pattern-milk pt-8 pb-7 reveal overflow-hidden">
        <div className="pattern-content max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Где и как можно разместиться</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
            {/* Левая колонка — выбор соцсети */}
            <div className="flex flex-col gap-2">
              {PLACEMENT.map((p) => {
                const info = SOCIALS[p.key];
                const isActive = activeSocial === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setActiveSocial(p.key)}
                    className="flex items-center gap-3 px-5 py-4 text-left rounded-xl border transition-all"
                    style={{
                      background: isActive ? '#0A0A0A' : '#FFFFFF',
                      borderColor: isActive ? '#0A0A0A' : '#E8E2D8',
                      boxShadow: isActive ? '0 6px 24px rgba(10,10,10,0.16)' : 'none',
                    }}
                  >
                    <SocialBadge social={p.key} />
                    <span
                      className="flex-1 font-display font-bold text-base"
                      style={{ color: isActive ? '#FBF8F3' : '#0A0A0A' }}
                    >
                      {info.label}
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      style={{ color: isActive ? '#E03A8B' : '#C7BFB2' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Правая колонка — детали выбранной соцсети */}
            {PLACEMENT.filter((p) => p.key === activeSocial).map((p) => {
              const info = SOCIALS[p.key];
              return (
                <div key={p.key} className="bg-white border border-[#E8E2D8] rounded-2xl p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-5">
                    <SocialBadge social={p.key} size="lg" />
                    <h3 className="font-display font-bold text-[#0A0A0A] text-2xl" style={{ letterSpacing: '-0.02em' }}>{info.label}</h3>
                  </div>
                  <p className="text-[15px] text-[#5a5347] leading-relaxed mb-7 max-w-xl">{p.desc}</p>

                  <div className="text-[10px] font-medium text-[#A21D27] uppercase mb-4" style={{ letterSpacing: '0.16em' }}>{p.key === 'instagram' ? 'Варианты присутствия' : 'Форматы размещения'}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {p.formats.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 bg-[#F7F3EC] border border-[#E8E2D8] rounded-xl px-4 py-3">
                        <span className="text-[#A21D27] font-bold flex-shrink-0">✔</span>
                        <span className="text-sm text-[#0A0A0A] leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-5 text-[11px] text-[#8C8478] leading-relaxed">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
          </p>
        </div>
      </section>

      {/* Каталог (чёрный, как у блогеров) */}
      <section className="bg-[#0A0A0A] pattern-dark py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="section-rule" />
                <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 text-[11px] font-medium uppercase px-4 py-2 rounded-full bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 text-[#FBF8F3]/60 hover:text-[#FBF8F3] transition-colors"
                  style={{ letterSpacing: '0.12em' }}
                >
                  <Icon name="ArrowUpDown" size={13} />
                  {sortKey ? SORT_OPTIONS.find((o) => o.key === sortKey)!.label : 'Сортировка'}
                  {sortKey && <Icon name={sortAsc ? 'ArrowUp' : 'ArrowDown'} size={13} />}
                  <Icon name={sortOpen ? 'ChevronUp' : 'ChevronDown'} size={13} />
                </button>
                {sortOpen && (
                  <div className="absolute left-0 top-full mt-2 z-20 min-w-[220px] bg-[#161618] border border-[#FBF8F3]/10 rounded-2xl p-1 shadow-2xl">
                    {SORT_OPTIONS.map((opt) => {
                      const active = sortKey === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSort(opt.key)}
                          className="w-full flex items-center justify-between gap-2 text-[11px] font-medium uppercase px-4 py-2.5 rounded-xl transition-colors"
                          style={{
                            letterSpacing: '0.12em',
                            background: active ? '#A21D27' : 'transparent',
                            color: active ? '#FBF8F3' : 'rgba(251,248,243,0.55)',
                          }}
                        >
                          {opt.label}
                          {active && <Icon name={sortAsc ? 'ArrowUp' : 'ArrowDown'} size={13} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-stretch sm:items-end gap-2">
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 rounded-full">
                {SOCIAL_FILTERS.map((s) => {
                  const label = s === 'Все соцсети' ? 'Все соцсети' : SOCIALS[s].label;
                  return (
                    <button
                      key={s}
                      onClick={() => setSocial(s)}
                      className="text-[11px] font-medium uppercase px-4 py-2 transition-colors rounded-full"
                      style={{
                        letterSpacing: '0.12em',
                        background: social === s ? '#A21D27' : 'transparent',
                        color: social === s ? '#FBF8F3' : 'rgba(251,248,243,0.5)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 rounded-full">
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
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#FBF8F3]/40">Ничего не найдено</div>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map((c) => (
                <CommunityCard key={c.id} community={c} onClick={() => setSelected(c)} />
              ))}
            </div>
          )}

          <p className="mt-5 text-[11px] text-[#FBF8F3]/25 leading-relaxed max-w-3xl">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
          </p>
        </div>
      </section>

      {/* Форма */}
      <section id="form" className="bg-[#0A0A0A] pattern-dark pt-4 pb-16">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl reveal">
          <ContactForm dark title="Получить медиаплан" subtitle="Составим медиаплан под ваш город, бюджет и задачу" source="Городские сообщества" />
        </div>
      </section>

      {selected && <CommunityModal community={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}