import type { ProductDetails } from "@/types/productDetails";
import { formatEudamedRiskClass, getProductEudamed } from "@/utils/eudamed";

export type EudamedMatchKind = "exact" | "editor-confirmed" | "none";

export interface ProductRegulatorySummary {
  id: string;
  name: string;
  ce: { present: boolean; label: string; note?: string };
  fda: { present: boolean; label: string; date?: string };
  eudamed: {
    kind: EudamedMatchKind;
    tradeName?: string;
    basicUdi?: string;
    emdnCode?: string;
    riskClass?: string;
    note?: string;
    sourceUrl?: string;
  };
}

export interface CompanyRegulatoryCounts {
  ce: number;
  fda: number;
  eudamed: number;
}

const isNegative = (status?: string): boolean =>
  !status || /^(not|no|none|pending|n\/a|unknown)/i.test(status.trim());

const summariseCe = (product: ProductDetails): ProductRegulatorySummary["ce"] => {
  const ce = product.regulatory?.ce;
  if (!ce) return { present: false, label: "—" };
  if (typeof ce === "string") return { present: !isNegative(ce), label: ce };
  if (isNegative(ce.status)) return { present: false, label: ce.status || "—", note: ce.notes };
  const label = [ "CE", ce.class ? `Class ${ce.class.replace(/^class\s*/i, "")}` : undefined ].filter(Boolean).join(" · ");
  return { present: true, label, note: ce.notes };
};

const summariseFda = (product: ProductDetails): ProductRegulatorySummary["fda"] => {
  const fda = product.regulatory?.fda as NonNullable<ProductDetails["regulatory"]>["fda"] | string | undefined;
  if (!fda) return { present: false, label: "—" };
  if (typeof fda === "string") return { present: !isNegative(fda), label: fda };
  if (isNegative(fda.status)) return { present: false, label: fda.status || "—" };
  if (/cdss/i.test(`${fda.status} ${fda.type ?? ""}`)) return { present: true, label: "CDSS exempt" };
  return { present: true, label: fda.clearanceNumber || fda.status, date: fda.decisionDate };
};

const summariseEudamed = (product: ProductDetails): ProductRegulatorySummary["eudamed"] => {
  const record = getProductEudamed(product);
  if (!record) return { kind: "none" };
  return {
    kind: record.registrationNote ? "editor-confirmed" : "exact",
    tradeName: record.registeredTradeName,
    basicUdi: record.basicUdi,
    emdnCode: record.emdnCode,
    riskClass: record.riskClass ? formatEudamedRiskClass(record.riskClass) : undefined,
    note: record.registrationNote,
    sourceUrl: record.sourceUrl,
  };
};

export const getProductRegulatorySummary = (product: ProductDetails): ProductRegulatorySummary => ({
  id: product.id || product.name,
  name: product.name,
  ce: summariseCe(product),
  fda: summariseFda(product),
  eudamed: summariseEudamed(product),
});

export const getCompanyRegulatoryCounts = (products: ProductDetails[]): CompanyRegulatoryCounts =>
  products.map(getProductRegulatorySummary).reduce<CompanyRegulatoryCounts>(
    (acc, s) => ({
      ce: acc.ce + (s.ce.present ? 1 : 0),
      fda: acc.fda + (s.fda.present ? 1 : 0),
      eudamed: acc.eudamed + (s.eudamed.kind === "none" ? 0 : 1),
    }),
    { ce: 0, fda: 0, eudamed: 0 }
  );
