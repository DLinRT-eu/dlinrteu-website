## Goal
Replace the cramped, static SVG isometric "3D" plot with a **real interactive WebGL 3D visualization** of the Evidence Rigor × Clinical Impact × Implementation Burden matrix. Used by both the Resources page and the Dashboard card.

## Why the current implementation is poor
- SVG isometric projection has a fixed camera — no rotation, no perspective, no zoom.
- Bars stack vertically per (E, I) cell which makes Z hard to read; counts compress.
- Card width is wasted: the SVG honours `viewBox` aspect ratio so the figure ends up tiny inside a wide card.
- No real axes, no labels on the burden axis, no in-scene legend.

## New approach: react-three-fiber (r3f) + drei

A proper 3D scene with WebGL gives the user rotation, zoom, pan, hover highlighting, and depth perception that a flat SVG cannot.

### Library choice (investigation)
| Option | Verdict |
|---|---|
| **react-three-fiber + drei** ✅ chosen | Native WebGL, full orbit controls, declarative React API, ~250KB gzipped, matches existing React/TS stack, fully themeable via design tokens |
| Plotly.js Bar3D | Scientific defaults but ~1MB, theming clashes with shadcn, harder to customise hover content |
| ECharts-GL | Solid but heavier and less idiomatic in React |

### Dependencies to add
- `three@0.160.0`
- `@react-three/fiber@8.18.0` (React 18 compatible per project memory)
- `@react-three/drei@9.122.0`

## Visualization design

```
            Z (Implementation Burden, vertical)
            ↑
           Z5  ─── colored boxes (one per (E,I,Z) bucket with ≥1 product)
           Z0
            └────────────────→  X (Clinical Impact I0…I5)
           ↙
       Y (Evidence Rigor E0…E3)
```

- Scene: a 6 × 4 base grid (Impact × Rigor) with 6 vertical Z slots.
- Each (E, I, Z) bucket with `count > 0` → one **box** placed at the correct (x, y, z) cell.
  - Box width/depth = 0.8 cell units (small gap between bars).
  - Box height ∝ `count` (capped via log/sqrt scaling for outliers).
  - Color = burden-tier palette (Z0 green → Z5 rose), already defined.
  - Slight emissive glow when hovered.
- Floor: faint grid + subtle base plane for spatial reference.
- Axis labels using `drei`'s `<Text>` on the floor edges:
  - X edge: I0 … I5
  - Y edge: E0 … E3
  - Z edge: Z0 … Z5 (vertical ruler)
- Camera: `PerspectiveCamera` initial position above-front-right; `<OrbitControls>` for rotate/zoom/pan, with auto-rotate **off** by default and a "Reset view" button.
- Lighting: ambient + directional + a soft top fill, so all faces remain readable.

## Interactions
- **Hover** any bar → bar gets emissive highlight; an HTML overlay (drei `<Html>`) shows count, full E/I/Z labels, and the burden's readiness consequence.
- **Click** a bar → select it; the side legend pins that bucket's details until cleared.
- **Orbit controls** → drag to rotate, scroll to zoom, right-drag to pan.
- **Toolbar above canvas**:
  - "Reset view" (return camera to default angle).
  - "Auto-rotate" toggle.
  - "Show empty cells" toggle (renders translucent placeholder boxes for buckets with 0 products).
  - Burden-axis legend chips (always visible).

## Sizing
- Canvas: `min-h-[560px] lg:min-h-[680px]`, `w-full`. Fills its card on both pages.
- Responsive: on mobile (`< 640px`), reduce to `min-h-[440px]` and lower DPR for performance.

## Component structure
```
src/components/resources/EvidenceImpactMatrix3D.tsx       (rewritten)
  ├─ <Canvas>                                              r3f
  │   ├─ <Lights />
  │   ├─ <Floor />                                         grid + axis ticks
  │   ├─ <AxisLabels />                                    drei <Text>
  │   ├─ <BurdenBars buckets=... onHover=... onSelect=... />
  │   ├─ <OrbitControls />
  │   └─ <PerspectiveCamera makeDefault />
  ├─ <Toolbar />                                            reset / auto-rotate / empty cells
  ├─ <SelectedBucketPanel />                                pinned details
  └─ <Legend />                                              burden palette + counts caption
```
- API unchanged: `<EvidenceImpactMatrix3D products?: ProductDetails[] />`. Both call sites (Resources matrix wrapper, Dashboard scatter chart) keep working.

## Files touched
1. `package.json` — add three, @react-three/fiber, @react-three/drei (exact versions above).
2. `src/components/resources/EvidenceImpactMatrix3D.tsx` — full rewrite as r3f scene.
3. (Optional) extract small leaf components (`Bars`, `AxisLabels`, `Toolbar`) into the same file to keep the directory clean.

## Out of scope
- 2D matrix and dotted scatter views — untouched.
- Attribution / data model / routing — no changes.
- No SSR concerns: r3f mounts client-side; the Canvas is rendered inside a card that's already client-only.

## Risks / mitigations
- WebGL bundle size (~250KB gz). Acceptable for a single feature; lazy-load via `React.lazy` so it only ships when the user toggles to 3D.
- Orbit controls + tooltips can feel busy → keep the default angle non-perpendicular and only show the hover tooltip on actual mouseover, not on idle hover-out.

