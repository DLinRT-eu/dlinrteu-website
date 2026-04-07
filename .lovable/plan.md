

# Update ESTRO 2026 Flyers — Brand Color #5090D0

## Problem

The flyers currently use `#00A6D6` (cyan-teal) which doesn't match the logo. The logo's actual color is closer to **#5090D0** (steel blue). The user wants the flyers to use `#5090D0` and complementary colors for a polished look.

### Current issues visible in flyer QA
1. **Wrong brand color** — should be `#5090D0`
2. **Font rendering issues** — some words appear to have ligature/kerning problems (e.g. "Compare", "Explore", "Detailed Profiles" look slightly garbled)
3. **CTA section too empty** — large dark box at the bottom with just "dlinrt.eu" and one line of text; wastes space
4. **"dlinrt.eu" in CTA not prominent enough** — should be larger and bolder

## Changes

### Regenerate both PDFs with `/tmp/generate_flyers_v8.py`

**Color palette**:
- Primary accent: `#5090D0` (logo blue) — headers, stat numbers, section headings, step circles
- Header background: gradient from `#5090D0` to `#3A70B0` (darker complement)
- Dark text: `#1a1a2e` (unchanged)
- Stat box backgrounds: `#5090D0` at 10% opacity (`#EBF1F8`)
- CTA background: `#5090D0` (was dark slate)

**Layout improvements**:
- Use reportlab `Paragraph` with proper styles instead of raw `drawString` to fix font rendering/kerning issues
- Make CTA section tighter with larger "dlinrt.eu" text and better vertical centering
- Ensure proper word spacing in feature headings

**Content** — unchanged from current version (same sections, same text, same stats)

### Files

| Action | File |
|--------|------|
| Create | `/tmp/generate_flyers_v8.py` |
| Overwrite | `public/flyers/DLinRT_Community_ESTRO2026.pdf` |
| Overwrite | `public/flyers/DLinRT_Companies_ESTRO2026.pdf` |

### QA

Convert both PDFs to images, inspect for overlap, color accuracy, font rendering, and page fill before delivering.

