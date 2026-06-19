## Goal
Move the "Verified by Company" certification indicator so it sits **inline next to the "Revised: <date>" badge**, and give it a distinctive, prominent treatment (thick-bordered box with a bold check icon) so it reads as a strong trust signal at a glance.

## Scope
Single file, presentation-only:
- `src/components/product/ProductHeaderInfo.tsx`

No data model, no business logic, no other components touched.

## Current behavior
- When `certificationStatus === 'valid'`, a large pill renders **above** the badge row (separate `mt-3` block).
- The `Revised: <date>` badge renders in the row below.
- The "Outdated" certification variant already renders inline in the badge row — only the **valid** state is visually detached.

## Proposed change
1. **Remove** the standalone "Verified by Company" block currently rendered above the badge row.
2. **Add** a new inline element in the same flex row as the Revised badge, placed immediately **before** the Revised badge so the two read together: `[✓ Verified by Company · certified YYYY-MM-DD]  [Revised: YYYY-MM-DD]`.
3. Style the new inline element as a **prominent, thick-bordered box** (not a flat badge) to differentiate it from the standard badges:
   - `border-2 border-success` thick border
   - `bg-success/10` soft success tint
   - `rounded-md` (slightly squarer than badges to feel like a "box")
   - `BadgeCheck` icon at `h-4 w-4` with `text-success`, bold weight on label
   - Compact horizontal padding so it visually aligns with the adjacent Badge height
   - Keep the existing Tooltip with company-name + verification notes
4. Keep the existing "Outdated" inline Badge variant unchanged (it already lives in the row).
5. Preserve all existing logic: `verificationData` fetch, content-hash comparison, `certificationStatus` derivation, tooltip content, and the `lastRevised` badge behavior.

## Visual result
```text
┌─────────────────────────────────────────────────────────────┐
│ [✓ Verified by Company  certified 2026-05-12]  [✓ Revised:  │
│                                                  2026-04-01]│
└─────────────────────────────────────────────────────────────┘
```
The verification box has a **thicker border and filled tint** so it stands out as the stronger signal, while sitting in the same horizontal rhythm as the revision badge.

## Out of scope
- No changes to the outdated-certification badge styling.
- No changes elsewhere on the product page (sidebar, sections, etc.).
- No changes to how/where certification data is fetched.
