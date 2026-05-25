import ContactForm from '@/components/ContactForm';

export default function Contacts() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="section-rule" />
            <div className="eyebrow text-[#FBF8F3]/50">Связь</div>
          </div>
          <h1 className="section-title text-[#FBF8F3] mb-4">Контакты</h1>
          <p className="text-[#FBF8F3]/50 text-base max-w-2xl leading-relaxed mb-8">
            Связаться с нами можете по телефону{' '}
            <a href="tel:+79142055535" className="text-[#FBF8F3] hover:text-[#A21D27] transition-colors underline underline-offset-2">
              8 (914) 205-55-35
            </a>
            , по почте{' '}
            <a href="mailto:media2.7@mail.ru" className="text-[#FBF8F3] hover:text-[#A21D27] transition-colors underline underline-offset-2">
              media2.7@mail.ru
            </a>
            {' '}или в Telegram и MAX по кнопкам ниже👇
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer" className="btn-carmine">
              Написать в Telegram
            </a>
            <a href="https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Написать в MAX
            </a>
          </div>
        </div>
      </section>

      {/* Юридическая информация */}
      <section className="bg-[#FBF8F3] pattern-milk py-12">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="section-rule" />
            <div className="eyebrow text-[#5a5347]">Юридическая информация</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E8E2D8]">
            <div className="bg-[#FBF8F3] p-6">
              <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Часы работы</div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#5a5347]">Пн–Пт</span>
                <span className="text-[#0A0A0A]">11:00–23:00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5a5347]">Сб–Вс</span>
                <span className="text-[#0A0A0A]">По договор.</span>
              </div>
            </div>
            <div className="bg-[#FBF8F3] p-6">
              <div className="text-[10px] text-[#5a5347] uppercase mb-3" style={{ letterSpacing: '0.16em' }}>Реквизиты</div>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-[#0A0A0A]/70">
                <span>ИП Москаленко Илья Денисович</span>
                <span><span className="text-[#5a5347]">ИНН:</span> 271703923290</span>
                <span><span className="text-[#5a5347]">ОГРНИП:</span> 32427000070446</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section className="bg-[#0A0A0A] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <ContactForm
            dark
            title="Получить медиаплан"
            subtitle="Расскажите о задаче — подберём решения и вышлем медиаплан бесплатно"
            source="Контакты"
          />
        </div>
      </section>
    </div>
  );
}
