## Changes

### 1. Remove stakeholder switch from Dashboard evidence chart
File: `src/components/dashboard/EvidenceImpactScatterChart.tsx`
- Remove the `stakeholder` state, the `ToggleGroup` UI, the `taskMedians` memo, and the vendor gap-analysis callout.
- Restore the chart to its single default view (reviewer view), keeping the updated "Readiness" terminology.
- Revert the title to plain "Evidence × Impact" (no per-stakeholder framing).

### 2. Add stakeholders section to Resources & Compliance (at the top)
File: `src/pages/ResourcesCompliance.tsx`
- Import the existing `StakeholderUseCases` component from `src/components/about/StakeholderUseCases.tsx` and render it right after the hero, before `PageIndex` (or as the first content section).
- Add a `"stakeholders"` entry at the top of `PageIndex` (`src/components/resources/PageIndex.tsx`) so the quick-nav links to it.
- Keep the same anchor `id="stakeholders"` so cross-page links from `EvidenceImpactGuide` continue working — but since the section now lives on two pages, update the guide link to point to `/resources-compliance#stakeholders` (canonical location) and keep About as a secondary location, OR keep both. Default: keep both pages, link from the guide to `/resources-compliance#stakeholders` since that's the more discoverable home for it.

### 3. (Optional) Keep or remove from About
- Default: keep `StakeholderUseCases` on the About page too (no removal requested). If the user wants it removed from About, that's a one-line change in `src/pages/About.tsx`.

## Notes
- Reusing the existing `StakeholderUseCases` component — no duplication.
- No data-model or product-file changes.
- Anchor IDs must be unique per page; same `id` on two different pages is fine.
