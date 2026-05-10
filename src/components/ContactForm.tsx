import { useState } from 'react';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function ContactForm({
  title = 'Получить подборку площадок',
  subtitle = 'Оставьте заявку — составим медиаплан под ваши задачи',
  dark = false,
}: ContactFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', task: '', consent: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputBase = `w-full px-4 py-3 text-sm transition-colors focus:outline-none ${
    dark
      ? 'bg-[#FBF8F3]/8 border border-[#FBF8F3]/20 text-[#FBF8F3] placeholder:text-[#FBF8F3]/35 focus:border-[#FBF8F3]/50'
      : 'bg-white border border-[#E8E2D8] text-[#0A0A0A] placeholder:text-[#0A0A0A]/35 focus:border-[#A21D27]'
  }`;

  const labelBase = `text-[10px] font-medium uppercase block mb-1.5 ${dark ? 'text-[#FBF8F3]/50' : 'text-[#5a5347]'}`;

  if (sent) {
    return (
      <div className={`p-8 text-center ${dark ? 'border border-[#FBF8F3]/15' : 'border border-[#E8E2D8] bg-white'}`}>
        <div className="w-10 h-10 bg-[#A21D27] flex items-center justify-center mx-auto mb-4">
          <span className="text-[#FBF8F3] text-lg">✓</span>
        </div>
        <h3 className={`font-display font-bold text-xl mb-2 ${dark ? 'text-[#FBF8F3]' : 'text-[#0A0A0A]'}`}>
          Заявка отправлена
        </h3>
        <p className={`text-sm ${dark ? 'text-[#FBF8F3]/50' : 'text-[#5a5347]'}`}>
          Ответим в течение 2 часов в рабочее время.
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 md:p-8 ${dark ? 'border border-[#FBF8F3]/15' : 'border border-[#E8E2D8] bg-white'}`}>
      {title && (
        <div className="mb-6">
          <h3 className={`font-display font-bold text-2xl mb-2 leading-tight ${dark ? 'text-[#FBF8F3]' : 'text-[#0A0A0A]'}`}
            style={{ letterSpacing: '-0.02em' }}>
            {title}
          </h3>
          {subtitle && <p className={`text-sm leading-relaxed ${dark ? 'text-[#FBF8F3]/50' : 'text-[#5a5347]'}`}>{subtitle}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`${labelBase}`} style={{ letterSpacing: '0.14em' }}>Ваше имя</label>
            <input type="text" required placeholder="Иван Петров" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputBase} />
          </div>
          <div>
            <label className={`${labelBase}`} style={{ letterSpacing: '0.14em' }}>Телефон / Telegram</label>
            <input type="text" required placeholder="+7 000 000-00-00" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputBase} />
          </div>
        </div>
        <div>
          <label className={`${labelBase}`} style={{ letterSpacing: '0.14em' }}>Город</label>
          <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputBase}>
            <option value="">Выберите город</option>
            <option>Хабаровск</option>
            <option>Владивосток</option>
            <option>Комсомольск-на-Амуре</option>
            <option>Несколько городов</option>
          </select>
        </div>
        <div>
          <label className={`${labelBase}`} style={{ letterSpacing: '0.14em' }}>Задача</label>
          <textarea rows={3} placeholder="Что продвигаете и какая цель рекламы..." value={form.task}
            onChange={(e) => setForm({ ...form, task: e.target.value })}
            className={`${inputBase} resize-none`} />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 w-4 h-4 accent-[#A21D27] flex-shrink-0" />
          <span className={`text-[11px] leading-relaxed ${dark ? 'text-[#FBF8F3]/40' : 'text-[#5a5347]'}`}>
            Согласен(а) с{' '}
            <a href="/legal/privacy" className="underline hover:text-[#A21D27] transition-colors" target="_blank" rel="noopener noreferrer">
              Политикой обработки персональных данных
            </a>{' '}
            и даю согласие на обработку персональных данных
          </span>
        </label>

        <button type="submit" className="btn-carmine justify-center mt-1">
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
