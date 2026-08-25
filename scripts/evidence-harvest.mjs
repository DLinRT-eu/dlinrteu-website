/**
 * Europe PMC literature harvester for the evidence sweep.
 *
 * Read-only: it NEVER edits product files. It queries Europe PMC with a
 * paginated search per product alias, screens titles/abstracts against the
 * alias registry in scripts/evidence-aliases.ts, and writes a Markdown + CSV
 * worklist for manual scoring.
 *
 * Usage:
 *   node scripts/evidence-harvest.mjs                     # all registry entries
 *   node scripts/evidence-harvest.mjs philips-smartspeed  # one product id
 *   node scripts/evidence-harvest.mjs --from 2014 --to 2026 --out /mnt/documents
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const API = "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const PAGE_SIZE = 100;

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const FROM = Number(opt("from", 2014));
const TO = Number(opt("to", new Date().getFullYear()));
const OUT = opt("out", "/mnt/documents");
const ids = args.filter((a) => !a.startsWith("--") && !/^\d{4}$/.test(a) && a !== OUT);

async function loadRegistry() {
  const mod = await import(pathToFileURL(resolve("scripts/evidence-aliases.ts")).href);
  return mod.EVIDENCE_ALIASES ?? mod.default;
}

async function searchAll(query) {
  const out = [];
  let cursor = "*";
  for (let page = 0; page < 25; page += 1) {
    const url = `${API}?query=${encodeURIComponent(query)}&format=json&pageSize=${PAGE_SIZE}&cursorMark=${encodeURIComponent(cursor)}&resultType=core`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Europe PMC ${res.status} for ${query}`);
    const json = await res.json();
    const hits = json.resultList?.result ?? [];
    out.push(...hits);
    if (!json.nextCursorMark || json.nextCursorMark === cursor || hits.length === 0) break;
    cursor = json.nextCursorMark;
  }
  return out;
}

const hay = (r) => `${r.title ?? ""} ${r.abstractText ?? ""} ${r.journalTitle ?? ""}`.toLowerCase();

function screen(record, entry) {
  const text = hay(record);
  if (!entry.aliases.some((a) => text.includes(a.toLowerCase()))) return null;
  if (entry.exclude?.some((x) => text.includes(x.toLowerCase()))) return null;
  if (entry.require && !entry.require.some((r) => text.includes(r.toLowerCase()))) return null;
  let routedTo = entry.id;
  if (entry.anatomySplit) {
    for (const [term, target] of Object.entries(entry.anatomySplit)) {
      if (text.includes(term.toLowerCase())) routedTo = target;
    }
  }
  return routedTo;
}

const rows = [];
const registry = await loadRegistry();
const targets = ids.length ? registry.filter((e) => ids.includes(e.id)) : registry;

for (const entry of targets) {
  const query = `(${entry.aliases.map((a) => `"${a}"`).join(" OR ")}) AND (FIRST_PDATE:[${FROM}-01-01 TO ${TO}-12-31])`;
  const records = await searchAll(query);
  const seen = new Set();
  for (const r of records) {
    const routedTo = screen(r, entry);
    if (!routedTo) continue;
    const doi = r.doi ?? "";
    const key = `${routedTo}|${doi || r.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push({
      productId: routedTo,
      doi,
      pmid: r.pmid ?? "",
      year: r.pubYear ?? "",
      journal: r.journalTitle ?? "",
      title: (r.title ?? "").replace(/\s+/g, " ").trim(),
      authors: r.authorString ?? "",
      isPreprint: r.pubType?.includes("preprint") ? "yes" : "no",
    });
  }
  console.log(`${entry.id}: ${records.length} records screened, ${rows.filter((x) => x.productId === entry.id).length} candidates`);
}

mkdirSync(OUT, { recursive: true });
const csv = [
  "productId,doi,pmid,year,journal,title,authors,isPreprint",
  ...rows.map((r) =>
    [r.productId, r.doi, r.pmid, r.year, r.journal, r.title, r.authors, r.isPreprint]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",")
  ),
].join("\n");
writeFileSync(resolve(OUT, "evidence-harvest.csv"), csv);

const md = [
  `# Evidence harvest worklist (${FROM}-${TO})`,
  "",
  `Generated ${new Date().toISOString().slice(0, 10)} from Europe PMC. Candidates require manual verification (product must be named as the evaluated system) before scoring.`,
  "",
  ...Object.entries(
    rows.reduce((acc, r) => {
      (acc[r.productId] ||= []).push(r);
      return acc;
    }, {})
  ).flatMap(([pid, list]) => [
    `## ${pid} (${list.length})`,
    "",
    ...list.map((r) => `- ${r.year} ${r.journal} — ${r.title} (doi ${r.doi || "n/a"}, PMID ${r.pmid || "n/a"})${r.isPreprint === "yes" ? " [PREPRINT — excluded by policy]" : ""}`),
    "",
  ]),
].join("\n");
writeFileSync(resolve(OUT, "evidence-harvest.md"), md);

console.log(`\nWrote ${rows.length} candidate rows to ${OUT}/evidence-harvest.{csv,md}`);
