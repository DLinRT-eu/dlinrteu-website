## Goal
On `/admin/companies`, ensure (a) all companies — including pipeline-only ones — are listed, and (b) up to 10 representatives per company is the consistent limit everywhere it's surfaced.

## Findings
- **Pipeline companies already included.** `src/pages/admin/CompanyManagement.tsx` iterates over `COMPANIES` from `@/data`, which is the union of all category company files. Pipeline-only vendors (Therapanacea, MedLever, Neuralrad, etc.) already live in those files, so they show up in both the Overview and All Companies tabs. No data wiring change needed.
- **10-rep limit partially applied.** The hard checks in `CompanyManagement.tsx` (`handleAssignUser`) and `CompanyGuide.tsx` already say 10. But several user-facing strings still say "5":
  - `src/pages/admin/CompanyManagement.tsx`
    - L625: description "maximum of 5 verified representatives"
    - L734–735: badge `{verifiedCount}/5 verified` and variant threshold `>= 5`
    - L740, L751: invite/assign buttons disabled at `>= 5`
  - `src/pages/About.tsx` L298: "Max 5 representatives per company"
  - `src/pages/Roles.tsx` L192: "Max 5 representatives per company."

## Changes
1. **`src/pages/admin/CompanyManagement.tsx`** — replace every remaining `5` rep-limit reference with `10`:
   - Description text on the All Companies tab → "maximum of 10 verified representatives".
   - Badge label → `{verifiedCount}/10 verified`, badge variant threshold → `>= 10`.
   - Both invite/assign button `disabled` checks → `>= 10`.
2. **`src/pages/About.tsx`** L298 → "Max 10 representatives per company".
3. **`src/pages/Roles.tsx`** L192 → "Max 10 representatives per company."

## Out of scope
- No DB schema / RLS changes (there's no DB-side cap on rep count; the limit is enforced in app code).
- No changes to the companies data files; pipeline companies are already part of `COMPANIES`.
- No layout / styling changes.
