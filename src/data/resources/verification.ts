/**
 * Verification metadata for the Resources & Compliance page.
 *
 * Every regulatory card, standard, core document and library link carries a
 * `lastVerified` date so readers can judge how current the information is.
 * Dates are ISO `YYYY-MM-DD` strings and are formatted for display in one place.
 */

export type VerificationStatus =
  | 'in-force'
  | 'proposal'
  | 'guidance'
  | 'standard'
  | 'superseded';

export interface VerificationMeta {
  /** ISO date (YYYY-MM-DD) on which the item, its URL and its claims were last checked. */
  lastVerified: string;
  /** Edition, regulation number, revision or document reference. */
  version?: string;
  /** Legal / editorial status of the referenced item. */
  status?: VerificationStatus;
  /** Short qualifier shown in the tooltip (e.g. "not in force"). */
  note?: string;
}

/** Date of the most recent full audit of the Resources & Compliance page. */
export const RESOURCES_LAST_AUDIT = '2026-07-31';

const STATUS_LABELS: Record<VerificationStatus, string> = {
  'in-force': 'In force',
  proposal: 'Proposal — not in force',
  guidance: 'Guidance',
  standard: 'Standard',
  superseded: 'Superseded',
};

export const formatVerifiedDate = (isoDate: string): string => {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const statusLabel = (status?: VerificationStatus): string | undefined =>
  status ? STATUS_LABELS[status] : undefined;

/** Most recent verification date across a set of items. */
export const latestVerified = (items: Array<{ lastVerified?: string }>): string => {
  const dates = items
    .map((item) => item.lastVerified)
    .filter((value): value is string => Boolean(value));
  if (dates.length === 0) return RESOURCES_LAST_AUDIT;
  return dates.reduce((a, b) => (a > b ? a : b));
};
