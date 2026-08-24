/**
 * Evidence sweep — one category wave.
 *
 * Emits the worklist artefacts for a category so each product's citations,
 * per-paper scores and freshness can be reviewed in a single pass.
 *
 * Usage:  bun scripts/evidence-sweep.ts auto-contouring
 *
 * Output (in /mnt/documents/):
 *   evidence-sweep-<category>-<date>.md
 *   evidence-sweep-<category>-<date>.csv
 *   evidence-sweep-<category>-<date>-candidates.csv
 *
 * Product .ts files are never edited here — this produces a review worklist only.
 */
import { readdirSync, existsSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import type { ProductDetails } from "../src/types/productDetails";
import { computeProductEvidenceScore } from "../src/utils/evidenceScoring";

const TODAY = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Amsterdam" });
const ROOT = resolve("src/data/products");
const SKIP_DIRS = new Set(["archived", "examples", "pipeline"]);
const STALE_DAYS = 180;

const category = process.argv[2];
if (!category) {
  console.error("Usage: bun scripts/evidence-sweep.ts <category-folder>");
  console.error(
    "Categories: " +
      readdirSync(ROOT)
        .filter((f) => statSync(resolve(ROOT, f)).isDirectory() && !SKIP_DIRS.has(f))
        .join(", ")
  );
  process.exit(1);
}

const dir = resolve(ROOT, category);
if (!existsSync(dir)) {
  console.error(`Unknown category folder: ${category}`);
  process.exit(1);
}

async function loadCategory(folder: string): Promise<ProductDetails[]> {
  const idx = resolve(ROOT, folder, "index.ts");
  if (!existsSync(idx)) return [];
  const mod: Record<string, unknown> = await import(idx);
  const arr = Object.values(mod).find(
    (v) => Array.isArray(v) && v.length > 0 && typeof (v[0] as { id?: string })?.id === "string"
  ) as ProductDetails[] | undefined;
  return arr ?? [];
}

const products = await loadCategory(category);

const daysSince = (iso?: string): number | undefined => {
  if (!iso) return undefined;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return undefined;
  return Math.round((Date.now() - t) / 86_400_000);
};

const csvEscape = (v: unknown) =>
  `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;

type Row = Record<string, unknown>;
const citationRows: Row[] = [];
const md: string[] = [
  `# Evidence sweep — ${category}`,
  ``,
  `Date: ${TODAY} (Europe/Amsterdam) · Products: ${products.length}`,
  ``,
  `Per-paper E/I scores aggregate to the product score as the maximum on each axis.`,
  `A documented \`evidenceScoreOverride\` wins over the computed maximum.`,
  ``,
];

for (const p of products) {
  const score = computeProductEvidenceScore(p);
  const stale = daysSince(p.lastRevised);
  const papers = p.keyPapers ?? [];
  const evidenceItems = Array.isArray(p.evidence) ? p.evidence : [];

  const flags: string[] = [];
  if (papers.length === 0) flags.push("no keyPapers");
  if (papers.length > 0 && score.scoredPaperCount === 0) flags.push("papers not scored");
  if (stale !== undefined && stale > STALE_DAYS) flags.push(`lastRevised ${stale}d ago`);
  if (
    score.computedRigor &&
    p.evidenceRigor &&
    score.computedRigor !== p.evidenceRigor
  )
    flags.push(`E mismatch: stored ${p.evidenceRigor} vs computed ${score.computedRigor}`);
  if (
    score.computedImpact &&
    p.clinicalImpact &&
    score.computedImpact !== p.clinicalImpact
  )
    flags.push(`I mismatch: stored ${p.clinicalImpact} vs computed ${score.computedImpact}`);
  const unlinked = evidenceItems.filter(
    (e) => typeof e === "object" && !(e as { link?: string }).link
  ).length;
  if (unlinked > 0) flags.push(`${unlinked} evidence item(s) without link`);

  md.push(`## ${p.name} — ${p.company ?? "unknown company"} (\`${p.id}\`)`);
  md.push(
    `- Stored: ${p.evidenceRigor ?? "—"} / ${p.clinicalImpact ?? "—"} / ${p.adoptionReadiness ?? "—"}`
  );
  md.push(
    `- Computed from papers: ${score.computedRigor ?? "—"} / ${score.computedImpact ?? "—"} (${score.scoredPaperCount}/${papers.length} scored)`
  );
  md.push(`- lastRevised: ${p.lastRevised ?? "—"}${stale !== undefined ? ` (${stale} days)` : ""}`);
  md.push(`- Regulatory: ${p.certification ?? "—"}`);
  md.push(`- Checks: ${flags.length ? flags.join("; ") : "none"}`);
  md.push(`- To verify this wave: new publications since lastRevised; every DOI/URL resolves; new FDA/CE clearance or version; product renamed or withdrawn.`);
  md.push(``);

  papers.forEach((paper, i) => {
    citationRows.push({
      product_id: p.id,
      product_name: p.name,
      company: p.company ?? "",
      category,
      source: "keyPapers",
      index: i,
      title: paper.title ?? "",
      authors: paper.authors ?? "",
      year: paper.year ?? "",
      doi: paper.doi ?? "",
      url: paper.link ?? "",
      paper_rigor: paper.evidenceRigor ?? "",
      paper_impact: paper.clinicalImpact ?? "",
      rationale: paper.rationale ?? "",
      proposed_rigor: "",
      proposed_impact: "",
      verified: "",
    });
  });

  evidenceItems.forEach((e, i) => {
    const item = typeof e === "string" ? { description: e } : e;
    citationRows.push({
      product_id: p.id,
      product_name: p.name,
      company: p.company ?? "",
      category,
      source: "evidence",
      index: i,
      title: (item as { type?: string }).type ?? "",
      authors: (item as { authors?: string }).authors ?? "",
      year: (item as { year?: string | number }).year ?? "",
      doi: (item as { doi?: string }).doi ?? "",
      url: (item as { link?: string }).link ?? "",
      paper_rigor: "",
      paper_impact: "",
      rationale: (item as { description?: string }).description ?? "",
      proposed_rigor: "",
      proposed_impact: "",
      verified: "",
    });
  });
}

mkdirSync("/mnt/documents", { recursive: true });
const base = `/mnt/documents/evidence-sweep-${category}-${TODAY}`;

writeFileSync(`${base}.md`, md.join("\n"));

const header = [
  "product_id","product_name","company","category","source","index","title","authors","year",
  "doi","url","paper_rigor","paper_impact","rationale","proposed_rigor","proposed_impact","verified",
];
writeFileSync(
  `${base}.csv`,
  [header.join(","), ...citationRows.map((r) => header.map((h) => csvEscape(r[h])).join(","))].join("\n")
);

const candidateHeader = ["type","name","company","source_url","why_relevant","gate_ai_dl","gate_regulatory","notes"];
writeFileSync(`${base}-candidates.csv`, candidateHeader.join(",") + "\n");

console.log(`Category: ${category}`);
console.log(`Products: ${products.length}`);
console.log(`Citation rows: ${citationRows.length}`);
console.log(`Wrote ${base}.md, ${base}.csv, ${base}-candidates.csv`);
