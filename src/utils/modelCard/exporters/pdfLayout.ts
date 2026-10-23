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
