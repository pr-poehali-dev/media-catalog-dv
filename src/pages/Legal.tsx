import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const LEGAL_CONTENT: Record<string, { title: string; content: string }> = {
  privacy: {
    title: 'Политика обработки персональных данных',
    content: `## 1. Общие положения\n\nНастоящая Политика определяет порядок обработки персональных данных пользователей сайта.\n\nОператор: Медиа 2.7, ИНН 271703923290.\n\n## 2. Персональные данные\n\nОператор обрабатывает:\n- Имя и номер телефона\n- Данные о задаче рекламной кампании\n\n## 3. Цели обработки\n\n- Обработка заявок на размещение рекламы и покупку брендированной продукции\n- Составление медиаплана\n- Обратная связь с клиентами\n\n## 4. Правовое основание\n\nФедеральный закон №152-ФЗ «О персональных данных», согласие субъекта ПД.\n\n## 5. Хранение и защита\n\nПерсональные данные хранятся на защищённых серверах. Оператор принимает технические и организационные меры защиты.\n\n## 6. Права субъекта\n\nПользователь имеет право запросить, уточнить или удалить свои данные. По вопросам: media2.7@mail.ru\n\nДата обновления: 18.05.2026г`,
  },
  consent: {
    title: 'Согласие на обработку персональных данных',
    content: `Настоящим я даю согласие Медиа 2.7 (ИНН 271703923290) на обработку следующих персональных данных: имя, номер телефона, данные о задаче рекламной кампании.\n\n**Цели:** обработка заявки, обратная связь, составление медиаплана.\n\n**Способы:** сбор, систематизация, хранение, использование, удаление.\n\n**Срок:** 3 года с момента получения согласия или до отзыва.\n\nОтзыв согласия: media2.7@mail.ru\n\nСогласие считается данным с момента отправки формы заявки.`,
  },
  cookies: {
    title: 'Политика использования Cookie',
    content: `## Что такое Cookie?\n\nCookie — небольшие текстовые файлы, сохраняемые в браузере при посещении сайта.\n\n## Какие Cookie используем?\n\n**Технические Cookie** — необходимы для работы сайта. Не отключаются.\n\n**Аналитические Cookie** — Яндекс.Метрика. Помогают анализировать посещаемость.\n\n## Управление\n\nВы можете отключить Cookie в настройках браузера. Это может повлиять на работу сайта.\n\n## Согласие\n\nПродолжая использовать сайт, вы соглашаетесь с использованием Cookie.`,
  },
  'ad-marking': {
    title: 'Маркировка рекламы',
    content: `С 1 сентября 2023 года вся интернет-реклама в России подлежит обязательной маркировке согласно ФЗ «О рекламе» №38-ФЗ (ст. 18.1).\n\n## Что включает маркировка?\n\n- получение токена erid (идентификатора рекламного материала)\n- регистрация рекламы в системе ОРД\n- обязательная пометка «Реклама»\n- указание информации о рекламодателе\n- передача статистики после размещения\n\n## Как мы работаем?\n\nПри размещении рекламы через нас мы:\n\n- регистрируем рекламный материал в ОРД\n- получаем токен erid\n- корректно добавляем маркировку к публикации\n- передаём данные по размещению после выхода рекламы\n\nВам не нужно разбираться в технических нюансах — мы берём процесс на себя.\n\n## Кто несёт ответственность?\n\nЕсли размещение проходит через нас — мы сопровождаем процесс маркировки.\n\nЕсли вы размещаете рекламу самостоятельно или напрямую через площадки — ответственность может лежать на рекламодателе и рекламораспространителе.\n\n## Штрафы за отсутствие маркировки\n\nЗа нарушение требований предусмотрены штрафы до 500 000 ₽ в соответствии с КоАП РФ.\n\n## Остались вопросы?\n\nЕсли не уверены, нужна ли маркировка вашему размещению — напишите нам: media2.7@mail.ru`,
  },
  info: {
    title: 'Правовая информация',
    content: `## Об организации\n\nДВ Медиа\nИНН: 0000000000\nОГРН: 0000000000000\n\n## Дисклеймер по Meta / Instagram*\n\n*Instagram и Facebook принадлежат Meta Platforms Inc.\n\nРешением суда на территории РФ деятельность Meta Platforms Inc. признана экстремистской и запрещена.\n\nСтандартное рекламное размещение в Instagram* и Facebook* для продвижения товаров и услуг на территории РФ не предлагается.\n\nУпоминание платформ носит исключительно информационный характер.\n\n## Рекомендованные альтернативы\n\nВКонтакте, Telegram, MAX, TikTok, Одноклассники.\n\n## Контакты\n\ninfo@dvmedia.ru\npd@dvmedia.ru\n+7 (4212) 00-00-00`,
  },
};

export default function Legal() {
  const { pageId } = useParams<{ pageId: string }>();
  const page = LEGAL_CONTENT[pageId || ''];

  if (!page) return (
    <div className="pt-28 text-center py-24">
      <h2 className="font-display font-bold text-2xl text-[#0A0A0A] mb-2">Страница не найдена</h2>
      <Link to="/" className="text-sm text-[#A21D27]">На главную</Link>
    </div>
  );

  const formatContent = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="font-display font-bold text-xl text-[#0A0A0A] mt-8 mb-1" style={{ letterSpacing: '-0.01em' }}>{line.slice(3)}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-[#0A0A0A] mt-4 mb-1">{line.slice(2, -2)}</p>;
      if (line.startsWith('- ')) return <li key={i} className="text-base text-[#5a5347] ml-4 leading-relaxed mb-1">{line.slice(2)}</li>;
      if (line.match(/^\d+\./)) return <li key={i} className="text-base text-[#5a5347] ml-4 leading-relaxed mb-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-base text-[#5a5347] leading-relaxed mb-1">{line}</p>;
    });

  return (
    <div className="pt-16">
      <section className="bg-[#0A0A0A] text-[#FBF8F3] pattern-dark py-16">
        <div className="pattern-content max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-3"><div className="section-rule" /><div className="eyebrow text-[#FBF8F3]/50">Документы</div></div>
          <h1 className="section-title text-[#FBF8F3]">{page.title}</h1>
        </div>
      </section>

      <section className="bg-[#FBF8F3] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-[#5a5347] mb-10" style={{ letterSpacing: '0.1em' }}>
            <Link to="/" className="hover:text-[#A21D27] transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span className="text-[#0A0A0A]">{page.title}</span>
          </div>

          <div className="max-w-2xl">
            {formatContent(page.content)}
          </div>

          <div className="mt-14 pt-10 border-t border-[#E8E2D8]">
            <div className="text-[10px] text-[#5a5347] uppercase mb-5" style={{ letterSpacing: '0.18em' }}>Другие документы</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[#E8E2D8]">
              {Object.entries(LEGAL_CONTENT).filter(([k]) => k !== pageId).map(([key, doc]) => (
                <Link key={key} to={`/legal/${key}`}
                  className="bg-[#FBF8F3] p-5 hover:bg-[#F2EDE4] transition-colors group">
                  <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#A21D27] transition-colors leading-snug">{doc.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}