/**
 * Generates public/sitemap.xml from the live product, company and news data.
 *
 * The data lives in TypeScript modules with `@/` path aliases, so the script
 * bundles them with esbuild (a Vite dependency) before importing the result.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */
import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://dlinrt.eu";

/** Static public pages. `lastmod` values are carried over from the previous
 *  hand-maintained sitemap; they are not derived from the build date. */
const STATIC_PAGES = [
  { path: "/", priority: "1.0", lastmod: "2026-05-13" },
  { path: "/products", priority: "0.9", lastmod: "2026-05-13" },
  { path: "/products/pipeline", priority: "0.8", lastmod: "2026-05-13" },
  { path: "/companies", priority: "0.8", lastmod: "2026-05-13" },
  { path: "/initiatives", priority: "0.8", lastmod: "2026-05-13" },
  { path: "/compare/structures", priority: "0.7", lastmod: "2026-05-13" },
  { path: "/news", priority: "0.7", lastmod: "2026-05-13" },
  { path: "/resources-compliance", priority: "0.7", lastmod: "2026-05-13" },
  { path: "/evidence-impact-guide", priority: "0.6", lastmod: "2026-05-13" },
  { path: "/guides/ai-auto-contouring-comparison", priority: "0.6", lastmod: "2026-05-13" },
  { path: "/about", priority: "0.6", lastmod: "2026-05-13" },
  { path: "/support", priority: "0.5", lastmod: "2026-05-13" },
  { path: "/transparency", priority: "0.5", lastmod: "2026-05-13" },
  { path: "/roles", priority: "0.4", lastmod: "2026-05-13" },
  { path: "/roles/faq", priority: "0.4", lastmod: "2026-05-13" },
  { path: "/changelog", priority: "0.4", lastmod: "2026-05-13" },
  { path: "/security", priority: "0.3", lastmod: "2026-05-13" },
  { path: "/privacy-policy", priority: "0.3", lastmod: "2026-05-13" },
  { path: "/terms-of-use", priority: "0.3", lastmod: "2026-05-13" },
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function toLastmod(value) {
  if (typeof value !== "string") return undefined;
  if (ISO_DATE.test(value)) return value;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

async function loadData() {
  const outfile = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "dlinrt-sitemap-")),
    "data.mjs"
  );
  await build({
    entryPoints: [path.join(ROOT, "scripts/sitemap-data-entry.ts")],
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    logLevel: "silent",
    alias: { "@": path.join(ROOT, "src") },
  });
  const mod = await import(pathToFileURL(outfile).href);
  fs.rmSync(path.dirname(outfile), { recursive: true, force: true });
  return mod;
}

function urlEntry({ loc, lastmod, priority }) {
  const lines = [`    <loc>${ORIGIN}${loc}</loc>`];
  if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
  if (priority) lines.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

const { ALL_PRODUCTS, COMPANIES, NEWS_ITEMS } = await loadData();

const productEntries = [...ALL_PRODUCTS]
  .sort((a, b) => a.id.localeCompare(b.id))
  .map((product) => ({
    loc: `/product/${product.id}`,
    lastmod: toLastmod(product.lastRevised ?? product.lastUpdated),
    priority: "0.6",
  }));

const companiesWithProducts = new Set(
  ALL_PRODUCTS.map((product) => product.companyId).filter(Boolean)
);
for (const company of COMPANIES) {
  if (ALL_PRODUCTS.some((product) => product.company === company.name)) {
    companiesWithProducts.add(company.id);
  }
}

const companyEntries = COMPANIES.filter((company) => companiesWithProducts.has(company.id))
  .map((company) => company.id)
  .sort()
  .map((id) => ({ loc: `/products/company/${id}`, priority: "0.5" }));

const newsEntries = [...NEWS_ITEMS]
  .sort((a, b) => String(a.id).localeCompare(String(b.id)))
  .map((item) => ({
    loc: `/news/${item.id}`,
    lastmod: toLastmod(item.date),
    priority: "0.5",
  }));

const entries = [
  ...STATIC_PAGES.map((page) => ({ loc: page.path, lastmod: page.lastmod, priority: page.priority })),
  ...productEntries,
  ...companyEntries,
  ...newsEntries,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(urlEntry).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "public/sitemap.xml"), xml);
console.log(
  `sitemap.xml written: ${entries.length} URLs (${productEntries.length} products, ${companyEntries.length} companies, ${newsEntries.length} news).`
);
