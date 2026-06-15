/**
 * Enumerate every citation across active products so the verification sweep
 * has a single worklist. Skips archived/, examples/, pipeline/.
 *
 * Output:
 *   /mnt/documents/evidence-verification-<DATE>-worklist.json
 *   /mnt/documents/evidence-verification-<DATE>-worklist.csv
 */
import { readdirSync, existsSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import type { ProductDetails } from "@/types/productDetails";

const TODAY = new Date().toISOString().slice(0, 10);
const ROOT = resolve("src/data/products");
const SKIP_DIRS = new Set(["archived", "examples", "pipeline"]);

type Citation = {
  product_id: string;
  product_name: string;
  company: string;
  category: string;
  source_field: string; // evidence | keyPapers | trainingData.source | evaluationData.source | categoryEvidence.<cat>.evidence ...
  index: number;
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  doi?: string;
  authors?: string;
  year?: string | number;
  level?: string;
};

const citations: Citation[] = [];

function pushEvidenceArray(p: ProductDetails, arr: any[] | undefined, field: string) {
  if (!Array.isArray(arr)) return;
  arr.forEach((e, i) => {
    if (typeof e === "string") {
      citations.push({
        product_id: p.id, product_name: p.name, company: (p as any).company ?? "",
        category: p.category as string, source_field: field, index: i,
        description: e,
      });
    } else if (e && typeof e === "object") {
      citations.push({
        product_id: p.id, product_name: p.name, company: (p as any).company ?? "",
        category: p.category as string, source_field: field, index: i,
        type: e.type, title: e.title, description: e.description,
        url: e.link ?? e.url, doi: e.doi, authors: e.authors, year: e.year,
        level: e.level,
      });
    }
  });
}

function pushSource(p: ProductDetails, src: any, urlField: any, field: string) {
  if (!src && !urlField) return;
  citations.push({
    product_id: p.id, product_name: p.name, company: (p as any).company ?? "",
    category: p.category as string, source_field: field, index: 0,
    description: typeof src === "string" ? src : undefined,
    url: typeof urlField === "string" ? urlField : undefined,
  });
}

async function loadCategory(folder: string): Promise<ProductDetails[]> {
  const idx = resolve(ROOT, folder, "index.ts");
  if (!existsSync(idx)) return [];
  const mod: any = await import(idx);
  const arr = Object.values(mod).find((v) => Array.isArray(v) && v.length && typeof (v[0] as any)?.id === "string") as ProductDetails[] | undefined;
  return arr ?? [];
}

const folders = readdirSync(ROOT).filter((f) => {
  const full = resolve(ROOT, f);
  return statSync(full).isDirectory() && !SKIP_DIRS.has(f);
});

// Some categories are single-file (e.g. clinical-prediction.ts) — also pick those up.
const singleFiles = readdirSync(ROOT).filter((f) => f.endsWith(".ts") && f !== "index.ts");

const allProducts: ProductDetails[] = [];
for (const cat of folders) {
  const list = await loadCategory(cat);
  allProducts.push(...list);
}
for (const f of singleFiles) {
  try {
    const mod: any = await import(resolve(ROOT, f));
    const arr = Object.values(mod).find((v) => Array.isArray(v) && v.length && typeof (v[0] as any)?.id === "string") as ProductDetails[] | undefined;
    if (arr) allProducts.push(...arr);
  } catch { /* ignore */ }
}

// Dedup by id (a product may appear in multiple indices)
const seen = new Set<string>();
const uniqProducts = allProducts.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));

for (const p of uniqProducts) {
  pushEvidenceArray(p, (p as any).evidence, "evidence");
  pushEvidenceArray(p, (p as any).keyPapers, "keyPapers");
  const td = (p as any).trainingData;
  if (td) pushSource(p, td.source, td.sourceUrl, "trainingData");
  const ed = (p as any).evaluationData;
  if (ed) pushSource(p, ed.source, ed.sourceUrl, "evaluationData");
  const ce = (p as any).categoryEvidence;
  if (ce && typeof ce === "object") {
    for (const [cat, block] of Object.entries(ce)) {
      const b: any = block;
      pushEvidenceArray(p, b?.evidence, `categoryEvidence[${cat}].evidence`);
      if (b?.trainingData) pushSource(p, b.trainingData.source, b.trainingData.sourceUrl, `categoryEvidence[${cat}].trainingData`);
      if (b?.evaluationData) pushSource(p, b.evaluationData.source, b.evaluationData.sourceUrl, `categoryEvidence[${cat}].evaluationData`);
    }
  }
}

mkdirSync("/mnt/documents", { recursive: true });
const base = `/mnt/documents/evidence-verification-${TODAY}-worklist`;
writeFileSync(`${base}.json`, JSON.stringify({ products: uniqProducts.length, citations: citations.length, items: citations }, null, 2));

const csvEscape = (s: any) => `"${String(s ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
const header = ["product_id","product_name","company","category","source_field","index","type","level","title","authors","year","doi","url","description"];
const rows = [header.join(",")];
for (const c of citations) rows.push(header.map((h) => csvEscape((c as any)[h])).join(","));
writeFileSync(`${base}.csv`, rows.join("\n"));

// Summary by category
const byCat = new Map<string, number>();
for (const c of citations) byCat.set(c.category, (byCat.get(c.category) ?? 0) + 1);
console.log(`Products scanned: ${uniqProducts.length}`);
console.log(`Citations enumerated: ${citations.length}`);
console.log("By category:");
for (const [k, v] of [...byCat.entries()].sort((a,b)=>b[1]-a[1])) console.log(`  ${k}: ${v}`);
console.log(`wrote ${base}.json and ${base}.csv`);
