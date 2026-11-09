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
const delayMs = Number(value("delay") ?? "400") || 400;

interface ActorRecord {
  ACTOR_ID?: string;
  NAME?: string;
  ACTOR_TYPE?: string;
  STATUS?: string;
  ACT_COUNTRY_ISO2_CODE?: string;
}

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
  for (const name of nameVariants(company)) {
    const actors = await getAll<ActorRecord>(buildUrl("actors", { NAME: name }));
    for (const a of actors) if (a.ACTOR_ID && isManufacturerSrn(a.ACTOR_ID)) found.set(a.ACTOR_ID, a);
    if (found.size > 0 && !company.eudamed?.srn) break;
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
          if (m.matchType !== "exact" || !product.id) continue;
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
