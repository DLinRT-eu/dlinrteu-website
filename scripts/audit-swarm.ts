/**
 * Product Audit Swarm — static role runner.
 * Usage: bun scripts/audit-swarm.ts <wave-name> <category-glob> [<category-glob>...]
 * Example: bun scripts/audit-swarm.ts wave1 auto-contouring
 *
 * Emits to /mnt/documents/:
 *   product-audit-<DATE>-<wave>.md
 *   product-audit-<DATE>-<wave>.csv
 *   product-audit-<DATE>-<wave>-rescoring.csv
 */
import { readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { COMPANIES } from "@/data/companies";
import type { ProductDetails } from "@/types/productDetails";

type Sev = "error" | "warn" | "info";
type Finding = { id: string; role: string; field: string; severity: Sev; observation: string; suggestedFix: string };

const wave = process.argv[2] ?? "waveX";
const categories = process.argv.slice(3);
if (categories.length === 0) {
  console.error("usage: bun scripts/audit-swarm.ts <wave-name> <category-folder>...");
  process.exit(1);
}

const ALLOWED_CATEGORIES = new Set([
  "Auto-Contouring", "Clinical Prediction", "Image Enhancement", "Image Synthesis",
  "Performance Monitor", "Platform", "Reconstruction", "Registration", "Tracking", "Treatment Planning",
]);
const E_CODES = new Set(["E0", "E1", "E2", "E3"]);
const I_CODES = new Set(["I0", "I1", "I2", "I3", "I4", "I5"]);
const R_CODES = new Set(["R0", "R1", "R2", "R3", "R4", "R5"]);
const CE_STATUS = new Set(["cleared", "under_review", "not_applicable", "withdrawn"]);
const FDA_STATUS = new Set(["510k_cleared", "de_novo", "pma_approved", "not_approved", "pending", "not_applicable", "withdrawn"]);

const TODAY = new Date().toISOString().slice(0, 10);
const DAYS = (d?: string) => d ? Math.floor((Date.now() - new Date(d).getTime()) / 86400000) : Infinity;

async function loadCategory(folder: string): Promise<ProductDetails[]> {
  const idx = resolve(`src/data/products/${folder}/index.ts`);
  if (!existsSync(idx)) {
    console.error(`! skip: ${idx} missing`);
    return [];
  }
  const mod: any = await import(idx);
  const arr = Object.values(mod).find((v) => Array.isArray(v) && v.length && typeof (v[0] as any)?.id === "string") as ProductDetails[] | undefined;
  return arr ?? [];
}

const findings: Finding[] = [];
const add = (id: string, role: string, field: string, severity: Sev, observation: string, suggestedFix = "—") =>
  findings.push({ id, role, field, severity, observation, suggestedFix });

const logoSet = new Set(readdirSync("public/logos").map((f) => `/logos/${f}`));
const activeCompanyNames = new Set(COMPANIES.map((c) => c.name));

const allProducts: ProductDetails[] = [];
for (const cat of categories) {
  const list = await loadCategory(cat);
  console.error(`loaded ${list.length} from ${cat}`);
  allProducts.push(...list);
}

// Build cross-check registry
const idCount = new Map<string, number>();
for (const p of allProducts) idCount.set(p.id, (idCount.get(p.id) ?? 0) + 1);

// Per-product checks
for (const p of allProducts) {
  const id = p.id;

  // Identity
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(id))
    add(id, "Identity", "id", "error", `id "${id}" not in lowercase-hyphen form`, "Rename slug to company-product");
  if ((idCount.get(id) ?? 0) > 1)
    add(id, "Cross-check", "id", "error", `Duplicate id appears ${idCount.get(id)} times`, "Disambiguate slugs");
  if (!p.name || p.name.length < 3)
    add(id, "Identity", "name", "error", "Missing or too-short name", "Use vendor product name");
  if (!p.category || !ALLOWED_CATEGORIES.has(p.category as string))
    add(id, "Identity", "category", "error", `Category "${p.category}" not in allowed enum`, "Pick from allowed enum");
  if (p.secondaryCategories) {
    if (p.secondaryCategories.length > 3)
      add(id, "Identity", "secondaryCategories", "warn", "More than 3 secondaryCategories", "Trim to 3");
    for (const sc of p.secondaryCategories)
      if (!ALLOWED_CATEGORIES.has(sc))
        add(id, "Identity", "secondaryCategories", "error", `"${sc}" not in allowed enum`, "Fix enum value");
  }
  if (p.logoUrl && p.logoUrl.startsWith("/logos/") && !logoSet.has(p.logoUrl))
    add(id, "Identity", "logoUrl", "error", `Logo file ${p.logoUrl} missing under public/logos/`, "Add asset or fix path");
  const url = (p as any).productUrl ?? p.website;
  if (!url || !/^https?:\/\//.test(url))
    add(id, "Identity", "productUrl/website", "error", "Missing or non-https URL", "Add valid https:// URL");

  // Inclusion
  const usesAI = (p as any).usesAI;
  const monitorsAI = (p as any).monitorsAIProducts;
  if (usesAI === false && monitorsAI !== true)
    add(id, "Inclusion", "usesAI", "error", "usesAI=false but monitorsAIProducts not true — fails AI/DL inclusion gate", "Set monitorsAIProducts:true or remove");

  // Regulatory
  const reg = (p as any).regulatory ?? {};
  if (reg.ce?.status && !CE_STATUS.has(reg.ce.status))
    add(id, "Regulatory", "regulatory.ce.status", "error", `Invalid CE status "${reg.ce.status}"`, "Use cleared|under_review|not_applicable|withdrawn");
  if (reg.ce?.status === "cleared" && !reg.ce.class)
    add(id, "Regulatory", "regulatory.ce.class", "warn", "CE cleared but no class set", "Add I/IIa/IIb/III");
  if (reg.fda?.status && !FDA_STATUS.has(reg.fda.status))
    add(id, "Regulatory", "regulatory.fda.status", "warn", `Unusual FDA status "${reg.fda.status}"`, "Verify enum");
  if (p.certification && reg.ce?.status === "not_applicable" && /CE/i.test(p.certification))
    add(id, "Regulatory", "certification", "error", "certification mentions CE but regulatory.ce.status=not_applicable", "Reconcile");
  if (p.certification && reg.fda?.status === "not_approved" && /FDA/i.test(p.certification))
    add(id, "Regulatory", "certification", "error", "certification mentions FDA but regulatory.fda.status=not_approved", "Reconcile");

  // Technical
  const tech = (p as any).technicalSpecifications ?? {};
  const techText = JSON.stringify(tech);
  if (/DICOM\s+RT[-\s]?Struct/i.test(techText) || /RT\s+Struct(?!URE)/i.test(techText))
    add(id, "Technical", "technicalSpecifications", "warn", "Uses non-standard DICOM nomenclature", "Use DICOM-RTSTRUCT/RTPLAN/RTDOSE");
  if (p.modality && !Array.isArray(p.modality))
    add(id, "Technical", "modality", "warn", "modality is not an array", "Wrap value in array");

  // Structures
  const cat = p.category;
  const supportedStructures = (p as any).supportedStructures as any[] | undefined;
  const structuresUnavailable = (p as any).structuresUnavailable;
  if (cat === "Auto-Contouring") {
    if ((!supportedStructures || supportedStructures.length === 0) && !structuresUnavailable)
      add(id, "Structures", "supportedStructures", "error", "Auto-Contouring product with empty structures and structuresUnavailable!=true", "Populate or set structuresUnavailable:true");
    if (supportedStructures) {
      let bad = 0;
      for (const s of supportedStructures) {
        const nm = typeof s === "string" ? s : (s?.name ?? "");
        if (nm && !/^[A-Z][A-Za-z0-9 &/\-]+:\s+.+/.test(nm)) bad++;
      }
      if (bad > 0)
        add(id, "Structures", "supportedStructures", "warn", `${bad}/${supportedStructures.length} structure names not in "Region: Name" form`, "Reformat per convention");
    }
  }

  // Evidence
  const er = (p as any).evidenceRigor;
  const ci = (p as any).clinicalImpact;
  const ar = (p as any).adoptionReadiness;
  if (er && !E_CODES.has(er)) add(id, "Evidence", "evidenceRigor", "error", `Invalid E "${er}"`, "Use E0-E3");
  if (ci && !I_CODES.has(ci)) add(id, "Evidence", "clinicalImpact", "error", `Invalid I "${ci}"`, "Use I0-I5");
  if (ar && !R_CODES.has(ar)) add(id, "Evidence", "adoptionReadiness", "error", `Invalid R "${ar}"`, "Use R0-R5");
  if (!er) add(id, "Evidence", "evidenceRigor", "warn", "evidenceRigor unset", "Score E0-E3");
  if (!ci) add(id, "Evidence", "clinicalImpact", "warn", "clinicalImpact unset", "Score I0-I5");
  const keyPapers = (p as any).keyPapers as any[] | undefined;
  if (er && er !== "E0" && (!keyPapers || keyPapers.length === 0))
    add(id, "Evidence", "keyPapers", "warn", `evidenceRigor=${er} but keyPapers empty`, "Cite the strongest paper");
  if (!(p as any).evidenceRigorNotes)
    add(id, "Evidence", "evidenceRigorNotes", "info", "evidenceRigorNotes missing", "Add 1-3 sentence justification");

  // Transparency
  if (er && er !== "E0") {
    if (!(p as any).trainingData)
      add(id, "Transparency", "trainingData", "warn", `E≥E1 without trainingData description`, "Add trainingData per transparency schema");
    if (!(p as any).evaluationData)
      add(id, "Transparency", "evaluationData", "warn", `E≥E1 without evaluationData description`, "Add evaluationData per transparency schema");
  }
  const limitations = (p as any).limitations;
  if (!limitations || (Array.isArray(limitations) && limitations.length === 0))
    add(id, "Transparency", "limitations", "info", "No limitations documented", "Add vendor- or paper-declared caveats");

  // lastRevised freshness
  const lr = (p as any).lastRevised ?? (p as any).lastVerified;
  const lrDays = DAYS(lr);
  if (!lr) add(id, "Identity", "lastRevised", "warn", "lastRevised unset", "Set to YYYY-MM-DD on next review");
  else if (lrDays > 180) add(id, "Identity", "lastRevised", "warn", `lastRevised ${lrDays} days old (>180)`, "Re-verify and bump");

  // Cross-check company
  if (p.company && !activeCompanyNames.has(p.company))
    add(id, "Cross-check", "company", "warn", `Company "${p.company}" not in active companies registry`, "Add to src/data/companies or align spelling");
}

// Emit
mkdirSync("/mnt/documents", { recursive: true });
const base = `/mnt/documents/product-audit-${TODAY}-${wave}`;

// Markdown
const bySev = (s: Sev) => findings.filter((f) => f.severity === s).length;
const escapePipe = (s: string) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
const md: string[] = [];
md.push(`# Product Audit — ${TODAY} — ${wave}`);
md.push("");
md.push(`- Scope: categories = ${categories.join(", ")}`);
md.push(`- Products in scope: ${allProducts.length}`);
md.push(`- Findings: ${bySev("error")} errors, ${bySev("warn")} warns, ${bySev("info")} infos`);
md.push("");
for (const p of allProducts) {
  const id = p.id;
  const er = (p as any).evidenceRigor ?? "?";
  const ci = (p as any).clinicalImpact ?? "?";
  const ar = (p as any).adoptionReadiness ?? "?";
  const lr = (p as any).lastRevised ?? (p as any).lastVerified ?? "—";
  md.push(`### ${id}`);
  md.push("");
  md.push(`- **Name**: ${p.name}`);
  md.push(`- **Company**: ${p.company}`);
  md.push(`- **Category**: ${p.category}${p.secondaryCategories?.length ? ` → secondary: ${p.secondaryCategories.join(", ")}` : ""}`);
  md.push(`- **Current scores**: ${er} / ${ci} / ${ar}`);
  md.push(`- **Last revised**: ${lr} (${DAYS(lr) === Infinity ? "n/a" : DAYS(lr) + " days ago"})`);
  md.push("");
  const mine = findings.filter((f) => f.id === id);
  md.push(`#### Findings (${mine.length})`);
  md.push("");
  md.push("| Role | Field | Severity | Observation | Suggested fix |");
  md.push("| --- | --- | --- | --- | --- |");
  if (mine.length === 0) md.push("| — | — | info | clean | — |");
  for (const f of mine) md.push(`| ${f.role} | ${escapePipe(f.field)} | ${f.severity} | ${escapePipe(f.observation)} | ${escapePipe(f.suggestedFix)} |`);
  md.push("");
  md.push(`#### Re-scoring proposal`);
  md.push("");
  md.push(`- Current: E=${er} / I=${ci} / R=${ar}`);
  md.push(`- Proposed: (review required — static sweep, no PubMed lookup in this run)`);
  md.push("");
}
writeFileSync(`${base}.md`, md.join("\n"));

// Findings CSV
const csvEscape = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
const csvRows = ["id,role,severity,field,observation,suggested_fix"];
for (const f of findings)
  csvRows.push([f.id, f.role, f.severity, f.field, f.observation, f.suggestedFix].map(csvEscape).join(","));
writeFileSync(`${base}.csv`, csvRows.join("\n"));

// Rescoring CSV (placeholder rows — proposals filled in deep-review pass)
const rsRows = ["id,current_E,current_I,current_R,proposed_E,proposed_I,proposed_R,strongest_paper_doi,search_date,rationale"];
for (const p of allProducts) {
  const er = (p as any).evidenceRigor ?? "";
  const ci = (p as any).clinicalImpact ?? "";
  const ar = (p as any).adoptionReadiness ?? "";
  rsRows.push([p.id, er, ci, ar, er, ci, ar, "", "", "Static sweep — no re-scoring; flagged for deep review"].map(csvEscape).join(","));
}
writeFileSync(`${base}-rescoring.csv`, rsRows.join("\n"));

console.log(`wave=${wave} products=${allProducts.length} findings=${findings.length} (E=${bySev("error")} W=${bySev("warn")} I=${bySev("info")})`);
console.log(`wrote: ${base}.md, ${base}.csv, ${base}-rescoring.csv`);
