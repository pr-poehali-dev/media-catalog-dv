import { jsPDF } from 'jspdf';

const FONT_REGULAR_URL =
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptsans/PT_Sans-Web-Regular.ttf';
const FONT_BOLD_URL =
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/ptsans/PT_Sans-Web-Bold.ttf';

let cache: { regular: string; bold: string } | null = null;

async function fetchBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk)) as unknown as number[]
    );
  }
  return btoa(binary);
}

export async function ensureCyrillicFonts(doc: jsPDF): Promise<void> {
  if (!cache) {
    const [regular, bold] = await Promise.all([
      fetchBase64(FONT_REGULAR_URL),
      fetchBase64(FONT_BOLD_URL),
    ]);
    cache = { regular, bold };
  }
  doc.addFileToVFS('PTSans-Regular.ttf', cache.regular);
  doc.addFont('PTSans-Regular.ttf', 'PTSans', 'normal');
  doc.addFileToVFS('PTSans-Bold.ttf', cache.bold);
  doc.addFont('PTSans-Bold.ttf', 'PTSans', 'bold');
}
