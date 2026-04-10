

# Fix Logo Aspect Ratio & Spacing in ESTRO 2026 Flyers

## Problem
The logo (755×218px, aspect ratio 3.46:1) is being rendered in a roughly square area, causing it to appear vertically stretched/squished. The Companies flyer also has excess whitespace between the callout text and the CTA footer.

## Changes

### Script: `/tmp/generate_flyers_v11.py`

1. **Fix logo aspect ratio**: Calculate the rendered width/height from the logo's native 3.46:1 ratio. If the logo box is e.g. 22mm tall, render it at ~76mm wide (not ~22mm square). Use `pdf.image()` with only one dimension constrained (height), letting width scale naturally.

2. **Companies flyer spacing**: Reduce the gap between the callout paragraph and the CTA footer — either move the callout down or expand the "HOW TO GET CERTIFIED" section slightly.

3. **General QA pass**: Verify no other spacing anomalies after the logo fix (header height may need minor adjustment to accommodate the wider logo).

### Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v11.py` (based on v10 logic, with logo fix) |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

### QA
Convert both PDFs to images, verify logo has correct proportions, no new overlaps, and Companies flyer gap is reduced.

