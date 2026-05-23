import { Link } from 'react-router-dom';
import ContactForm from '@/components/ContactForm';
import { OUTDOOR_FORMATS, OutdoorFormat } from '@/data/data';
import Icon from '@/components/ui/icon';

function OutdoorCard({ format, reversed }: { format: OutdoorFormat; reversed?: boolean }) {
  return (
    <div className={`pcard flex flex-col md:flex-row overflow-hidden ${reversed ? 'md:flex-row-reverse' : ''}`}>
      {/* Visual */}
      <div className="md:w-[220px] bg-[#0A0A0A] flex flex-col items-center justify-center p-10 min-h-[180px] flex-shrink-0 text-center">
        <div className="text-4xl mb-3">{format.emoji}</div>
        <div className="font-display font-bold text-[#FBF8F3] text-lg leading-tight mb-1" style={{ letterSpacing: '-0.01em' }}>{format.name}</div>
        <div className="text-[10px] text-[#FBF8F3]/40 uppercase" style={{ letterSpacing: '0.18em' }}>{format.size}</div>
      </div>
      {/* Content */}
      <div className="flex-1 p-7 flex flex-col justify-between bg-[#0A0A0A]">
        <div>
          <p className="text-sm text-[#FBF8F3]/60 leading-relaxed mb-5">{format.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 p-4">
              <div className="text-[10px] text-[#FBF8F3]/40 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Где размещается</div>
              <p className="text-sm text-[#FBF8F3]/80 leading-relaxed">{format.where}</p>
            </div>
            <div className="bg-[#FBF8F3]/5 border border-[#FBF8F3]/10 p-4">
              <div className="text-[10px] text-[#FBF8F3]/40 uppercase mb-1.5" style={{ letterSpacing: '0.14em' }}>Главное преимущество</div>
              <p className="text-sm text-[#FBF8F3]/80 leading-relaxed">{format.advantage}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#FBF8F3]/10">
          <div>
            <div className="text-[10px] text-[#FBF8F3]/40 uppercase" style={{ letterSpacing: '0.14em' }}>от</div>
            <div className="font-display font-bold text-[#FBF8F3] text-2xl">{format.priceFrom.toLocaleString('ru')} ₽ / мес.</div>
          </div>
          <Link to="/contacts" className="btn-carmine">Оставить заявку</Link>
        </div>
      </div>
    </div>
  );
}

export default function Outdoor() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 03</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Наружная реклама</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Щиты, суперсайты, ситиборды, медиафасады и брандмауэры.
            Работаем в Хабаровске, Владивостоке и Комсомольске-на-Амуре.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contacts" className="btn-carmine">Получить предложение</Link>
            <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
          </div>
        </div>
      </section>

      {/* Преимущества — молочный с геофигурами */}
      <section className="bg-[#FBF8F3] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Преимущества</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { num: '01', title: '24/7 присутствие', desc: 'Работает круглосуточно, без алгоритмов и блокировок.' },
              { num: '02', title: 'Широкий охват', desc: 'Видит каждый, кто проезжает или проходит мимо.' },
              { num: '03', title: 'Территория', desc: 'Занимаете физическое пространство города — это статус.' },
              { num: '04', title: 'Синергия', desc: 'Усиливает онлайн-рекламу: узнаваемость растёт комплексно.' },
            ].map((item) => (
              <div key={item.num} className="bg-[#FBF8F3] p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.num}</div>
                <h3 className="font-display font-bold text-[#0A0A0A] text-lg mb-2" style={{ letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форматы — чёрный */}
      <section className="bg-[#0A0A0A] pattern-dark py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Форматы</div>
          </div>
          <div className="flex flex-col gap-px bg-[#FBF8F3]/10">
            {OUTDOOR_FORMATS.map((f, i) => (
              <div key={f.id} id={f.id}>
                <OutdoorCard format={f} reversed={i % 2 !== 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как работаем */}
      <section className="bg-[#F2EDE4] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Процесс</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { n: '01', t: 'Заявка', d: 'Вы описываете задачу: город, бюджет, цели, срок.' },
              { n: '02', t: 'Подбор мест', d: 'Предлагаем конкретные адреса конструкций с фото и трафиком.' },
              { n: '03', t: 'Макет', d: 'Помогаем с оформлением макета под выбранный формат.' },
              { n: '04', t: 'Размещение', d: 'Организуем печать, монтаж и контроль. Предоставляем фотоотчёт.' },
            ].map((item) => (
              <div key={item.n} className="bg-[#F2EDE4] p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.n}</div>
                <div className="font-display font-bold text-[#0A0A0A] text-lg mb-2" style={{ letterSpacing: '-0.01em' }}>{item.t}</div>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Разместить наружную рекламу" subtitle="Подберём конструкции и адреса под ваш бюджет" />
        </div>
      </section>
    </div>
  );
}
