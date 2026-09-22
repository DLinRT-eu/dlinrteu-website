/**
 * EUDAMED audit (read-only).
 *
 * Queries the public EUDAMED REST API for every company and product in the
 * DLinRT catalogue and writes a report of what EUDAMED officially holds:
 * actor SRN, CE certificate numbers, Notified Body IDs and MDR/MDD status.
 *
 * The script never edits product data. Matching is name-based and therefore
 * reported as *candidates* only — nothing is auto-accepted.
 *
 * NOTE: MDR certificate registration in EUDAMED only becomes mandatory on
 * 28 May 2026 (Commission Decision (EU) 2025/2371). Until then, "not
 * registered in EUDAMED" is NOT evidence of a missing CE mark.
 *
 * Usage:
 *   bun scripts/eudamed-audit.ts                       # companies + products
 *   bun scripts/eudamed-audit.ts --companies-only
 *   bun scripts/eudamed-audit.ts --products-only
 *   bun scripts/eudamed-audit.ts --company="MVision AI"
 *   bun scripts/eudamed-audit.ts --limit=5 --no-cache --json
 *   bun scripts/eudamed-audit.ts --delay=2500
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const API_BASE = "https://ec.europa.eu/tools/eudamed/api";
const CACHE_DIR = resolve(".cache/eudamed");
const OUT_DIR = resolve("docs/audits/eudamed");
const MANDATORY_FROM = "2026-05-28";

/* ------------------------------------------------------------------ CLI */

const args = process.argv.slice(2);
const flag = (name: string): boolean => args.includes(`--${name}`);
const value = (name: string): string | undefined => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.slice(name.length + 3).replace(/^"|"$/g, "");
};

const options = {
  companiesOnly: flag("companies-only"),
  productsOnly: flag("products-only"),
  json: flag("json"),
  noCache: flag("no-cache"),
  company: value("company"),
  limit: Number(value("limit") ?? "0") || 0,
  delayMs: Number(value("delay") ?? "1500") || 1500,
};

/* ------------------------------------------------------------- API types */

export interface EudamedActor {
  srn?: string;
  name?: string;
  actorType?: string;
  countryIso2Code?: string;
  status?: string;
  versionState?: string;
}

export interface EudamedCertificate {
  certificateNumber?: string;
  certificateType?: string;
  notifiedBodySrn?: string;
  notifiedBodyName?: string;
  manufacturerName?: string;
  validFrom?: string;
  validUntil?: string;
  status?: string;
  legislation?: string;
}

export interface EudamedDevice {
  basicUdi?: string;
  primaryDi?: string;
  tradeName?: string;
  riskClass?: string;
  emdnCode?: string;
  manufacturerName?: string;
  manufacturerSrn?: string;
  legislation?: string;
  status?: string;
}

type LookupStatus = "confirmed" | "not-registered" | "ambiguous" | "lookup-failed";

interface AuditRow {
  kind: "company" | "product";
  dlinrtName: string;
  dlinrtId: string;
  company: string;
  status: LookupStatus;
  srn: string;
  certificateNumbers: string;
  notifiedBodies: string;
  legislation: string;
  riskClass: string;
  basicUdi: string;
  emdnCode: string;
  eudamedName: string;
  candidateCount: number;
  note: string;
  queryUrl: string;
}

/* ------------------------------------------------------- HTTP with retry */

let lastRequestAt = 0;

const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const cacheKey = (url: string): string =>
  resolve(CACHE_DIR, `${createHash("sha1").update(url).digest("hex")}.json`);

interface FetchResult {
  ok: boolean;
  body: unknown;
  error?: string;
}

const readCache = (url: string): FetchResult | undefined => {
  if (options.noCache) return undefined;
  const file = cacheKey(url);
  if (!existsSync(file)) return undefined;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as FetchResult;
  } catch {
    return undefined;
  }
};

const writeCache = (url: string, result: FetchResult): void => {
  if (options.noCache || !result.ok) return;
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cacheKey(url), JSON.stringify(result));
};

/** Sequential, throttled GET with exponential backoff on 429/5xx. */
const getJson = async (url: string, attempt = 0): Promise<FetchResult> => {
  const cached = readCache(url);
  if (cached) return cached;

  const sinceLast = Date.now() - lastRequestAt;
  if (sinceLast < options.delayMs) await wait(options.delayMs - sinceLast);
  lastRequestAt = Date.now();

  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json", "Accept-Language": "en" },
    });
  } catch (error) {
    if (attempt >= 3) return { ok: false, body: null, error: `network: ${String(error)}` };
    await wait(2000 * 2 ** attempt);
    return getJson(url, attempt + 1);
  }

  if (response.status === 429 || response.status >= 500) {
    if (attempt >= 3) return { ok: false, body: null, error: `HTTP ${response.status}` };
    await wait(3000 * 2 ** attempt);
    return getJson(url, attempt + 1);
  }

  if (!response.ok) return { ok: false, body: null, error: `HTTP ${response.status}` };

  const text = await response.text();
  if (text.trim().length === 0) return { ok: false, body: null, error: "empty response body" };

  try {
    const result: FetchResult = { ok: true, body: JSON.parse(text) };
    writeCache(url, result);
    return result;
  } catch {
    return { ok: false, body: null, error: "non-JSON response" };
  }
};

/* -------------------------------------------------- response normalising */

const pick = (source: Record<string, unknown>, keys: string[]): string => {
  for (const key of keys) {
    const raw = source[key];
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    if (typeof raw === "number") return String(raw);
    if (raw && typeof raw === "object") {
      const nested = raw as Record<string, unknown>;
      const inner = pick(nested, ["texts", "text", "name", "code", "srn", "value"]);
      if (inner) return inner;
    }
    if (Array.isArray(raw) && raw.length > 0) {
      const first = raw[0];
      if (typeof first === "string" && first.trim()) return first.trim();
      if (first && typeof first === "object") {
        const inner = pick(first as Record<string, unknown>, ["text", "name", "code", "value"]);
        if (inner) return inner;
      }
    }
  }
  return "";
};

/** EUDAMED wraps result pages differently per endpoint. */
const extractContent = (body: unknown): Record<string, unknown>[] => {
  if (Array.isArray(body)) return body as Record<string, unknown>[];
  if (!body || typeof body !== "object") return [];
  const asRecord = body as Record<string, unknown>;
  for (const key of ["content", "results", "items", "_embedded"]) {
    const candidate = asRecord[key];
    if (Array.isArray(candidate)) return candidate as Record<string, unknown>[];
    if (candidate && typeof candidate === "object") {
      const nested = Object.values(candidate as Record<string, unknown>).find(Array.isArray);
      if (nested) return nested as Record<string, unknown>[];
    }
  }
  return [];
};

const normalise = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|limited|gmbh|bv|b\.v\.|nv|ab|as|a\/s|sa|s\.a\.|srl|spa|co|corp|corporation|company|group|holding|medical|healthcare|technologies|technology|systems)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const nameMatches = (a: string, b: string): boolean => {
  const x = normalise(a);
  const y = normalise(b);
  if (!x || !y) return false;
  return x === y || x.includes(y) || y.includes(x);
};

/* ------------------------------------------------------------- endpoints */

const query = (path: string, params: Record<string, string>): string => {
  const search = new URLSearchParams({
    page: "0",
    pageSize: "20",
    size: "20",
    languageIso2Code: "en",
    ...params,
  });
  return `${API_BASE}/${path}?${search.toString()}`;
};

/** EUDAMED reference data arrives as "refdata.risk-class.class-iia". */
const shortCode = (raw: string): string => (raw.includes(".") ? raw.split(".").pop() ?? raw : raw);

/** Economic operators (manufacturers, authorised representatives, importers). */
const lookupActor = async (companyName: string) => {
  const url = query("eos", { name: companyName });
  const result = await getJson(url);
  if (!result.ok) return { url, error: result.error, actors: [] as EudamedActor[] };

  const actors: EudamedActor[] = extractContent(result.body).map((row) => ({
    srn: pick(row, ["eudamedIdentifier", "srn", "actorSrn"]),
    name: pick(row, ["name", "actorName", "legalName"]),
    actorType: pick(row, ["roleName", "actorType"]),
    countryIso2Code: pick(row, ["countryIso2Code", "countryName"]),
    status: shortCode(pick(row, ["actorStatus", "versionState"])),
  }));
  return { url, error: undefined, actors };
};

const lookupCertificates = async (companyName: string) => {
  const url = query("certificates/search/", { actorName: companyName });
  const result = await getJson(url);
  if (!result.ok) return { url, error: result.error, certificates: [] as EudamedCertificate[] };

  const certificates: EudamedCertificate[] = extractContent(result.body).map((row) => ({
    certificateNumber: pick(row, ["certificateNumber"]),
    certificateType: shortCode(pick(row, ["certificateType"])),
    notifiedBodySrn: pick(row, ["notifiedBodySrn"]),
    notifiedBodyName: pick(row, ["notifiedBodyName"]),
    manufacturerName: pick(row, ["actorName", "manufacturerName"]),
    validFrom: pick(row, ["startingValidityDate", "issueDate"]),
    validUntil: pick(row, ["expiryDate"]),
    status: shortCode(pick(row, ["certificateStatus", "versionState"])),
    legislation: shortCode(pick(row, ["certificateType"])),
  }));
  return { url, error: undefined, certificates };
};

/**
 * UDI-DI records. EMDN / nomenclature codes are only exposed on the Basic UDI
 * endpoint, which has no trade-name filter, so that column stays empty here.
 */
const lookupDevices = async (tradeName: string) => {
  const url = query("devices/udiDiData", { tradeName });
  const result = await getJson(url);
  if (!result.ok) return { url, error: result.error, devices: [] as EudamedDevice[] };

  const devices: EudamedDevice[] = extractContent(result.body).map((row) => ({
    basicUdi: pick(row, ["basicUdi"]),
    primaryDi: pick(row, ["primaryDi"]),
    tradeName: pick(row, ["tradeName", "deviceName"]),
    riskClass: shortCode(pick(row, ["riskClass"])),
    emdnCode: "",
    manufacturerName: pick(row, ["manufacturerName"]),
    manufacturerSrn: pick(row, ["manufacturerSrn", "mfOrPrSrn"]),
    legislation: shortCode(pick(row, ["applicableLegislation"])),
    status: shortCode(pick(row, ["deviceStatusType", "versionState"])),
  }));
  return { url, error: undefined, devices };
};

/* ------------------------------------------------------------- catalogue */

interface CatalogueCompany {
  id: string;
  name: string;
  productIds: string[];
}

interface CatalogueProduct {
  id: string;
  name: string;
  company: string;
}

const loadCatalogue = async (): Promise<{
  companies: CatalogueCompany[];
  products: CatalogueProduct[];
}> => {
  const companiesModule = await import(resolve("src/data/companies/index.ts"));
  const productsModule = await import(resolve("src/data/index.ts"));

  const companies = (companiesModule.COMPANIES as CatalogueCompany[]).map((c) => ({
    id: c.id,
    name: c.name,
    productIds: c.productIds ?? [],
  }));

  const products = (productsModule.ALL_PRODUCTS as CatalogueProduct[]).map((p) => ({
    id: p.id,
    name: p.name,
    company: p.company,
  }));

  return { companies, products };
};

/* ----------------------------------------------------------- audit rows */

const emptyRow = (
  kind: AuditRow["kind"],
  name: string,
  id: string,
  company: string,
  queryUrl: string
): AuditRow => ({
  kind,
  dlinrtName: name,
  dlinrtId: id,
  company,
  status: "not-registered",
  srn: "",
  certificateNumbers: "",
  notifiedBodies: "",
  legislation: "",
  riskClass: "",
  basicUdi: "",
  emdnCode: "",
  eudamedName: "",
  candidateCount: 0,
  note: "",
  queryUrl,
});

const auditCompany = async (company: CatalogueCompany): Promise<AuditRow> => {
  const actor = await lookupActor(company.name);
  const row = emptyRow("company", company.name, company.id, company.name, actor.url);

  if (actor.error) {
    row.status = "lookup-failed";
    row.note = `actor lookup: ${actor.error}`;
    return row;
  }

  const matches = actor.actors.filter((a) => nameMatches(a.name ?? "", company.name));
  row.candidateCount = actor.actors.length;

  if (actor.actors.length === 0) {
    row.status = "not-registered";
    row.note = `no registered actor returned for this name (registration mandatory from ${MANDATORY_FROM})`;
  } else if (matches.length === 0) {
    // Nothing matched our name: report that, do not adopt an unrelated actor.
    row.status = "ambiguous";
    row.note = `${actor.actors.length} actors returned, none matching our company name — check the query URL by hand`;
  } else {
    const best = matches[0];
    row.srn = best.srn ?? "";
    row.eudamedName = best.name ?? "";
    row.note = [best.actorType, best.countryIso2Code, best.status].filter(Boolean).join(" · ");
    row.status = matches.length === 1 ? "confirmed" : "ambiguous";
    if (matches.length > 1) row.note += `; ${matches.length} matching actors`;
  }

  const certs = await lookupCertificates(company.name);
  if (certs.error) {
    row.note = `${row.note}${row.note ? "; " : ""}certificate lookup: ${certs.error}`;
    if (row.status === "not-registered") row.status = "lookup-failed";
    return row;
  }

  const relevant = certs.certificates.filter((c) =>
    nameMatches(c.manufacturerName ?? "", company.name)
  );
  row.certificateNumbers = relevant.map((c) => c.certificateNumber).filter(Boolean).join(" | ");
  row.notifiedBodies = [
    ...new Set(relevant.map((c) => c.notifiedBodySrn || c.notifiedBodyName).filter(Boolean)),
  ].join(" | ");
  row.legislation = [...new Set(relevant.map((c) => c.legislation || c.certificateType).filter(Boolean))].join(
    " | "
  );
  if (relevant.length === 0) {
    row.note = `${row.note}${row.note ? "; " : ""}0 certificates in EUDAMED`;
  }
  return row;
};

const auditProduct = async (product: CatalogueProduct): Promise<AuditRow> => {
  const devices = await lookupDevices(product.name);
  const row = emptyRow("product", product.name, product.id, product.company, devices.url);

  if (devices.error) {
    row.status = "lookup-failed";
    row.note = `device lookup: ${devices.error}`;
    return row;
  }

  const byTradeName = devices.devices.filter((d) => nameMatches(d.tradeName ?? "", product.name));
  const candidates = byTradeName.length > 0 ? byTradeName : devices.devices;
  row.candidateCount = candidates.length;

  if (candidates.length === 0) {
    row.status = "not-registered";
    row.note = `no UDI-DI record returned for this trade name (device registration mandatory from ${MANDATORY_FROM})`;
    return row;
  }

  const sameCompany = candidates.filter((d) => nameMatches(d.manufacturerName ?? "", product.company));
  if (sameCompany.length === 0) {
    row.status = "ambiguous";
    row.note = [
      `${candidates.length} UDI-DI record(s) share this trade name, none from ${product.company}`,
      candidates[0]?.manufacturerName ? `first manufacturer: ${candidates[0].manufacturerName}` : "",
    ]
      .filter(Boolean)
      .join("; ");
    return row;
  }

  const best = sameCompany[0] as EudamedDevice;
  row.eudamedName = best.tradeName ?? "";
  row.srn = best.manufacturerSrn ?? "";
  row.basicUdi = best.basicUdi ?? "";
  row.riskClass = best.riskClass ?? "";
  row.emdnCode = best.emdnCode ?? "";
  row.legislation = best.legislation ?? "";
  row.status = sameCompany.length === 1 ? "confirmed" : "ambiguous";
  row.note = [
    best.manufacturerName ? `manufacturer: ${best.manufacturerName}` : "",
    sameCompany.length > 1 ? `${sameCompany.length} matching records` : "",
  ]
    .filter(Boolean)
    .join("; ");
  return row;
};

/* ------------------------------------------------------------- reporting */

const csvCell = (raw: string | number): string => {
  const text = String(raw ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const CSV_HEADERS = [
  "kind",
  "dlinrt_name",
  "dlinrt_id",
  "company",
  "status",
  "srn",
  "certificate_numbers",
  "notified_bodies",
  "legislation",
  "risk_class",
  "basic_udi",
  "emdn_code",
  "eudamed_name",
  "candidate_count",
  "note",
  "query_url",
];

const toCsv = (rows: AuditRow[]): string =>
  [
    CSV_HEADERS.join(","),
    ...rows.map((r) =>
      [
        r.kind,
        r.dlinrtName,
        r.dlinrtId,
        r.company,
        r.status,
        r.srn,
        r.certificateNumbers,
        r.notifiedBodies,
        r.legislation,
        r.riskClass,
        r.basicUdi,
        r.emdnCode,
        r.eudamedName,
        r.candidateCount,
        r.note,
        r.queryUrl,
      ]
        .map(csvCell)
        .join(",")
    ),
  ].join("\n");

const countByStatus = (rows: AuditRow[]): Record<LookupStatus, number> => {
  const counts: Record<LookupStatus, number> = {
    confirmed: 0,
    "not-registered": 0,
    ambiguous: 0,
    "lookup-failed": 0,
  };
  for (const row of rows) counts[row.status] += 1;
  return counts;
};

const mdTable = (rows: AuditRow[], columns: Array<[string, (r: AuditRow) => string]>): string => {
  const head = `| ${columns.map(([h]) => h).join(" | ")} |`;
  const sep = `|${columns.map(() => "---").join("|")}|`;
  const body = rows.map((r) => `| ${columns.map(([, get]) => get(r).replace(/\|/g, "\\|")).join(" | ")} |`);
  return [head, sep, ...body].join("\n");
};

const toMarkdown = (date: string, companyRows: AuditRow[], productRows: AuditRow[]): string => {
  const companyCounts = countByStatus(companyRows);
  const productCounts = countByStatus(productRows);

  return `# EUDAMED audit — ${date}

Read-only audit of the DLinRT catalogue against the public EUDAMED REST API
(\`${API_BASE}\`). Generated by \`scripts/eudamed-audit.ts\`.

> **Educational reference only.** This report records what EUDAMED returns; it
> is not a regulatory determination and nothing here is clinically validated.

## How to read this

MDR registration of certificates and devices in EUDAMED only becomes mandatory
on **${MANDATORY_FROM}** (Commission Decision (EU) 2025/2371, Regulation (EU)
2024/1860). A \`not-registered\` row therefore means "EUDAMED holds no public
record under this name today" — **not** that the CE mark is missing or invalid.

Matching is name-based, so every result is a *candidate*. \`ambiguous\` rows need
a human check via the query URL before anything is entered in the catalogue. No
field in \`src/data/products/\` is changed by this script.

| Status | Companies | Products |
|---|---|---|
| confirmed | ${companyCounts.confirmed} | ${productCounts.confirmed} |
| ambiguous | ${companyCounts.ambiguous} | ${productCounts.ambiguous} |
| not-registered | ${companyCounts["not-registered"]} | ${productCounts["not-registered"]} |
| lookup-failed | ${companyCounts["lookup-failed"]} | ${productCounts["lookup-failed"]} |

## Companies (${companyRows.length})

${companyRows.length === 0 ? "_Not queried in this run._" : mdTable(companyRows, [
    ["Company", (r) => r.dlinrtName],
    ["Status", (r) => r.status],
    ["SRN", (r) => r.srn || "—"],
    ["Certificates", (r) => r.certificateNumbers || "—"],
    ["Notified body", (r) => r.notifiedBodies || "—"],
    ["Legislation", (r) => r.legislation || "—"],
    ["EUDAMED name", (r) => r.eudamedName || "—"],
    ["Note", (r) => r.note || "—"],
    ["Query", (r) => `[link](${r.queryUrl})`],
  ])}

## Products (${productRows.length})

${productRows.length === 0 ? "_Not queried in this run._" : mdTable(productRows, [
    ["Product", (r) => r.dlinrtName],
    ["Company", (r) => r.company],
    ["Status", (r) => r.status],
    ["Basic UDI-DI", (r) => r.basicUdi || "—"],
    ["Risk class", (r) => r.riskClass || "—"],
    ["EMDN", (r) => r.emdnCode || "—"],
    ["Manufacturer SRN", (r) => r.srn || "—"],
    ["EUDAMED name", (r) => r.eudamedName || "—"],
    ["Note", (r) => r.note || "—"],
    ["Query", (r) => `[link](${r.queryUrl})`],
  ])}

## Next step

Re-run this audit after ${MANDATORY_FROM}, when registration is mandatory and
coverage should be materially higher. Any catalogue update stays a separate,
human-reviewed change with the EUDAMED query URL recorded as the source.
`;
};

/* ------------------------------------------------------------------ main */

const main = async (): Promise<void> => {
  const { companies, products } = await loadCatalogue();

  const companyFilter = options.company;
  let targetCompanies = options.productsOnly ? [] : companies;
  let targetProducts = options.companiesOnly ? [] : products;

  if (companyFilter) {
    targetCompanies = targetCompanies.filter((c) => nameMatches(c.name, companyFilter));
    targetProducts = targetProducts.filter((p) => nameMatches(p.company, companyFilter));
  }
  if (options.limit > 0) {
    targetCompanies = targetCompanies.slice(0, options.limit);
    targetProducts = targetProducts.slice(0, options.limit);
  }

  console.log(
    `EUDAMED audit: ${targetCompanies.length} companies, ${targetProducts.length} products ` +
      `(delay ${options.delayMs}ms, cache ${options.noCache ? "off" : "on"})`
  );

  const companyRows: AuditRow[] = [];
  for (const [index, company] of targetCompanies.entries()) {
    const row = await auditCompany(company);
    companyRows.push(row);
    console.log(`  [${index + 1}/${targetCompanies.length}] ${company.name} → ${row.status}`);
  }

  const productRows: AuditRow[] = [];
  for (const [index, product] of targetProducts.entries()) {
    const row = await auditProduct(product);
    productRows.push(row);
    console.log(`  [${index + 1}/${targetProducts.length}] ${product.name} → ${row.status}`);
  }

  const date = new Date().toISOString().slice(0, 10);
  const allRows = [...companyRows, ...productRows];

  if (options.json) {
    console.log(JSON.stringify({ date, rows: allRows }, null, 2));
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const mdPath = resolve(OUT_DIR, `${date}-eudamed-audit.md`);
  const csvPath = resolve(OUT_DIR, `${date}-eudamed-audit.csv`);
  writeFileSync(mdPath, toMarkdown(date, companyRows, productRows));
  writeFileSync(csvPath, toCsv(allRows));

  console.log(`\nWrote ${mdPath}`);
  console.log(`Wrote ${csvPath}`);
};

main().catch((error) => {
  console.error("EUDAMED audit failed:", error);
  process.exit(1);
});
