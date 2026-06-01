import { useState, useMemo } from 'react';
import { COMMUNITIES, SOCIALS, Community, SocialNet } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import CommunityCard from '@/components/communities/CommunityCard';
import CommunityModal from '@/components/communities/CommunityModal';
import useScrollReveal from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';

const WHY = [
  { num: '01', title: 'Локальная аудитория', desc: 'Реклама попадает не в абстрактные показы, а к жителям конкретного города: Хабаровска, Владивостока или Комсомольска-на-Амуре.' },
  { num: '02', title: 'Быстрый запуск', desc: 'Размещение можно запустить быстрее, чем полноценную кампанию в таргете или наружной рекламе. Подходит для акций, мероприятий, открытий и срочных анонсов.' },
  { num: '03', title: 'Доверие к площадке', desc: 'Городские сообщества читают как источник новостей, рекомендаций и локальной повестки. Поэтому рекламное сообщение воспринимается мягче, чем обычный баннер.' },
  { num: '04', title: 'Гибкие форматы', desc: 'Можно разместить пост, нативную новость, подборку, закреп, серию публикаций или пакет сразу в нескольких соцсетях.' },
  { num: '05', title: 'Усиление других каналов', desc: 'Городские сообщества хорошо работают вместе с наружной рекламой, блогерами и таргетом: человек видит бренд в нескольких местах и быстрее его запоминает.' },
];

const PLACEMENT: { key: SocialNet; formats: string[] }[] = [
  { key: 'vk', formats: ['Фото или видео-посты в ленту', 'Видео в Клипы', 'Истории'] },
  { key: 'telegram', formats: ['Фото или видео-посты в ленту'] },
  { key: 'max', formats: ['Фото или видео-посты в ленту'] },
  {
    key: 'instagram',
    formats: [
      'С 01.09 реклама в Instagram* запрещена. Рассказать о вас там получится только нативно — в виде новости в ленту, в сторис или в ленту + сторис.',
    ],
  },
  { key: 'ok', formats: ['Фото или видео-посты в ленту'] },
];

const SOCIAL_FILTERS: Array<'Все соцсети' | SocialNet> = ['Все соцсети', 'vk', 'telegram', 'max', 'instagram', 'ok'];

const CITY_FILTERS = ['Все города', 'Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'] as const;

export default function Communities() {
  const [selected, setSelected] = useState<Community | null>(null);
  const [city, setCity] = useState<'Все города' | 'Хабаровск' | 'Владивосток' | 'Комсомольск-на-Амуре'>('Все города');
  const [social, setSocial] = useState<'Все соцсети' | SocialNet>('Все соцсети');
  const [openFaq, setOpenFaq] = useState<SocialNet | null>('vk');

  const filtered = useMemo(() => {
    return COMMUNITIES.filter(
      (c) =>
        (city === 'Все города' || c.city === city) &&
        (social === 'Все соцсети' || c.social === social)
    );
  }, [city, social]);

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
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-3">
            Размещаем рекламу там, где жители каждый день читают новости, обсуждают события и ищут рекомендации.
          </p>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Подбираем городские сообщества под ваш бюджет и задачу: от быстрого анонса до комплексного размещения по нескольким площадкам.
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
          <div className="grid gap-px bg-[#E8E2D8] grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {WHY.map((item) => (
              <div key={item.num} className="bg-[#F2EDE4] flex flex-col p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-5">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg leading-tight" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <div className="mt-3 w-6 border-t border-[#A21D27]/30 mb-3" />
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Где и как можно разместиться */}
      <section className="relative bg-[#FBF8F3] pattern-milk py-14 reveal overflow-hidden">
        <div className="pattern-content max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Где и как можно разместиться</div>
          </div>
          <div className="border border-[#E8E2D8] bg-[#FBF8F3]">
            {PLACEMENT.map((p) => {
              const info = SOCIALS[p.key];
              const isOpen = openFaq === p.key;
              return (
                <div key={p.key} className="border-b border-[#E8E2D8] last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : p.key)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#F2EDE4]/50 transition-colors"
                  >
                    <span className="text-xl">{info.emoji}</span>
                    <span className="flex-1 font-display font-bold text-[#0A0A0A] text-base">{info.label}</span>
                    <Icon
                      name="ChevronDown"
                      size={18}
                      className="text-[#A21D27] transition-transform duration-200"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-[3.25rem]">
                      <div className="flex flex-col gap-2">
                        {p.formats.map((f, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm text-[#5a5347] leading-relaxed">
                            <span className="text-[#A21D27] font-bold flex-shrink-0 mt-0.5">—</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-[#8C8478] leading-relaxed">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
          </p>
        </div>
      </section>

      {/* Каталог (чёрный, как у блогеров) */}
      <section className="bg-[#0A0A0A] pattern-dark py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4 pt-2">
              <div className="section-rule" />
              <div className="eyebrow text-[#FBF8F3]/50">Каталог</div>
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
      <section id="form" className="bg-[#0A0A0A] pattern-dark pt-4 pb-16 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Получить медиаплан" subtitle="Составим медиаплан под ваш город, бюджет и задачу" source="Городские сообщества" />
        </div>
      </section>

      {selected && <CommunityModal community={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}