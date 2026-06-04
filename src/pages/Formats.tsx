import { Link } from 'react-router-dom';
import { FORMATS_INFO } from '@/data/data';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Formats() {
  useScrollReveal();

  return (
    <div>
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark pt-32 pb-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Инструменты</div></div>
          <h1 className="page-hero-title text-[#FBF8F3] mb-3">Форматы рекламы</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">От быстрого поста до полноценного спецпроекта. Выбираем формат под задачу.</p>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-16 reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-px bg-[#E8E2D8]">
            {FORMATS_INFO.map((format, i) => (
              <div key={format.id}
                className={`flex flex-col md:flex-row bg-[#FBF8F3] ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Visual */}
                <div className="md:w-1/3 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 md:p-12 min-h-[200px] text-center">
                  <div className="text-5xl mb-4">{format.emoji}</div>
                  <div className="font-display font-bold text-[#FBF8F3] text-xl mb-2" style={{ letterSpacing: '-0.01em' }}>{format.name}</div>
                  <div className="text-[10px] text-[#FBF8F3]/40 uppercase" style={{ letterSpacing: '0.18em' }}>{format.purpose}</div>
                </div>
                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[#0A0A0A]/65 leading-relaxed mb-6">{format.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Преимущества</div>
                        {format.pros.map((p) => (
                          <div key={p} className="flex items-start gap-2 text-sm text-[#0A0A0A]/65 mb-2">
                            <div className="w-px h-4 bg-[#A21D27] flex-shrink-0 mt-0.5" /> {p}
                          </div>
                        ))}
                      </div>
                      <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-5">
                        <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Пример</div>
                        <p className="text-sm text-[#0A0A0A]/65 leading-relaxed">{format.example}</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/contacts" className="btn-outline-dark self-start">
                    Заказать {format.name.toLowerCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] pattern-dark py-14 reveal">
        <div className="pattern-content max-w-7xl mx-auto px-6 max-w-2xl">
          <ContactForm dark title="Подобрать формат" subtitle="Расскажите о задаче — предложим оптимальный формат" />
        </div>
      </section>
    </div>
  );
}