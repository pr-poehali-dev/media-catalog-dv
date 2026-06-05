import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const dark = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-[#FBF8F3]/96 backdrop-blur-sm border-[#E8E2D8]' : 'bg-[#0A0A0A] border-[#FBF8F3]/10'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-[#A21D27] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-[#FBF8F3] font-display font-black text-[9px]" style={{ letterSpacing: '0.1em' }}>М2.7</span>
            </div>
            <div className="block">
              <div className={`font-display font-bold text-sm tracking-tight leading-none transition-colors duration-300 ${dark ? 'text-white' : 'text-[#0A0A0A]'}`}>Медиа 2.7</div>
              <div className={`text-[9px] uppercase leading-tight mt-0.5 transition-colors duration-300 ${dark ? 'text-white/50' : 'text-[#5a5347]'}`} style={{ letterSpacing: '0.18em' }}>Реклама на Дальнем Востоке</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 ml-auto">
            <Link to="/communities"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/communities') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Сообщества
            </Link>
            <Link to="/bloggers"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/bloggers') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Блогеры
            </Link>
            <Link to="/outdoor"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/outdoor') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Наружка
            </Link>
            <Link to="/merch"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/merch') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Мерч
            </Link>
            <Link to="/contacts"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/contacts') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              Контакты
            </Link>
            <Link to="/faq"
              className={`text-[11px] font-medium uppercase transition-colors ${isActive('/faq') ? 'text-[#A21D27]' : dark ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A] hover:text-[#A21D27]'}`}
              style={{ letterSpacing: '0.12em' }}>
              FAQ
            </Link>
            <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#A21D27] text-[#FBF8F3] text-[11px] font-medium px-5 py-2.5 rounded-full hover:bg-[#831520] transition-colors"
              style={{ letterSpacing: '0.08em' }}>
              <img src="https://cdn.poehali.dev/files/56fe3dcd-989b-42e8-9399-ecab76c2f6c2.png" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
              <span className="whitespace-nowrap">Связаться с нами</span>
            </a>
          </nav>

          {/* Burger */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
              <div className="flex flex-col gap-[5px] w-5">
                <span className={`block h-px bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-px bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 'calc(4rem + env(safe-area-inset-top))' }}
      >
        <div
          className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-md"
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 left-0 mx-3 mt-3 rounded-2xl bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 shadow-2xl p-4 flex flex-col transition-all duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {[
            { to: '/communities', label: 'Сообщества' },
            { to: '/bloggers', label: 'Блогеры' },
            { to: '/outdoor', label: 'Наружка' },
            { to: '/merch', label: 'Мерч' },
            { to: '/contacts', label: 'Контакты' },
            { to: '/faq', label: 'FAQ' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`py-3 px-2 text-[13px] font-medium uppercase transition-colors border-b border-white/5 last:border-0 ${
                isActive(item.to) ? 'text-[#A21D27]' : 'text-white/80 hover:text-white'
              }`}
              style={{ letterSpacing: '0.12em' }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://t.me/prhbk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-1.5 bg-[#A21D27] text-[#FBF8F3] text-[13px] font-medium px-5 py-3 rounded-full hover:bg-[#831520] transition-colors"
            style={{ letterSpacing: '0.08em' }}
          >
            <img src="https://cdn.poehali.dev/files/56fe3dcd-989b-42e8-9399-ecab76c2f6c2.png" alt="" className="w-4 h-4 object-contain flex-shrink-0" />
            <span>Связаться с нами</span>
          </a>
        </nav>
      </div>
    </header>
  );
}