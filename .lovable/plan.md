# Clearer sub-line on the "Evidence sources scored" card

Replace the technical sub-line "of 388 listed papers · E0–E3 / L1t–L6" with plain wording that says what was scored, without level codes.

New text: **"of 388 listed papers · rated for study quality and clinical benefit"**
(fallback when no total: "Rated for study quality and clinical benefit")

## Technical details
- Edit only the `sub` string in `src/components/homepage/StatsRow.tsx` (line 34).
- No logic, count or layout change.
