# Homepage AIinRT 2027 promotional banner

## Goal
Add a visually prominent, on-brand banner to the DLinRT.eu homepage that drives attention to AIinRT 2027 (https://aiinrt.org/) and clearly states DLinRT.eu's support for the symposium.

## Content to surface
- Headline: "DLinRT.eu supports AIinRT 2027"
- Sub-line: Peer-reviewed scientific symposium on Artificial Intelligence in Radiotherapy
- Key facts: 1–2 April 2027 · Princess Máxima Center, Utrecht
- CTA: "Visit AIinRT.org" (external link, opens in new tab)
- Supporting link (optional): "Read the announcement →" to `/news/aiinrt-2027-support`

## Proposed placement
Insert a new `AIinRTBanner` section on `src/pages/Index.tsx` directly below `SearchHero` and above `StatsRow`, so it sits immediately under the search bar and above the stats/orbit visuals. This keeps it above the fold without interfering with the existing hero flow.

## Design approach
- Full-width banner with a subtle gradient using the existing DLinRT steel-blue accent (`#5090D0` / `hsl(var(--primary))`) on a light background.
- Use a calendar/date icon and a small "Save the date" chip.
- CTA button styled with the primary button variant; secondary text link to the news item.
- Responsive: stacked on mobile, horizontal layout on desktop.
- Respect `prefers-reduced-motion` and keep animations minimal (only a gentle hover state on the CTA).

## Files to change
1. Create `src/components/homepage/AIinRTBanner.tsx` — new banner component.
2. Update `src/pages/Index.tsx` — import and render `AIinRTBanner` between `SearchHero` and `StatsRow`.

## Out of scope
- No changes to the news item content or routing.
- No backend/data changes.
- No modifications to the OrbitHero, FeatureCards, or mailing-list sections.
