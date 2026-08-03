/**
 * Verification metadata for the Research Initiatives page.
 *
 * Challenges, datasets and model zoos are re-checked periodically against their
 * official websites. `lastVerified` on an initiative records the date its status,
 * link and claims were last confirmed.
 */

/** Date of the most recent full audit of the Research Initiatives page. */
export const INITIATIVES_LAST_AUDIT = '2026-08-03';

export const formatInitiativeDate = (isoDate: string): string => {
  const parsed = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  assertNotFutureDate(isoDate, 'initiative lastVerified');
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: VERIFICATION_TIME_ZONE,
  });
};
