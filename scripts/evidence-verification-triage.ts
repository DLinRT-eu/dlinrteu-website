/**
 * Heuristic triage of the enumerated worklist. Flags obvious risks without
 * fetching abstracts. The agent (or category-scoped subagents) then verifies
 * the flagged subset against primary sources.
 *
 * Heuristics per citation:
 *   - direct_mention:   product name or known model alias appears in title/description
 *   - product_in_url:   product slug or alias appears in URL/DOI
 *   - landmark_alert:   citation matches a known category landmark study that is
 *                       frequently mis-attributed (MR-OPERA, etc.)
 *   - bare_doi:         DOI present but no resolvable URL
 *   - missing_url:      no link at all
 *   - competitor_mention: a recognised competitor product name appears in
 *                       title/description (suggests indirect/comparative paper)
 *
 * Verdict precedence (most severe first):
 *   landmark_alert > competitor_mention > (no signal) > direct_mention
 *
 * Output:
 *   /mnt/documents/evidence-verification-<DATE>-triage.csv
 *   /mnt/documents/evidence-verification-<DATE>-triage.md
 */
import { readFileSync, writeFileSync } from "node:fs";

const TODAY = new Date().toISOString().slice(0, 10);
const IN = `/mnt/documents/evidence-verification-${TODAY}-worklist.json`;
const data = JSON.parse(readFileSync(IN, "utf8"));

type Item = any;
const items: Item[] = data.items;

// Known category-landmark studies that are often miscited as vendor evidence.
// Format: { pattern: RegExp, study: string, doesNotEvaluate: string[] }
const LANDMARKS: Array<{ pattern: RegExp; study: string; doesNotEvaluate: string[] }> = [
  // Image synthesis / MR-only RT
  { pattern: /MR[- ]?OPERA|Tyagi.{0,40}(2017|prostate)/i, study: "MR-OPERA (Tyagi et al.)",
    doesNotEvaluate: ["philips-mrcat", "siemens-syngo-via", "spectronic-mricat", "mvision"] },
  { pattern: /Persson.{0,60}(2017|2019).{0,60}(synthetic|sCT|MR-only)/i, study: "Persson et al. MR-only sCT (generic)",
    doesNotEvaluate: ["philips-mrcat"] },
  { pattern: /Edmund.{0,60}sCT|review of MR-only/i, study: "Edmund & Nyholm review (methodology)",
    doesNotEvaluate: ["*"] },
  // Auto-contouring landmark
  { pattern: /Nikolov.{0,60}(2018|2021)|Deep learning.{0,40}head and neck.{0,40}DeepMind/i, study: "Nikolov DeepMind H&N",
    doesNotEvaluate: ["mim", "raystation", "limbus", "manteia", "mvision", "therapanacea", "directorganize", "carina", "ai-rad", "annotate"] },
  { pattern: /Vandewinckele|Brouwer.{0,60}(2020|2021).{0,40}consensus/i, study: "Methodology / consensus paper",
    doesNotEvaluate: ["*"] },
  // Reconstruction landmark
  { pattern: /AAPM.{0,40}low[- ]dose|Mayo.{0,40}clinic.{0,40}challenge/i, study: "AAPM Low-Dose CT Challenge (dataset paper)",
    doesNotEvaluate: ["*"] },
];

// Competitor product aliases (very rough — flags if a different vendor's
// product name appears in the cited title/description).
const VENDOR_TOKENS: Record<string, string[]> = {
  "philips-mrcat": ["MRiPlanner", "MRCAT competitor", "Siemens", "GE", "Spectronic", "syngo.via", "mricat"],
  "spectronic-mricat": ["MRCAT", "syngo.via", "Philips"],
  "siemens-syngo-via": ["MRCAT", "MRiPlanner", "Spectronic"],
  // For contouring, treat each vendor's products as competitors of the others
};

function field(c: Item, k: string) { return (c[k] ?? "").toString(); }

const rows: any[] = [];
for (const c of items) {
  const haystack = [field(c, "title"), field(c, "description"), field(c, "authors")].join(" | ").toLowerCase();
  const url = field(c, "url");
  const doi = field(c, "doi");
  const productSlug = c.product_id;
  const productName = field(c, "product_name").toLowerCase();
  // Strip generic suffixes for matching
  const nameTokens = productName
    .replace(/\b(ai|deep|learning|auto|contouring|software|module|system|platform|suite)\b/g, " ")
    .split(/\s+/).filter((t: string) => t.length >= 4);
  const directMention = nameTokens.some((t) => haystack.includes(t)) || haystack.includes(productSlug.replace(/-/g, " "));

  let landmarkAlert = "";
  for (const lm of LANDMARKS) {
    if (lm.pattern.test(haystack)) {
      if (lm.doesNotEvaluate.includes("*") ||
          lm.doesNotEvaluate.some((slug) => productSlug.startsWith(slug))) {
        landmarkAlert = lm.study;
        break;
      }
    }
  }

  let competitorMention = "";
  const competitors = VENDOR_TOKENS[productSlug] ?? [];
  for (const tok of competitors) {
    if (haystack.includes(tok.toLowerCase())) { competitorMention = tok; break; }
  }

  const bareDoi = !!doi && !url;
  const missingUrl = !url && !doi;

  let verdict = "review";
  let priority = "normal";
  if (landmarkAlert) { verdict = "likely-indirect"; priority = "high"; }
  else if (competitorMention) { verdict = "likely-indirect"; priority = "high"; }
  else if (directMention) { verdict = "likely-direct"; priority = "low"; }
  else if (missingUrl) { verdict = "unverifiable"; priority = "high"; }
  else { verdict = "unknown"; priority = "normal"; }

  rows.push({
    ...c,
    direct_mention: directMention,
    competitor_mention: competitorMention || "",
    landmark_alert: landmarkAlert || "",
    bare_doi: bareDoi,
    missing_url: missingUrl,
    verdict, priority,
  });
}

const csvEscape = (s: any) => `"${String(s ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;
const header = [
  "product_id","product_name","company","category","source_field","index",
  "type","level","title","authors","year","doi","url",
  "direct_mention","competitor_mention","landmark_alert","bare_doi","missing_url",
  "verdict","priority","description",
];
const csv = [header.join(",")];
for (const r of rows) csv.push(header.map((h) => csvEscape(r[h])).join(","));
writeFileSync(`/mnt/documents/evidence-verification-${TODAY}-triage.csv`, csv.join("\n"));

// Markdown summary
const total = rows.length;
const byPriority = (p: string) => rows.filter((r) => r.priority === p).length;
const byVerdict = (v: string) => rows.filter((r) => r.verdict === v).length;
const flaggedByProduct = new Map<string, any[]>();
for (const r of rows) {
  if (r.priority === "high") {
    if (!flaggedByProduct.has(r.product_id)) flaggedByProduct.set(r.product_id, []);
    flaggedByProduct.get(r.product_id)!.push(r);
  }
}

const md: string[] = [];
md.push(`# Evidence Verification — Heuristic Triage — ${TODAY}`);
md.push("");
md.push(`Scope: ${data.products} products, ${total} citations (active products only; archived/, examples/, pipeline/ excluded).`);
md.push("");
md.push(`## Triage summary`);
md.push("");
md.push(`| Verdict | Count |`);
md.push(`| --- | ---: |`);
md.push(`| likely-direct (product name appears in title/desc) | ${byVerdict("likely-direct")} |`);
md.push(`| likely-indirect (landmark or competitor mention) | ${byVerdict("likely-indirect")} |`);
md.push(`| unknown (no signal — needs lookup) | ${byVerdict("unknown")} |`);
md.push(`| unverifiable (no URL or DOI) | ${byVerdict("unverifiable")} |`);
md.push("");
md.push(`Priority high (review first): ${byPriority("high")}`);
md.push(`Priority normal: ${byPriority("normal")}`);
md.push("");
md.push(`## High-priority products (${flaggedByProduct.size})`);
md.push("");
md.push(`| Product | High-priority citations | Reasons |`);
md.push(`| --- | ---: | --- |`);
for (const [pid, list] of [...flaggedByProduct.entries()].sort((a,b)=>b[1].length-a[1].length)) {
  const reasons = new Set<string>();
  for (const r of list) {
    if (r.landmark_alert) reasons.add(`landmark:${r.landmark_alert}`);
    if (r.competitor_mention) reasons.add(`competitor:${r.competitor_mention}`);
    if (r.missing_url) reasons.add("missing-url");
  }
  md.push(`| ${pid} | ${list.length} | ${[...reasons].join("; ")} |`);
}
md.push("");
md.push(`## Per-category citation counts`);
md.push("");
const byCat = new Map<string, number>();
for (const r of rows) byCat.set(r.category, (byCat.get(r.category) ?? 0) + 1);
md.push(`| Category | Citations |`);
md.push(`| --- | ---: |`);
for (const [k, v] of [...byCat.entries()].sort((a,b)=>b[1]-a[1])) md.push(`| ${k} | ${v} |`);
md.push("");
md.push(`Next step: for every \`high\` priority row, fetch the abstract and decide keep / relabel-indirect-comparative / remove. Per the approved plan, no replacements are invented in this pass.`);

writeFileSync(`/mnt/documents/evidence-verification-${TODAY}-triage.md`, md.join("\n"));

console.log(`Triaged ${total} citations. High-priority: ${byPriority("high")} across ${flaggedByProduct.size} products.`);
console.log(`Wrote /mnt/documents/evidence-verification-${TODAY}-triage.csv`);
console.log(`Wrote /mnt/documents/evidence-verification-${TODAY}-triage.md`);
