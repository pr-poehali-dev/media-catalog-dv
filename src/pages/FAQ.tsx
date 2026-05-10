import { FAQ_DATA } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

export default function FAQ() {
  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Помощь</div></div>
          <h1 className="section-title text-[#FBF8F3] mb-3">Частые вопросы</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">Отвечаем конкретно. Без воды и корпоративных формулировок.</p>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6"><div className="section-rule" /><div className="eyebrow text-[#5a5347]">Вопросы</div></div>
              <p className="text-[#0A0A0A]/60 text-sm leading-relaxed mb-6">
                Если не нашли ответ — напишите. Ответим в течение 2 часов.
              </p>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-carmine">
                Написать в Telegram
              </a>
            </div>
            <div className="lg:col-span-2">
              {FAQ_DATA.map((item, i) => (
                <details key={i} className="group border-t border-[#E8E2D8]">
                  <summary className="flex items-start justify-between gap-4 py-5 cursor-pointer list-none font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors text-sm leading-snug">
                    {item.question}
                    <Icon name="Plus" size={16} className="flex-shrink-0 text-[#5a5347] group-open:hidden mt-0.5" />
                    <Icon name="Minus" size={16} className="flex-shrink-0 text-[#A21D27] hidden group-open:block mt-0.5" />
                  </summary>
                  <div className="pb-5 text-sm text-[#5a5347] leading-relaxed">{item.answer}</div>
                </details>
              ))}
              <div className="border-t border-[#E8E2D8]" />
            </div>
          </div>

          {/* Ad marking note */}
          <div className="mt-12 bg-[#F2EDE4] border-l-4 border-[#A21D27] p-6">
            <div className="flex gap-3">
              <Icon name="Info" size={16} className="text-[#A21D27] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-display font-bold text-[#0A0A0A] mb-2 text-sm" style={{ letterSpacing: '-0.01em' }}>О маркировке рекламы</div>
                <p className="text-sm text-[#5a5347] leading-relaxed">
                  С 1 сентября 2023 года вся интернет-реклама в России должна маркироваться согласно ФЗ «О рекламе» №38-ФЗ.
                  Это означает регистрацию в ОРД и добавление токена erid. Мы берём маркировку на себя.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-14">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Не нашли ответ?" subtitle="Задайте вопрос — ответим напрямую" />
        </div>
      </section>
    </div>
  );
}
