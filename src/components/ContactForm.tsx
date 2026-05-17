import { useState } from 'react';

const SEND_LEAD_URL = 'https://functions.poehali.dev/23c232dd-6c5c-4b01-82da-fa900e5b7087';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function ContactForm({
  title = 'Отправить заявку',
  subtitle = 'Оставьте заявку — составим медиаплан под ваши задачи',
  dark = false,
}: ContactFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', task: '', consent: false });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: form.city,
          task: form.task,
        }),
      });
      setSent(true);
    } catch {
      setError('Не удалось отправить. Напишите нам напрямую в Telegram: @prhbk');
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full px-4 py-3 text-sm transition-colors focus:outline-none ${
    dark
      ? 'bg-[#FBF8F3]/8 border border-[#FBF8F3]/20 focus:border-[#FBF8F3]/50'
      : 'bg-white border border-[#E8E2D8] focus:border-[#A21D27]'
  }`;

  const inputStyle: React.CSSProperties = {
    color: dark ? '#FBF8F3' : '#0A0A0A',
  };

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
          <h3
            className={`font-display font-bold text-2xl mb-2 leading-tight ${dark ? 'text-[#FBF8F3]' : 'text-[#0A0A0A]'}`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className={`text-sm leading-relaxed ${dark ? 'text-[#FBF8F3]/50' : 'text-[#5a5347]'}`}>{subtitle}</p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase} style={{ letterSpacing: '0.14em' }}>Ваше имя</label>
            <input
              type="text"
              required
              placeholder="Иван"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputBase}
              style={inputStyle}
            />
          </div>
          <div>
            <label className={labelBase} style={{ letterSpacing: '0.14em' }}>Телефон / Telegram</label>
            <input
              type="text"
              required
              placeholder="8 (999) 123-45-67"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputBase}
              style={inputStyle}
            />
          </div>
        </div>
        <div>
          <label className={labelBase} style={{ letterSpacing: '0.14em' }}>Город</label>
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={`${inputBase} appearance-none`}
            style={{
              color: form.city === '' ? (dark ? 'rgba(251,248,243,0.35)' : '#9a9490') : (dark ? '#FBF8F3' : '#0A0A0A'),
              backgroundColor: dark ? 'rgba(255,255,255,0.08)' : '#fff',
            }}
          >
            <option value="" style={{ color: '#0A0A0A', backgroundColor: '#fff' }}>Выберите город</option>
            <option value="Хабаровск" style={{ color: '#0A0A0A', backgroundColor: '#fff' }}>Хабаровск</option>
            <option value="Владивосток" style={{ color: '#0A0A0A', backgroundColor: '#fff' }}>Владивосток</option>
            <option value="Комсомольск-на-Амуре" style={{ color: '#0A0A0A', backgroundColor: '#fff' }}>Комсомольск-на-Амуре</option>
            <option value="Несколько городов" style={{ color: '#0A0A0A', backgroundColor: '#fff' }}>Несколько городов</option>
          </select>
        </div>
        <div>
          <label className={labelBase} style={{ letterSpacing: '0.14em' }}>Задача</label>
          <textarea
            rows={3}
            placeholder="Осветить новую точку"
            value={form.task}
            onChange={(e) => setForm({ ...form, task: e.target.value })}
            className={`${inputBase} resize-none`}
            style={inputStyle}
          />
        </div>

        {error && (
          <p className="text-sm text-[#A21D27]">{error}</p>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 w-4 h-4 accent-[#A21D27] flex-shrink-0"
          />
          <span className={`text-[11px] leading-relaxed ${dark ? 'text-[#FBF8F3]/40' : 'text-[#5a5347]'}`}>
            Согласен(а) с{' '}
            <a href="/legal/privacy" className="underline hover:text-[#A21D27] transition-colors" target="_blank" rel="noopener noreferrer">
              Политикой обработки персональных данных
            </a>{' '}
            и даю согласие на обработку персональных данных
          </span>
        </label>

        <button type="submit" disabled={loading} className="btn-carmine justify-center mt-1" style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Отправляем...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
}