import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const LEGAL_CONTENT: Record<string, { title: string; emoji: string; content: string }> = {
  privacy: {
    title: 'Политика обработки персональных данных',
    emoji: '🔒',
    content: `
## 1. Общие положения

Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок обработки персональных данных пользователей сайта dvmedia.ru.

Оператор персональных данных: ДВ Медиа (далее — Оператор), ИНН 0000000000.

## 2. Персональные данные

Оператор обрабатывает следующие персональные данные:
- Имя и фамилия
- Номер телефона
- Адрес электронной почты
- Данные, добавляемые пользователем в поле «Задача»

## 3. Цели обработки

Персональные данные обрабатываются в целях:
- Обработки заявок на размещение рекламы
- Составления медиаплана
- Обратной связи с клиентами

## 4. Правовое основание

Обработка персональных данных осуществляется на основании:
- Согласия субъекта персональных данных
- Федерального закона №152-ФЗ «О персональных данных»

## 5. Хранение и защита

Персональные данные хранятся на защищённых серверах. Оператор принимает технические и организационные меры для защиты данных от несанкционированного доступа.

## 6. Права субъекта

Пользователь имеет право:
- Запросить перечень обрабатываемых данных
- Потребовать уточнения или удаления данных
- Отозвать согласие на обработку

По вопросам персональных данных: pd@dvmedia.ru

## 7. Актуальность

Дата последнего обновления: 01.01.2024
    `,
  },
  consent: {
    title: 'Согласие на обработку персональных данных',
    emoji: '✅',
    content: `
Настоящим я, пользователь сайта dvmedia.ru, даю согласие ДВ Медиа (ИНН 0000000000) на обработку следующих персональных данных: фамилия, имя, номер телефона, адрес электронной почты.

**Цели обработки:** обработка заявки на размещение рекламы, обратная связь, составление медиаплана.

**Способы обработки:** сбор, систематизация, накопление, хранение, уточнение, использование, передача, обезличивание, блокирование, удаление персональных данных.

**Срок хранения:** в течение 3 лет с момента получения согласия или до отзыва согласия.

Я имею право отозвать настоящее согласие путём направления письменного заявления по адресу: pd@dvmedia.ru.

Согласие считается данным с момента отправки формы заявки на сайте.
    `,
  },
  cookies: {
    title: 'Политика использования Cookie',
    emoji: '🍪',
    content: `
## Что такое Cookie?

Cookie — это небольшие текстовые файлы, которые сохраняются в браузере при посещении сайта.

## Какие Cookie мы используем?

**Технические Cookie** — необходимы для работы сайта. Не могут быть отключены.

**Аналитические Cookie** — Яндекс.Метрика. Помогают анализировать посещаемость и улучшать сайт.

## Управление Cookie

Вы можете отключить Cookie в настройках браузера. Обратите внимание, что это может повлиять на работу некоторых функций сайта.

## Согласие

Продолжая использовать сайт, вы соглашаетесь с использованием Cookie в соответствии с данной политикой.
    `,
  },
  'ad-marking': {
    title: 'Маркировка рекламы',
    emoji: '🏷️',
    content: `
## Закон о маркировке рекламы

С 1 сентября 2023 года в соответствии с Федеральным законом «О рекламе» №38-ФЗ (ст. 18.1) вся интернет-реклама на территории РФ должна маркироваться.

## Что это означает?

Каждое рекламное размещение должно:
- Содержать токен erid (идентификатор рекламного материала)
- Быть зарегистрировано в системе ОРД (оператора рекламных данных)
- Содержать пометку «Реклама» с указанием рекламодателя

## Как мы работаем?

Мы берём на себя процесс маркировки:
1. Регистрируем рекламный материал в ОРД
2. Получаем токен erid
3. Добавляем маркировку к публикации
4. Передаём данные об охвате в ОРД после публикации

## Ответственность

За отсутствие маркировки предусмотрена административная ответственность для рекламодателя, рекламораспространителя и оператора рекламной системы.

По вопросам маркировки: info@dvmedia.ru
    `,
  },
  info: {
    title: 'Правовая информация',
    emoji: '⚖️',
    content: `
## Об организации

**ДВ Медиа**
ИНН: 0000000000
ОГРН: 0000000000000

## Дисклеймер по Meta/Instagram*

*Instagram и Facebook принадлежат компании Meta Platforms Inc.

Решением суда на территории Российской Федерации деятельность Meta Platforms Inc. признана экстремистской и запрещена.

Стандартное рекламное размещение в Instagram* и Facebook* для продвижения товаров и услуг на территории РФ ДВ Медиа не предлагает и не организует.

Упоминание данных платформ носит исключительно информационный характер.

## Рекомендуемые альтернативы

Для рекламного продвижения рекомендуем: ВКонтакте, Telegram, MAX, TikTok, Одноклассники.

## Контакты

- Email: info@dvmedia.ru
- По вопросам ПД: pd@dvmedia.ru
- Телефон: +7 (4212) 00-00-00
    `,
  },
};

export default function Legal() {
  const { pageId } = useParams<{ pageId: string }>();
  const page = LEGAL_CONTENT[pageId || ''];

  if (!page) {
    return (
      <div className="pt-28 text-center py-20">
        <div className="text-5xl mb-4">📄</div>
        <h2 className="font-display font-bold text-2xl text-brand-dark mb-2">Страница не найдена</h2>
        <Link to="/" className="text-brand-blue hover:text-brand-orange">На главную</Link>
      </div>
    );
  }

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="font-display font-bold text-xl text-brand-dark mt-8 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-brand-dark mt-4 mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-sm text-muted-foreground ml-4 leading-relaxed">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\./)) {
        return <li key={i} className="text-sm text-muted-foreground ml-4 leading-relaxed list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="pt-16">
      <section className="bg-brand-dark text-white py-14">
        <div className="container mx-auto px-4">
          <div className="text-4xl mb-4">{page.emoji}</div>
          <div className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">Юридические документы</div>
          <h1 className="font-display font-bold text-3xl md:text-4xl">{page.title}</h1>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-brand-orange transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-brand-dark">{page.title}</span>
          </div>

          <div className="prose-custom">
            {formatContent(page.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="font-display font-semibold text-brand-dark mb-4">Другие документы</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(LEGAL_CONTENT).filter(([k]) => k !== pageId).map(([key, doc]) => (
                <Link
                  key={key}
                  to={`/legal/${key}`}
                  className="p-3 border border-border rounded-xl text-sm text-brand-dark hover:border-brand-orange hover:text-brand-orange transition-colors text-center"
                >
                  <div className="text-xl mb-1">{doc.emoji}</div>
                  {doc.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
