import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY);
    if (!saved) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[320px] w-full bg-[#FBF8F3] border border-[#E8E2D8] rounded-2xl shadow-lg p-4">
      <p className="text-[12px] text-[#0A0A0A] leading-relaxed mb-3">
        Мы используем технические cookie — необходимые для работы сайта, и аналитические — для анализа посещаемости.{' '}
        <Link
          to="/legal/cookies"
          className="underline text-[#A21D27] hover:text-[#831520] transition-colors"
        >
          Политика Cookie
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleReject}
          className="flex-1 text-[11px] font-medium px-3 py-2 rounded-full bg-[#E8E2D8] text-[#0A0A0A] hover:bg-[#d9d2c8] transition-colors"
          style={{ letterSpacing: '0.04em' }}
        >
          Отклонить
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 text-[11px] font-medium px-3 py-2 rounded-full bg-[#A21D27] text-[#FBF8F3] hover:bg-[#831520] transition-colors"
          style={{ letterSpacing: '0.04em' }}
        >
          Принять
        </button>
      </div>
    </div>
  );
}
