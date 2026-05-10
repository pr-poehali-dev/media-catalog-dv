import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const FOOTER_SOCIALS = [
  { label: 'ВКонтакте', path: '/socials/vk', emoji: '💙' },
  { label: 'Telegram', path: '/socials/telegram', emoji: '✈️' },
  { label: 'Одноклассники', path: '/socials/ok', emoji: '🟠' },
  { label: 'MAX', path: '/socials/max', emoji: '🟣' },
  { label: 'TikTok', path: '/socials/tiktok', emoji: '🎵' },
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
    <footer className="bg-brand-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">ДВ</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-base">ДВ Медиа</div>
                <div className="text-xs text-white/50">Реклама на Дальнем Востоке</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Размещение рекламы в городских сообществах и у блогеров Хабаровска, Владивостока и Комсомольска-на-Амуре.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+74212000000" className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors">
                <Icon name="Phone" size={14} />
                +7 (4212) 00-00-00
              </a>
              <a href="mailto:info@dvmedia.ru" className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-orange transition-colors">
                <Icon name="Mail" size={14} />
                info@dvmedia.ru
              </a>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Icon name="MapPin" size={14} />
                Хабаровск, Владивосток, КнА
              </div>
            </div>
          </div>

          {/* Platforms & Cities */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Площадки</h4>
            <div className="flex flex-col gap-2">
              {FOOTER_SOCIALS.map((item) => (
                <Link key={item.path} to={item.path} className="flex items-center gap-2 text-sm text-white/60 hover:text-brand-orange transition-colors">
                  <span className="text-xs">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
              <Link to="/socials/instagram" className="flex items-center gap-2 text-sm text-white/60 hover:text-brand-orange transition-colors">
                <span className="text-xs">📷</span>
                Instagram*
              </Link>
            </div>
          </div>

          {/* Cities & Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Города</h4>
            <div className="flex flex-col gap-2 mb-6">
              {FOOTER_CITIES.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm text-white/60 hover:text-brand-orange transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Разделы</h4>
            <div className="flex flex-col gap-2">
              <Link to="/platforms" className="text-sm text-white/60 hover:text-brand-orange transition-colors">Каталог площадок</Link>
              <Link to="/formats" className="text-sm text-white/60 hover:text-brand-orange transition-colors">Форматы рекламы</Link>
              <Link to="/cases" className="text-sm text-white/60 hover:text-brand-orange transition-colors">Кейсы</Link>
              <Link to="/faq" className="text-sm text-white/60 hover:text-brand-orange transition-colors">FAQ</Link>
              <Link to="/contacts" className="text-sm text-white/60 hover:text-brand-orange transition-colors">Контакты</Link>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">Связаться</h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Оставьте заявку — составим медиаплан под ваш бюджет и задачи.
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand-orange text-white font-semibold text-sm px-4 py-3 rounded-lg hover:bg-brand-orange-dark transition-colors mb-3"
            >
              <Icon name="Send" size={14} />
              Написать в Telegram
            </a>
            <Link
              to="/contacts"
              className="flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium text-sm px-4 py-3 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              Получить медиаплан
            </Link>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/40">По вопросам ПД: pd@dvmedia.ru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {FOOTER_LEGAL.map((item) => (
                <Link key={item.path} to={item.path} className="text-xs text-white/40 hover:text-white/60 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="text-xs text-white/40">
              © 2024 ДВ Медиа. ИНН 0000000000 · ОГРН 0000000000000
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/30 leading-relaxed">
              *Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации.
              Стандартное рекламное размещение в Instagram* для продвижения товаров и услуг на территории РФ не предлагается.
              Вся реклама размещается в соответствии с Федеральным законом «О рекламе» №38-ФЗ и требованиями о маркировке рекламы (erid).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
