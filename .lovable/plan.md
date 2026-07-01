## Plan

**Goal:** restore dashboard chart visibility after the Recharts v3 upgrade with the smallest safe change.

### Culprit
The dashboard chart components wrap Recharts twice:

```text
ChartContainer -> Recharts ResponsiveContainer -> component-level ResponsiveContainer -> Chart
```

In Recharts v3 this nested `ResponsiveContainer` pattern can collapse/measure incorrectly, leaving charts invisible even though the dashboard page renders.

### Fix
1. Update `src/components/ui/chart.tsx` so `ChartContainer` provides only:
   - the chart context
   - sizing/styling wrapper
   - CSS variables/style injection
   - its direct children unchanged
2. Keep the existing component-level `ResponsiveContainer` usage in dashboard charts, because those already specify dimensions and are used consistently across the dashboard.
3. Preserve the existing tooltip/legend APIs so chart components do not need broad refactors.
4. Verify by loading `/dashboard` in the preview and checking the rendered SVG/chart elements are visible.

### Scope
Only the shared chart wrapper should change unless verification exposes a second specific culprit.