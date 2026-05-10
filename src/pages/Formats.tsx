import { Link } from 'react-router-dom';
import { FORMATS_INFO } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

export default function Formats() {
  return (
    <div className="pt-16">
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Инструменты</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Форматы рекламы</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Выберите формат под задачу: от быстрого поста до полноценного спецпроекта
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-10">
            {FORMATS_INFO.map((format, i) => (
              <div
                key={format.id}
                className={`flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-border bg-white shadow-sm ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual */}
                <div className="md:w-1/3 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white flex flex-col items-center justify-center p-8 min-h-[180px]">
                  <div className="text-6xl mb-4">{format.emoji}</div>
                  <div className="font-display font-bold text-xl text-center">{format.name}</div>
                  <div className="text-white/60 text-sm mt-2 text-center">{format.purpose}</div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="mb-4">
                    <p className="text-muted-foreground leading-relaxed">{format.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <h4 className="font-semibold text-brand-dark text-sm mb-2">Преимущества</h4>
                      <div className="flex flex-col gap-1.5">
                        {format.pros.map((p) => (
                          <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Icon name="Check" size={12} className="text-brand-orange flex-shrink-0 mt-0.5" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-brand-light rounded-xl p-4">
                      <h4 className="font-semibold text-brand-dark text-sm mb-2">Пример</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{format.example}</p>
                    </div>
                  </div>

                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 bg-brand-orange text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-orange-dark transition-colors"
                  >
                    <Icon name="MessageCircle" size={14} />
                    Заказать {format.name.toLowerCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 gradient-hero">
        <div className="container mx-auto px-4 max-w-2xl">
          <ContactForm dark title="Подобрать формат" subtitle="Расскажите о задаче — предложим оптимальный формат" />
        </div>
      </section>
    </div>
  );
}
