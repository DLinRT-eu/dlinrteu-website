/** Compile read-only audit findings; proposed corrections are never applied here. */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ALL_PRODUCTS } from "../src/data";
import { computeProductEvidenceScore } from "../src/utils/evidenceScoring";
import { isPipelineProduct } from "../src/utils/productFilters";
import { isExternalSearch, normalizeAuditRole, normalizeAuditSeverity } from "./productAuditNormalization";

interface Finding { id: string; role: string; field: string; severity: string; observation: string; suggestedFix: string }
interface Query { query: string; url?: string; date?: string }
interface Candidate { doi?: string; title?: string; url?: string; attribution?: string; status?: string }
interface Research { id: string; queries?: Query[]; findings?: Omit<Finding, "id">[]; candidates?: Candidate[]; limitations?: string | string[] }
interface Publication { key: string; title?: string; doi?: string; pmid?: string; sourceUrl: string; abstract?: string; titleSimilarity?: number; error?: string }
interface Website { url: string; status?: number; finalUrl?: string; error?: string }
interface Proposal { E?: string; L?: string; rationale: string; doi?: string }
interface Baseline { date: string; productCount: number; activeCount: number; pipelineCount: number; findings: Finding[] }

const input = process.argv.find(arg => arg.startsWith("--in="))?.slice(5) ?? "docs/audits/products/2026-10-15";
const output = process.argv.find(arg => arg.startsWith("--out="))?.slice(6) ?? "/mnt/documents";
const load = <T,>(name: string): T => JSON.parse(readFileSync(resolve(input, name), "utf8")) as T;
const baseline = load<Baseline>("static-audit.json");
const publications = load<Publication[]>("publication-checks.json");
const websites = load<Website[]>("website-checks.json");
const research = readdirSync(input).filter(name => /^research-.*\.json$/.test(name)).flatMap(name => load<Research[]>(name));
const roles = ["Identity", "Inclusion", "Regulatory", "Technical", "Structures", "Evidence", "Transparency", "Cross-check"];
const proposals: Record<string, Proposal> = {
  "varian-eclipse-ai-contouring": { E: "E0", L: "L1c", doi: "10.1016/j.adro.2023.101177", rationale: "Both scored citations evaluate other contouring systems: Pera evaluates Siemens syngo.via; Wang evaluates anonymized third-party tools hosted alongside Eclipse. A predicate/reference-device relationship is not direct validation of AI Contouring VA10A. Retain as unscored indirect context; proposed L1c is provisional descriptive fallback, not demonstrated clinical efficacy. Keep R unchanged pending reviewer assessment." },
  "ge-healthcare-irt": { E: "E0", L: "L1c", doi: "10.3390/cancers15245735", rationale: "PMC10741804 is Hoque et al., PMID 38136281, evaluating Limbus Contour v1.0.18, not GE Auto Segmentation. Remove the misattributed scored paper. Existing GE notes already state E0; L1c is a provisional descriptive fallback only. FDA validation must remain distinguished from peer-reviewed evidence; keep R unchanged." },
  "elekta-iris": { E: "E0", L: "L1c", rationale: "No attributable peer-reviewed study confirmed in this targeted pass; existing E1 contradicts its own E0/no-publication explanation. FDA/system validation and vendor performance claims alone support E0. Proposed L1c is descriptive/provisional, not measured clinical benefit; R unchanged for separate qualitative review." },
  "philips-mrcat-brain": { E: "E2", L: "L2", doi: "10.1016/j.zemedi.2025.01.003", rationale: "Buschmann et al. directly names MRCAT; retrospective 13 brain + 10 head-and-neck patients, dosimetry/geometric endpoints (L2), not measured editing time or prospective patient management. Resolve legacy I2 provisional L3 to final L2, correct title and cohort. MESCAL directly includes MRCAT brain/pelvis, so E2 remains supported." },
  "philips-mrcat-head-and-neck": { E: "E1", L: "L2", doi: "10.1016/j.zemedi.2025.01.003", rationale: "Buschmann directly studies 10 H&N patients in one retrospective cohort with dosimetric/geometric endpoints (L2). MESCAL studies brain/pelvis only: remove its scores for this H&N product or keep unscored indirect commissioning context. Vendor multicentre V&V is not itself peer-reviewed H&N evidence. Retain R unchanged pending separate assessment." },
  "philips-precise-image": { E: "E1", L: "L2", doi: "10.21037/jmai-2025-173", rationale: "Exact DOI resolves in Crossref to the named Liu model-validation study; do not replace it with an unrelated search-result DOI. Obtain publisher full text to confirm patient count/year/affiliations and finalize its provisional score. The available record describes image-quality/dose endpoints, not measured human workflow. L2 proposal conditional on full-text verification; E1 and R unchanged." },
};

const findings: Finding[] = baseline.findings.filter(f => f.observation !== "No static finding; external-source review still required");
const add = (id: string, role: string, field: string, severity: string, observation: string, suggestedFix: string) => findings.push({ id, role, field, severity, observation, suggestedFix });
for (const item of research) for (const finding of item.findings ?? []) {
  if (!ALL_PRODUCTS.some(product => product.id === item.id)) continue;
  findings.push({ ...finding, id: item.id, role: normalizeAuditRole(finding.role, finding.field), severity: normalizeAuditSeverity(finding.severity) });
}
for (const p of ALL_PRODUCTS) {
  const website = websites.find(check => check.url === (p.productUrl ?? p.website));
  if (website?.error || (website?.status ?? 200) >= 400) add(p.id, "Identity", "productUrl", "warn", `Public retrieval unsuccessful (${website?.status ?? website?.error}); server blocking and network failures are not proof of a broken URL.`, "Check in a normal browser/official navigation before changing the URL");
  for (const paper of p.keyPapers ?? []) {
    const key = paper.doi?.toLowerCase() ?? `pmid:${paper.pmid}`;
    const result = publications.find(item => item.key === key);
    if (result?.titleSimilarity !== undefined && result.titleSimilarity < 0.45) add(p.id, "Evidence", `keyPapers:${key}`, "warn", `Citation title differs from retrieved metadata: ${result.title}. Similarity is a triage flag, not a determination of wrong attribution.`, "Verify full title/authors, product identity and study endpoints before correcting or rescoring");
    if (result?.error) add(p.id, "Evidence", `keyPapers:${key}`, "warn", `Public-source retrieval failed: ${result.error}`, "Keep provisional until a source is retrieved");
  }
  if (proposals[p.id]) add(p.id, "Evidence", "rescoring", "warn", proposals[p.id].rationale, "Separate correction pass; reviewer-check source attribution and score notes first");
  const searches = research.filter(item => item.id === p.id).flatMap(item => item.queries ?? []).filter(isExternalSearch);
  if (!searches.length) add(p.id, "Evidence", "fresh-literature-search", "warn", "No durable product-specific fresh-search log was available to the compiler; existing DOI/PMID metadata retrieval is complete but does not establish literature-search coverage.", "Run or recover a targeted vendor and literature search before marking the full source review complete");
  for (const role of roles) {
    if (findings.some(f => f.id === p.id && f.role === role)) continue;
    if (role === "Structures" && p.category !== "Auto-Contouring" && !p.supportedStructures?.length) {
      add(p.id, role, "—", "info", "n/a — no enumerated auto-contouring structure list for this primary task", "—");
      continue;
    }
    add(p.id, role, "—", "info", "No automated inconsistency identified; this is not independent verification of every factual field. See source-search limitations.", "Human verification remains required for undisclosed or inaccessible claims");
  }
}

const cell = (value: unknown): string => `"${String(value ?? "").replace(/"/g, '""')}"`;
const csv = (rows: unknown[][]): string => rows.map(row => row.map(cell).join(",")).join("\r\n") + "\r\n";
const md = (value: unknown): string => String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
const counts = Object.fromEntries(["error", "warn", "info"].map(severity => [severity, findings.filter(f => f.severity === severity).length]));
const logIds = new Set(research.filter(item => item.queries?.some(isExternalSearch) && ALL_PRODUCTS.some(product => product.id === item.id)).map(item => item.id));
const report: string[] = [
  `# Product Audit Report — ${baseline.date}`,
  "",
  `- Scope: all ${ALL_PRODUCTS.length} live catalogue records (${baseline.activeCount} non-Pipeline, ${baseline.pipelineCount} Pipeline); archived/examples excluded. The bundled enumerator lists 104 source files, not 104 active products; unused definitions and relationship IDs do not equal live entries.`,
  `- Findings: ${counts.error} errors, ${counts.warn} warnings, ${counts.info} information rows; one CSV row per Markdown finding.`,
  `- Source retrieval: ${publications.filter(p => p.title).length}/${publications.length} distinct DOI/PMID records; ${publications.filter(p => p.abstract).length} abstracts. Vendor URLs: ${websites.filter(p => p.status && p.status < 400).length}/${websites.length} accessible on this run. Failures may reflect blocking, not retirement.`,
  `- Durable product-specific fresh-search logs: ${logIds.size}/${ALL_PRODUCTS.length}. Targeted, timeboxed public searches only; not an exhaustive systematic review.`,
  "- Product records have NOT been edited. Proposals are a worklist for a separate correction pass, following Product Audit Swarm / Minimal Intervention. No new product is automatically admitted from discovery leads.",
  "- Current authoritative axes: Evidence Rigor E0–E3; Levels of Efficacy L1t/L1c/L2–L6; Adoption Readiness R0–R5 unchanged. The bundled skill's legacy I0–I5 and R0–R4 cheat sheet is superseded by the project definitions. CSV headers retain current_I/proposed_I for interoperability; their values are L-codes, not legacy I-codes.",
  "- Each axis uses attributable paper maxima and documented overrides, not the majority of papers. Vendor affiliation limits independence/rigor; it does not invalidate a measured economic endpoint or require downgrading L6. Scores describe evidence and are educational: they do not imply clinical validation or replace local commissioning.",
  "",
  "## Priority worklist",
  "",
  "1. Eclipse and GE: investigate/remove misattributed direct evidence; keep predicate, hosting and vendor relationships separate from product validation.",
  "2. MRCAT Head and Neck: MESCAL brain/pelvis cannot support H&N scores; Buschmann cohort is 13 brain + 10 H&N, with L2 endpoints.",
  "3. Precise Image: exact DOI jmai-2025-173 is registered; a contradictory earlier search suggestion is rejected. Publisher/full-text verification is needed before replacing the DOI or finalizing provisional scores.",
  "4. Iris: E1 conflicts with its own no-publication/E0 notes. FDA K252188 is system-level clearance; no standalone Iris clearance should be invented.",
  "5. ARTAssistant / AccuContour 4.0: distinct FDA leads; sCT generation versus contouring on sCT must not be conflated. Establish MOZI relationship and primary IFU before adding another record.",
  "",
];
const rescoreRows: unknown[][] = [["id", "current_E", "current_I", "current_R", "proposed_E", "proposed_I", "proposed_R", "strongest_paper_doi", "search_date", "rationale"]];
const sourceRows: unknown[][] = [["id", "query", "url", "search_date"]];
const candidateRows: unknown[][] = [["id", "doi", "title", "url", "attribution", "status"]];
for (const p of ALL_PRODUCTS) {
  const score = computeProductEvidenceScore(p, { category: p.category });
  const proposal = proposals[p.id];
  const rationale = proposal?.rationale ?? "No verified score change proposed in this read-only targeted pass. Retain current effective axes pending reviewer checks; absent or inaccessible sources are not evidence of no publications.";
  const E = proposal?.E ?? score.rigor;
  const L = proposal?.L ?? score.impact;
  rescoreRows.push([p.id, score.rigor, score.impact, p.adoptionReadiness, E, L, p.adoptionReadiness, proposal?.doi ?? "", baseline.date, rationale]);
  report.push(`### ${p.id}`, "", `- **Name**: ${p.name}`, `- **Company**: ${p.company}`, `- **Category**: ${p.category}${p.secondaryCategories?.length ? ` → secondary: ${p.secondaryCategories.join(", ")}` : ""}${isPipelineProduct(p) ? " (Pipeline)" : ""}`, `- **Current effective scores**: ${score.rigor ?? "unassessed"} / ${score.impact ?? "unassessed"} / ${p.adoptionReadiness ?? "unassessed"}${score.impactProvisional ? " (efficacy provisional)" : ""}`, `- **Stored scores**: ${p.evidenceRigor ?? "unassessed"} / ${p.clinicalImpact ?? "unassessed"}`, `- **Last revised**: ${p.lastRevised ?? "not recorded"}; this audit does not stamp reviewer verification.`, "", "#### Findings", "", "| Role | Field | Severity | Observation | Suggested fix |", "| --- | --- | --- | --- | --- |");
  for (const role of roles) for (const f of findings.filter(item => item.id === p.id && item.role === role)) report.push(`| ${md(f.role)} | ${md(f.field)} | ${md(f.severity)} | ${md(f.observation)} | ${md(f.suggestedFix)} |`);
  report.push("", "#### Re-scoring proposal", "", `- Proposed: ${E ?? "unassessed"} / ${L ?? "unassessed"} / ${p.adoptionReadiness ?? "unassessed"} (not applied)`, `- Rationale: ${rationale}`, `- Search date: ${baseline.date}`, "", "#### Sources consulted", "", `- Recorded vendor page: ${p.productUrl ?? p.website ?? "not recorded"}; retrieval result in website-checks.json.`, "- DOI/PMID lookup: Europe PMC core metadata/abstract; Crossref fallback. Metadata retrieval alone does not verify all product claims.");
  for (const paper of p.keyPapers ?? []) {
    const key = paper.doi?.toLowerCase() ?? `pmid:${paper.pmid}`;
    const result = publications.find(item => item.key === key);
    if (result) report.push(`- ${md(result.title ?? paper.title ?? key)}: ${result.doi ? `https://doi.org/${result.doi}` : result.sourceUrl} (${result.abstract ? "abstract retrieved" : "metadata only"}; retrieved ${baseline.date}).`);
  }
  for (const item of research.filter(item => item.id === p.id)) {
    for (const q of item.queries ?? []) {
      report.push(`- Search: ${md(q.query)} (${q.date ?? baseline.date})${q.url ? ` — ${q.url}` : ""}`);
      sourceRows.push([p.id, q.query, q.url, q.date ?? baseline.date]);
    }
    if (item.limitations) report.push(`- Limits: ${md(Array.isArray(item.limitations) ? item.limitations.join("; ") : item.limitations)}`);
    if (item.candidates?.length) report.push("", "#### New-source / product leads (not admitted or scored)", "");
    for (const candidate of item.candidates ?? []) {
      report.push(`- ${md(candidate.title ?? candidate.doi ?? "Candidate")}: ${candidate.url ?? (candidate.doi ? `https://doi.org/${candidate.doi}` : "no source URL")}. ${md(candidate.attribution)} ${md(candidate.status)}`);
      candidateRows.push([p.id, candidate.doi, candidate.title, candidate.url, candidate.attribution, candidate.status]);
    }
  }
  report.push("");
}
mkdirSync(output, { recursive: true });
const stem = `product-audit-${baseline.date}`;
writeFileSync(resolve(output, `${stem}.md`), report.join("\n"));
writeFileSync(resolve(output, `${stem}.csv`), csv([["id", "role", "severity", "field", "observation", "suggested_fix"], ...findings.map(f => [f.id, f.role, f.severity, f.field, f.observation, f.suggestedFix])]));
writeFileSync(resolve(output, `${stem}-rescoring.csv`), csv(rescoreRows));
writeFileSync(resolve(output, `${stem}-source-searches.csv`), csv(sourceRows));
writeFileSync(resolve(output, `${stem}-new-source-leads.csv`), csv(candidateRows));
console.log(JSON.stringify({ products: ALL_PRODUCTS.length, findings: findings.length, counts, searchCoverage: logIds.size, proposals: Object.keys(proposals).length, sourceQueries: sourceRows.length - 1, candidates: candidateRows.length - 1 }));