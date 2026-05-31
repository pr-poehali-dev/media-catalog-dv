import { jsPDF } from 'jspdf';

export const COLORS = {
  ink: '#0A0A0A',
  milk: '#FBF8F3',
  ivory: '#F2EDE4',
  mid: '#E8E2D8',
  carmine: '#A21D27',
  pink: '#E03A8B',
  muted: '#5A5347',
  faint: '#8C8478',
};

export const PAGE = { w: 210, h: 297, mx: 18, my: 18 };
export const CONTENT_W = PAGE.w - PAGE.mx * 2;

export class PdfBuilder {
  doc: jsPDF;
  y: number;

  constructor(doc: jsPDF) {
    this.doc = doc;
    this.y = PAGE.my;
  }

  needSpace(h: number) {
    if (this.y + h > PAGE.h - PAGE.my) {
      this.doc.addPage();
      this.y = PAGE.my;
    }
  }

  gap(h: number) {
    this.y += h;
  }

  font(weight: 'normal' | 'bold', size: number, color: string) {
    this.doc.setFont('PTSans', weight);
    this.doc.setFontSize(size);
    this.doc.setTextColor(color);
  }

  // Декоративный заголовок-вывеска секции (типа eyebrow)
  eyebrow(text: string) {
    this.needSpace(8);
    this.doc.setFillColor(COLORS.carmine);
    this.doc.rect(PAGE.mx, this.y, 7, 1.2, 'F');
    this.font('bold', 8, COLORS.muted);
    this.doc.text(text.toUpperCase(), PAGE.mx + 10, this.y + 1.8, { charSpace: 0.5 });
    this.y += 8;
  }

  heading(text: string, size = 18, color = COLORS.ink) {
    const lines = this.doc.splitTextToSize(text, CONTENT_W);
    this.needSpace(size * 0.45 * lines.length);
    this.font('bold', size, color);
    this.doc.text(lines, PAGE.mx, this.y + size * 0.35);
    this.y += size * 0.45 * lines.length;
  }

  paragraph(text: string, size = 10, color = COLORS.muted, maxW = CONTENT_W) {
    const lines = this.doc.splitTextToSize(text, maxW);
    this.font('normal', size, color);
    const lh = size * 0.5;
    for (const ln of lines) {
      this.needSpace(lh);
      this.doc.text(ln, PAGE.mx, this.y + size * 0.32);
      this.y += lh;
    }
  }

  // Кликабельная ссылка-текст
  link(label: string, url: string, x: number, yBase: number, size = 9, color = COLORS.carmine) {
    this.font('normal', size, color);
    this.doc.textWithLink(label, x, yBase, { url });
    const w = this.doc.getTextWidth(label);
    this.doc.setDrawColor(color);
    this.doc.setLineWidth(0.2);
    this.doc.line(x, yBase + 0.8, x + w, yBase + 0.8);
    return w;
  }

  divider() {
    this.needSpace(4);
    this.doc.setDrawColor(COLORS.mid);
    this.doc.setLineWidth(0.3);
    this.doc.line(PAGE.mx, this.y, PAGE.w - PAGE.mx, this.y);
    this.y += 4;
  }

  // Тег-плашка
  tags(items: string[], filled = false) {
    let x = PAGE.mx;
    const padX = 3;
    const h = 6;
    this.font('normal', 8.5, filled ? COLORS.milk : COLORS.muted);
    for (const it of items) {
      const w = this.doc.getTextWidth(it) + padX * 2;
      if (x + w > PAGE.w - PAGE.mx) {
        x = PAGE.mx;
        this.y += h + 2;
      }
      this.needSpace(h);
      if (filled) {
        this.doc.setFillColor(COLORS.ink);
        this.doc.rect(x, this.y, w, h, 'F');
        this.doc.setTextColor(COLORS.milk);
      } else {
        this.doc.setFillColor(COLORS.ivory);
        this.doc.setDrawColor(COLORS.mid);
        this.doc.rect(x, this.y, w, h, 'FD');
        this.doc.setTextColor(COLORS.muted);
      }
      this.doc.text(it, x + padX, this.y + 4.1);
      x += w + 2.5;
    }
    this.y += h + 2;
  }

  bulletList(items: string[]) {
    for (const it of items) {
      const lines = this.doc.splitTextToSize(it, CONTENT_W - 6);
      this.needSpace(lines.length * 5);
      this.doc.setFillColor(COLORS.carmine);
      this.doc.rect(PAGE.mx, this.y + 1.3, 2, 2, 'F');
      this.font('normal', 10, COLORS.ink);
      this.doc.text(lines, PAGE.mx + 6, this.y + 3.4);
      this.y += lines.length * 5;
    }
  }
}

export function newDoc(): jsPDF {
  return new jsPDF({ unit: 'mm', format: 'a4', compress: true });
}
