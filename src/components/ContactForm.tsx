import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function ContactForm({ title = 'Получить подборку площадок', subtitle = 'Оставьте заявку — составим медиаплан под ваши задачи и бюджет', dark = false }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', task: '', consent: false });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/40 ${
    dark
      ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-brand-orange'
      : 'bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand-orange'
  }`;

  const labelClass = `text-sm font-medium mb-1.5 block ${dark ? 'text-white/80' : 'text-foreground'}`;

  if (sent) {
    return (
      <div className={`rounded-2xl p-8 text-center ${dark ? 'bg-white/10' : 'bg-brand-light border border-border'}`}>
        <div className="text-4xl mb-4">✅</div>
        <h3 className={`font-display font-bold text-xl mb-2 ${dark ? 'text-white' : 'text-brand-dark'}`}>
          Заявка отправлена!
        </h3>
        <p className={`text-sm ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
          Мы свяжемся с вами в течение 2 часов в рабочее время.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-6 md:p-8 ${dark ? 'bg-white/10 border border-white/20' : 'bg-white border border-border shadow-sm'}`}>
      {title && (
        <div className="mb-6">
          <h3 className={`font-display font-bold text-2xl mb-2 ${dark ? 'text-white' : 'text-brand-dark'}`}>{title}</h3>
          {subtitle && <p className={`text-sm ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>{subtitle}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ваше имя *</label>
            <input
              type="text"
              required
              placeholder="Иван Петров"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Телефон или Telegram *</label>
            <input
              type="text"
              required
              placeholder="+7 000 000-00-00"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Город</label>
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={inputClass}
          >
            <option value="">Выберите город</option>
            <option>Хабаровск</option>
            <option>Владивосток</option>
            <option>Комсомольск-на-Амуре</option>
            <option>Несколько городов</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Задача / что продвигаете</label>
          <textarea
            rows={3}
            placeholder="Расскажите о вашем бизнесе и цели рекламы..."
            value={form.task}
            onChange={(e) => setForm({ ...form, task: e.target.value })}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 w-4 h-4 accent-brand-orange flex-shrink-0"
          />
          <span className={`text-xs leading-relaxed ${dark ? 'text-white/50' : 'text-muted-foreground'}`}>
            Я согласен(а) с{' '}
            <a href="/legal/privacy" className="underline hover:text-brand-orange transition-colors" target="_blank" rel="noopener noreferrer">
              Политикой обработки персональных данных
            </a>{' '}
            и даю согласие на обработку персональных данных
          </span>
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-brand-orange text-white font-semibold py-3.5 rounded-lg hover:bg-brand-orange-dark transition-colors text-sm"
        >
          <Icon name="Send" size={16} />
          Отправить заявку
        </button>
      </form>
    </div>
  );
}
