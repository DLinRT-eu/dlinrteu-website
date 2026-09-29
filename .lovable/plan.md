# News section reorder, reviewer line removal, and AIinRT2027 spelling

## Outcome

The latest news item ends with the product changes sitting inside the ASTRO block, the reviewer call is gone from it, and the event is written **AIinRT2027** (no space) everywhere visitors can see it.

## Changes

### 1. Move "What changed in the catalogue" into the ASTRO block

File: `src/data/news/astro-ecmp-2026-announcements.ts`

New section order:

```text
Intro
## Radformation (AutoContour v2.8, OptiPlan)
## Other ASTRO 2026 announcements (bullets + scientific programme + final-check paragraph)
## What changed in the catalogue          <-- moved here
## Exhibitor check: are we missing anyone?
## ECMP 2026
## MICCAI 2026: the inaugural MIART workshop
## AIinRT2027: registration opens 1 October
## Reminders
```

The section keeps its three bullets (AutoContour v2.8, OptiPlan assessed and not included, new entry AiRato RatoAI) and gains one bullet for **AtomoAI iContour listed on the Pipeline**, so the list covers every catalogue change made this round. Wording stays vendor-reported where the vendor is the only source, and the AiRato bullet keeps its pointer to the exhibitor check below it.

### 2. Remove the reviewer call

In the same file, the first Reminders bullet loses its last sentence, `Reviewers are welcome to [get in touch](/support).` The round dates and focus wording stay:

> The next review round runs **1 November – 15 December 2026**. The focus is verifying each entry once and double-checking evidence levels that rest on a single source.

Older news items are left untouched — they are historical records, and the reviewer call in the Second-Round Review item stays as published.

### 3. Spell the event AIinRT2027 site-wide

Replace every visible `AIinRT 2027` with `AIinRT2027` in:

- `src/data/news/astro-ecmp-2026-announcements.ts` — summary, the AIinRT heading, its body, and the Reminders bullet
- `src/data/news/aiinrt-2027-support.ts` — title, summary, and the two body paragraphs
- `src/data/news/september-2026-catalogue-and-eudamed-update.ts` — title, summary, section heading, body link text
- `src/components/homepage/AIinRTBanner.tsx` — the banner heading

Left unchanged on purpose:

- Page addresses and internal ids (`/news/aiinrt-2027-support`), so no link or search-engine entry breaks
- The event's own web address, written `aiinrt.org` / `AIinRT.org`
- `public/news.json`, which is regenerated automatically from the news data at build time

### 4. Record the naming rule

Save `AIinRT2027` (no space) as a standing nomenclature rule in project memory, next to the existing DICOM naming rule, so future sessions never reintroduce the spaced form.

## Verification

Run the type check, the evidence validator and the build, then check the rendered pages in the browser: the home page banner, the News list, the ASTRO/ECMP/MICCAI article (section order and the shortened Reminders bullet), the AIinRT2027 support article, and the September article. Confirm no visible `AIinRT 2027` with a space remains and that every article link still opens.

## Notes

- No data, product entries, or routing change; this is article content, one banner string, and a memory rule.
- The article date and title stay as they are.
