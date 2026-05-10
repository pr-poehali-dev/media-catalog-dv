import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Связь</div></div>
          <h1 className="section-title text-[#FBF8F3] mb-3">Контакты</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-xl leading-relaxed">
            Оставьте заявку — в течение 2 часов пришлём подборку площадок и предварительный медиаплан.
          </p>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <div className="flex items-center gap-4 mb-8"><div className="section-rule" /><div className="eyebrow text-[#5a5347]">Как связаться</div></div>
              <div className="flex flex-col gap-px bg-[#E8E2D8] mb-8">
                {[
                  { label: 'Telegram', value: '@dvmedia_adv', href: 'https://t.me/', icon: 'Send' as const },
                  { label: 'Телефон', value: '+7 (4212) 00-00-00', href: 'tel:+74212000000', icon: 'Phone' as const },
                  { label: 'Email', value: 'info@dvmedia.ru', href: 'mailto:info@dvmedia.ru', icon: 'Mail' as const },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-5 p-5 bg-[#FBF8F3] hover:bg-[#F2EDE4] transition-colors group">
                    <div className="w-9 h-9 bg-[#A21D27] flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} className="text-[#FBF8F3]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-[#5a5347] uppercase mb-0.5" style={{ letterSpacing: '0.16em' }}>{item.label}</div>
                      <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors">{item.value}</div>
                    </div>
                    <Icon name="ArrowRight" size={14} className="text-[#E8E2D8] group-hover:text-[#A21D27] transition-colors" />
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-5">
                  <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Города</div>
                  {['Хабаровск', 'Владивосток', 'Комсомольск-на-Амуре'].map((c) => (
                    <div key={c} className="text-sm text-[#0A0A0A]/65 mb-1.5">{c}</div>
                  ))}
                </div>
                <div className="bg-[#F2EDE4] border border-[#E8E2D8] p-5">
                  <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Часы работы</div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[#5a5347]">Пн–Пт</span>
                    <span className="text-[#0A0A0A]/65">9:00–18:00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5a5347]">Сб–Вс</span>
                    <span className="text-[#0A0A0A]/65">По договор.</span>
                  </div>
                  <p className="text-[11px] text-[#5a5347] mt-3 leading-relaxed">Telegram — круглосуточно</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <ContactForm title="Получить медиаплан" subtitle="Расскажите о задаче — подберём лучшие площадки бесплатно" />
          </div>
        </div>
      </section>

      <section className="bg-[#F2EDE4] border-t border-[#E8E2D8] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[10px] text-[#5a5347] uppercase mb-4" style={{ letterSpacing: '0.18em' }}>Юридическая информация</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-sm text-[#5a5347]">
            <div><span className="text-[#0A0A0A]/50">ИНН:</span> 0000000000</div>
            <div><span className="text-[#0A0A0A]/50">ОГРН:</span> 0000000000000</div>
            <div><span className="text-[#0A0A0A]/50">Email для ПД:</span> pd@dvmedia.ru</div>
          </div>
          <p className="text-[11px] text-[#5a5347]/70 leading-relaxed max-w-2xl">
            *Instagram принадлежит Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.
            Стандартное рекламное размещение в Instagram* не предлагается.
          </p>
        </div>
      </section>
    </div>
  );
}
