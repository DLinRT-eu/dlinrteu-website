

## Plan: Redesign ESTRO flyers — fuller A4, pictograms, less text

Rework both flyers in `scripts/generate-estro-flyers.mjs` so they fill the A4 page edge-to-edge with strong visual hierarchy, pictograms, and tighter copy. Same generator, same output paths, same QR/registration logic.

### Visual direction

- **Hero band** (top ~30% of page): large angled brand block in primary blue with title in big bold type, one-line value proposition, and three pill badges (FREE · INDEPENDENT · PEER-REVIEWED). QR to dlinrt.eu sits inside the hero on the right.
- **Pictogram row** (4 vector icons drawn natively in pdfkit — no external assets): each icon ~60×60 with a short 2–4 word label and a single-line caption. Companies flyer: "Claim products" / "Showcase evidence" / "Get verified" / "Stay visible". Community flyer: "Search & filter" / "Compare side-by-side" / "Inspect evidence" / "Track regulatory".
- **Numbered process strip** (Companies only): 4 circular step badges (1→2→3→4) connected by a thin line — Register → Claim → Review → Verified. Replaces the current bullet list.
- **Highlight callout**: full-width colored band with the "Independent. Vendor-neutral. Not pay-to-verify." tagline + one supporting sentence. Uses inverse colors (white on `PRIMARY_DARK`) for contrast.
- **Stats / trust strip** (Community only): 3 large numbers pulled from the platform (e.g. "150+ products · 60+ companies · 10 categories") rendered as oversized figures with small labels — replaces the wordy intro paragraph.
- **Footer band**: full-width strip with large QR (registration), short CTA ("Scan to register — it's free"), and minimal legal line. Removes the current narrow footer with leftover whitespace.

### Copy reduction

- Cut intro paragraphs from ~3 sentences to 1 line.
- Convert every "How it works" bullet block into pictogram + 2–4 word label.
- Drop redundant repeats of "free" / "independent" — let the hero pills and callout band carry it.
- Keep all 8 reviewer asks satisfied (free, eligibility, neutral phrasing, "for your products", verified badge wording, evidence benefit, QR, independent emphasis) but expressed visually instead of in prose.

### Pictograms (drawn in pdfkit, no images)

Simple geometric icons using `doc.circle`, `doc.roundedRect`, `doc.path`, `doc.lineTo` in brand colors:
- Tag/claim, document-with-checkmark (evidence), shield-with-check (verified), eye/magnifier (visibility), search, side-by-side bars (compare), beaker/flask (evidence inspection), certificate ribbon (regulatory).

Each icon lives in a soft `BG_SOFT` rounded square so they read as a consistent set.

### Layout grid

A4 portrait (595×842 pt), 32 pt outer margin. Vertical rhythm:
1. Hero band — 0 to ~250pt
2. Pictogram row (4 columns) — ~270 to ~400pt
3. Process strip *(Companies)* / Stats strip *(Community)* — ~420 to ~520pt
4. Highlight callout band — ~540 to ~640pt
5. Eligibility / "what you get" mini-box — ~660 to ~740pt
6. Footer band with large QR + CTA — ~750 to ~810pt

This eliminates the current bottom whitespace and gives every section a clear visual weight.

### Implementation

- Edit only `scripts/generate-estro-flyers.mjs`:
  - Add `drawIcon(doc, name, x, y, size)` helper with a small switch over icon names.
  - Add `heroBand`, `pictogramRow`, `processStrip`, `statsStrip`, `calloutBand`, `footerBand` helpers; replace existing `header` / `sectionTitle` / `bullet` / `boldBullet` / `footer` calls in both flyer builders.
  - Pull stat numbers from `src/data/products/` counts at script time (read directory listings and a quick count of `.ts` files per category) so the Community stats are accurate without hardcoding.
- Re-run `node scripts/generate-estro-flyers.mjs` to regenerate both PDFs into `public/flyers/`.
- QA: convert each PDF to JPG with `pdftoppm -jpeg -r 150` and inspect for overflow, icon rendering, contrast, QR scan area, and confirm no whitespace gaps remain. Iterate until clean.

### Files touched

- `scripts/generate-estro-flyers.mjs` — rewritten layout + new icon/section helpers.
- `public/flyers/DLinRT_Companies_ESTRO2026.pdf` — regenerated.
- `public/flyers/DLinRT_Community_ESTRO2026.pdf` — regenerated.

### Out of scope

- Changing fonts (keep Roboto), brand colors, filenames, routing, or the Presentation page card copy.
- External image assets — all visuals drawn in pdfkit primitives.

