import type jsPDF from "jspdf";

export const PAGE_TOP = 20;
export const PAGE_BOTTOM_LIMIT = 277; // A4 height 297mm; keep 20mm for footer
export const LINE_HEIGHT = 5;

export interface PdfCursor {
  y: number;
}

type Doc = Pick<jsPDF, "addPage" | "text" | "splitTextToSize" | "setFont" | "setFontSize" | "setTextColor">;

export const ensureSpace = (doc: Doc, cursor: PdfCursor, height: number): void => {
  if (cursor.y + height <= PAGE_BOTTOM_LIMIT) return;
  doc.addPage();
  cursor.y = PAGE_TOP;
};

export interface FieldLayout {
  margin: number;
  contentWidth: number;
  labelWidth?: number;
  labelColor?: number[];
  spacing?: number;
}

export const writeWrappedField = (
  doc: Doc,
  cursor: PdfCursor,
  label: string,
  value: string,
  layout: FieldLayout
): void => {
  const labelWidth = layout.labelWidth ?? 60;
  const valueX = layout.margin + 5 + labelWidth + 5;
  const valueWidth = layout.contentWidth - labelWidth - 10;
  const color = layout.labelColor ?? [52, 73, 94];
  const safeLabel = String(label || "");
  const safeValue = String(value || "N/A");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const labelLines: string[] = doc.splitTextToSize(`${safeLabel}:`, labelWidth);
  doc.setFont("helvetica", "normal");
  const valueLines: string[] = doc.splitTextToSize(safeValue, valueWidth);

  ensureSpace(doc, cursor, LINE_HEIGHT * Math.min(2, Math.max(labelLines.length, valueLines.length)) + 3);

  const drawLabel = (lines: string[]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(color[0], color[1], color[2]);
    lines.forEach((l, i) => doc.text(l, layout.margin + 5, cursor.y + i * LINE_HEIGHT));
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
  };

  drawLabel(labelLines);
  let rowStart = cursor.y;
  let labelRows = labelLines.length;
  let row = 0;
  valueLines.forEach((line) => {
    if (cursor.y + row * LINE_HEIGHT > PAGE_BOTTOM_LIMIT) {
      doc.addPage();
      cursor.y = PAGE_TOP;
      rowStart = cursor.y;
      row = 0;
      const cont: string[] = doc.splitTextToSize(`${safeLabel} (cont.):`, labelWidth);
      drawLabel(cont);
      labelRows = cont.length;
    }
    doc.text(line, valueX, rowStart + row * LINE_HEIGHT);
    row++;
  });
  cursor.y = rowStart + Math.max(row, labelRows, 1) * LINE_HEIGHT + (layout.spacing ?? 4);
};

export const writeWrappedBullets = (
  doc: Doc,
  cursor: PdfCursor,
  items: string[],
  margin: number,
  contentWidth: number,
  indent = 10
): void => {
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const x = margin + indent;
  items.forEach((item) => {
    const lines: string[] = doc.splitTextToSize(String(item ?? ""), contentWidth - indent - 4);
    lines.forEach((line, i) => {
      ensureSpace(doc, cursor, LINE_HEIGHT);
      if (i === 0) doc.text("•", x, cursor.y);
      doc.text(line, x + 4, cursor.y);
      cursor.y += LINE_HEIGHT;
    });
    cursor.y += 1;
  });
};

/** Wrap text to at most maxLines, ending with an ellipsis if truncated. */
export const clampLines = (doc: Doc, text: string, width: number, maxLines: number): string[] => {
  const lines: string[] = doc.splitTextToSize(String(text || ""), width);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/\s+\S*$/, "")}…`;
  return kept;
};

// ---------- Visual primitives (badges, chips, boxes) ----------

export type Rgb = [number, number, number];

/** Tailwind 100 (fill), 300 (border) and 700/800 (text) shades, matching website badges. */
export const PALETTE: Record<string, { fill: Rgb; border: Rgb; text: Rgb }> = {
  gray: { fill: [243, 244, 246], border: [209, 213, 219], text: [55, 65, 81] },
  slate: { fill: [241, 245, 249], border: [203, 213, 225], text: [51, 65, 85] },
  blue: { fill: [219, 234, 254], border: [147, 197, 253], text: [29, 78, 216] },
  green: { fill: [220, 252, 231], border: [134, 239, 172], text: [21, 128, 61] },
  teal: { fill: [204, 251, 241], border: [94, 234, 212], text: [15, 118, 110] },
  purple: { fill: [243, 232, 255], border: [216, 180, 254], text: [126, 34, 206] },
  orange: { fill: [255, 237, 213], border: [253, 186, 116], text: [194, 65, 12] },
  yellow: { fill: [254, 249, 195], border: [253, 224, 71], text: [133, 77, 14] },
  red: { fill: [254, 226, 226], border: [252, 165, 165], text: [185, 28, 28] },
  rose: { fill: [255, 228, 230], border: [253, 164, 175], text: [190, 18, 60] },
};

export const ACCENT: Rgb = [80, 144, 208]; // DLinRT steel blue
export const INK: Rgb = [26, 26, 46];

export const paletteFor = (color?: string) => PALETTE[color ?? "gray"] ?? PALETTE.gray;

type DrawDoc = Doc & Pick<jsPDF, "setFillColor" | "setDrawColor" | "roundedRect" | "rect" | "getTextWidth" | "setLineWidth" | "textWithLink" | "line">;

/** Draws a rounded badge at (x, y-baseline) and returns its width. */
export const drawBadge = (doc: DrawDoc, x: number, y: number, text: string, color?: string, fontSize = 8): number => {
  const p = paletteFor(color);
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "bold");
  const w = doc.getTextWidth(text) + 4;
  const h = fontSize * 0.5 + 1.5;
  doc.setFillColor(p.fill[0], p.fill[1], p.fill[2]);
  doc.setDrawColor(p.border[0], p.border[1], p.border[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(x, y - h + 1.2, w, h, 1, 1, "FD");
  doc.setTextColor(p.text[0], p.text[1], p.text[2]);
  doc.text(text, x + 2, y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  return w;
};

/** Lays out badges left to right, wrapping to new rows. */
export const drawBadgeRow = (
  doc: DrawDoc,
  cursor: PdfCursor,
  badges: Array<{ text: string; color?: string }>,
  x0: number,
  maxWidth: number,
  fontSize = 8
): void => {
  const rowH = fontSize * 0.5 + 3.5;
  ensureSpace(doc, cursor, rowH);
  let x = x0;
  badges.forEach((b) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    const w = doc.getTextWidth(b.text) + 4;
    if (x + w > x0 + maxWidth && x > x0) {
      cursor.y += rowH;
      ensureSpace(doc, cursor, rowH);
      x = x0;
    }
    x += drawBadge(doc, x, cursor.y, b.text, b.color, fontSize) + 2;
  });
  cursor.y += rowH;
};

/** Thin accent-bar section header. */
export const drawSectionHeader = (doc: DrawDoc, cursor: PdfCursor, title: string, margin: number, contentWidth: number): void => {
  ensureSpace(doc, cursor, 22);
  cursor.y += 4;
  doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
  doc.rect(margin, cursor.y - 5, 2, 8, "F");
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(INK[0], INK[1], INK[2]);
  doc.text(clampLines(doc, title, contentWidth - 8, 1)[0] ?? "", margin + 5, cursor.y + 1);
  doc.setDrawColor(ACCENT[0], ACCENT[1], ACCENT[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, cursor.y + 4, margin + contentWidth, cursor.y + 4);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  cursor.y += 11;
};

/** Writes small wrapped muted text (notes). */
export const writeNote = (doc: Doc, cursor: PdfCursor, text: string, x: number, width: number, fontSize = 8): void => {
  if (!text || text === "N/A") return;
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(90, 90, 100);
  const lines: string[] = doc.splitTextToSize(text, width);
  lines.forEach((l) => {
    ensureSpace(doc, cursor, 4);
    doc.text(l, x, cursor.y);
    cursor.y += 4;
  });
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
};

export interface StructureGroup {
  region: string;
  items: string[];
}

/** Groups "Region: Structure Name" strings by region, preserving first-seen order. */
export const groupStructuresByRegion = (names: string[]): StructureGroup[] => {
  const map = new Map<string, string[]>();
  names.forEach((raw) => {
    const s = String(raw ?? "").trim();
    if (!s) return;
    const idx = s.indexOf(":");
    const region = idx > 0 ? s.slice(0, idx).trim() : "Other";
    const item = idx > 0 ? s.slice(idx + 1).trim() : s;
    if (!map.has(region)) map.set(region, []);
    map.get(region)!.push(item);
  });
  return Array.from(map, ([region, items]) => ({ region, items }));
};

/** Draws a boxed group with a header and items in columns, splitting across pages. */
export const drawStructureGroup = (
  doc: DrawDoc,
  cursor: PdfCursor,
  group: StructureGroup,
  margin: number,
  contentWidth: number,
  columns = 3
): void => {
  const rowH = 4.2;
  const colW = (contentWidth - 6) / columns;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  const cells = group.items.map((i) => clampLines(doc, i, colW - 2, 1)[0] ?? "");
  const rows = Math.ceil(cells.length / columns);

  let r = 0;
  let first = true;
  while (r < rows || first) {
    ensureSpace(doc, cursor, 7 + rowH * Math.min(2, Math.max(rows - r, 1)) + 3);
    const available = Math.max(1, Math.floor((PAGE_BOTTOM_LIMIT - cursor.y - 10) / rowH));
    const take = Math.min(available, rows - r);
    const boxH = 7 + take * rowH + 2;
    const top = cursor.y - 4;
    doc.setFillColor(247, 250, 253);
    doc.setDrawColor(200, 215, 232);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, top, contentWidth, boxH, 1.5, 1.5, "FD");
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(`${group.region} — ${group.items.length}${first ? "" : " (cont.)"}`, margin + 3, cursor.y);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    let y = cursor.y + 5.5;
    for (let i = 0; i < take; i++) {
      for (let c = 0; c < columns; c++) {
        const cell = cells[(r + i) * columns + c];
        if (!cell) continue;
        const flagged = /\((investigational|unverified)\)/i.test(cell);
        if (flagged) doc.setTextColor(194, 65, 12);
        doc.text(cell, margin + 3 + c * colW, y);
        if (flagged) doc.setTextColor(INK[0], INK[1], INK[2]);
      }
      y += rowH;
    }
    doc.setTextColor(0, 0, 0);
    cursor.y = top + boxH + 6;
    r += take;
    first = false;
    if (rows === 0) break;
  }
};

export interface SourceCardData {
  title: string;
  meta: string;
  link?: string;
  rigor?: { text: string; color?: string };
  efficacy?: { text: string; color?: string };
  setsLevel?: boolean;
  rationale?: string;
}

/** Bordered card for one evidence source. */
export const drawSourceCard = (
  doc: DrawDoc,
  cursor: PdfCursor,
  card: SourceCardData,
  margin: number,
  contentWidth: number,
  compact = false
): void => {
  const inner = contentWidth - 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const titleLines = clampLines(doc, card.title || "Untitled source", inner, compact ? 1 : 3);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  const metaLines = clampLines(doc, card.meta, inner, compact ? 1 : 2);
  const ratLines = compact || !card.rationale ? [] : clampLines(doc, card.rationale, inner, 3);
  const linkLine = !compact && card.link ? 1 : 0;
  const h = 4 + titleLines.length * 4.2 + metaLines.length * 3.6 + 5 + ratLines.length * 3.6 + linkLine * 3.8 + 2;

  ensureSpace(doc, cursor, h + 2);
  const top = cursor.y;
  doc.setFillColor(255, 255, 255);
  const edge = card.setsLevel ? ACCENT : ([210, 214, 222] as Rgb);
  doc.setDrawColor(edge[0], edge[1], edge[2]);
  doc.setLineWidth(card.setsLevel ? 0.5 : 0.2);
  doc.roundedRect(margin, top, contentWidth, h, 1.5, 1.5, "FD");
  if (card.setsLevel) {
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.rect(margin, top, 1.2, h, "F");
  }

  let y = top + 4.5;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(INK[0], INK[1], INK[2]);
  titleLines.forEach((l) => { doc.text(l, margin + 3, y); y += 4.2; });
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 100);
  metaLines.forEach((l) => { doc.text(l, margin + 3, y); y += 3.6; });
  y += 1.4;
  let x = margin + 3;
  if (card.rigor) x += drawBadge(doc, x, y, card.rigor.text, card.rigor.color, 7) + 2;
  if (card.efficacy) x += drawBadge(doc, x, y, card.efficacy.text, card.efficacy.color, 7) + 2;
  if (card.setsLevel) drawBadge(doc, x, y, "Sets product level", "blue", 7);
  y += 4;
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 80);
  ratLines.forEach((l) => { doc.text(l, margin + 3, y); y += 3.6; });
  if (linkLine && card.link) {
    doc.setTextColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    const shown = clampLines(doc, card.link, inner, 1)[0] ?? card.link;
    doc.textWithLink(shown, margin + 3, y, { url: card.link });
  }
  doc.setTextColor(0, 0, 0);
  cursor.y = top + h + 3;
};

/** Status chip colour for regulatory text. */
export const regulatoryColor = (status?: string): string => {
  const s = String(status ?? "").toLowerCase();
  if (!s || s === "n/a" || s.includes("not ")) return "gray";
  if (/(pending|submitted|in progress|under review|planned)/.test(s)) return "orange";
  if (/(withdrawn|recall|expired|revoked)/.test(s)) return "red";
  if (/(certified|cleared|approved|granted|ce|510|de novo|registered|mdr|class)/.test(s)) return "green";
  return "gray";
};

export const EDUCATIONAL_DISCLAIMER =
  "For information only. Not a clinical validation or endorsement; verify with the manufacturer and local commissioning.";

// ---------- Font-safe text ----------

const CHAR_MAP: Record<string, string> = {
  "\u2010": "-", "\u2011": "-", "\u2012": "-", "\u2013": "-", "\u2014": "-", "\u2015": "-", "\u2212": "-",
  "\u2018": "'", "\u2019": "'", "\u201A": "'", "\u201B": "'", "\u2032": "'",
  "\u201C": '"', "\u201D": '"', "\u201E": '"', "\u2033": '"',
  "\u00A0": " ", "\u2002": " ", "\u2003": " ", "\u2009": " ", "\u200A": " ", "\u202F": " ",
  "\u200B": "", "\u200C": "", "\u200D": "", "\uFEFF": "", "\u00AD": "",
  "\u2026": "...", "\u2022": "-", "\u2264": "<=", "\u2265": ">=", "\u2248": "~", "\u00D7": "x",
  "\u2192": "->", "\u2190": "<-", "\u03B1": "alpha", "\u03B2": "beta", "\u03B3": "gamma", "\u03BC": "u", "\u2122": "(TM)", "\u0131": "i",
};

/** Maps characters the built-in Helvetica (WinAnsi) font cannot draw to plain equivalents. */
export const toPdfSafeText = (input: unknown): string => {
  const s = String(input ?? "").normalize("NFC");
  let out = "";
  for (const ch of s) {
    if (ch in CHAR_MAP) { out += CHAR_MAP[ch]; continue; }
    const code = ch.codePointAt(0) ?? 0;
    if (code === 10 || code === 9 || (code >= 32 && code <= 126) || (code >= 160 && code <= 255)) { out += ch; continue; }
    const stripped = ch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    out += /^[\x20-\x7e]+$/.test(stripped) ? stripped : "?";
  }
  return out;
};

/** Splits any line still wider than width (e.g. long DOI/URL) into hard-broken chunks. */
export const hardBreakLines = (lines: string[], width: number, measure: (t: string) => number): string[] =>
  lines.flatMap((line) => {
    if (measure(line) <= width) return [line];
    const parts: string[] = [];
    let cur = "";
    for (const ch of line) {
      if (cur && measure(cur + ch) > width) { parts.push(cur); cur = ch.trimStart(); } else cur += ch;
    }
    if (cur) parts.push(cur);
    return parts;
  });

/** Patches a jsPDF instance so every drawn/measured string is font-safe and wraps within width. */
export const makePdfSafe = <T extends jsPDF>(doc: T): T => {
  const text = doc.text.bind(doc);
  const split = doc.splitTextToSize.bind(doc);
  const link = doc.textWithLink.bind(doc);
  const width = doc.getTextWidth.bind(doc);
  const safe = (t: unknown) => (Array.isArray(t) ? t.map(toPdfSafeText) : toPdfSafeText(t));
  (doc as jsPDF).text = ((t: string | string[], ...rest: unknown[]) =>
    (text as (...a: unknown[]) => jsPDF)(safe(t), ...rest)) as jsPDF["text"];
  (doc as jsPDF).splitTextToSize = ((t: string, w: number, o?: unknown) =>
    hardBreakLines(split(toPdfSafeText(t), w, o as never) as string[], w, (s) => width(s))) as jsPDF["splitTextToSize"];
  (doc as jsPDF).textWithLink = ((t: string, x: number, y: number, o: unknown) =>
    link(toPdfSafeText(t), x, y, o as never)) as jsPDF["textWithLink"];
  (doc as jsPDF).getTextWidth = ((t: string) => width(toPdfSafeText(t))) as jsPDF["getTextWidth"];
  return doc;
};
