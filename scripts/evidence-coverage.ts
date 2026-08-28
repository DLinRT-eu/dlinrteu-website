/**
 * Evidence coverage report.
 *
 * For each product, compares the number of legacy `evidence[]` citations with
 * the number of `keyPapers` entries that carry a per-paper E/I score, so the
 * "Per-publication scoring" block on the product page can be completed.
 *
 * Usage:
 *   bun scripts/evidence-coverage.ts            # all categories
 *   bun scripts/evidence-coverage.ts auto-contouring registration
 *   bun scripts/evidence-coverage.ts --json
 */
import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { ProductDetails } from "../src/types/productDetails";

const ROOT = resolve("src/data/products");
const SKIP_DIRS = new Set(["archived", "examples"]);
const OUT_DIR = "/mnt/documents";

const args = process.argv.slice(2);
const wantJson = args.includes("--json");
const positional = args.filter((a) => !a.startsWith("--"));

const allCategories = readdirSync(ROOT).filter(
  (f) => statSync(resolve(ROOT, f)).isDirectory() && !SKIP_DIRS.has(f)
);
const categories = positional.length > 0 ? positional : allCategories;

type CoverageStatus = "none" | "partial" | "full";

/**
 * Only citation-like evidence entries can carry a per-paper score. Regulatory
 * clearances, vendor pages, brochures, press releases and conference abstracts
 * are legitimately unscored, so they must not count against coverage.
 */
const NON_PUBLICATION_TYPE = /regulatory|clearance|510|fda|ce mark|product|vendor|white paper|press|news|case study|brochure|landing|documentation|indirect|review|preprint|arxiv|algorithm paper|use cases|conference|abstract|poster|proceedings/i;
/** Conference material is often typed generically ("Validation"), so the
 *  description is inspected as well. */
const NON_PUBLICATION_DESCRIPTION =
  /abstract book|\bposter\b|\babstract\b|oral presentation|conference paper|proceedings|\bESTRO \d{4}\b|\bAAPM \d{4}\b|\bASTRO \d{4}\b|\bICCR \d{4}\b/i;
const isPublication = (type?: string, description?: string) =>
  !!type && !NON_PUBLICATION_TYPE.test(type) && !NON_PUBLICATION_DESCRIPTION.test(description ?? "");


interface Row {
  id: string;
  name: string;
  category: string;
  evidenceCount: number;
  publicationCount: number;
  keyPaperCount: number;
  scoredPaperCount: number;
  status: CoverageStatus;
}

const rows: Row[] = [];

for (const category of categories) {
  if (!allCategories.includes(category)) {
    console.error(`Unknown category: ${category}`);
    process.exit(1);
  }
  const dir = resolve(ROOT, category);
  const mod = await import(resolve(dir, "index.ts"));
  const products: ProductDetails[] = Object.values(mod)
    .flat()
    .filter((p): p is ProductDetails => !!p && typeof p === "object" && "id" in (p as object));

  const seen = new Set<string>();
  for (const product of products) {
    if (seen.has(product.id)) continue;
    seen.add(product.id);

    const evidence = product.evidence ?? [];
    const evidenceCount = evidence.length;
    const publicationCount = evidence.filter((e) => (typeof e === "string" ? false : isPublication(e.type, e.description))).length;
    const papers = product.keyPapers ?? [];
    const scoredPaperCount = papers.filter(
      (p) => p.evidenceRigor || p.clinicalImpact
    ).length;

    const status: CoverageStatus =
      publicationCount === 0
        ? scoredPaperCount > 0
          ? "full"
          : "none"
        : scoredPaperCount === 0
          ? "none"
          : scoredPaperCount < publicationCount
            ? "partial"
            : "full";

    rows.push({
      id: product.id,
      name: product.name,
      category,
      evidenceCount,
      publicationCount,
      keyPaperCount: papers.length,
      scoredPaperCount,
      status,
    });
  }
}


const weight: Record<CoverageStatus, number> = { none: 0, partial: 1, full: 2 };
rows.sort(
  (a, b) =>
    weight[a.status] - weight[b.status] ||
    b.evidenceCount - a.evidenceCount ||
    a.id.localeCompare(b.id)
);

if (wantJson) {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const path = `${OUT_DIR}/evidence-coverage.json`;
  writeFileSync(path, JSON.stringify(rows, null, 2));
  console.log(`Wrote ${path}`);
}

const counts = rows.reduce(
  (acc, r) => ({ ...acc, [r.status]: acc[r.status] + 1 }),
  { none: 0, partial: 0, full: 0 } as Record<CoverageStatus, number>
);

for (const row of rows) {
  if (row.status === "full") continue;
  console.log(
    `${row.status.padEnd(7)} ${row.category.padEnd(20)} ${row.id.padEnd(42)} publications=${String(
      row.publicationCount
    ).padStart(2)} scored=${String(row.scoredPaperCount).padStart(2)} (evidence=${String(
      row.evidenceCount
    ).padStart(2)})`
  );
}


console.log(
  `\n${rows.length} products — none: ${counts.none}, partial: ${counts.partial}, full: ${counts.full}`
);
