import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const COMMUNITIES_MENU = {
  label: 'Городские сообщества',
  path: '/communities',
  sections: [
    {
      title: 'По соцсетям',
      items: [
        { label: 'ВКонтакте', path: '/socials/vk' },
        { label: 'Telegram', path: '/socials/telegram' },
        { label: 'Одноклассники', path: '/socials/ok' },
        { label: 'MAX', path: '/socials/max' },
        { label: 'TikTok', path: '/socials/tiktok' },
        { label: 'Instagram*', path: '/socials/instagram' },
      ],
    },
    {
      title: 'По городам',
      items: [
        { label: 'Хабаровск', path: '/cities/khabarovsk' },
        { label: 'Владивосток', path: '/cities/vladivostok' },
        { label: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk' },
      ],
    },
  ],
};

const BLOGGERS_MENU = {
  label: 'Блогеры',
  path: '/bloggers',
  sections: [
    {
      title: 'По соцсетям',
      items: [
        { label: 'ВКонтакте', path: '/socials/vk' },
        { label: 'Telegram', path: '/socials/telegram' },
        { label: 'TikTok', path: '/socials/tiktok' },
        { label: 'Instagram*', path: '/socials/instagram' },
      ],
    },
    {
      title: 'По городам',
      items: [
        { label: 'Хабаровск', path: '/cities/khabarovsk' },
        { label: 'Владивосток', path: '/cities/vladivostok' },
      ],
    },
  ],
};

const OUTDOOR_MENU = {
  label: 'Наружная реклама',
  path: '/outdoor',
  sections: [
    {
      title: 'Форматы',
      items: [
        { label: 'Щит (3×6 м)', path: '/outdoor#shield' },
        { label: 'Суперсайт', path: '/outdoor#supersite' },
        { label: 'Ситиборд', path: '/outdoor#cityboard' },
        { label: 'Пиллар', path: '/outdoor#pillar' },
        { label: 'Ситиформат', path: '/outdoor#cityformat' },
        { label: 'Медиафасад', path: '/outdoor#mediafacade' },
        { label: 'Арка', path: '/outdoor#arch' },
        { label: 'Брандмауэр', path: '/outdoor#brandmauer' },
      ],
    },
  ],
};

interface MegaDropdownProps {
  label: string;
  path: string;
  sections: { title: string; items: { label: string; path: string }[] }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  active?: boolean;
}

function MegaDropdown({ label, path, sections, isOpen, onToggle, onClose, active }: MegaDropdownProps) {
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
        className={`flex items-center gap-1 text-[11px] font-medium transition-colors py-1 ${active ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        {label}
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={11} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-3 bg-[#FBF8F3] border border-[#E8E2D8] z-50 min-w-[420px]"
          style={{ boxShadow: '0 8px 32px rgba(10,10,10,0.10)' }}>
          {/* Шапка — ссылка на раздел */}
          <Link to={path} onClick={onClose}
            className="flex items-center justify-between px-5 py-3.5 border-b border-[#E8E2D8] bg-[#F2EDE4] hover:bg-[#E8E2D8] transition-colors group">
            <span className="font-display font-bold text-[#0A0A0A] text-sm group-hover:text-[#A21D27] transition-colors">{label}</span>
            <Icon name="ArrowRight" size={13} className="text-[#5a5347] group-hover:text-[#A21D27] transition-colors" />
          </Link>
          {/* Колонки */}
          <div className={`grid gap-0 ${sections.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {sections.map((section) => (
              <div key={section.title} className="p-4 border-r border-[#E8E2D8] last:border-r-0">
                <div className="text-[9px] font-medium text-[#5a5347] uppercase mb-3 px-1" style={{ letterSpacing: '0.2em' }}>
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <Link key={item.path} to={item.path} onClick={onClose}
                    className="block px-1 py-1.5 text-sm text-[#0A0A0A] hover:text-[#A21D27] transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
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

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      scrolled ? 'bg-[#FBF8F3]/96 backdrop-blur-sm border-[#E8E2D8]' : 'bg-[#FBF8F3] border-[#E8E2D8]'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-[#A21D27] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#FBF8F3] font-display font-black text-[9px]" style={{ letterSpacing: '0.1em' }}>М2.7</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-[#0A0A0A] text-sm tracking-tight leading-none">Медиа 2.7</div>
              <div className="text-[9px] text-[#5a5347] uppercase leading-tight mt-0.5" style={{ letterSpacing: '0.18em' }}>Реклама на Дальнем Востоке</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <MegaDropdown
              label="Сообщества"
              path={COMMUNITIES_MENU.path}
              sections={COMMUNITIES_MENU.sections}
              isOpen={openMenu === 'communities'}
              onToggle={() => toggle('communities')}
              onClose={close}
              active={isActive('/communities') || isActive('/socials') || isActive('/cities')}
            />
            <MegaDropdown
              label="Блогеры"
              path={BLOGGERS_MENU.path}
              sections={BLOGGERS_MENU.sections}
              isOpen={openMenu === 'bloggers'}
              onToggle={() => toggle('bloggers')}
              onClose={close}
              active={isActive('/bloggers')}
            />
            <MegaDropdown
              label="Наружная реклама"
              path={OUTDOOR_MENU.path}
              sections={OUTDOOR_MENU.sections}
              isOpen={openMenu === 'outdoor'}
              onToggle={() => toggle('outdoor')}
              onClose={close}
              active={isActive('/outdoor')}
            />
            <Link to="/merch"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/merch') ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Мерч
            </Link>
            <Link to="/contacts"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/contacts') ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Контакты
            </Link>
            <Link to="/faq"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/faq') ? 'text-[#A21D27]' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              FAQ
            </Link>
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <Link to="/contacts"
              className="hidden md:inline-flex items-center bg-[#A21D27] text-[#FBF8F3] text-[11px] font-medium px-5 py-2.5 hover:bg-[#831520] transition-colors"
              style={{ letterSpacing: '0.08em' }}>
              Медиаплан
            </Link>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
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
        <div className="lg:hidden border-t border-[#E8E2D8] bg-[#FBF8F3] max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-0.5">

            <div className="text-[9px] font-medium text-[#5a5347] uppercase mb-2 pt-2" style={{ letterSpacing: '0.2em' }}>Направление 01</div>
            <Link to="/communities" className="py-2.5 text-sm font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors">Реклама в городских сообществах</Link>
            <div className="pl-4 flex flex-col gap-0.5">
              {COMMUNITIES_MENU.sections[0].items.map((item) => (
                <Link key={item.path} to={item.path} className="py-1.5 text-sm text-[#5a5347] hover:text-[#A21D27] transition-colors">{item.label}</Link>
              ))}
            </div>

            <div className="text-[9px] font-medium text-[#5a5347] uppercase mb-2 mt-4 pt-3 border-t border-[#E8E2D8]" style={{ letterSpacing: '0.2em' }}>Направление 02</div>
            <Link to="/bloggers" className="py-2.5 text-sm font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors">Реклама у блогеров</Link>
            <div className="pl-4 flex flex-col gap-0.5">
              <Link to="/cities/khabarovsk" className="py-1.5 text-sm text-[#5a5347] hover:text-[#A21D27] transition-colors">Хабаровск</Link>
              <Link to="/cities/vladivostok" className="py-1.5 text-sm text-[#5a5347] hover:text-[#A21D27] transition-colors">Владивосток</Link>
            </div>

            <div className="text-[9px] font-medium text-[#5a5347] uppercase mb-2 mt-4 pt-3 border-t border-[#E8E2D8]" style={{ letterSpacing: '0.2em' }}>Направление 03</div>
            <Link to="/outdoor" className="py-2.5 text-sm font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors">Наружная реклама</Link>

            <div className="text-[9px] font-medium text-[#5a5347] uppercase mb-2 mt-4 pt-3 border-t border-[#E8E2D8]" style={{ letterSpacing: '0.2em' }}>Направление 04</div>
            <Link to="/merch" className="py-2.5 text-sm font-medium text-[#0A0A0A] hover:text-[#A21D27] transition-colors">Брендированная продукция</Link>

            <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex flex-col gap-0.5">
              <Link to="/contacts" className="py-2 text-[11px] font-medium uppercase text-[#0A0A0A] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.12em' }}>Контакты</Link>
              <Link to="/faq" className="py-2 text-[11px] font-medium uppercase text-[#0A0A0A] hover:text-[#A21D27] transition-colors" style={{ letterSpacing: '0.12em' }}>FAQ</Link>
            </div>

            <Link to="/contacts" className="mt-4 btn-carmine justify-center text-center">Получить медиаплан</Link>
          </nav>
        </div>
      )}
    </header>
  );
}