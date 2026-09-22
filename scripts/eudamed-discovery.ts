/**
 * EUDAMED EMDN discovery sweep (read-only).
 *
 * Enumerates public EUDAMED UDI-DI records under selected EMDN/CND branches,
 * diffs them against the DLinRT catalogue, and writes a screening report for
 * possible missing AI/deep-learning radiotherapy products.
 *
 * The script never edits catalogue data. EUDAMED registration is regulatory
 * metadata only: a product is not eligible for DLinRT unless public sources also
 * disclose AI/deep-learning use in a core radiotherapy function.
 *
 * Usage:
 *   bun scripts/eudamed-discovery.ts
 *   bun scripts/eudamed-discovery.ts --branches=Z1101,Z1104 --delay=750
 *   bun scripts/eudamed-discovery.ts --limit-codes=5 --limit-pages=1 --json
 *   bun scripts/eudamed-discovery.ts --no-cache --enrich=all
 *   bun scripts/eudamed-discovery.ts --all-terminal-codes
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { basename, resolve } from "node:path";
import ExcelJS from "exceljs";

const API_BASE = "https://ec.europa.eu/tools/eudamed/api";
const EMDN_DOWNLOAD_URL = "https://webgate.ec.europa.eu/dyna2/emdn/build/EMDN%20v2026_EN.xlsx";
const EMDN_PUBLIC_PAGE_URL = "https://health.ec.europa.eu/medical-devices-topics-interest/european-medical-devices-nomenclature-emdn_en";
const CACHE_DIR = resolve(".cache/eudamed-discovery");
const OUT_DIR = resolve("docs/audits/eudamed");
const DEFAULT_BRANCHES = ["Z1101", "Z1104"];
const MANDATORY_FROM = "2026-05-28";

const args = process.argv.slice(2);
const flag = (name: string): boolean => args.includes(`--${name}`);
const value = (name: string): string | undefined => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.slice(name.length + 3).replace(/^"|"$/g, "");
};

const splitList = (raw: string | undefined, fallback: string[]): string[] => {
  if (!raw) return fallback;
  return raw
    .split(",")
    .map((v) => v.trim().toUpperCase())
    .filter(Boolean);
};

const options = {
  branches: splitList(value("branches"), DEFAULT_BRANCHES),
  json: flag("json"),
  noCache: flag("no-cache"),
  delayMs: Number(value("delay") ?? "750") || 750,
  limitCodes: Number(value("limit-codes") ?? "0") || 0,
  limitPages: Number(value("limit-pages") ?? "0") || 0,
  pageSize: Math.min(Number(value("page-size") ?? "300") || 300, 300),
  enrich: (value("enrich") ?? "candidates") as "all" | "candidates" | "none",
  allTerminalCodes: flag("all-terminal-codes"),
};

interface FetchResult {
  ok: boolean;
  body: unknown;
  error?: string;
}

interface EmdnCode {
  branch: string;
  branchTerm: string;
  code: string;
  term: string;
  level: number;
  terminal: boolean;
}

interface CatalogueProduct {
  id: string;
  name: string;
  company: string;
  category?: string;
  secondaryCategories?: string[];
  regulatory?: { ce?: { eudamed?: { basicUdi?: string; registeredTradeName?: string; manufacturerSrn?: string } } };
}

interface CatalogueCompany {
  id: string;
  name: string;
  productIds?: string[];
  eudamed?: { srn?: string; registeredName?: string };
}

interface DiscoveryRow {
  branch: string;
  branchTerm: string;
  cndCode: string;
  cndTerm: string;
  uuid: string;
  basicUdi: string;
  primaryDi: string;
  tradeName: string;
  deviceName: string;
  deviceModel: string;
  manufacturerName: string;
  manufacturerSrn: string;
  riskClass: string;
  legislation: string;
  deviceStatus: string;
  medicalPurpose: string;
  certificateNumbers: string;
  notifiedBodies: string;
  matchStatus: "catalogue-match" | "likely-duplicate" | "missing-candidate" | "manual-review" | "out-of-scope";
  catalogueProductId: string;
  catalogueProductName: string;
  screeningReason: string;
  queryUrl: string;
  detailUrl: string;
}

interface BranchSummary {
  branch: string;
  branchTerm: string;
  codeCount: number;
  terminalCodeCount: number;
  returnedRows: number;
  deduplicatedRows: number;
  filterReliable: boolean;
  note: string;
}

let lastRequestAt = 0;

const wait = (ms: number): Promise<void> => new Promise((resolveWait) => setTimeout(resolveWait, ms));

const cacheKey = (url: string): string => resolve(CACHE_DIR, `${createHash("sha1").update(url).digest("hex")}.json`);

const readCache = (url: string): FetchResult | undefined => {
  if (options.noCache) return undefined;
  const path = cacheKey(url);
  if (!existsSync(path)) return undefined;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as FetchResult;
  } catch {
    return undefined;
  }
};

const writeCache = (url: string, result: FetchResult): void => {
  if (options.noCache || !result.ok) return;
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cacheKey(url), JSON.stringify(result));
};

const getJson = async (url: string, attempt = 0): Promise<FetchResult> => {
  const cached = readCache(url);
  if (cached) return cached;

  const elapsed = Date.now() - lastRequestAt;
  if (elapsed < options.delayMs) await wait(options.delayMs - elapsed);
  lastRequestAt = Date.now();

  let response: Response;
  try {
    response = await fetch(url, {
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        "User-Agent": "DLinRT EUDAMED discovery audit",
      },
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
  if (!text.trim()) return { ok: false, body: null, error: "empty response body" };

  try {
    const result: FetchResult = { ok: true, body: JSON.parse(text) };
    writeCache(url, result);
    return result;
  } catch {
    return { ok: false, body: null, error: "non-JSON response" };
  }
};

const pick = (source: unknown, keys: string[]): string => {
  if (!source || typeof source !== "object") return "";
  const record = source as Record<string, unknown>;
  for (const key of keys) {
    const raw = record[key];
    if (typeof raw === "string" && raw.trim()) return raw.trim();
    if (typeof raw === "number") return String(raw);
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const nested = pick(raw, ["textByDefaultLanguage", "text", "name", "code", "srn", "value"]);
      if (nested) return nested;
    }
    if (Array.isArray(raw) && raw.length > 0) {
      const first = raw[0];
      if (typeof first === "string" && first.trim()) return first.trim();
      const nested = pick(first, ["textByDefaultLanguage", "text", "name", "code", "value"]);
      if (nested) return nested;
    }
  }
  return "";
};

const extractContent = (body: unknown): Record<string, unknown>[] => {
  if (Array.isArray(body)) return body as Record<string, unknown>[];
  if (!body || typeof body !== "object") return [];
  const record = body as Record<string, unknown>;
  for (const key of ["content", "results", "items"]) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate as Record<string, unknown>[];
  }
  return [];
};

const asRecord = (valueToCheck: unknown): Record<string, unknown> =>
  valueToCheck && typeof valueToCheck === "object" && !Array.isArray(valueToCheck)
    ? (valueToCheck as Record<string, unknown>)
    : {};

const shortCode = (raw: string): string => (raw.includes(".") ? raw.split(".").pop() ?? raw : raw);

const normalise = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|limited|gmbh|bv|b\.v\.|nv|ab|as|a\/s|sa|s\.a\.|srl|spa|oy|co|corp|corporation|company|group|holding|medical|healthcare|technologies|technology|systems|laboratories|labs)\b/g, "")
    .replace(/[^a-z0-9]/g, "");

const nameMatches = (a: string, b: string): boolean => {
  const left = normalise(a);
  const right = normalise(b);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
};

const query = (path: string, params: Record<string, string>): string => {
  const search = new URLSearchParams({
    page: "0",
    pageSize: String(options.pageSize),
    size: String(options.pageSize),
    languageIso2Code: "en",
    ...params,
  });
  return `${API_BASE}/${path}?${search.toString()}`;
};

const queryPage = (path: string, params: Record<string, string>, page: number): string => {
  const search = new URLSearchParams({
    page: String(page),
    pageSize: String(options.pageSize),
    size: String(options.pageSize),
    languageIso2Code: "en",
    ...params,
  });
  return `${API_BASE}/${path}?${search.toString()}`;
};

const downloadBuffer = async (url: string): Promise<ArrayBuffer> => {
  const cachePath = resolve(CACHE_DIR, basename(new URL(url).pathname));
  if (!options.noCache && existsSync(cachePath)) return readFileSync(cachePath).buffer.slice(0);

  const result = await fetch(url, { headers: { "User-Agent": "DLinRT EMDN discovery audit" } });
  if (!result.ok) throw new Error(`EMDN workbook download failed: HTTP ${result.status}`);
  const buffer = await result.arrayBuffer();
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cachePath, Buffer.from(buffer));
  return buffer;
};

const loadEmdnCodes = async (): Promise<EmdnCode[]> => {
  const workbook = new ExcelJS.Workbook();
  const buffer = await downloadBuffer(EMDN_DOWNLOAD_URL);
  await workbook.xlsx.load(buffer);
  const sheet = workbook.worksheets[0];
  if (!sheet) throw new Error("EMDN workbook has no worksheet");

  const allRows: EmdnCode[] = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber <= 2) return;
    const code = String(row.getCell(3).value ?? "").trim().toUpperCase();
    if (!code) return;
    const term = String(row.getCell(4).value ?? "").trim();
    const level = Number(row.getCell(5).value ?? 0) || 0;
    const terminal = String(row.getCell(6).value ?? "").trim().toUpperCase() === "YES";
    const branch = options.branches.find((candidate) => code === candidate || code.startsWith(candidate));
    if (!branch) return;
    allRows.push({ branch, branchTerm: "", code, term, level, terminal });
  });

  const branchTerms = new Map(allRows.map((row) => [row.code, row.term]));
  return allRows.map((row) => ({ ...row, branchTerm: branchTerms.get(row.branch) ?? row.branch }));
};

const loadCatalogue = async (): Promise<{ products: CatalogueProduct[]; companies: CatalogueCompany[] }> => {
  const companiesModule = await import(resolve("src/data/companies/index.ts"));
  const productsModule = await import(resolve("src/data/index.ts"));
  const products = (productsModule.ALL_PRODUCTS as CatalogueProduct[]).map((product) => ({
    id: product.id,
    name: product.name,
    company: product.company,
    category: product.category,
    secondaryCategories: product.secondaryCategories ?? [],
    regulatory: product.regulatory,
  }));
  const companies = (companiesModule.COMPANIES as CatalogueCompany[]).map((company) => ({
    id: company.id,
    name: company.name,
    productIds: company.productIds ?? [],
    eudamed: company.eudamed,
  }));
  return { products, companies };
};

const isSoftwareRelevantCode = (code: EmdnCode): boolean =>
  /MEDICAL DEVICE SOFTWARE|SOFTWARE ACCESSORIES|TREATMENT PLANNING SYSTEMS/i.test(code.term);

const pageTotal = (body: unknown): number => {
  if (!body || typeof body !== "object") return 0;
  const raw = (body as Record<string, unknown>).totalElements;
  return typeof raw === "number" ? raw : 0;
};

const lookupCodeDevices = async (code: EmdnCode): Promise<{ rows: Record<string, unknown>[]; reliable: boolean; note: string }> => {
  const firstUrl = queryPage("devices/udiDiData", { cndCode: code.code }, 0);
  const result = await getJson(firstUrl);
  if (!result.ok) return { rows: [], reliable: false, note: result.error ?? "lookup failed" };

  const total = pageTotal(result.body);
  if (total > 100000) {
    return { rows: [], reliable: false, note: `cndCode filter appears ignored; totalElements=${total}` };
  }

  const rows = extractContent(result.body);
  const totalPages = Math.ceil(total / options.pageSize);
  const maxPages = options.limitPages > 0 ? Math.min(totalPages, options.limitPages) : totalPages;
  for (let page = 1; page < maxPages; page += 1) {
    const url = queryPage("devices/udiDiData", { cndCode: code.code }, page);
    const pageResult = await getJson(url);
    if (!pageResult.ok) return { rows, reliable: false, note: `page ${page}: ${pageResult.error}` };
    rows.push(...extractContent(pageResult.body));
  }

  const note = options.limitPages > 0 && totalPages > maxPages ? `limited to ${maxPages}/${totalPages} pages` : "";
  return { rows, reliable: true, note };
};

const detailUrlForUuid = (uuid: string): string => `${API_BASE}/devices/basicUdiData/udiDiData/${encodeURIComponent(uuid)}`;

const lookupDetail = async (uuid: string): Promise<Record<string, unknown>> => {
  if (!uuid || options.enrich === "none") return {};
  const result = await getJson(detailUrlForUuid(uuid));
  if (!result.ok || !result.body || typeof result.body !== "object") return {};
  return result.body as Record<string, unknown>;
};

const textBlob = (row: DiscoveryRow): string =>
  [row.tradeName, row.deviceName, row.deviceModel, row.cndTerm, row.medicalPurpose]
    .join(" ")
    .toLowerCase();

const hasAiCue = (blob: string): boolean =>
  /\b(ai|artificial intelligence|machine learning|deep learning|neural network|autoseg|auto[-\s]?contour|auto[-\s]?seg|segmentation|delineation|synthetic ct|sct|dose prediction|knowledge[-\s]?based|adaptive)\b/i.test(blob);

const hasSoftwareCue = (row: DiscoveryRow, blob: string): boolean =>
  /software|medical device software|treatment planning system|planning|contour|dose|adaptive|synthetic|segmentation|delineation/i.test(
    `${row.cndTerm} ${blob}`
  );

const hasRtCue = (row: DiscoveryRow, blob: string): boolean =>
  row.branch === "Z1101" || /radiotherapy|radiosurgery|radiation therapy|oncology|treatment planning|rt\b/i.test(blob);

const hasOutOfScopeHardwareCue = (blob: string): boolean =>
  /\b(probe|transducer|applicator|catheter|needle|mask|cushion|head support|breast board|phantom|bolus|couch|table|marker|ruler|adapter|cable|power supply|gel|cover|bag|strap|clamp|stand|tray|filter|shield|block cutter|collimator|screw|needle guide)\b/i.test(
    blob
  );

const findCatalogueMatch = (row: DiscoveryRow, products: CatalogueProduct[]): CatalogueProduct | undefined => {
  const exactUdi = products.find((product) => {
    const eudamed = product.regulatory?.ce?.eudamed;
    return Boolean(row.basicUdi && eudamed?.basicUdi && normalise(eudamed.basicUdi) === normalise(row.basicUdi));
  });
  if (exactUdi) return exactUdi;

  const knownAlias = products.find((product) => {
    const candidateName = normalise(`${row.tradeName} ${row.deviceName}`);
    if (product.id === "mvision-ai-contouring" && candidateName.includes("mvisionsegmentationservice")) return true;
    if (
      product.id === "limbus-contour" &&
      normalise(row.manufacturerName).includes("limbusai") &&
      normalise(row.basicUdi).includes("6280113821608q")
    ) {
      return true;
    }
    return false;
  });
  if (knownAlias) return knownAlias;

  return products.find((product) => {
    if (!nameMatches(product.name, row.tradeName || row.deviceName)) return false;
    return nameMatches(product.company, row.manufacturerName);
  });
};

const classifyRow = (row: DiscoveryRow, products: CatalogueProduct[]): DiscoveryRow => {
  const match = findCatalogueMatch(row, products);
  if (match) {
    return {
      ...row,
      matchStatus: "catalogue-match",
      catalogueProductId: match.id,
      catalogueProductName: match.name,
      screeningReason: `matches existing DLinRT product ${match.name}`,
    };
  }

  const blob = textBlob(row);
  const aiCue = hasAiCue(blob);
  const softwareCue = hasSoftwareCue(row, blob);
  const rtCue = hasRtCue(row, blob);
  const hardwareCue = hasOutOfScopeHardwareCue(blob);

  if (aiCue && softwareCue && rtCue && !hardwareCue) {
    return {
      ...row,
      matchStatus: "missing-candidate",
      screeningReason: "EUDAMED record has AI/segmentation/planning wording and radiotherapy context; needs public-source verification before adding.",
    };
  }

  if (softwareCue && rtCue && !hardwareCue) {
    return {
      ...row,
      matchStatus: "manual-review",
      screeningReason: "Radiotherapy software record, but AI/deep-learning use is not disclosed in the EUDAMED row.",
    };
  }

  return {
    ...row,
    matchStatus: "out-of-scope",
    screeningReason: hardwareCue
      ? "Hardware/accessory/probe record; outside DLinRT AI software scope unless an AI clinical function is disclosed elsewhere."
      : "No disclosed AI/deep-learning radiotherapy function in the EUDAMED row.",
  };
};

const buildRow = async (
  code: EmdnCode,
  listRecord: Record<string, unknown>,
  products: CatalogueProduct[],
  shouldEnrich: boolean
): Promise<DiscoveryRow> => {
  const uuid = pick(listRecord, ["uuid"]);
  const detail = shouldEnrich ? await lookupDetail(uuid) : {};
  const manufacturer = asRecord(detail.manufacturer);
  const basicUdi = asRecord(detail.basicUdi);
  const certificates = Array.isArray(detail.deviceCertificateInfoList)
    ? (detail.deviceCertificateInfoList as Record<string, unknown>[])
    : [];

  const row: DiscoveryRow = {
    branch: code.branch,
    branchTerm: code.branchTerm,
    cndCode: code.code,
    cndTerm: code.term,
    uuid,
    basicUdi: pick(basicUdi, ["code"]) || pick(listRecord, ["basicUdi"]),
    primaryDi: pick(listRecord, ["primaryDi"]),
    tradeName: pick(listRecord, ["tradeName"]),
    deviceName: pick(detail, ["deviceName"]) || pick(listRecord, ["deviceName"]),
    deviceModel: pick(detail, ["deviceModel"]) || pick(listRecord, ["deviceModel"]),
    manufacturerName: pick(manufacturer, ["name", "names"]) || pick(listRecord, ["manufacturerName"]),
    manufacturerSrn: pick(manufacturer, ["srn"]) || pick(listRecord, ["manufacturerSrn", "mfOrPrSrn"]),
    riskClass: shortCode(pick(detail, ["riskClass"]) || pick(listRecord, ["riskClass"])),
    legislation: shortCode(pick(detail, ["legislation"]) || pick(listRecord, ["applicableLegislation"])),
    deviceStatus: shortCode(pick(listRecord, ["deviceStatusType", "versionState"])),
    medicalPurpose: pick(detail, ["medicalPurpose"]),
    certificateNumbers: certificates.map((c) => pick(c, ["certificateNumber"])).filter(Boolean).join(" | "),
    notifiedBodies: certificates.map((c) => pick(c, ["notifiedBodySrn", "notifiedBodyName"])).filter(Boolean).join(" | "),
    matchStatus: "out-of-scope",
    catalogueProductId: "",
    catalogueProductName: "",
    screeningReason: "",
    queryUrl: query("devices/udiDiData", { cndCode: code.code }),
    detailUrl: uuid ? detailUrlForUuid(uuid) : "",
  };
  return classifyRow(row, products);
};

const dedupeRows = (rows: DiscoveryRow[]): DiscoveryRow[] => {
  const seen = new Set<string>();
  const deduped: DiscoveryRow[] = [];
  for (const row of rows) {
    const key = row.basicUdi || row.uuid || `${row.primaryDi}|${row.cndCode}|${row.tradeName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
  }
  return deduped;
};

const csvCell = (raw: string | number | boolean): string => {
  const text = String(raw ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const CSV_HEADERS = [
  "branch",
  "branch_term",
  "cnd_code",
  "cnd_term",
  "match_status",
  "catalogue_product_id",
  "catalogue_product_name",
  "trade_name",
  "device_name",
  "device_model",
  "manufacturer_name",
  "manufacturer_srn",
  "risk_class",
  "legislation",
  "device_status",
  "basic_udi",
  "primary_di",
  "medical_purpose",
  "certificate_numbers",
  "notified_bodies",
  "screening_reason",
  "query_url",
  "detail_url",
];

const toCsv = (rows: DiscoveryRow[]): string =>
  [
    CSV_HEADERS.join(","),
    ...rows.map((row) =>
      [
        row.branch,
        row.branchTerm,
        row.cndCode,
        row.cndTerm,
        row.matchStatus,
        row.catalogueProductId,
        row.catalogueProductName,
        row.tradeName,
        row.deviceName,
        row.deviceModel,
        row.manufacturerName,
        row.manufacturerSrn,
        row.riskClass,
        row.legislation,
        row.deviceStatus,
        row.basicUdi,
        row.primaryDi,
        row.medicalPurpose,
        row.certificateNumbers,
        row.notifiedBodies,
        row.screeningReason,
        row.queryUrl,
        row.detailUrl,
      ]
        .map(csvCell)
        .join(",")
    ),
  ].join("\n");

const countByStatus = (rows: DiscoveryRow[]): Record<DiscoveryRow["matchStatus"], number> => {
  const counts: Record<DiscoveryRow["matchStatus"], number> = {
    "catalogue-match": 0,
    "likely-duplicate": 0,
    "missing-candidate": 0,
    "manual-review": 0,
    "out-of-scope": 0,
  };
  for (const row of rows) counts[row.matchStatus] += 1;
  return counts;
};

const mdTable = (rows: DiscoveryRow[], columns: Array<[string, (row: DiscoveryRow) => string]>): string => {
  if (rows.length === 0) return "_None._";
  const head = `| ${columns.map(([heading]) => heading).join(" | ")} |`;
  const sep = `|${columns.map(() => "---").join("|")}|`;
  const body = rows.map((row) => `| ${columns.map(([, getter]) => getter(row).replace(/\|/g, "\\|")).join(" | ")} |`);
  return [head, sep, ...body].join("\n");
};

const toMarkdown = (date: string, rows: DiscoveryRow[], branchSummaries: BranchSummary[], emdnCodes: EmdnCode[]): string => {
  const counts = countByStatus(rows);
  const candidates = rows.filter((row) => row.matchStatus === "missing-candidate" || row.matchStatus === "manual-review");
  const matched = rows.filter((row) => row.matchStatus === "catalogue-match");
  const branchLines = branchSummaries
    .map(
      (summary) =>
        `| ${summary.branch} | ${summary.branchTerm} | ${summary.codeCount} | ${summary.terminalCodeCount} | ${summary.returnedRows} | ${summary.deduplicatedRows} | ${summary.filterReliable ? "yes" : "no"} | ${summary.note || "—"} |`
    )
    .join("\n");
  const terminalScope = emdnCodes
    .filter((code) => code.terminal)
    .map((code) => `- ${code.code} — ${code.term}`)
    .join("\n");

  return `# EUDAMED EMDN discovery sweep — ${date}

Read-only discovery sweep against the public EUDAMED API (\`${API_BASE}\`) using the official EMDN workbook downloaded from the European Commission EMDN page. EMDN is the nomenclature used for device registration in EUDAMED.

> **Educational reference only.** This report records public registration metadata and screening leads. It is not a regulatory determination and does not mean any product is clinically validated.

## Scope

- EMDN source: ${EMDN_PUBLIC_PAGE_URL}
- Workbook: ${EMDN_DOWNLOAD_URL}
- Branches: ${options.branches.join(", ")}
- Catalogue rule applied: include only products with disclosed AI/deep-learning use in a core radiotherapy function. CE registration alone is not sufficient.
- EUDAMED caveat: device registration becomes mandatory on ${MANDATORY_FROM}; absence from EUDAMED is not proof that a CE mark is absent.

## Branch summary

| Branch | Official term | Codes in branch | Terminal codes | Returned rows | Deduplicated rows | Filter reliable | Note |
|---|---|---:|---:|---:|---:|---|---|
${branchLines}

## Screening summary

| Status | Count | Meaning |
|---|---:|---|
| catalogue-match | ${counts["catalogue-match"]} | Already represented in DLinRT by Basic UDI-DI or manufacturer/name match |
| missing-candidate | ${counts["missing-candidate"]} | EUDAMED row contains AI/segmentation/planning wording and needs public-source verification |
| manual-review | ${counts["manual-review"]} | Radiotherapy software row, but AI/deep-learning use is not disclosed in EUDAMED |
| out-of-scope | ${counts["out-of-scope"]} | Hardware/accessory/general ultrasound/non-AI record by row wording |

## Missing candidates and manual-review rows

${mdTable(candidates, [
    ["Status", (row) => row.matchStatus],
    ["Trade name", (row) => row.tradeName || row.deviceName || "—"],
    ["Manufacturer", (row) => row.manufacturerName || "—"],
    ["Branch", (row) => row.branch],
    ["EMDN code", (row) => row.cndCode],
    ["Risk", (row) => row.riskClass || "—"],
    ["Basic UDI-DI", (row) => row.basicUdi || "—"],
    ["Reason", (row) => row.screeningReason],
    ["EUDAMED", (row) => `[query](${row.queryUrl})${row.detailUrl ? ` · [detail](${row.detailUrl})` : ""}`],
  ])}

## Existing catalogue matches

${mdTable(matched.slice(0, 80), [
    ["Trade name", (row) => row.tradeName || row.deviceName || "—"],
    ["Manufacturer", (row) => row.manufacturerName || "—"],
    ["DLinRT product", (row) => row.catalogueProductName || row.catalogueProductId || "—"],
    ["EMDN code", (row) => row.cndCode],
    ["Basic UDI-DI", (row) => row.basicUdi || "—"],
  ])}

${matched.length > 80 ? `_${matched.length - 80} additional catalogue matches are in the CSV/JSON outputs._` : ""}

## EMDN terminal scope checked

${terminalScope}

## Catalogue action

Do not add products from this report automatically. Add only rows that pass a separate source review confirming: (1) AI/deep-learning is used, (2) the function is a core radiotherapy task, and (3) intended use and regulatory identity can be traced to disclosed sources.
`;
};

const main = async (): Promise<void> => {
  const [{ products }, emdnCodes] = await Promise.all([loadCatalogue(), loadEmdnCodes()]);
  const terminalCodes = emdnCodes.filter((code) => code.terminal);
  const sweepCodes = options.allTerminalCodes ? terminalCodes : terminalCodes.filter(isSoftwareRelevantCode);
  const targetCodes = options.limitCodes > 0 ? sweepCodes.slice(0, options.limitCodes) : sweepCodes;
  const summaries = new Map<string, BranchSummary>();
  const allRows: DiscoveryRow[] = [];

  for (const branch of options.branches) {
    const branchCodes = emdnCodes.filter((code) => code.branch === branch);
    const branchTerm = branchCodes.find((code) => code.code === branch)?.term ?? branch;
    summaries.set(branch, {
      branch,
      branchTerm,
      codeCount: branchCodes.length,
      terminalCodeCount: branchCodes.filter((code) => code.terminal).length,
      returnedRows: 0,
      deduplicatedRows: 0,
      filterReliable: true,
      note: "",
    });
  }

  console.log(
    `EUDAMED EMDN discovery: ${targetCodes.length}/${terminalCodes.length} terminal codes in ${options.branches.join(", ")} ` +
      `(${options.allTerminalCodes ? "all terminal codes" : "software-relevant codes"}; ` +
      `delay ${options.delayMs}ms, cache ${options.noCache ? "off" : "on"}, enrich ${options.enrich})`
  );

  for (const [index, code] of targetCodes.entries()) {
    const lookup = await lookupCodeDevices(code);
    const summary = summaries.get(code.branch);
    if (summary) {
      summary.returnedRows += lookup.rows.length;
      summary.filterReliable = summary.filterReliable && lookup.reliable;
      if (lookup.note) summary.note = [summary.note, `${code.code}: ${lookup.note}`].filter(Boolean).join("; ");
    }

    const listRows = lookup.rows;
    console.log(`  [${index + 1}/${targetCodes.length}] ${code.code} → ${listRows.length}${lookup.reliable ? "" : ` (${lookup.note})`}`);

    for (const listRecord of listRows) {
      const preliminary: DiscoveryRow = {
        branch: code.branch,
        branchTerm: code.branchTerm,
        cndCode: code.code,
        cndTerm: code.term,
        uuid: pick(listRecord, ["uuid"]),
        basicUdi: pick(listRecord, ["basicUdi"]),
        primaryDi: pick(listRecord, ["primaryDi"]),
        tradeName: pick(listRecord, ["tradeName"]),
        deviceName: pick(listRecord, ["deviceName"]),
        deviceModel: pick(listRecord, ["deviceModel"]),
        manufacturerName: pick(listRecord, ["manufacturerName"]),
        manufacturerSrn: pick(listRecord, ["manufacturerSrn", "mfOrPrSrn"]),
        riskClass: shortCode(pick(listRecord, ["riskClass"])),
        legislation: shortCode(pick(listRecord, ["applicableLegislation"])),
        deviceStatus: shortCode(pick(listRecord, ["deviceStatusType", "versionState"])),
        medicalPurpose: "",
        certificateNumbers: "",
        notifiedBodies: "",
        matchStatus: "out-of-scope",
        catalogueProductId: "",
        catalogueProductName: "",
        screeningReason: "",
        queryUrl: query("devices/udiDiData", { cndCode: code.code }),
        detailUrl: pick(listRecord, ["uuid"]) ? detailUrlForUuid(pick(listRecord, ["uuid"])) : "",
      };
      const classified = classifyRow(preliminary, products);
      const shouldEnrich =
        options.enrich === "all" ||
        (options.enrich === "candidates" && classified.matchStatus !== "out-of-scope");
      allRows.push(await buildRow(code, listRecord, products, shouldEnrich));
    }
  }

  const deduped = dedupeRows(allRows);
  for (const summary of summaries.values()) {
    summary.deduplicatedRows = deduped.filter((row) => row.branch === summary.branch).length;
  }

  deduped.sort((a, b) =>
    `${a.matchStatus}|${a.branch}|${a.manufacturerName}|${a.tradeName}`.localeCompare(
      `${b.matchStatus}|${b.branch}|${b.manufacturerName}|${b.tradeName}`
    )
  );

  const date = new Date().toISOString().slice(0, 10);
  if (options.json) {
    console.log(JSON.stringify({ date, branchSummaries: [...summaries.values()], rows: deduped }, null, 2));
    return;
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const mdPath = resolve(OUT_DIR, `${date}-eudamed-emdn-discovery.md`);
  const csvPath = resolve(OUT_DIR, `${date}-eudamed-emdn-discovery.csv`);
  const jsonPath = resolve(OUT_DIR, `${date}-eudamed-emdn-discovery.json`);
  writeFileSync(mdPath, toMarkdown(date, deduped, [...summaries.values()], emdnCodes));
  writeFileSync(csvPath, toCsv(deduped));
  writeFileSync(jsonPath, JSON.stringify({ date, branchSummaries: [...summaries.values()], rows: deduped }, null, 2));

  const counts = countByStatus(deduped);
  console.log(`\nRows: ${deduped.length}`);
  console.log(`Catalogue matches: ${counts["catalogue-match"]}`);
  console.log(`Missing candidates: ${counts["missing-candidate"]}`);
  console.log(`Manual review: ${counts["manual-review"]}`);
  console.log(`Out of scope: ${counts["out-of-scope"]}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`Wrote ${csvPath}`);
  console.log(`Wrote ${jsonPath}`);
};

main().catch((error) => {
  console.error("EUDAMED EMDN discovery failed:", error);
  process.exit(1);
});
