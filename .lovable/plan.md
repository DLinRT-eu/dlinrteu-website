## Goal

Make the 3D Evidence × Impact × Burden plot in `src/components/resources/EvidenceImpactMatrix3D.tsx` look closer to the reference figure: three clean axis lines along the bottom-front and back-left corner with tick labels and an axis title on each, viewed from a standard isometric-front angle so all three axis legends are simultaneously readable. Keep the existing colored bars (no continuous surface).

## Changes (single file: `EvidenceImpactMatrix3D.tsx`)

### 1. New `Axes` component (replaces current `AxisLabels` placement)
Render three explicit axis lines as thin `<mesh>` boxes (or `<Line>` from drei) in dark slate (`#1a1a2e`):

- **E axis (Evidence Rigor)** — runs along the front-left edge in the X/Z plane. Place tick labels `E-1, E0, E1, E2, E3` flat on the floor under each row. Title `Evidence rigour (E-axis) →` rotated to follow the axis direction.
- **I axis (Clinical Impact)** — runs along the front-right edge. Tick labels `I-1, I0, I1, I2, I3, I4, I5` under each column. Title `Clinical impact (I-axis) →`.
- **Z axis (Implementation burden)** — vertical, anchored at the back-right corner where E and I meet. Tick labels `Z0 low … Z5 high` to the right of the axis. Title `Implementation effort / assurance burden (Z-axis) ↑` rotated +90° around Z.

All three titles styled like the reference (small caps-ish weight, dark slate). Use existing `Text` from `@react-three/drei` with `outlineWidth={0.01}` `outlineColor="#ffffff"` for legibility.

### 2. Cleaner floor / no continuous surface
- Remove the gray plane fill; keep only a subtle grid (`gridHelper`) in light slate (`#e2e8f0`) so the bars sit on a neutral lattice. No continuous color surface.
- Drop the per-Z-slot color ruler bars on the side (we now have a real Z axis).

### 3. Default camera orientation
- Set `PerspectiveCamera` position to roughly `[cols * 1.6, zHeight * 1.2, rows * 2.0]` and `target` slightly above floor center so the front-left (E) and front-right (I) axes are both unobstructed and the Z axis rises clearly on the back-right — matching the reference's three-quarter view.
- Keep `OrbitControls` interactive but persist this orientation on Reset view.

### 4. Minor polish
- Bars: keep current colored boxes and hover/select behavior unchanged.
- Add faint axis tick marks (small dark cubes) at each integer to reinforce the figure look.
- Remove the now-redundant secondary axis title that previously floated above the Z color ruler.

## Out of scope
- No continuous surface / iso-surface plot.
- No data-model or product-link changes.
- No edits outside `EvidenceImpactMatrix3D.tsx`.
