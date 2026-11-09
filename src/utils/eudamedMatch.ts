/** Pure matching helpers for the EUDAMED Data Lake verification script. */

export interface DatalakeUdiRecord {
  TRADE_NAME?: string | null;
  DEVICE_NAME?: string | null;
  DEVICE_MODEL?: string | null;
  BASIC_UDI?: string | null;
  PRIMARY_DI?: string | null;
  NOMENCLATURE_CODE?: string | null;
  MF_SRN?: string | null;
  MF_NAME?: string | null;
  ACTIVE?: number | null;
}

export type UdiMatchType = "exact" | "candidate";

export interface UdiMatch {
  record: DatalakeUdiRecord;
  matchType: UdiMatchType;
  matchedOn: string;
}

const STOP_WORDS = new Set(["the", "ai", "rt", "software", "system", "by", "and"]);

/** Lower-case, strip diacritics/trademarks/punctuation, collapse whitespace. */
export const normalizeDeviceName = (raw?: string | null): string =>
  (raw ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[®™©]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();

const tokens = (s: string): string[] => s.split(" ").filter((t) => t.length > 1 && !STOP_WORDS.has(t));

/**
 * "exact": a registered trade/device name equals a catalogue name after normalisation.
 * "candidate": all significant catalogue tokens appear in the registered name (report only).
 */
export const matchUdiRecords = (names: string[], records: DatalakeUdiRecord[]): UdiMatch[] => {
  const wanted = [...new Set(names.map(normalizeDeviceName).filter(Boolean))];
  const out: UdiMatch[] = [];
  for (const record of records) {
    if (!record.BASIC_UDI) continue;
    const fields = [record.TRADE_NAME, record.DEVICE_NAME].map(normalizeDeviceName).filter(Boolean);
    const exact = wanted.find((w) => fields.includes(w));
    if (exact) {
      out.push({ record, matchType: "exact", matchedOn: exact });
      continue;
    }
    const partial = wanted.find((w) => {
      const t = tokens(w);
      return t.length > 0 && fields.some((f) => t.every((tok) => tokens(f).includes(tok)));
    });
    if (partial) out.push({ record, matchType: "candidate", matchedOn: partial });
  }
  return out;
};

/** EUDAMED publishes EMDN codes with stray whitespace, e.g. " Z11010180". */
export const cleanEmdnCode = (raw?: string | null): string | undefined => {
  const code = (raw ?? "").trim();
  return code || undefined;
};

/** Only manufacturer actors (SRN "XX-MF-…") own device registrations. */
export const isManufacturerSrn = (srn?: string | null): boolean => /^[A-Z]{2}-MF-\d+$/.test(srn ?? "");
