import { FAQ_DATA } from '@/data/data';
import Icon from '@/components/ui/icon';

export default function FAQ() {
  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Помощь</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-3">Частые вопросы</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">Отвечаем конкретно. Без воды и корпоративных формулировок.</p>
        </div>
      </section>

      {/* FAQ список */}
      <section className="bg-[#FBF8F3] pattern-milk py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Вопросы</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Левая колонка — маркировка */}
            <div className="lg:col-span-1">
              <div className="bg-[#F2EDE4] border-l-4 border-[#A21D27] p-6">
                <div className="flex gap-3">
                  <Icon name="Info" size={16} className="text-[#A21D27] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-bold text-[#0A0A0A] mb-2 text-sm" style={{ letterSpacing: '-0.01em' }}>О маркировке рекламы</div>
                    <p className="text-sm text-[#5a5347] leading-relaxed">
                      С 1 сентября 2023 года вся интернет-реклама в России должна маркироваться согласно ФЗ «О рекламе» №38-ФЗ.{' '}
                      Закон обязывает на регистрацию в ОРД и получение токена erid для всех рекламных материалов. Это мы берем на себя.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка — вопросы */}
            <div className="lg:col-span-2">
              {FAQ_DATA.map((item, i) => (
                <details key={i} className="group border-t border-[#E8E2D8]">
                  <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors text-sm leading-snug">
                    {item.question}
                    <Icon name="Plus" size={16} className="flex-shrink-0 text-[#5a5347] group-open:hidden mt-0.5" />
                    <Icon name="Minus" size={16} className="flex-shrink-0 text-[#A21D27] hidden group-open:block mt-0.5" />
                  </summary>
                  <div className="pb-5 text-sm text-[#5a5347] leading-relaxed whitespace-pre-line">{item.answer}</div>
                </details>
              ))}
              <div className="border-t border-[#E8E2D8]" />
            </div>
          </div>
        </div>
      </section>

      {/* Не нашли ответ */}
      <section className="bg-[#0A0A0A] pattern-dark py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="font-display font-bold text-[#FBF8F3] text-2xl mb-2" style={{ letterSpacing: '-0.02em' }}>
                Не нашли нужную информацию?
              </h2>
              <p className="text-[#FBF8F3]/50 text-sm leading-relaxed">
                Задайте вопрос в Telegram или в MAX — ответим в течение 2х часов
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-carmine">
                Написать в Telegram
              </a>
              <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Написать в MAX
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}