export type CertificationStatus = "valid" | "outdated";

export interface VerificationRecord {
  product_id: string;
  verified_at: string;
  content_hash: string | null;
}

export interface ProductVerification {
  verifiedAt: string;
  status: CertificationStatus;
}

/** Keep only the most recent certification per product. */
export function latestVerifications(rows: VerificationRecord[]): Map<string, VerificationRecord> {
  const latest = new Map<string, VerificationRecord>();
  for (const row of rows) {
    if (!row.verified_at) continue;
    const prev = latest.get(row.product_id);
    if (!prev || new Date(row.verified_at) > new Date(prev.verified_at)) latest.set(row.product_id, row);
  }
  return latest;
}

/**
 * Hash match wins; legacy rows without a hash fall back to comparing lastRevised
 * with the certification date.
 */
export function resolveCertificationStatus(
  record: VerificationRecord,
  currentHash: string | null,
  lastRevised?: string,
): CertificationStatus {
  if (record.content_hash) {
    return currentHash === record.content_hash ? "valid" : "outdated";
  }
  if (lastRevised && new Date(lastRevised) > new Date(record.verified_at)) return "outdated";
  return "valid";
}

export function countVerified(
  productIds: string[],
  verifications: Map<string, ProductVerification>,
): { valid: number; outdated: number } {
  let valid = 0;
  let outdated = 0;
  for (const id of productIds) {
    const v = verifications.get(id);
    if (v?.status === "valid") valid++;
    if (v?.status === "outdated") outdated++;
  }
  return { valid, outdated };
}
