import type jsPDF from "jspdf";
import type { ProductDetails } from "@/types/productDetails";
import type { ModelCardData } from "../types";
import {
  getAdoptionReadinessLevel,
  getClinicalImpactLevel,
  getEvidenceRigorLevel,
} from "@/data/evidence-impact-levels";
import {
  ACCENT,
  PdfCursor,
  drawBadgeRow,
  drawSourceCard,
  drawStructureGroup,
  ensureSpace,
  groupStructuresByRegion,
  regulatoryColor,
  writeNote,
} from "./pdfLayout";

type Card = ModelCardData;

export const rigorBadge = (code?: string) => {
  if (!code) return undefined;
  const l = getEvidenceRigorLevel(code);
  return { text: l ? `${l.level} — ${l.name}` : code, short: code, color: l?.color };
};
export const efficacyBadge = (code?: string) => {
  if (!code) return undefined;
  const l = getClinicalImpactLevel(code);
  return { text: l ? `${l.level} — ${l.name}` : code, short: l?.level ?? code, color: l?.color };
};
export const readinessBadge = (code?: string) => {
  if (!code) return undefined;
  const l = getAdoptionReadinessLevel(code);
  return { text: l ? `${l.level} — ${l.name}` : code, short: code, color: l?.color };
};

const clean = (v?: string) => (v && v !== "N/A" ? v : undefined);

export const drawEvidenceSummary = (
  doc: jsPDF,
  cursor: PdfCursor,
  card: Card,
  margin: number,
  contentWidth: number
): void => {
  const s = card.evidenceScore;
  const e = rigorBadge(clean(s?.evidenceRigor));
  const l = efficacyBadge(clean(s?.clinicalImpact));
  const r = readinessBadge(clean(s?.adoptionReadiness));
  const badges: Array<{ text: string; color?: string }> = [];
  badges.push(e ? { text: `Rigor ${e.text}`, color: e.color } : { text: "Rigor: not assessed", color: "gray" });
  badges.push(l ? { text: `Efficacy ${l.text}`, color: l.color } : { text: "Efficacy: not assessed", color: "gray" });
  badges.push(r ? { text: `Readiness ${r.text}`, color: r.color } : { text: "Readiness: not assessed", color: "gray" });
  const origin = String(s?.scoreOrigin ?? "");
  if (/provisional/i.test(origin)) badges.push({ text: "Provisional", color: "yellow" });

  drawBadgeRow(doc, cursor, badges, margin + 3, contentWidth - 6, 8);

  const q = card.studyQuality;
  const chips: Array<[string, string]> = [
    ["Vendor-independent", q.vendorIndependent],
    ["Multi-centre", q.multiCenter],
    ["Multi-national", q.multiNational],
    ["Prospective", q.prospective],
    ["External validation", q.externalValidation],
  ];
  drawBadgeRow(
    doc,
    cursor,
    chips.map(([label, v]) => ({ text: `${v === "Yes" ? "✓" : "–"} ${label}`.replace("✓", "+"), color: v === "Yes" ? "green" : "gray" })),
    margin + 3,
    contentWidth - 6,
    7
  );

  const counts = [
    s?.scoredPublicationsCount ? `${s.scoredPublicationsCount} scored publication(s)` : "",
    s?.listedPublicationsCount ? `${s.listedPublicationsCount} listed` : "",
    origin ? `score origin: ${origin}` : "",
  ].filter(Boolean).join(" · ");
  writeNote(doc, cursor, counts, margin + 3, contentWidth - 6);
  if (clean(s?.evidenceRigorNotes)) writeNote(doc, cursor, `Rigor: ${s.evidenceRigorNotes}`, margin + 3, contentWidth - 6);
  if (clean(s?.clinicalImpactNotes)) writeNote(doc, cursor, `Efficacy: ${s.clinicalImpactNotes}`, margin + 3, contentWidth - 6);
  if (clean(s?.adoptionReadinessNotes)) writeNote(doc, cursor, `Readiness: ${s.adoptionReadinessNotes}`, margin + 3, contentWidth - 6);
  cursor.y += 2;
};

const yes = (v?: string) => String(v ?? "").toLowerCase() === "yes" || v === "true";

export const drawEvidenceSources = (
  doc: jsPDF,
  cursor: PdfCursor,
  card: Card,
  margin: number,
  contentWidth: number,
  compact = false
): number => {
  const sources = (card.evidenceSources ?? []).filter((x) => x.title || x.doi || x.link);
  sources.forEach((src) => {
    const e = rigorBadge(clean(src.evidenceRigor));
    const l = efficacyBadge(clean(src.clinicalImpact));
    const meta = [src.authors, src.journal, src.year, src.doi ? `DOI ${src.doi}` : ""].filter(Boolean).join(" · ");
    const link = src.doi ? `https://doi.org/${src.doi}` : src.link || undefined;
    drawSourceCard(
      doc,
      cursor,
      {
        title: src.title || src.doi || src.link || "Source",
        meta,
        link,
        rigor: e ? { text: e.short, color: e.color } : { text: "E –", color: "gray" },
        efficacy: l ? { text: l.short, color: l.color } : { text: "L –", color: "gray" },
        setsLevel: yes(src.setsProductRigor) || yes(src.setsProductImpact),
        rationale: clean(src.rationale) ?? clean(src.note),
      },
      margin,
      contentWidth,
      compact
    );
  });
  return sources.length;
};

export const drawStructures = (
  doc: jsPDF,
  cursor: PdfCursor,
  product: ProductDetails,
  margin: number,
  contentWidth: number
): boolean => {
  const raw = Array.isArray(product.supportedStructures)
    ? product.supportedStructures.map((s) => (typeof s === "string" ? s : s?.name ?? ""))
    : [];
  if (raw.length === 0) return false;
  groupStructuresByRegion(raw).forEach((g) => drawStructureGroup(doc, cursor, g, margin, contentWidth));
  return true;
};

export const drawRegulatoryChips = (
  doc: jsPDF,
  cursor: PdfCursor,
  card: Card,
  margin: number,
  contentWidth: number
): void => {
  const ce = card.basicInfo.ceStatus;
  const fda = card.basicInfo.fdaStatus;
  drawBadgeRow(
    doc,
    cursor,
    [
      { text: `CE: ${ce || "N/A"}`, color: regulatoryColor(ce) },
      { text: `FDA: ${fda || "N/A"}`, color: regulatoryColor(fda) },
    ],
    margin + 3,
    contentWidth - 6,
    8
  );
  cursor.y += 1;
};

/** Light zebra background behind the next field row. */
export const zebra = (doc: jsPDF, cursor: PdfCursor, index: number, margin: number, contentWidth: number): void => {
  if (index % 2 === 0) return;
  ensureSpace(doc, cursor, 8);
  doc.setFillColor(246, 248, 251);
  doc.rect(margin, cursor.y - 4, contentWidth, 7, "F");
};

export { ACCENT };
