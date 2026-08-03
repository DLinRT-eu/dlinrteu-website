## What's actually wrong

Verified by reading the files:

- 18 entries carry `lastVerified` / audit date **2026-08-04**, which is in the future (today is 3 Aug 2026): `src/data/initiatives/verification.ts` (`INITIATIVES_LAST_AUDIT`), 16 entries in `src/data/initiatives/challenges.ts`, 1 in `src/data/initiatives/datasets.ts`, and the FLI AI Safety Index entry in `src/components/resources/ResourceLinks.tsx`.
- **31 July 2026 is a real date** — July has 31 days — so `RESOURCES_LAST_AUDIT = '2026-07-31'` in `src/data/resources/verification.ts` is valid and stays as is. Same for the Therapanacea `2026-07-30` stamps.
- Both date formatters (`formatInitiativeDate`, `formatVerifiedDate`) render with `timeZone: 'UTC'`. For a CET/CEST reader this can show the previous day around midnight.

## Changes

1. Replace every `2026-08-04` verification date with **`2026-08-03`** (today) across:
   - `src/data/initiatives/verification.ts`
   - `src/data/initiatives/challenges.ts` (16 entries)
   - `src/data/initiatives/datasets.ts`
   - `src/components/resources/ResourceLinks.tsx` (AI Safety Index)
   Note: `startDate: "2026-07-13"` for the COBRA entry is a challenge date, not a verification stamp — left untouched.
2. Switch both formatters to `timeZone: 'Europe/Amsterdam'` so displayed dates match the maintainer's local calendar day.
3. Add a small dev-only sanity guard: a shared helper that warns (console, dev builds only) if a `lastVerified` date is in the future, so future-dated stamps get caught immediately instead of shipping.

## Technical notes

- Dates are stored as ISO `YYYY-MM-DD` strings; only string values change, no schema change.
- The guard lives next to the existing helpers in `src/data/resources/verification.ts` and is re-used by the initiatives formatter — no new dependency, no runtime cost in production.
