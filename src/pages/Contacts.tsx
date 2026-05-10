import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  return (
    <div className="pt-16">
      <section className="gradient-hero text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Связь</div>
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Контакты</h1>
          <p className="text-white/70 text-lg max-w-2xl">Оставьте заявку — в течение 2 часов пришлём подборку площадок и предварительный медиаплан</p>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: contacts */}
            <div>
              <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Как с нами связаться</h2>

              <div className="flex flex-col gap-4 mb-8">
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl card-hover group">
                  <div className="w-10 h-10 bg-[#229ED9] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Send" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">Telegram</div>
                    <div className="text-sm text-muted-foreground">@dvmedia_adv</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="ml-auto text-muted-foreground group-hover:text-brand-orange transition-colors" />
                </a>

                <a href="tel:+74212000000"
                  className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl card-hover group">
                  <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">Телефон</div>
                    <div className="text-sm text-muted-foreground">+7 (4212) 00-00-00</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="ml-auto text-muted-foreground group-hover:text-brand-orange transition-colors" />
                </a>

                <a href="mailto:info@dvmedia.ru"
                  className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl card-hover group">
                  <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">Email</div>
                    <div className="text-sm text-muted-foreground">info@dvmedia.ru</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="ml-auto text-muted-foreground group-hover:text-brand-orange transition-colors" />
                </a>
              </div>

              {/* Cities */}
              <div className="bg-white border border-border rounded-xl p-5 mb-6">
                <h3 className="font-display font-semibold text-brand-dark mb-3">Города присутствия</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { city: 'Хабаровск', emoji: '🏙️' },
                    { city: 'Владивосток', emoji: '⚓' },
                    { city: 'Комсомольск-на-Амуре', emoji: '⚙️' },
                  ].map((c) => (
                    <div key={c.city} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{c.emoji}</span> {c.city}
                    </div>
                  ))}
                </div>
              </div>

              {/* Working hours */}
              <div className="bg-white border border-border rounded-xl p-5">
                <h3 className="font-display font-semibold text-brand-dark mb-3">Время работы</h3>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Пн–Пт</span>
                    <span className="text-brand-dark">9:00 – 18:00 (МСК+7)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Сб–Вс</span>
                    <span className="text-brand-dark">По договорённости</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Заявки в Telegram принимаем круглосуточно, отвечаем в рабочее время
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <ContactForm title="Получить медиаплан" subtitle="Расскажите о задаче — подберём лучшие площадки и составим медиаплан бесплатно" />
            </div>
          </div>
        </div>
      </section>

      {/* Legal info */}
      <section className="py-10 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="font-display font-semibold text-brand-dark mb-4">Юридическая информация</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">ИНН:</span> 0000000000
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">ОГРН:</span> 0000000000000
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">По вопросам ПД:</span> pd@dvmedia.ru
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской
            и запрещена на территории Российской Федерации. Стандартное рекламное размещение в Instagram*
            для продвижения товаров и услуг на территории РФ не предлагается.
          </p>
        </div>
      </section>
    </div>
  );
}
