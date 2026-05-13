## Goals

1. Let users inspect the actual products inside each 3D bar (parity with the 2D matrix).
2. Retitle and re-frame `/evidence-impact-guide` so the third axis (Z, Implementation & Assurance Burden) is part of the headline framing, not a tacked-on section.
3. Sweep `docs/` and `README.md` so the framework is consistently described as tri-axial (E × I × Z) wherever burden is actually used, while leaving sub-attribute language (which only refers to E/I) intact.

No data model, routing, or backend changes.

---

## 1. Drill-down in the 3D matrix

File: `src/components/resources/EvidenceImpactMatrix3D.tsx`

- Extend `Bucket` to carry the actual products:
  ```ts
  interface Bucket {
    rigor: string; impact: string; burden: string;
    count: number;
    products: { id: string; name: string; company: string; category: string }[];
  }
  ```
  Populate it in the existing `useMemo` that scans products (just push minimal fields needed to render a list + link).
- Bar `onSelect` already pins the bucket. Expand the side panel's "Bucket details" block: when `selected` is non-null, render a scrollable product list under the rigor/impact/burden summary.
  - Each item: product name (bold) + small muted "company · category" line, wrapped in `<Link to={`/products/${id}`}>` so users can jump to the detail page.
  - Cap visible list at ~12 with internal scroll (`max-h-64 overflow-auto`) to keep the panel height bounded.
  - Keep the hover tooltip behavior unchanged (still shows count only); the product list only appears once the user clicks a bar (explicit pin), so casual hover is not noisy.
- Add a small "View in catalogue" secondary action under the list: a button that pushes a filtered URL like `/products?evidenceRigor=E2&clinicalImpact=I2&implementationBurden=Z1` only if those filters already exist; otherwise omit. (Quick check before implementing — if the products page does not parse those query params, skip this button rather than introduce new filter routing.)
- Mobile (`isMobile`): keep current stacked layout. The product list inherits the same scroll container, so no extra work.

No changes to the dashboard wrapper — it already passes `filteredProducts` and will benefit automatically.

---

## 2. Retitle and restructure `/evidence-impact-guide`

File: `src/pages/EvidenceImpactGuide.tsx`

- Rename the page concept from "Dual-Axis" to **"Tri-Axial Evidence & Readiness Classification"** (E × I × Z).
  - `<SEO title>`: `Tri-Axial Evidence & Readiness Classification`
  - `<SEO description>`: mention all three axes (rigor, clinical impact, implementation burden).
  - `<h1>`: `Tri-Axial Evidence & Readiness Classification` with the existing Flask × Target icons plus a `Wrench` icon for the Z axis.
  - Subheading: "Separating evidence rigor (E), clinical impact (I), and implementation burden (Z) for nuanced product evaluation."
- Rename "Why Two Axes?" card to **"Why Three Axes?"** and add a third bullet/example explaining why high E and I alone do not guarantee adoption-readiness without low Z (residual implementation/assurance effort). Update the green "Solution" callout to reference E/I/Z and a composite readiness signal.
- Reorder content so Z is presented as a co-equal axis, not a "New" addendum:
  - Move the Z card up so the three axis cards (Rigor, Impact, Burden) sit together. Keep the "New — third axis" badge but soften the surrounding copy ("internally proposed DLinRT extension" stays).
  - Keep Composite Readiness Signal block where it is (after the three axes).
- Update "Example Classifications" table: add a `Z` column to each row with sensible values that match the existing `EvidenceImpactBadges` component if it accepts a Z prop; if not, render a small `<Badge>` with the Z level next to the existing badges to avoid component changes.
- Leave the "Study Quality Sub-Attributes" section unchanged — those attributes describe E only, that framing is correct.

---

## 3. Documentation consistency sweep

Audit and update the following so the tri-axial framework is described consistently. Sub-attribute language (vendor-independent, multi-center, etc.) remains tied to E only — do not over-rewrite.

- `docs/review/GUIDE.md`
  - §"Evidence Level Classification": expand the opening paragraph to introduce the framework as tri-axial (E + I + Z), with E and I from van Leeuwen / Antonissen / Fryback & Thornbury, and Z as an internally proposed DLinRT extension. Cross-link the Evidence/Impact Guide page.
  - Step list at the top: change "Assign evidence rigor (E0–E3) and clinical impact (I0–I5)" → "Assign evidence rigor (E0–E3), clinical impact (I0–I5), and implementation burden (Z0–Z5)".
  - The existing Z rubric section (around line 320) stays — just confirm it appears under the same heading hierarchy as E and I.
- `docs/review/README.md` line ~50: replace "dual-axis system: Evidence Rigor (E0–E3) and Clinical Impact (I0–I5)" with the tri-axial phrasing including Z. Quick-start step 4 likewise.
- `docs/REVIEWER_GUIDE.md` line ~438: same dual-axis → tri-axial update; mention `implementationBurden` alongside `evidenceRigor` and `clinicalImpact`.
- `docs/FIELD_REFERENCE.md`
  - Line ~139 (`evidence[].level`): "Same dual-axis values" — clarify that per-study level still refers to E (rigor) only, since Z and I are product-level. Replace "dual-axis" wording with "Same E0–E3 rigor values (per-study)".
  - Line ~285 reviewer flow: add Z assignment alongside E/I.
  - The existing §"Implementation & Assurance Burden (Z0-Z5)" stays — verify the heading appears in the doc TOC.
- `README.md`: no "dual-axis" mentions found, so leave the evidence bullet as-is. If we add a sentence about evidence classification anywhere, keep it tri-axial.

For each updated file, do a final `rg -n "dual-axis|dual axis|two axes"` pass to confirm only intentional historical references remain (e.g., explaining the original van Leeuwen dual-axis source before the Z extension).

---

## Out of scope

- No changes to the underlying `EvidenceImpactBadges` component API. If it does not support Z, render a sibling Z badge instead.
- No new product-list filter URL params unless the products page already supports them.
- No new data fields, migrations, or edge functions.
- 2D matrix rendering and the dashboard scatter behavior remain unchanged except that they automatically receive the upgraded 3D side panel.
