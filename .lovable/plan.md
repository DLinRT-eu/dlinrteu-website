

## Plan: Add WHO AI-readiness report + light revision of Resources & Initiatives

### Scope decision

The WHO report is **policy/governance literature**, not a Grand Challenge / Dataset / Model Zoo / LLM Platform. Per the Research Initiatives inclusion policy, it belongs on the **Resources & Compliance** page (`ResourceLinks.tsx`), not on `/initiatives`.

### Changes

**1. `src/components/resources/ResourceLinks.tsx` — add 2 WHO entries** under the existing `"Ethics Guidelines"` category (sits next to the existing WHO Ethics & Governance entry):

- **"AI is reshaping health systems: state of readiness across the EU"** (WHO, 2026)  
  URL: `https://www.who.int/europe/publications/i/item/WHO-EURO-2026-12707-52481-81471`  
  Description: "WHO focused assessment of AI readiness in EU health systems, drawing on the 2024–2025 survey on AI for health care in the WHO European Region — context for AI Act implementation."

- **"AI is reshaping health systems: state of readiness across the WHO European Region"** (WHO, 2025)  
  URL: `https://www.who.int/europe/publications/i/item/WHO-EURO-2025-12707-52481-81028`  
  Description: "First WHO assessment of AI integration across the whole WHO European Region (53 countries) based on the 2024–2025 survey."

Both use `icon: BookOpen`, `category: "Ethics Guidelines"`.

**2. `src/components/resources/CoreDocuments.tsx` — add 1 reference** in the **"Research & Evidence"** category:

- **"WHO – AI readiness in EU health systems (2026)"**, type `"WHO Report"`, reference `[18]`, same EU URL as above.
- Update the footer note to say `[1] through [18]`.

**3. Initiatives audit (light revision)**

Quick scan of `src/data/initiatives/*.ts` for stale URLs / duplicates — report findings inline; no removals unless you confirm. No new initiatives added (the WHO report doesn't qualify).

### Files touched

- `src/components/resources/ResourceLinks.tsx` (add 2 entries)
- `src/components/resources/CoreDocuments.tsx` (add 1 entry, bump footnote range)
- (Read-only audit of `src/data/initiatives/*.ts` — reported back, no edits unless approved)

No new files, no DB changes, no migrations, no new logos.

