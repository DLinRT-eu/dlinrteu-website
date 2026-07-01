# Dashboard chart rendering fix

## Root cause

The dashboard bars, pies, and cells render empty (axes/legends show, no data glyphs). Screenshot confirms it: "AI Models by Task (107 total)" shows the Y-axis but no bars; Location and Certification pies render only legends; Company bars are empty.

`package.json` currently pins **`recharts ^3.8.1`**, but every chart in the app is written against the **Recharts v2** API (v3 has breaking changes to `Bar`/`Pie`/`Cell` children semantics, default styling, and several removed props — hence bars render at zero width even with valid data). The recent "Upgraded critical dependencies" work pulled recharts across a major version.

Symptoms in console also show `Invalid prop supplied to React.Fragment` from Recharts internals when the tagger injects `data-lov-id` — another v3 change (v3 wraps `Cell` in a `Fragment` differently).

## Fix

1. Downgrade `recharts` to the last known-working v2 line: `^2.15.0` in `package.json`.
2. Reinstall dependencies so the lockfile picks up v2.
3. Reload the dashboard and verify:
   - Task bar chart shows colored bars
   - Location pie shows colored slices
   - Modality bar chart shows bars
   - Company horizontal bar chart shows bars
   - Certification pie renders
   - `RevisionChart`, `StructureTypeDistributionChart`, `StructuresChart` also render bars

No other code changes needed — the existing chart components, `chartColors.ts`, and `chartDataValidation.ts` are already correct for v2.

## Out of scope

Migrating the codebase to Recharts v3 (would require touching ~15 chart components and retesting every dashboard/analytics view). We can revisit that as a separate effort if desired.
