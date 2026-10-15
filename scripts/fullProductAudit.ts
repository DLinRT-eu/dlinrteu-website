/** Read-only catalogue checks and public-source retrieval; never edits product records. */
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { ALL_PRODUCTS, COMPANIES } from "../src/data";
import { computeProductEvidenceScore } from "../src/utils/evidenceScoring";
import { isPipelineProduct } from "../src/utils/productFilters";
import type { ProductDetails } from "../src/types/productDetails";

type Role = "Identity" | "Inclusion" | "Regulatory" | "Technical" | "Structures" | "Evidence" | "Transparency" | "Cross-check";
interface Finding { id: string; role: Role; field: string; severity: "error" | "warn" | "info"; observation: string; suggestedFix: string }
interface SourceCheck { url: string; status?: number; finalUrl?: string; title?: string; error?: string }
interface PublicationCheck { key: string; requestedTitle?: string; title?: string; doi?: string; pmid?: string; abstract?: string; journal?: string; year?: string; authorString?: string; sourceUrl: string; error?: string; titleSimilarity?: number }
interface EpmcResult { title?: string; doi?: string; id?: string; abstractText?: string; journalTitle?: string; pubYear?: string; authorString?: string }
interface EpmcResponse { resultList?: { result?: EpmcResult[] } }
interface CrossrefResponse { message?: { title?: string[]; abstract?: string; author?: Array<{given?: string; family?: string}>; "container-title"?: string[] } }

const OUTPUT = process.argv.find(a => a.startsWith("--out="))?.slice(6) ?? "/tmp/product-review";
const NETWORK = process.argv.includes("--network");
const ROLES: Role[] = ["Identity", "Inclusion", "Regulatory", "Technical", "Structures", "Evidence", "Transparency", "Cross-check"];
const findings: Finding[] = [];
const add = (id: string, role: Role, field: string, severity: Finding["severity"], observation: string, suggestedFix = "Verify source before editing") => findings.push({ id, role, field, severity, observation, suggestedFix });

function sourceRegistry(folder: string, registry = new Map<string, string[]>()): Map<string, string[]> {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) { sourceRegistry(path, registry); continue; }
    if (!entry.name.endsWith(".ts")) continue;
    const ast = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node): void => {
      if (ts.isPropertyAssignment(node) && node.name.getText(ast) === "id" && ts.isStringLiteral(node.initializer)
        && ts.isObjectLiteralExpression(node.parent)
        && node.parent.properties.some(property => ts.isPropertyAssignment(property) && property.name.getText(ast) === "category")) {
        const id = node.initializer.text;
        registry.set(id, [...(registry.get(id) ?? []), path.replace(`${process.cwd()}/`, "")]);
      }
      ts.forEachChild(node, visit);
    };
    visit(ast);
  }
  return registry;
}

function staticReview(product: ProductDetails, registry: Map<string, string[]>): void {
  const p = product;
  const files = registry.get(p.id) ?? [];
  if (files.length === 0) add(p.id, "Identity", "id", "error", "No source definition found");
  if (files.length > 1) add(p.id, "Cross-check", "id", "warn", `Multiple source definitions (may be unused or archived): ${files.join(", ")}`);
  if (p.logoUrl?.startsWith("/") && !existsSync(resolve("public", p.logoUrl.slice(1)))) add(p.id, "Identity", "logoUrl", "error", `Missing local logo ${p.logoUrl}`);
  if (!COMPANIES.some(c => c.name === p.company)) add(p.id, "Cross-check", "company", "warn", `Company label does not exactly match registry; check legal-name aliases before calling it missing: ${p.company}`);
  if (p.usesAI === false && !p.monitorsAIProducts?.length) add(p.id, "Inclusion", "usesAI", "warn", "No AI use or explicit monitored-AI product list; check task-specific exception");
  const fda = typeof p.regulatory?.fda === "object" ? p.regulatory.fda : undefined;
  if (fda?.status === "510k_cleared" && !fda.clearanceNumber) add(p.id, "Regulatory", "regulatory.fda.clearanceNumber", "warn", "510(k) cleared but structured clearance number missing");
  if (fda?.status === "510k_cleared" && !/FDA/i.test(p.certification ?? "")) add(p.id, "Regulatory", "certification", "warn", "Structured FDA clearance absent from certification summary");
  if (p.regulatory?.ce?.status === "cleared" && /not (publicly )?(verified|disclosed)|not confirmed/i.test(p.regulatory.ce.notes ?? "")) add(p.id, "Regulatory", "regulatory.ce", "warn", "Confirmed CE status conflicts with unverified-source caveat");
  if (/DICOM\s+RT[-\s]?(Struct|Plan|Dose)/i.test(JSON.stringify(p.technicalSpecifications ?? {}))) add(p.id, "Technical", "technicalSpecifications", "warn", "Nonstandard DICOM-RT nomenclature");
  if (p.category === "Auto-Contouring" && !p.supportedStructures?.length && !p.structuresUnavailable) add(p.id, "Structures", "supportedStructures", "warn", "No structures or explicit unavailability flag");
  const score = computeProductEvidenceScore(p, {category: p.category});
  if (score.rigor !== p.evidenceRigor || score.impact !== p.clinicalImpact) add(p.id, "Evidence", "aggregate", "warn", `Stored ${p.evidenceRigor}/${p.clinicalImpact} vs effective ${score.rigor}/${score.impact}; do not promote provisional papers mechanically`);
  const provisional = (p.keyPapers ?? []).filter(k => k.efficacyProvisional);
  if (provisional.length) add(p.id, "Evidence", "keyPapers", "warn", `${provisional.length} provisional paper scores require source retrieval`);
  if (!p.keyPapers?.length) add(p.id, "Evidence", "keyPapers", "info", "No scored attributable publications recorded; literature search required", "Keep evidence uncertainty explicit");
  for (const field of ["trainingData", "evaluationData", "structuresProvenance"] as const) {
    const value = p[field];
    if (value && (!value.source || (!value.sourceUrl && (!value.sourceAccess || value.sourceAccess === "public")))) add(p.id, "Transparency", field, "warn", "Public disclosure lacks source label or URL; non-public disclosures may use a dated source label without a public URL");
    if (value?.sourceAccess && value.sourceAccess !== "public" && !value.sourceRetrievedOn) add(p.id, "Transparency", field, "warn", "Non-public source lacks retrieval date");
  }
  if (p.categoryEvidence) add(p.id, "Evidence", "categoryEvidence", "info", `Review evidence separately for ${Object.keys(p.categoryEvidence).join(", ")}`, "Do not flatten evidence across tasks");
  for (const role of ROLES) if (!findings.some(f => f.id === p.id && f.role === role)) add(p.id, role, "—", "info", "No static finding; external-source review still required", "Complete source review");
}

async function fetchPublic(url: string): Promise<Response> {
  return fetch(url, {signal: AbortSignal.timeout(12000), headers: {"User-Agent": "DLinRT-catalogue-review/1.0", Accept: "application/json,text/html;q=0.8,*/*;q=0.5"}});
}

async function parallelMap<T, R>(items: T[], concurrency: number, action: (item: T) => Promise<R>): Promise<R[]> {
  const output: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({length: concurrency}, async () => {
    while (next < items.length) {
      const index = next++;
      const item = items[index];
      if (item !== undefined) output[index] = await action(item);
    }
  }));
  return output;
}

async function checkWebsite(url: string): Promise<SourceCheck> {
  try {
    const response = await fetchPublic(url);
    const html = (await response.text()).slice(0, 250000);
    return {url, status: response.status, finalUrl: response.url, title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim()};
  } catch (error) { return {url, error: error instanceof Error ? error.message : String(error)}; }
}

function titleSimilarity(a: string, b: string): number {
  const words = (value: string) => new Set(value.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(w => w.length > 2));
  const first = words(a), second = words(b);
  return [...first].filter(w => second.has(w)).length / Math.max(1, Math.min(first.size, second.size));
}

async function checkPublication(paper: NonNullable<ProductDetails["keyPapers"]>[number]): Promise<PublicationCheck> {
  const key = paper.doi?.toLowerCase() ?? `pmid:${paper.pmid}`;
  const query = paper.doi ? `DOI:"${paper.doi}"` : paper.pmid?.startsWith("PMC") ? `PMCID:${paper.pmid}` : `EXT_ID:${paper.pmid} AND SRC:MED`;
  const sourceUrl = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=1`;
  try {
    const response = await fetchPublic(sourceUrl);
    if (!response.ok) throw new Error(`Europe PMC HTTP ${response.status}`);
    const data = await response.json() as EpmcResponse;
    const result = data.resultList?.result?.[0];
    if (result) return {key, requestedTitle: paper.title, title: result.title, doi: result.doi, pmid: result.id, abstract: result.abstractText, journal: result.journalTitle, year: result.pubYear, authorString: result.authorString, sourceUrl, titleSimilarity: paper.title && result.title ? titleSimilarity(paper.title, result.title) : undefined};
    if (!paper.doi) return {key, requestedTitle: paper.title, sourceUrl, error: "PMID not found"};
    const crossrefUrl = `https://api.crossref.org/works/${encodeURIComponent(paper.doi)}`;
    const crossref = await fetchPublic(crossrefUrl);
    if (!crossref.ok) return {key, requestedTitle: paper.title, sourceUrl: crossrefUrl, error: `Crossref HTTP ${crossref.status}; Europe PMC not found`};
    const metadata = (await crossref.json() as CrossrefResponse).message;
    const title = metadata?.title?.[0];
    return {key, requestedTitle: paper.title, title, doi: paper.doi, abstract: metadata?.abstract, journal: metadata?.["container-title"]?.[0], authorString: metadata?.author?.map(a => `${a.given ?? ""} ${a.family ?? ""}`.trim()).join(", "), sourceUrl: crossrefUrl, titleSimilarity: paper.title && title ? titleSimilarity(paper.title, title) : undefined};
  } catch (error) {return {key, requestedTitle: paper.title, sourceUrl, error: error instanceof Error ? error.message : String(error)};}
}

mkdirSync(OUTPUT, {recursive:true});
const registry = sourceRegistry(resolve("src/data/products"));
for (const p of ALL_PRODUCTS) staticReview(p, registry);
const websites = [...new Set(ALL_PRODUCTS.map(p => p.productUrl ?? p.website).filter((url): url is string => Boolean(url)))];
const papers = new Map<string, NonNullable<ProductDetails["keyPapers"]>[number]>();
for (const p of ALL_PRODUCTS) for (const paper of p.keyPapers ?? []) if (paper.doi || paper.pmid) papers.set(paper.doi?.toLowerCase() ?? `pmid:${paper.pmid}`, paper);
const report = {date: new Date().toISOString().slice(0,10), productCount:ALL_PRODUCTS.length, activeCount:ALL_PRODUCTS.filter(p=>!isPipelineProduct(p)).length, pipelineCount:ALL_PRODUCTS.filter(isPipelineProduct).length, products: ALL_PRODUCTS.map(p=>({id:p.id,name:p.name,category:p.category,pipeline:isPipelineProduct(p),sourceFiles:registry.get(p.id)??[],score:computeProductEvidenceScore(p,{category:p.category})})), findings};
writeFileSync(resolve(OUTPUT,"static-audit.json"), JSON.stringify(report,null,2));
console.log(`Static audit: ${report.productCount} products; ${report.activeCount} non-Pipeline, ${report.pipelineCount} Pipeline; ${findings.length} role outcomes`);
if (NETWORK) {
  console.log(`Retrieving ${websites.length} product URLs and ${papers.size} unique publication identifiers`);
  await Promise.all([
    parallelMap(websites, 8, checkWebsite).then(results=>{writeFileSync(resolve(OUTPUT,"website-checks.json"),JSON.stringify(results,null,2));console.log(`Websites: ${results.filter(r=>r.status && r.status<400).length}/${results.length} accessible; failures need manual verification`);}),
    parallelMap([...papers.values()], 6, checkPublication).then(results=>{writeFileSync(resolve(OUTPUT,"publication-checks.json"),JSON.stringify(results,null,2));console.log(`Publications: ${results.filter(r=>r.title).length}/${results.length} retrieved; ${results.filter(r=>r.abstract).length} abstracts; ${results.filter(r=>r.titleSimilarity!==undefined && r.titleSimilarity<0.45).length} title mismatch flags`);})
  ]);
}