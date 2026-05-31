import { Blogger, BLOGGERS } from '@/data/data';
import { newDoc, PdfBuilder, PAGE, CONTENT_W, COLORS } from './pdfBuilder';
import { ensureCyrillicFonts } from './pdfFont';
import { renderBlogger } from './renderBlogger';

function fileName(name: string) {
  return (
    'Медиакит_' +
    name
      .replace(/[*|]/g, '')
      .replace(/[\s/\\]+/g, '_')
      .replace(/_+/g, '_')
      .trim()
  );
}

export async function downloadBloggerMediakit(blogger: Blogger) {
  const doc = newDoc();
  await ensureCyrillicFonts(doc);
  const b = new PdfBuilder(doc);
  renderBlogger(b, blogger, true);
  doc.save(`${fileName(blogger.name)}.pdf`);
}

function coverAndIntro(b: PdfBuilder) {
  const doc = b.doc;
  // Тёмная обложка на всю страницу
  doc.setFillColor(COLORS.ink);
  doc.rect(0, 0, PAGE.w, PAGE.h, 'F');
  doc.setFillColor(COLORS.carmine);
  doc.rect(PAGE.mx, 70, 14, 2.4, 'F');
  b.font('normal', 9, '#9A9387');
  doc.text('НАПРАВЛЕНИЕ 02', PAGE.mx, 82, { charSpace: 0.6 });
  b.font('bold', 34, COLORS.milk);
  doc.text('Реклама', PAGE.mx, 102);
  doc.text('у блогеров', PAGE.mx, 116);
  b.font('normal', 11, '#C8C2B8');
  const intro = doc.splitTextToSize(
    'Люди доверяют людям, а не баннерам. Поэтому реклама у блогеров работает лучше обычных объявлений. В медиаките — все проекты, их аудитория, статистика и цены.',
    CONTENT_W - 30
  );
  doc.text(intro, PAGE.mx, 132);

  // Цифры
  const stats = [
    { v: '6', l: 'проектов' },
    { v: '26', l: 'площадок' },
    { v: '32 млн+', l: 'охвата в месяц' },
  ];
  let sx = PAGE.mx;
  stats.forEach((s) => {
    b.font('bold', 22, COLORS.carmine);
    doc.text(s.v, sx, 170);
    const w = doc.getTextWidth(s.v);
    b.font('normal', 8, '#9A9387');
    doc.text(s.l.toUpperCase(), sx, 177, { charSpace: 0.3 });
    sx += w + Math.max(doc.getTextWidth(s.l.toUpperCase()) + 14, 28);
  });

  // CTA на обложке
  const btnW = 62;
  const btnH = 11;
  const by = 200;
  doc.setFillColor(COLORS.pink);
  doc.rect(PAGE.mx, by, btnW, btnH, 'F');
  b.font('bold', 10, COLORS.milk);
  const url = 'https://prhbk.ru/bloggers#form';
  doc.textWithLink('Подобрать блогера', PAGE.mx + 8, by + 7, { url });
  doc.link(PAGE.mx, by, btnW, btnH, { url });
  b.font('normal', 9, COLORS.milk);
  doc.textWithLink('Telegram', PAGE.mx + btnW + 8, by + 7, { url: 'https://t.me/prhbk' });
  doc.textWithLink(
    'MAX',
    PAGE.mx + btnW + 32,
    by + 7,
    { url: 'https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao' }
  );
}

function advantagesPage(b: PdfBuilder) {
  const doc = b.doc;
  doc.addPage();
  b.y = PAGE.my + 6;
  b.eyebrow('Преимущества');
  b.gap(2);
  const adv = [
    { num: '01', title: 'Доверие', desc: 'Рекомендация блогера воспринимается как совет друга, а не реклама.' },
    { num: '02', title: 'Вовлечённость', desc: 'Подписчики блогера активны, вовлечены и доверяют его мнению.' },
    { num: '03', title: 'Видеоконтент', desc: 'Обзор на камеру — самый убедительный формат как для простых, так и для сложных продуктов.' },
    { num: '04', title: 'Долгий эффект', desc: 'Хорошие обзоры продолжают набирать просмотры неделями и месяцами после публикации.' },
  ];
  adv.forEach((a) => {
    b.needSpace(24);
    b.font('bold', 18, COLORS.carmine);
    doc.text(a.num, PAGE.mx, b.y + 6);
    b.font('bold', 14, COLORS.ink);
    doc.text(a.title, PAGE.mx + 16, b.y + 6);
    b.font('normal', 10, COLORS.muted);
    const d = doc.splitTextToSize(a.desc, CONTENT_W - 16);
    doc.text(d, PAGE.mx + 16, b.y + 13);
    b.y += 13 + d.length * 5 + 6;
    doc.setDrawColor(COLORS.mid);
    doc.setLineWidth(0.2);
    doc.line(PAGE.mx, b.y, PAGE.w - PAGE.mx, b.y);
    b.gap(5);
  });
}

export async function downloadCatalogMediakit() {
  const doc = newDoc();
  await ensureCyrillicFonts(doc);
  const b = new PdfBuilder(doc);

  coverAndIntro(b);
  advantagesPage(b);

  // Каталог — каждый блогер с новой страницы
  BLOGGERS.forEach((blogger) => {
    doc.addPage();
    b.y = PAGE.my;
    renderBlogger(b, blogger, true);
  });

  // Дисклеймер на последней странице
  b.gap(4);
  b.font('normal', 7, COLORS.faint);
  const note = doc.splitTextToSize(
    '*Instagram принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории Российской Федерации. Размещение рекламы у блогеров в Instagram* рассматривается индивидуально с учётом правовых рисков.',
    CONTENT_W
  );
  doc.text(note, PAGE.mx, b.y + 3);

  doc.save('Медиакит_Реклама_у_блогеров.pdf');
}
