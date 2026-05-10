import { FAQ_DATA } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

export default function FAQ() {
  return (
    <div className="pt-16">
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Помощь</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Частые вопросы</h1>
          <p className="text-white/70 text-lg max-w-2xl">Ответы на самые популярные вопросы о рекламе в сообществах Дальнего Востока</p>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((item, i) => (
              <details key={i} className="group border border-border bg-white rounded-xl overflow-hidden">
                <summary className="flex items-start justify-between gap-3 p-5 cursor-pointer list-none">
                  <span className="font-display font-semibold text-brand-dark group-hover:text-brand-orange transition-colors leading-snug">
                    {item.question}
                  </span>
                  <Icon name="ChevronDown" size={18} className="flex-shrink-0 text-muted-foreground group-open:rotate-180 transition-transform mt-0.5" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Ad marking note */}
          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3">
              <Icon name="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">О маркировке рекламы</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  С 1 сентября 2023 года вся интернет-реклама в России должна маркироваться согласно Федеральному закону
                  «О рекламе» №38-ФЗ. Это означает регистрацию рекламного материала в системе ОРД
                  (оператора рекламных данных) и добавление токена erid к публикации. Мы берём маркировку на себя.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center text-white mb-8">
            <h2 className="font-display font-bold text-2xl mb-2">Не нашли ответ?</h2>
            <p className="text-white/60">Напишите нам — ответим в течение 2 часов</p>
          </div>
          <ContactForm dark title="Задать вопрос" subtitle="" />
        </div>
      </section>
    </div>
  );
}
