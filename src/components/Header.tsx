import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SOCIALS_MENU = [
  { label: 'ВКонтакте', path: '/socials/vk' },
  { label: 'Telegram', path: '/socials/telegram' },
  { label: 'Одноклассники', path: '/socials/ok' },
  { label: 'MAX', path: '/socials/max' },
  { label: 'TikTok', path: '/socials/tiktok' },
  { label: 'Instagram*', path: '/socials/instagram' },
];

const CITIES_MENU = [
  { label: 'Хабаровск', path: '/cities/khabarovsk' },
  { label: 'Владивосток', path: '/cities/vladivostok' },
  { label: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk' },
  { label: 'Дальний Восток', path: '/cities/far-east' },
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
  items: { label: string; path: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function Dropdown({ label, items, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-[11px] font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors py-1"
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {label}
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={11} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-60 bg-[#FBF8F3] border border-[#E8E2D8] z-50 py-1"
          style={{ boxShadow: '0 8px 32px rgba(10,10,10,0.08)' }}>
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="block px-5 py-2.5 text-sm text-[#0A0A0A] hover:text-[#A21D27] hover:bg-[#F2EDE4] transition-colors"
            >
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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location.pathname]);

  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);
  const close = () => setOpenMenu(null);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-[#FBF8F3]/96 backdrop-blur-sm border-[#E8E2D8]' : 'bg-[#FBF8F3] border-[#E8E2D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-[#A21D27] flex items-center justify-center flex-shrink-0">
              <span className="text-[#FBF8F3] font-display font-black text-[9px]" style={{ letterSpacing: '0.1em' }}>ДВМ</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-[#0A0A0A] text-sm tracking-tight leading-none">ДВ Медиа</div>
              <div className="text-[9px] text-[#5a5347] uppercase leading-tight mt-0.5" style={{ letterSpacing: '0.18em' }}>Реклама на Дальнем Востоке</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link to="/"
              className={`text-[11px] font-medium uppercase transition-colors ${location.pathname === '/' ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Главная
            </Link>
            <Dropdown label="Соцсети" items={SOCIALS_MENU} isOpen={openMenu === 'socials'} onToggle={() => toggle('socials')} onClose={close} />
            <Dropdown label="Города" items={CITIES_MENU} isOpen={openMenu === 'cities'} onToggle={() => toggle('cities')} onClose={close} />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-medium uppercase transition-colors ${
                  location.pathname === link.path ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'
                }`}
                style={{ letterSpacing: '0.12em' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contacts"
              className="hidden md:inline-flex items-center bg-[#A21D27] text-[#FBF8F3] text-[11px] font-medium px-5 py-2.5 hover:bg-[#831520] transition-colors"
              style={{ letterSpacing: '0.08em' }}
            >
              Медиаплан
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              <div className="flex flex-col gap-[5px] w-5">
                <span className={`block h-px bg-[#0A0A0A] transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-[#0A0A0A] transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-[#0A0A0A] transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FBF8F3]">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-0.5">
            <Link to="/" className="py-2.5 text-[11px] font-medium uppercase text-[#0A0A0A] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.12em' }}>
              Главная
            </Link>
            <Link to="/platforms" className="py-2.5 text-[11px] font-medium uppercase text-[#0A0A0A] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.12em' }}>
              Площадки
            </Link>
            <div className="text-[9px] font-medium text-[#5a5347] uppercase mt-4 mb-1.5 border-t border-[#E8E2D8] pt-4" style={{ letterSpacing: '0.2em' }}>Соцсети</div>
            {SOCIALS_MENU.map((item) => (
              <Link key={item.path} to={item.path} className="py-2 pl-3 text-sm text-[#0A0A0A] hover:text-[#A21D27] transition-colors">{item.label}</Link>
            ))}
            <div className="text-[9px] font-medium text-[#5a5347] uppercase mt-4 mb-1.5 border-t border-[#E8E2D8] pt-4" style={{ letterSpacing: '0.2em' }}>Города</div>
            {CITIES_MENU.map((item) => (
              <Link key={item.path} to={item.path} className="py-2 pl-3 text-sm text-[#0A0A0A] hover:text-[#A21D27] transition-colors">{item.label}</Link>
            ))}
            <div className="border-t border-[#E8E2D8] mt-4 pt-4 flex flex-col gap-0.5">
              {NAV_LINKS.slice(1).map((link) => (
                <Link key={link.path} to={link.path} className="py-2.5 text-[11px] font-medium uppercase text-[#0A0A0A] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.12em' }}>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/contacts" className="mt-5 btn-carmine justify-center text-center">
              Получить медиаплан
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
