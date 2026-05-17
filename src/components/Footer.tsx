import { Link } from 'react-router-dom';

const FOOTER_DIRECTIONS = [
  { label: 'Городские сообщества', path: '/communities' },
  { label: 'Реклама у блогеров', path: '/bloggers' },
  { label: 'Наружная реклама', path: '/outdoor' },
  { label: 'Брендированная продукция', path: '/merch' },
];

const FOOTER_SOCIALS = [
  { label: 'ВКонтакте', path: '/socials/vk' },
  { label: 'Telegram', path: '/socials/telegram' },
  { label: 'Одноклассники', path: '/socials/ok' },
  { label: 'MAX', path: '/socials/max' },
  { label: 'TikTok', path: '/socials/tiktok' },
  { label: 'Instagram*', path: '/socials/instagram' },
];

const FOOTER_CITIES = [
  { label: 'Хабаровск', path: '/cities/khabarovsk' },
  { label: 'Владивосток', path: '/cities/vladivostok' },
  { label: 'Комсомольск-на-Амуре', path: '/cities/komsomolsk' },
];

const FOOTER_LEGAL = [
  { label: 'Политика персональных данных', path: '/legal/privacy' },
  { label: 'Согласие на обработку ПД', path: '/legal/consent' },
  { label: 'Cookie Policy', path: '/legal/cookies' },
  { label: 'Маркировка рекламы', path: '/legal/ad-marking' },
  { label: 'Правовая информация', path: '/legal/info' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark">
      <div className="pattern-content">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#A21D27] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FBF8F3] font-display font-black text-[9px]" style={{ letterSpacing: '0.1em' }}>М2.7</span>
                </div>
                <div>
                  <div className="font-display font-bold text-[#FBF8F3] text-sm tracking-tight leading-none">Медиа 2.7</div>
                  <div className="text-[9px] text-[#FBF8F3]/40 uppercase leading-tight mt-0.5" style={{ letterSpacing: '0.18em' }}>Реклама на Дальнем Востоке</div>
                </div>
              </div>
              <p className="text-sm text-[#FBF8F3]/45 leading-relaxed mb-5">
                4 направления продвижения: сообщества, блогеры, наружная реклама и мерч.
              </p>
              <div className="flex flex-col gap-2">
                <a href="tel:+79142055535" className="text-sm text-[#FBF8F3]/45 hover:text-[#A21D27] transition-colors">+7 (914) 205-55-35</a>
                <a href="mailto:media2.7@mail.ru" className="text-sm text-[#FBF8F3]/45 hover:text-[#A21D27] transition-colors">media2.7@mail.ru</a>
              </div>
            </div>

            {/* Направления */}
            <div>
              <div className="text-[9px] font-medium text-[#FBF8F3]/40 uppercase mb-5" style={{ letterSpacing: '0.22em' }}>Направления</div>
              <div className="flex flex-col gap-2.5">
                {FOOTER_DIRECTIONS.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-[#FBF8F3]/45 hover:text-[#A21D27] transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Площадки + города */}
            <div>
              <div className="text-[9px] font-medium text-[#FBF8F3]/40 uppercase mb-5" style={{ letterSpacing: '0.22em' }}>Соцсети</div>
              <div className="flex flex-col gap-2 mb-7">
                {FOOTER_SOCIALS.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-[#FBF8F3]/45 hover:text-[#A21D27] transition-colors">{item.label}</Link>
                ))}
              </div>
              <div className="text-[9px] font-medium text-[#FBF8F3]/40 uppercase mb-4" style={{ letterSpacing: '0.22em' }}>Города</div>
              <div className="flex flex-col gap-2">
                {FOOTER_CITIES.map((item) => (
                  <Link key={item.path} to={item.path} className="text-sm text-[#FBF8F3]/45 hover:text-[#A21D27] transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <div className="text-[9px] font-medium text-[#FBF8F3]/40 uppercase mb-5" style={{ letterSpacing: '0.22em' }}>Связаться</div>
              <a href="https://t.me/prhbk" target="_blank" rel="noopener noreferrer"
                className="block text-center bg-[#A21D27] text-[#FBF8F3] text-sm font-medium py-3 px-5 hover:bg-[#831520] transition-colors mb-2"
                style={{ letterSpacing: '0.06em' }}>
                Telegram
              </a>
              <a href="https://max.ru/u/f9LHodD0cOLXB3nv5Syhf3yuHh7KUUzhvhTbBbfeUi4f-OZffgk_ZagdxQ4" target="_blank" rel="noopener noreferrer"
                className="block text-center border border-[#FBF8F3]/20 text-[#FBF8F3]/55 text-sm font-medium py-3 px-5 hover:border-[#A21D27] hover:text-[#A21D27] transition-colors mb-2"
                style={{ letterSpacing: '0.06em' }}>
                MAX
              </a>
              <a href="/#cta"
                className="block text-center border border-[#FBF8F3]/20 text-[#FBF8F3]/55 text-sm font-medium py-3 px-5 hover:border-[#A21D27] hover:text-[#A21D27] transition-colors"
                style={{ letterSpacing: '0.06em' }}>
                Оставить заявку
              </a>
              <div className="mt-4 pt-4 border-t border-[#FBF8F3]/10">
                <div className="flex flex-col gap-1.5">
                  <Link to="/faq" className="text-xs text-[#FBF8F3]/30 hover:text-[#FBF8F3]/50 transition-colors">FAQ</Link>
                  <Link to="/contacts" className="text-xs text-[#FBF8F3]/30 hover:text-[#FBF8F3]/50 transition-colors">Контакты</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#FBF8F3]/10">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {FOOTER_LEGAL.map((item) => (
                  <Link key={item.path} to={item.path} className="text-[11px] text-[#FBF8F3]/25 hover:text-[#FBF8F3]/45 transition-colors">{item.label}</Link>
                ))}
              </div>
              <div className="text-[11px] text-[#FBF8F3]/20">© 2026 Медиа 2.7 · ИНН 271703923290</div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#FBF8F3]/10">
              <p className="text-[11px] text-[#FBF8F3]/20 leading-relaxed max-w-4xl">
                *Реклама маркируется согласно ФЗ «О рекламе» №38-ФЗ.<br />
                **Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}