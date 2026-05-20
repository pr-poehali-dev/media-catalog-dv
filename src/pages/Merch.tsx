import { Link } from 'react-router-dom';
import ContactForm from '@/components/ContactForm';
import { MERCH_ITEMS } from '@/data/data';

export default function Merch() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Направление 04</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Брендированная продукция</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Мерч — реклама, которая остаётся с клиентом. Кружка на столе,<br />
            футболка на улице, стикер на ноутбуке — бренд постоянно перед глазами.<br className="hidden lg:block" />
            У владельца и всего его окружения.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#merch-form" className="btn-carmine">Заказать мерч</a>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в Telegram</a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">Написать в MAX</a>
          </div>
        </div>
      </section>

      {/* Почему мерч работает */}
      <section className="bg-[#FBF8F3] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="section-rule" />
                <div className="eyebrow text-[#5a5347]">Логика мерча</div>
              </div>
              <h2 className="section-title text-[#0A0A0A] mb-6">
                Клиент стал<br />рекламоносителем
              </h2>
              <p className="text-[#0A0A0A]/65 leading-relaxed mb-6">
                Брендированная продукция — единственная реклама, за которую говорят спасибо.
                Клиент её получил, клиент её использует. Мерч работает на вас каждый день.
              </p>
              <p className="text-[#0A0A0A]/65 leading-relaxed">
                Каждый раз, когда клиент достаёт ключи, пьёт кофе или идёт
                в магазин — ваш логотип перед глазами него самого
                и всего его окружения.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-[#E8E2D8]">
              {[
                { num: '365', unit: 'дней', desc: 'Мерч работает без перерыва, в отличие от рекламного поста.' },
                { num: '∞', unit: 'контактов', desc: 'Каждый новый контакт бесплатный для бизнеса, он уже оплачен.' },
                { num: '3–10+', unit: 'охват', desc: 'Мерч видит не только владелец, но и его окружение.' },
                { num: '20-25%', unit: 'удержание', desc: 'Клиент, получивший подарок, возвращается чаще.' },
              ].map((item) => (
                <div key={item.num} className="bg-[#FBF8F3] p-7">
                  <div className="font-display font-extrabold text-[#A21D27] leading-none mb-1"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                    {item.num}
                  </div>
                  <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>{item.unit}</div>
                  <p className="text-sm text-[#0A0A0A]/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Каталог товаров */}
      <section className="bg-[#F2EDE4] pattern-light py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Каталог</div>
          </div>
          <div className="flex flex-col gap-px bg-[#E8E2D8]">
            {MERCH_ITEMS.map((item, i) => (
              <div key={item.id}
                className={`flex flex-col md:flex-row bg-[#F2EDE4] ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Visual */}
                <div className="md:w-[200px] bg-[#0A0A0A] flex flex-col items-center justify-center p-10 min-h-[160px] flex-shrink-0">
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <div className="text-[10px] text-[#FBF8F3]/40 uppercase text-center" style={{ letterSpacing: '0.16em' }}>
                    от {item.priceFrom.toLocaleString('ru')} ₽ / шт.
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-7">
                  <h3 className="font-display font-bold text-[#0A0A0A] text-xl mb-2 leading-tight" style={{ letterSpacing: '-0.01em' }}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/65 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex items-start gap-2 text-sm text-[#0A0A0A]/60">
                    <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-0.5" />
                    {item.why}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как заказать */}
      <section className="bg-[#FBF8F3] pattern-milk py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Процесс</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E2D8]">
            {[
              { n: '01', t: 'Заявка', d: 'Называете цель закупа, желаемую продукцию, если такая есть, и тираж.' },
              { n: '02', t: 'Макет', d: 'Подбираем позиции по заявке и создаем макеты продукции с нанесением.' },
              { n: '03', t: 'Производство', d: 'Изготавливаем от 10 штук. Конечно, лучше заказывать от 50 (цена сильно ниже). Сроки — от 5 рабочих дней.' },
              { n: '04', t: 'Доставка', d: 'Курьером по городу или транспортной компанией в регион.' },
            ].map((item) => (
              <div key={item.n} className="bg-[#FBF8F3] p-7">
                <div className="font-display font-extrabold text-[#A21D27] text-3xl leading-none mb-4">{item.n}</div>
                <div className="font-display font-bold text-[#0A0A0A] text-lg mb-2" style={{ letterSpacing: '-0.01em' }}>{item.t}</div>
                <p className="text-sm text-[#5a5347] leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="merch-form" className="bg-[#0A0A0A] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Заказать брендированную продукцию" subtitle="Укажите цель закупа, тираж и желаемые позиции. Пришлем расчёт" />
        </div>
      </section>
    </div>
  );
}