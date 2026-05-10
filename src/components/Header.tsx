import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SOCIALS_MENU = [
  { label: 'ВКонтакте', path: '/socials/vk', emoji: '💙' },
  { label: 'Telegram', path: '/socials/telegram', emoji: '✈️' },
  { label: 'Одноклассники', path: '/socials/ok', emoji: '🟠' },
  { label: 'MAX', path: '/socials/max', emoji: '🟣' },
  { label: 'TikTok', path: '/socials/tiktok', emoji: '🎵' },
  { label: 'Instagram*', path: '/socials/instagram', emoji: '📷' },
];

const CITIES_MENU = [
  { label: 'Хабаровск', path: '/cities/khabarovsk', emoji: '🏙️' },
  { label: 'Владивосток', path: '/cities/vladivostok', emoji: '⚓' },
  { label: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk', emoji: '⚙️' },
  { label: 'Дальний Восток (обзор)', path: '/cities/far-east', emoji: '🗺️' },
];

const NAV_LINKS = [
  { label: 'Площадки', path: '/platforms' },
  { label: 'Форматы', path: '/formats' },
  { label: 'Кейсы', path: '/cases' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Контакты', path: '/contacts' },
];

interface DropdownProps {
  label: string;
  items: { label: string; path: string; emoji: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function Dropdown({ label, items, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-brand-dark hover:text-brand-orange transition-colors py-1"
      >
        {label}
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border z-50 py-2 animate-scale-in">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-dark hover:bg-brand-light hover:text-brand-orange transition-colors"
            >
              <span>{item.emoji}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);
  const close = () => setOpenMenu(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-display font-bold text-base tracking-wider">ДВ</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-brand-dark text-base leading-tight tracking-wide">ДВ Медиа</div>
              <div className="text-[10px] text-muted-foreground leading-tight">Реклама на Дальнем Востоке</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-brand-dark hover:text-brand-orange transition-colors">
              Главная
            </Link>
            <Dropdown
              label="Соцсети"
              items={SOCIALS_MENU}
              isOpen={openMenu === 'socials'}
              onToggle={() => toggle('socials')}
              onClose={close}
            />
            <Dropdown
              label="Города"
              items={CITIES_MENU}
              isOpen={openMenu === 'cities'}
              onToggle={() => toggle('cities')}
              onClose={close}
            />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand-orange'
                    : 'text-brand-dark hover:text-brand-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-brand-orange text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-orange-dark transition-colors"
            >
              <Icon name="Send" size={14} />
              Telegram
            </a>
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-brand-light transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/" className="px-3 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-light rounded-lg transition-colors">
              Главная
            </Link>
            <Link to="/platforms" className="px-3 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-light rounded-lg transition-colors">
              Площадки
            </Link>
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Соцсети</div>
            {SOCIALS_MENU.map((item) => (
              <Link key={item.path} to={item.path} className="px-6 py-2 text-sm text-brand-dark hover:bg-brand-light rounded-lg transition-colors flex items-center gap-2">
                <span>{item.emoji}</span>{item.label}
              </Link>
            ))}
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Города</div>
            {CITIES_MENU.map((item) => (
              <Link key={item.path} to={item.path} className="px-6 py-2 text-sm text-brand-dark hover:bg-brand-light rounded-lg transition-colors flex items-center gap-2">
                <span>{item.emoji}</span>{item.label}
              </Link>
            ))}
            <div className="section-divider my-2" />
            {NAV_LINKS.slice(1).map((link) => (
              <Link key={link.path} to={link.path} className="px-3 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-light rounded-lg transition-colors">
                {link.label}
              </Link>
            ))}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 bg-brand-orange text-white font-semibold px-4 py-3 rounded-lg"
            >
              <Icon name="Send" size={16} />
              Написать в Telegram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
