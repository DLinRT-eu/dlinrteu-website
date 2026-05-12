/**
 * HTA Dossier Export
 *
 * Produces an Excel workbook organised along the EUnetHTA Core Model domains
 * (CUR / TEC / EFF / SAF / ETH / ORG / SOC / LEG). Targets users preparing a
 * Joint Clinical Assessment (JCA) under EU Regulation 2021/2282.
 *
 * NOTE: This is informational and NOT a substitute for an official HTA dossier.
 */
import { ProductDetails } from "@/types/productDetails";
import { createExcelWorkbook, downloadBlob, type ExcelSheet } from "@/utils/excelExport";
import { EVIDENCE_RIGOR_EXPLAIN, CLINICAL_IMPACT_EXPLAIN } from "@/data/hta-mapping";
import {
  IMPLEMENTATION_BURDEN_LEVELS,
  computeReadinessSignal,
} from "@/data/evidence-impact-levels";

const BURDEN_EXPLAIN: Record<string, string> = Object.fromEntries(
  IMPLEMENTATION_BURDEN_LEVELS.map((l) => [l.level, `${l.name} — ${l.readinessConsequence}`])
);

const stringify = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return v.map(stringify).join("; ");
  if (typeof v === "object") {
    try { return JSON.stringify(v); } catch { return String(v); }
  }
  return String(v);
};

const fdaStatus = (p: ProductDetails): string => {
  const fda = p.regulatory?.fda;
  if (!fda) return "";
  if (typeof fda === "string") return fda;
  return [fda.status, fda.clearanceNumber, fda.class].filter(Boolean).join(" · ");
};

const ceStatus = (p: ProductDetails): string => {
  const ce = p.regulatory?.ce;
  if (!ce) return "";
  return [ce.status, ce.class, ce.type, ce.notifiedBody].filter(Boolean).join(" · ");
};

function buildOverview(products: ProductDetails[]): ExcelSheet {
  return {
    name: "Overview",
    data: products.map((p) => ({
      "Product": p.name ?? "",
      "Version": (p as any).version ?? "",
      "Vendor": p.company ?? "",
      "Category": p.category ?? "",
      "CE": ceStatus(p),
      "FDA": fdaStatus(p),
      "Intended use": stringify((p as any).intendedUse ?? p.description),
      "Product URL": (p as any).productUrl ?? p.website ?? "",
    })),
  };
}

function buildCUR(products: ProductDetails[]): ExcelSheet {
  return {
    name: "CUR — Current use",
    data: products.map((p) => ({
      "Product": p.name ?? "",
      "Indication / disease": stringify((p as any).diseaseTargeted),
      "Target anatomy": stringify(p.anatomy),
      "Modality": stringify(p.modality),
      "Clinical task": p.category ?? "",
      "Intended use statement": stringify((p as any).intendedUse),
    })),
  };
}

function buildTEC(products: ProductDetails[]): ExcelSheet {
  return {
    name: "TEC — Technical",
    data: products.map((p) => {
      const tech: any = (p as any).technicalSpecifications ?? {};
      return {
        "Product": p.name ?? "",
        "Input formats": stringify(tech.input?.format ?? tech.input),
        "Output formats": stringify(tech.output?.format ?? tech.output),
        "Processing time": stringify(tech.processingTime ?? (p as any).processingTime),
        "Integration": stringify((p as any).integration ?? tech.integration),
        "Deployment": stringify((p as any).deployment),
        "AI / model": stringify((p as any).technology),
        "Dose prediction models": stringify((p as any).dosePredictionModels),
        "Key features": stringify(p.features),
      };
    }),
  };
}

function buildEFF(products: ProductDetails[]): ExcelSheet {
  return {
    name: "EFF — Effectiveness",
    data: products.map((p) => {
      const rigor = (p as any).evidenceRigor;
      const impact = (p as any).clinicalImpact;
      const sq: any = (p as any).studyQuality ?? {};
      const evalData: any = (p as any).evaluationData ?? {};
      const evidence = (p as any).evidence;
      const topPubs = Array.isArray(evidence)
        ? evidence.slice(0, 3).map((e: any) => e?.url ?? e?.doi ?? e?.title ?? stringify(e)).join(" | ")
        : stringify(evidence);
      return {
        "Product": p.name ?? "",
        "Evidence rigor (E0–E3)": rigor ?? "",
        "Rigor — meaning": rigor ? EVIDENCE_RIGOR_EXPLAIN[rigor] ?? "" : "",
        "Clinical impact (I0–I5)": impact ?? "",
        "Impact — meaning": impact ? CLINICAL_IMPACT_EXPLAIN[impact] ?? "" : "",
        "Vendor independent": sq.vendorIndependent ? "Yes" : "No",
        "Multi-centre": sq.multiCenter ? "Yes" : "No",
        "Multi-national": sq.multiNational ? "Yes" : "No",
        "Prospective": sq.prospective ? "Yes" : "No",
        "External validation": sq.externalValidation ? "Yes" : "No",
        "Evaluation dataset size": stringify(evalData.datasetSize),
        "Evaluation sites": stringify(evalData.sites),
        "Evaluation countries": stringify(evalData.countries),
        "Primary endpoint": stringify(evalData.primaryEndpoint),
        "Top publications": topPubs,
      };
    }),
  };
}

function buildSAF(products: ProductDetails[]): ExcelSheet {
  return {
    name: "SAF — Safety",
    data: products.map((p) => {
      const fsca: any = (p as any).safetyCorrectiveActions ?? {};
      return {
        "Product": p.name ?? "",
        "Known limitations": stringify((p as any).limitations),
        "Supported structures (count)": Array.isArray((p as any).supportedStructures)
          ? (p as any).supportedStructures.length
          : 0,
        "Investigational structures": Array.isArray((p as any).supportedStructures)
          ? (p as any).supportedStructures.filter((s: string) => /investigational/i.test(s)).length
          : 0,
        "Unverified structures": Array.isArray((p as any).supportedStructures)
          ? (p as any).supportedStructures.filter((s: string) => /unverified/i.test(s)).length
          : 0,
        "FSCA count": fsca.count ?? 0,
        "FSCA summary": stringify(fsca.summary),
        "FSCA details": stringify(fsca.actions ?? fsca.details),
      };
    }),
  };
}

function buildETH(products: ProductDetails[]): ExcelSheet {
  return {
    name: "ETH — Ethics & data",
    data: products.map((p) => {
      const td: any = (p as any).trainingData ?? {};
      return {
        "Product": p.name ?? "",
        "Training data — description": stringify(td.description),
        "Dataset size": stringify(td.datasetSize),
        "Sources": stringify(td.datasetSources ?? td.sources),
        "Demographics": stringify(td.demographics),
        "Institutions": stringify(td.institutions),
        "Countries": stringify(td.countries),
        "Public datasets used": stringify(td.publicDatasets),
        "Disclosure level": stringify(td.disclosureLevel),
        "Source URL": stringify(td.sourceUrl),
      };
    }),
  };
}

function buildORG(products: ProductDetails[]): ExcelSheet {
  return {
    name: "ORG — Organisational",
    data: products.map((p) => ({
      "Product": p.name ?? "",
      "Deployment": stringify((p as any).deployment),
      "Integration": stringify((p as any).integration),
      "Market presence": stringify((p as any).marketPresence),
    })),
  };
}

function buildLEG(products: ProductDetails[]): ExcelSheet {
  return {
    name: "LEG — Legal & regulatory",
    data: products.map((p) => ({
      "Product": p.name ?? "",
      "CE": ceStatus(p),
      "FDA": fdaStatus(p),
      "TGA": stringify(p.regulatory?.tga),
      "TFDA": stringify(p.regulatory?.tfda),
      "Other certification": stringify((p as any).certification),
      "Intended use statement": stringify((p as any).intendedUse),
      "Guideline compliance": stringify((p as any).guidelines),
    })),
  };
}

function buildReadme(): ExcelSheet {
  return {
    name: "Readme",
    data: [
      { Field: "About this export", Value: "DLinRT HTA dossier — fields organised by EUnetHTA Core Model domains (CUR, TEC, EFF, SAF, ETH, ORG, SOC, LEG)." },
      { Field: "Regulation", Value: "EU Regulation 2021/2282 on Health Technology Assessment (HTAR), in application since 12 January 2025 for oncology medicines and ATMPs; medical devices (incl. AI/SaMD) follow staged scope." },
      { Field: "Methodology", Value: "EUnetHTA 21 deliverables — see https://www.eunethta.eu/eunethta-21" },
      { Field: "Effectiveness scoring", Value: "Evidence rigor (E0–E3) × Clinical impact (I0–I5), see https://dlinrt.eu/resources-compliance#evidence-levels" },
      { Field: "Out of scope (ECO)", Value: "DLinRT does not collect pricing, budget impact or cost-effectiveness data. Combine this export with vendor quotations and local cost data." },
      { Field: "Disclaimer", Value: "This export is informational only. It does NOT constitute a JCA submission and is not a substitute for an official HTA dossier or regulatory filing." },
      { Field: "Source", Value: "https://dlinrt.eu" },
      { Field: "Generated", Value: new Date().toISOString() },
    ],
  };
}

const safeFile = (s: string) =>
  s.replace(/[^a-z0-9-_]+/gi, "-").replace(/-+/g, "-").toLowerCase();

export async function exportHTADossier(products: ProductDetails[]): Promise<void> {
  if (!products.length) throw new Error("No products to export");
  const sheets: ExcelSheet[] = [
    buildOverview(products),
    buildCUR(products),
    buildTEC(products),
    buildEFF(products),
    buildSAF(products),
    buildETH(products),
    buildORG(products),
    buildLEG(products),
    buildReadme(),
  ];
  const blob = await createExcelWorkbook(sheets);
  const filename =
    products.length === 1
      ? `dlinrt-hta-dossier-${safeFile(products[0].name ?? "product")}.xlsx`
      : `dlinrt-hta-dossier-${products.length}-products.xlsx`;
  downloadBlob(blob, filename);
}

export const exportSingleHTADossier = (product: ProductDetails) => exportHTADossier([product]);
