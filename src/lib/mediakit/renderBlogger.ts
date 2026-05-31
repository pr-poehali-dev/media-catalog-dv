import { Blogger, SOCIALS } from '@/data/data';
import { PdfBuilder, COLORS, PAGE, CONTENT_W } from './pdfBuilder';

function fmtSubs(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace('.', ',') + ' млн';
  if (n >= 10000) return Math.round(n / 1000) + ' тыс.';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.', ',') + ' тыс.';
  return String(n);
}

function pct(v: number) {
  return v.toString().replace('.', ',') + '%';
}

function statTable(b: PdfBuilder, blogger: Blogger) {
  const doc = b.doc;
  const headers = ['Площадка', 'Подписчики', 'Сред. охват', 'Вовлечённость'];
  const colW = [38, 38, CONTENT_W - 38 - 38 - 38, 38];
  const rowH = 8;
  // header row
  b.needSpace(rowH);
  doc.setFillColor(COLORS.ivory);
  doc.rect(PAGE.mx, b.y, CONTENT_W, rowH, 'F');
  b.font('bold', 7.5, COLORS.muted);
  let x = PAGE.mx;
  headers.forEach((h, i) => {
    doc.text(h.toUpperCase(), x + 3, b.y + 5.2, { charSpace: 0.3 });
    x += colW[i];
  });
  b.y += rowH;

  blogger.socials.forEach((s) => {
    const info = SOCIALS[s.social];
    b.needSpace(rowH);
    doc.setDrawColor(COLORS.mid);
    doc.setLineWidth(0.2);
    doc.line(PAGE.mx, b.y + rowH, PAGE.w - PAGE.mx, b.y + rowH);
    let cx = PAGE.mx;
    // платформа — кликабельная
    if (s.link) {
      b.font('bold', 9, info.color);
      doc.textWithLink(info.label, cx + 3, b.y + 5.4, { url: s.link });
    } else {
      b.font('bold', 9, info.color);
      doc.text(info.label, cx + 3, b.y + 5.4);
    }
    cx += colW[0];
    b.font('bold', 9, COLORS.ink);
    doc.text(fmtSubs(s.subscribers), cx + 3, b.y + 5.4);
    cx += colW[1];
    b.font('normal', 9, COLORS.ink);
    doc.text(s.reachLabel || '—', cx + 3, b.y + 5.4);
    cx += colW[2];
    b.font('normal', 9, COLORS.muted);
    doc.text(s.engagementLabel || '—', cx + 3, b.y + 5.4);
    b.y += rowH;
  });
  b.gap(3);
}

function hbars(b: PdfBuilder, title: string, data: { label: string; value: number }[]) {
  const doc = b.doc;
  b.needSpace(6);
  b.font('bold', 7.5, COLORS.muted);
  doc.text(title.toUpperCase(), PAGE.mx, b.y + 3, { charSpace: 0.3 });
  b.y += 6;
  const max = Math.max(...data.map((d) => d.value), 1);
  const labelW = 32;
  const barX = PAGE.mx + labelW;
  const barMaxW = CONTENT_W - labelW - 16;
  data.forEach((d) => {
    b.needSpace(6);
    b.font('normal', 8.5, COLORS.ink);
    doc.text(d.label, PAGE.mx, b.y + 3);
    doc.setFillColor(COLORS.mid);
    doc.rect(barX, b.y + 0.5, barMaxW, 2.6, 'F');
    doc.setFillColor(COLORS.carmine);
    doc.rect(barX, b.y + 0.5, (d.value / max) * barMaxW, 2.6, 'F');
    b.font('bold', 8.5, COLORS.ink);
    doc.text(pct(d.value), PAGE.w - PAGE.mx, b.y + 3, { align: 'right' });
    b.y += 5.5;
  });
  b.gap(2);
}

function priceTable(b: PdfBuilder, blogger: Blogger) {
  const doc = b.doc;
  blogger.prices.forEach((p) => {
    b.needSpace(7);
    b.font('bold', 9.5, COLORS.ink);
    doc.text(p.label, PAGE.mx, b.y + 4);
    if (p.price) {
      b.font('bold', 9.5, COLORS.carmine);
      doc.text(p.price, PAGE.w - PAGE.mx, b.y + 4, { align: 'right' });
    }
    b.y += 6.5;
    if (p.sub && p.sub.length) {
      p.sub.forEach((s) => {
        b.needSpace(5.5);
        b.font('normal', 8.5, COLORS.muted);
        doc.text('—  ' + s.label, PAGE.mx + 6, b.y + 3.4);
        b.font('bold', 8.5, COLORS.carmine);
        doc.text(s.price, PAGE.w - PAGE.mx, b.y + 3.4, { align: 'right' });
        b.y += 5;
      });
    }
    doc.setDrawColor(COLORS.mid);
    doc.setLineWidth(0.2);
    doc.line(PAGE.mx, b.y, PAGE.w - PAGE.mx, b.y);
    b.gap(2);
  });
}

export function renderBlogger(b: PdfBuilder, blogger: Blogger, withHeaderBlock = true) {
  const doc = b.doc;

  if (withHeaderBlock) {
    // Тёмный блок с именем
    const blockH = 30;
    b.needSpace(blockH + 4);
    doc.setFillColor(COLORS.ink);
    doc.rect(PAGE.mx, b.y, CONTENT_W, blockH, 'F');
    b.font('normal', 7.5, '#9A9387');
    doc.text(`${blogger.city.toUpperCase()} · ${blogger.category.toUpperCase()}`, PAGE.mx + 6, b.y + 8, { charSpace: 0.3 });
    b.font('bold', 16, COLORS.milk);
    doc.text(blogger.name, PAGE.mx + 6, b.y + 16);
    b.font('normal', 8, '#C8C2B8');
    const desc = doc.splitTextToSize(blogger.fullDescription, CONTENT_W - 12);
    doc.text(desc.slice(0, 2), PAGE.mx + 6, b.y + 22);
    b.y += blockH + 5;
  } else {
    b.eyebrow(`${blogger.city} · ${blogger.category}`);
    b.heading(blogger.name, 15);
    b.gap(1);
    b.paragraph(blogger.fullDescription, 9.5, COLORS.muted);
    b.gap(3);
  }

  // Аудитория
  if (blogger.audienceCharts) {
    b.eyebrow('Аудитория');
    const a = blogger.audienceCharts;
    if (a.gender?.length) hbars(b, 'Пол аудитории', a.gender);
    if (a.age?.length) hbars(b, 'Возраст', a.age);
    if (a.cities?.length) hbars(b, 'Города', a.cities);
    b.gap(2);
  } else if (blogger.audience?.length) {
    b.eyebrow('Аудитория');
    b.bulletList(blogger.audience);
    b.gap(2);
  }

  // Соцсети и статистика
  b.eyebrow('Соцсети и статистика');
  statTable(b, blogger);

  // Форматы
  b.eyebrow('Форматы размещения');
  b.tags(blogger.formats);
  b.gap(1);

  // Стоимость
  if (blogger.prices?.length) {
    b.eyebrow('Стоимость');
    priceTable(b, blogger);
  }

  // Подходит
  if (blogger.bestFor?.length) {
    b.eyebrow('Подходит');
    b.bulletList(blogger.bestFor);
    b.gap(1);
  }

  // Лучше всего заходит
  if (blogger.bestPerforming?.length) {
    b.eyebrow('Лучше всего заходит');
    b.tags(blogger.bestPerforming, true);
    b.gap(1);
  }

  // CTA-кнопки (кликабельные)
  b.divider();
  b.needSpace(14);
  const formUrl = 'https://prhbk.ru/bloggers#form';
  // розовая кнопка-заявка
  const btnW = 60;
  const btnH = 10;
  doc.setFillColor(COLORS.pink);
  doc.rect(PAGE.mx, b.y, btnW, btnH, 'F');
  b.font('bold', 9.5, COLORS.milk);
  doc.textWithLink('Оставить заявку', PAGE.mx + 8, b.y + 6.5, { url: formUrl });
  doc.link(PAGE.mx, b.y, btnW, btnH, { url: formUrl });
  // контакты
  let lx = PAGE.mx + btnW + 8;
  lx += b.link('Telegram', 'https://t.me/prhbk', lx, b.y + 6.5) + 8;
  b.link('MAX', 'https://max.ru/u/f9LHodD0cOJwA4m-euguWyvhFKswtLRFJ8SMCT36fO9CX1cIZOFxKjXl1ao', lx, b.y + 6.5);
  b.y += btnH + 4;
}
