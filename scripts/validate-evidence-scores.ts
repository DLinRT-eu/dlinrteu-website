/**
 * Evidence score validator.
 *
 * Checks that each product's stored `evidenceRigor` / `clinicalImpact` matches
 * the effective value returned by computeProductEvidenceScore().
 *
 * Usage:
 *   bun scripts/validate-evidence-scores.ts                 # auto-contouring (default)
 *   bun scripts/validate-evidence-scores.ts image-synthesis reconstruction
 *   bun scripts/validate-evidence-scores.ts --all
 *   bun scripts/validate-evidence-scores.ts --all --json
 *
 * Exits with code 1 when any mismatch is found.
 */
import { readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import type { ProductDetails } from "../src/types/productDetails";
import { computeProductEvidenceScore } from "../src/utils/evidenceScoring";

const ROOT = resolve("src/data/products");
const SKIP_DIRS = new Set(["archived", "examples", "pipeline"]);
const OUT_DIR = "/mnt/documents";

const args = process.argv.slice(2);
const wantJson = args.includes("--json");
const wantAll = args.includes("--all");
const positional = args.filter((a) => !a.startsWith("--"));

const allCategories = readdirSync(ROOT).filter(
  (f) => statSync(resolve(ROOT, f)).isDirectory() && !SKIP_DIRS.has(f)
);

const categories = wantAll
  ? allCategories
  : positional.length > 0
    ? positional
    : ["auto-contouring"];

for (const c of categories) {
  if (!allCategories.includes(c)) {
    console.error(`Unknown category folder: ${c}`);
    console.error(`Categories: ${allCategories.join(", ")}`);
    process.exit(2);
  }
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

interface Issue {
  category: string;
  productId: string;
  productName: string;
  severity: "error" | "warning";
  code: string;
  detail: string;
}

const issues: Issue[] = [];
const rows: Record<string, unknown>[] = [];
let productCount = 0;

for (const category of categories) {
  const products = await loadCategory(category);
  for (const p of products) {
    productCount += 1;
    const score = computeProductEvidenceScore(p, { category });
    const storedRigor = p.evidenceRigor;
    const storedImpact = p.clinicalImpact;

    const add = (severity: Issue["severity"], code: string, detail: string) =>
      issues.push({
        category,
        productId: p.id,
        productName: p.name,
        severity,
        code,
        detail,
      });

    if (score.rigor && storedRigor && score.rigor !== storedRigor) {
      add(
        "error",
        "rigor-mismatch",
        `stored ${storedRigor} vs effective ${score.rigor} (origin: ${score.rigorOrigin})`
      );
    }
    if (score.impact && storedImpact && score.impact !== storedImpact) {
      add(
        "error",
        "impact-mismatch",
        `stored ${storedImpact} vs effective ${score.impact} (origin: ${score.impactOrigin})`
      );
    }
    if (score.rigor && !storedRigor) {
      add("error", "rigor-missing", `effective ${score.rigor} but product has no evidenceRigor`);
    }
    if (score.impact && !storedImpact) {
      add("error", "impact-missing", `effective ${score.impact} but product has no clinicalImpact`);
    }
    if (score.hasOverride && !score.overrideReason?.trim()) {
      add("error", "override-without-reason", "evidenceScoreOverride set without a reason");
    }
    if (score.paperCount > 0 && score.scoredPaperCount === 0) {
      add("warning", "papers-unscored", `${score.paperCount} keyPapers carry no E/I score`);
    }
    if (score.paperCount === 0) {
      add("warning", "no-key-papers", "product has no keyPapers");
    }

    rows.push({
      category,
      id: p.id,
      name: p.name,
      company: p.company ?? "",
      storedRigor: storedRigor ?? null,
      storedImpact: storedImpact ?? null,
      effectiveRigor: score.rigor ?? null,
      effectiveImpact: score.impact ?? null,
      computedRigor: score.computedRigor ?? null,
      computedImpact: score.computedImpact ?? null,
      rigorOrigin: score.rigorOrigin,
      impactOrigin: score.impactOrigin,
      rigorSetBy: score.rigorSource?.title ?? null,
      impactSetBy: score.impactSource?.title ?? null,
      scoredPapers: score.scoredPaperCount,
      papers: score.paperCount,
      hasOverride: score.hasOverride,
      overrideReason: score.overrideReason ?? null,
    });
  }
}

const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warning");

const pad = (v: unknown, n: number) => String(v ?? "—").padEnd(n).slice(0, n);
console.log(`Evidence score validation — ${categories.join(", ")}`);
console.log(`Products checked: ${productCount}\n`);
console.log(
  `${pad("product", 34)} ${pad("stored", 9)} ${pad("effective", 9)} ${pad("origin", 20)} papers`
);
console.log("-".repeat(90));
for (const r of rows) {
  const stored = `${r.storedRigor ?? "—"}/${r.storedImpact ?? "—"}`;
  const eff = `${r.effectiveRigor ?? "—"}/${r.effectiveImpact ?? "—"}`;
  const origin = `${r.rigorOrigin}/${r.impactOrigin}`;
  const flag = stored === eff ? " " : "!";
  console.log(
    `${flag}${pad(r.name, 33)} ${pad(stored, 9)} ${pad(eff, 9)} ${pad(origin, 20)} ${r.scoredPapers}/${r.papers}`
  );
}

console.log("");
if (issues.length === 0) {
  console.log("No mismatches. All stored scores match computeProductEvidenceScore().");
} else {
  if (errors.length) {
    console.log(`Mismatches (${errors.length}):`);
    for (const i of errors) {
      console.log(`  [${i.category}] ${i.productName} (${i.productId}) — ${i.code}: ${i.detail}`);
    }
  }
  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const i of warnings) {
      console.log(`  [${i.category}] ${i.productName} (${i.productId}) — ${i.code}: ${i.detail}`);
    }
  }
}

if (wantJson) {
  mkdirSync(OUT_DIR, { recursive: true });
  const date = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Amsterdam" });
  const file = resolve(OUT_DIR, `evidence-score-validation-${date}.json`);
  writeFileSync(
    file,
    JSON.stringify(
      { date, categories, productCount, errors: errors.length, warnings: warnings.length, issues, rows },
      null,
      2
    )
  );
  console.log(`\nReport written: ${file}`);
}

process.exit(errors.length > 0 ? 1 : 0);
