/**
 * EUDAMED Data Lake verification.
 *
 * 1. Resolves each catalogue company to its EU manufacturer SRN(s) via
 *    GET /eudamed/actors (exact legal-name match; existing company SRNs are reused).
 * 2. Fetches every UDI-DI registered under those SRNs via GET /eudamed/udi.
 * 3. Cross-checks registered trade/device names against catalogue product names
 *    and reports the EMDN nomenclature code and Basic UDI-DI.
 *
 * Only exact name matches are written to `src/data/eudamed/udiVerified.json`,
 * which the product page displays. Partial matches are report-only candidates
 * for manual review. Absence from EUDAMED is NOT evidence of a missing CE mark.
 *
 * Usage:
 *   bun scripts/verify-eudamed.ts [--company="Elekta"] [--delay=500] [--dry-run]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ALL_PRODUCTS } from "../src/data";
import { COMPANIES } from "../src/data/companies";
import type { ProductDetails } from "../src/types/productDetails";
import {
  cleanEmdnCode,
  isManufacturerSrn,
  matchUdiRecords,
  type DatalakeUdiRecord,
  type UdiMatch,
} from "../src/utils/eudamedMatch";

const API = "https://api.datalake.sante.service.ec.europa.eu/eudamed";
const API_VERSION = "v1.0";
const OUT_JSON = resolve("src/data/eudamed/udiVerified.json");
const OUT_DIR = resolve("docs/audits/eudamed");
const TODAY = new Date().toISOString().slice(0, 10);

const args = process.argv.slice(2);
const value = (name: string): string | undefined =>
  args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3).replace(/^"|"$/g, "");
const dryRun = args.includes("--dry-run");
const onlyCompany = value("company")?.toLowerCase();
const delayMs = Number(value("delay") ?? "250") || 250;

interface ActorRecord {
  ACTOR_ID?: string;
  NAME?: string;
  ACTOR_TYPE?: string;
  STATUS?: string;
  ACT_COUNTRY_ISO2_CODE?: string;
}

/**
 * Manufacturer SRNs found by searching the full EUDAMED actor list for each company's
 * legal-entity names (searched 2026-11-09). Exact NAME filters miss these because the
 * registered legal name differs (e.g. " THERAPANACEA" with a leading space).
 */
const KNOWN_SRNS: Record<string, Array<{ srn: string; name: string }>> = {
  Therapanacea: [{ srn: "FR-MF-000007672", name: "THERAPANACEA" }],
  Philips: [
    { srn: "NL-MF-000001489", name: "Philips Medical Systems Nederland B.V." },
    { srn: "DE-MF-000005362", name: "Philips Medical Systems DMC GmbH" },
    { srn: "US-MF-000008701", name: "Philips Medical Systems (Cleveland), Inc." },
    { srn: "US-MF-000002163", name: "Philips Medical Systems (Cleveland), Inc." },
    { srn: "CN-MF-000003923", name: "Philips Healthcare (Suzhou) Co., Ltd." },
    { srn: "US-MF-000033010", name: "Philips North America LLC" },
  ],
  "GE Healthcare": [
    { srn: "FR-MF-000035870", name: "GE Medical Systems SCS" },
    { srn: "FR-MF-000000687", name: "GE Medical Systems SCS" },
    { srn: "JP-MF-000009291", name: "GE Healthcare Japan Corporation" },
    { srn: "DE-MF-000005087", name: "GE Healthcare GmbH" },
    { srn: "IL-MF-000039390", name: "GE Medical Systems Israel Ltd." },
    { srn: "CN-MF-000001725", name: "GE Healthcare Tianjin Company Limited" },
  ],
  "Siemens Healthineers": [
    { srn: "DE-MF-000006122", name: "Siemens Healthcare GmbH" },
    { srn: "US-MF-000012284", name: "Siemens Medical Solutions USA Inc." },
    { srn: "CN-MF-000013436", name: "Siemens Shenzhen Magnetic Resonance Ltd." },
  ],
  "Varian (Siemens Healthineers)": [
    { srn: "US-MF-000007453", name: "Varian Medical Systems, Inc." },
    { srn: "US-MF-000001784", name: "Varian Medical Systems, Inc." },
    { srn: "DE-MF-000017075", name: "Varian Medical Systems München GmbH" },
  ],
  Elekta: [
    { srn: "SE-MF-000002125", name: "Elekta Solutions AB" },
    { srn: "GB-MF-000004884", name: "Elekta Limited" },
    { srn: "US-MF-000004146", name: "Elekta Inc." },
    { srn: "US-MF-000004507", name: "Elekta Inc." },
  ],
  "Canon Medical Systems": [
    { srn: "JP-MF-000011499", name: "Canon Medical Systems Corporation" },
    { srn: "DK-MF-000019622", name: "Canon Medical Informatics A/S" },
  ],
  "United Imaging": [
    { srn: "CN-MF-000008501", name: "Shanghai United Imaging Healthcare Co.,Ltd." },
    { srn: "CN-MF-000035682", name: "Shanghai United Imaging Intelligence Co., Ltd." },
    { srn: "CN-MF-000030896", name: "Wuhan United Imaging Healthcare Co., Ltd." },
  ],
  "Mirada Medical": [{ srn: "GB-MF-000008724", name: "Mirada Medical Limited" }],
  MedCom: [{ srn: "DE-MF-000020585", name: "MedCom Gesellschaft für medizinische Bildverarbeitung mbH" }],
  "Accuray®": [{ srn: "US-MF-000010238", name: "Accuray Incorporated" }],
  "Sun Nuclear (Mirion Medical)": [
    { srn: "US-MF-000021541", name: "Sun Nuclear Corporation" },
    { srn: "US-MF-000020245", name: "Sun Nuclear Corporation" },
  ],
  Brainlab: [{ srn: "DE-MF-000006183", name: "Brainlab SE" }],
  "Quanta Computer Inc.": [{ srn: "TW-MF-000022042", name: "Quanta Computer Inc." }],
  "Limbus AI": [{ srn: "CA-MF-000025514", name: "Limbus AI Inc." }],
};

/**
 * Near-matches confirmed by the site editor; written as verified so they survive reruns.
 */
const CONFIRMED_CANDIDATES: Array<{ productId: string; basicUdi: string; confirmedOn: string }> = [
  { productId: "manteia-accucontour", basicUdi: "697312740AccuContourLTQ3", confirmedOn: "2026-11-09" },
  { productId: "mvision-ai-contouring", basicUdi: "64298300642AISEG1.2SZ", confirmedOn: "2026-11-09" },
  { productId: "synaptiq-mediq-rt", basicUdi: "42700043558MediqOS4W", confirmedOn: "2026-11-09" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const buildUrl = (path: string, params: Record<string, string>): string => {
  const qs = new URLSearchParams({ ...params, format: "json", "api-version": API_VERSION });
  return `${API}/${path}?${qs.toString()}`;
};

async function getAll<T>(url: string): Promise<T[]> {
  const rows: T[] = [];
  let next: string | undefined = url;
  while (next) {
    await sleep(delayMs);
    const res = await fetch(next, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${next}`);
    const body = (await res.json()) as { value?: T[]; "@odata.nextLink"?: string; nextLink?: string };
    rows.push(...(body.value ?? []));
    next = body["@odata.nextLink"] ?? body.nextLink;
  }
  return rows;
}

/** Legal-name variants to try against the exact-match NAME filter. */
const nameVariants = (company: (typeof COMPANIES)[number]): string[] => {
  const base = [company.eudamed?.registeredName, company.name].filter(Boolean) as string[];
  const suffixes = ["", " AB", " Oy", " Inc.", " Ltd", " GmbH", " SAS", " B.V.", " AG", " LLC", " Co., Ltd."];
  return [...new Set(base.flatMap((n) => suffixes.map((s) => `${n}${s}`)))];
};

async function resolveSrns(company: (typeof COMPANIES)[number]): Promise<ActorRecord[]> {
  const found = new Map<string, ActorRecord>();
  if (company.eudamed?.srn && isManufacturerSrn(company.eudamed.srn)) {
    found.set(company.eudamed.srn, { ACTOR_ID: company.eudamed.srn, NAME: company.eudamed.registeredName });
  }
  for (const k of KNOWN_SRNS[company.name] ?? []) found.set(k.srn, { ACTOR_ID: k.srn, NAME: k.name });
  for (const name of nameVariants(company)) {
    const actors = await getAll<ActorRecord>(buildUrl("actors", { NAME: name }));
    for (const a of actors) if (a.ACTOR_ID && isManufacturerSrn(a.ACTOR_ID)) found.set(a.ACTOR_ID, a);
  }
  return [...found.values()];
}

const productNames = (p: ProductDetails): string[] => {
  const history = ((p as unknown as { nameHistory?: Array<{ name?: string }> }).nameHistory ?? [])
    .map((h) => h.name)
    .filter(Boolean) as string[];
  return [p.name, ...history];
};

interface VerifiedEntry {
  basicUdi: string;
  primaryDi?: string;
  emdnCode?: string;
  registeredTradeName?: string;
  manufacturerSrn?: string;
  manufacturerName?: string;
  sourceUrl: string;
  lastVerified: string;
}

async function main() {
  const verified: Record<string, VerifiedEntry[]> = {};
  const report: string[] = [
    `# EUDAMED Data Lake verification — ${TODAY}`,
    "",
    "Source: EUDAMED public Data Lake API (DG SANTE). Exact name matches are shown on product pages;",
    "candidates need manual confirmation. Absence from EUDAMED is not evidence of a missing CE mark.",
    "",
  ];
  const csv: string[] = ["company,srn,product_id,product_name,match,registered_trade_name,basic_udi,primary_di,emdn"];

  const companies = COMPANIES.filter((c) => !onlyCompany || c.name.toLowerCase().includes(onlyCompany));
  for (const company of companies) {
    let actors: ActorRecord[] = [];
    try {
      actors = await resolveSrns(company);
    } catch (e) {
      report.push(`## ${company.name}\n- Actor lookup failed: ${(e as Error).message}\n`);
      continue;
    }
    report.push(`## ${company.name}`);
    if (actors.length === 0) {
      report.push("- No manufacturer SRN found by exact legal name.\n");
      continue;
    }
    report.push(`- SRN: ${actors.map((a) => `${a.ACTOR_ID} (${a.NAME ?? "?"})`).join("; ")}`);

    const products = ALL_PRODUCTS.filter((p) => company.productIds.includes(p.id ?? ""));
    for (const actor of actors) {
      const udiUrl = buildUrl("udi", { MF_SRN: actor.ACTOR_ID! });
      const records = await getAll<DatalakeUdiRecord>(udiUrl);
      report.push(`- ${actor.ACTOR_ID}: ${records.length} UDI-DI records`);
      for (const product of products) {
        const matches: UdiMatch[] = matchUdiRecords(productNames(product), records);
        if (matches.length === 0) continue;
        const seen = new Set<string>();
        for (const m of matches) {
          const key = `${m.matchType}:${m.record.BASIC_UDI}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const emdn = cleanEmdnCode(m.record.NOMENCLATURE_CODE);
          report.push(
            `  - [${m.matchType}] ${product.name} ↔ "${m.record.TRADE_NAME ?? m.record.DEVICE_NAME}" · Basic UDI-DI ${m.record.BASIC_UDI} · EMDN ${emdn ?? "—"}`
          );
          csv.push(
            [company.name, actor.ACTOR_ID, product.id, product.name, m.matchType, m.record.TRADE_NAME ?? "", m.record.BASIC_UDI, m.record.PRIMARY_DI ?? "", emdn ?? ""]
              .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
              .join(",")
          );
          const confirmed = CONFIRMED_CANDIDATES.some(
            (c) => c.productId === product.id && c.basicUdi === m.record.BASIC_UDI
          );
          if ((m.matchType !== "exact" && !confirmed) || !product.id) continue;
          const list = (verified[product.id] ??= []);
          if (list.some((v) => v.basicUdi === m.record.BASIC_UDI)) continue;
          list.push({
            basicUdi: m.record.BASIC_UDI!,
            primaryDi: m.record.PRIMARY_DI ?? undefined,
            emdnCode: emdn,
            registeredTradeName: m.record.TRADE_NAME ?? m.record.DEVICE_NAME ?? undefined,
            manufacturerSrn: actor.ACTOR_ID,
            manufacturerName: m.record.MF_NAME ?? actor.NAME,
            sourceUrl: buildUrl("udi", { BASIC_UDI: m.record.BASIC_UDI! }),
            lastVerified: TODAY,
          });
        }
      }
    }
    report.push("");
    console.log(`${company.name}: ${actors.length} SRN(s)`);
  }

  const total = Object.keys(verified).length;
  report.splice(5, 0, `**Products with an exact EUDAMED match: ${total}**`, "");
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, `datalake-verification-${TODAY}.md`), report.join("\n"));
  writeFileSync(resolve(OUT_DIR, `datalake-verification-${TODAY}.csv`), csv.join("\n"));
  if (!dryRun && !onlyCompany) {
    mkdirSync(resolve("src/data/eudamed"), { recursive: true });
    writeFileSync(OUT_JSON, JSON.stringify({ generatedOn: TODAY, products: verified }, null, 2) + "\n");
  }
  console.log(`Exact matches: ${total} products. Report in ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
