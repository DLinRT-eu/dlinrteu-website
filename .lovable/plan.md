## Goal
Restore visible dashboard plots reliably after the Recharts v3 upgrade, not just remove one wrapper.

## Findings from the dashboard audit
- Several charts still depend on `ResponsiveContainer height="100%"` while their parent only has `minHeight`, not an explicit computed `height`.
- This affects at least `LocationDistributionChart`, `ModalityDistributionChart`, `CertificationDistributionChart`, and `StructuresChart` through `ResponsiveChartWrapper`.
- `TaskDistributionChart`, `CompanyDistributionChart`, and `StructureTypeDistributionChart` use explicit height containers, so they should be used as controls during validation.
- `ChartContainer` was changed to no longer own the internal Recharts `ResponsiveContainer`, but its base sizing still needs to be compatible with child-owned `ResponsiveContainer` usage.
- The current console warning in `EvidenceImpactScatterChart` is from `React.Fragment` receiving Lovable-injected props; it is not the main Recharts sizing issue, but it should be cleaned up during the audit to remove noise.

## Implementation plan
1. **Fix chart sizing at the shared wrapper level**
   - Update `ResponsiveChartWrapper` so it provides an explicit `height` in addition to `minHeight`.
   - Keep `minWidth` and `w-full`, but ensure Recharts v3 always sees a non-zero parent height.
   - Remove unused resize state if it is no longer needed.

2. **Harden `ChartContainer` for child-owned Recharts containers**
   - Keep the chart styling/tooltip context.
   - Adjust its base sizing classes so `h-full w-full` from chart components is respected without aspect-ratio fighting percentage-height charts.
   - Do not reintroduce a nested `ResponsiveContainer`.

3. **Normalize chart component wrappers**
   - Ensure every dashboard chart that uses `<ResponsiveContainer width="100%" height="100%">` has an explicit-height ancestor.
   - For pie charts currently using bare `<ResponsiveContainer>`, set `width="100%" height="100%"` explicitly.
   - Preserve existing chart behavior, filters, exports, and labels.

4. **Clean noisy dashboard warning**
   - Replace the JSX fragment patterns in `EvidenceImpactScatterChart` that trigger the Lovable tagger/React fragment warning with DOM-safe wrappers or keyed arrays where appropriate.
   - Keep the visual matrix unchanged.

5. **Validate visually and structurally**
   - Use Playwright on `/dashboard` at the current desktop viewport.
   - Verify each Recharts-based card contains an SVG with non-zero width/height and visible bars/slices.
   - Confirm the evidence matrix still renders.
   - Check console output again for dashboard chart warnings/errors.

## Files to change
- `src/components/dashboard/ResponsiveChartWrapper.tsx`
- `src/components/ui/chart.tsx`
- `src/components/dashboard/LocationDistributionChart.tsx`
- `src/components/dashboard/CertificationDistributionChart.tsx`
- `src/components/dashboard/EvidenceImpactScatterChart.tsx`
- Possibly `src/components/dashboard/ModalityDistributionChart.tsx` and `src/components/dashboard/StructuresChart.tsx` only if validation shows they still lack a non-zero height ancestor.