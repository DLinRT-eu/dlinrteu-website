

## Plan: Tone down flyer promises + fix overlapping text

Two narrow fixes to `scripts/generate-estro-flyers.mjs`. No new app features, no DB changes, no Presentation page changes.

### 1. Remove unbuilt features from flyer copy

The current flyer text implies "save comparisons", "follow products", and "update notifications" already exist. Those features aren't built yet, so revise the relevant copy to only mention what the platform actually does today:

- **Community flyer** — replace any "save / follow / get notified" phrasing with neutral, currently-true wording:
  - Account benefit line becomes: *"Create a free account to record clinical experience with tools you use and contribute to the community knowledge base."*
  - Drop bullet/pictogram captions referring to saving comparisons, following products, or notifications.
  - Keep the existing pictograms for **Search & filter**, **Compare side-by-side**, **Inspect evidence**, **Track regulatory** — all already shipped.
- **Companies flyer** — no feature claims to remove; only verify nothing references "follow" / "notifications" in any caption.

### 2. Fix overlapping text in PDF layout

Inspect both flyers (convert with `pdftoppm -jpeg -r 150` and view each page) and identify where text intersects boxes. Likely culprits based on the current layout:
- Pictogram captions wrapping into the next column because the per-column width is too tight for the caption font size.
- The callout band tagline running over its rounded background when the supporting sentence wraps to a second line.
- Footer CTA text overlapping the QR code area.

Fixes inside `scripts/generate-estro-flyers.mjs`:
- Reduce caption font size by 1pt and add `width:` clamp + `lineGap` so `doc.text` wraps inside its own column.
- Increase the callout band's height (and top padding) to accommodate a 2-line tagline; compute height from measured text instead of a fixed value.
- Reserve a fixed right-side QR slot in the footer (e.g. 90pt) and clamp the CTA text width to `bandWidth - qrSlot - gap`.
- Re-check the eligibility / info box: clamp inner text width to box width minus 2× inner padding.
- Keep all colors, fonts (Roboto), pictograms, and section order unchanged.

### 3. Regenerate + QA

- Run `node scripts/generate-estro-flyers.mjs` to rewrite both PDFs in `public/flyers/`.
- Convert each PDF to JPG and visually inspect for: any text crossing a box edge, captions overflowing column, footer overlap, and remaining mentions of save/follow/notify. Iterate until clean.

### Files touched

- `scripts/generate-estro-flyers.mjs` — copy edits + width/height clamps.
- `public/flyers/DLinRT_Companies_ESTRO2026.pdf` — regenerated.
- `public/flyers/DLinRT_Community_ESTRO2026.pdf` — regenerated.

### Out of scope

- Building save-comparisons, follow-products, or product-update notification features (deferred).
- Changes to `src/pages/Presentation.tsx` card copy (already neutral).
- Layout rework beyond the overflow fixes.

