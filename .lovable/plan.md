## New Page: AI Auto-Contouring Comparison Guide

**Route:** `/guides/ai-auto-contouring-comparison`
**File:** `src/pages/guides/AiAutoContouringComparison.tsx` (+ route in `src/App.tsx`)
**Target keyword:** "AI auto-contouring comparison" (long-tail, low competition, high-intent for clinical/medical-physics audience)

### SEO setup
- `<title>`: "AI Auto-Contouring Tools Compared (2026) | DLinRT.eu" (<60 chars)
- `<meta description>`: "Compare CE/FDA-cleared AI auto-contouring software for radiotherapy: vendors, supported structures, evidence rigor, and regulatory status." (<160)
- Canonical: `/guides/ai-auto-contouring-comparison`
- Single H1, semantic H2/H3 hierarchy
- JSON-LD: `Article` + `FAQPage` schema
- Add entry to `public/sitemap.xml`
- Internal links to `/products` (auto-contouring filter), `/compare/structures`, `/evidence-impact-guide`, individual product pages

### Page outline

1. **H1 — AI Auto-Contouring Tools for Radiotherapy: 2026 Comparison Guide**
2. **Intro (2-3 paragraphs)** — what auto-contouring is, why AI matters in RT, what this guide covers. Link to live catalogue.
3. **H2 — How we evaluate auto-contouring tools**
   - Regulatory approval gate (CE, FDA, MDR-exempt, NMPA, TGA, etc.)
   - Dual-axis evidence: Rigor E0–E3 + Clinical Impact I0–I5 (link to guide)
   - Supported anatomical structures (DICOM "Region: Structure" naming)
   - Deployment (cloud vs on-prem), integration (DICOM-RTSTRUCT)
4. **H2 — Comparison table of leading AI auto-contouring tools**
   - Columns: Product · Vendor · Regions · Regulatory · Evidence rigor · Deployment
   - Pulled dynamically from `src/data/products/auto-contouring/` (filtered by `hasRegulatoryApproval`)
   - Each row links to product detail page
5. **H2 — Key capabilities to compare**
   - H3: Structure coverage (OAR vs target, CT vs MR vs CBCT)
   - H3: Evidence quality (vendor-independent, multi-center, prospective)
   - H3: Workflow integration (TPS, OIS, DICOM)
   - H3: Regulatory & quality (CE-MDR class, FDA 510(k), post-market surveillance)
6. **H2 — Choosing the right tool for your clinic** — short decision framing (head & neck vs pelvis vs thorax; research vs production; cloud constraints).
7. **H2 — Frequently asked questions** (rendered as accordion + emitted as `FAQPage` JSON-LD)
8. **Footer CTA** — "Browse all auto-contouring products" → `/products?category=Auto-Contouring`

### FAQ (search-intent driven)

1. What is AI auto-contouring in radiotherapy?
2. Are AI auto-contouring tools FDA-cleared or CE-marked?
3. How accurate are AI-generated contours compared with manual delineation?
4. Which anatomical structures can AI auto-contouring tools segment?
5. Can AI auto-contouring be used clinically without human review?
6. What's the difference between atlas-based and deep-learning auto-contouring?
7. How do I compare evidence quality across vendors?
8. Does AI auto-contouring work on MR and CBCT, or only CT?

### Technical implementation notes

- Use existing `PageLayout` + `SEO` components for head tags + structured data
- Reuse `Accordion` from `src/components/ui/accordion` for FAQ
- Pull product rows via existing data import (e.g. `import { autoContouringProducts } from '@/data/products/auto-contouring'`) and filter to `hasRegulatoryApproval === true`
- Apply daily-stable random sort (per project memory) if listing >table size
- Add lazy route in `src/App.tsx` and a `<Route path="guides/ai-auto-contouring-comparison" …>`
- Add `<url>` entry to `public/sitemap.xml`
- After build, mark the Semrush SEO finding fixed via `seo_chat--update_findings`

### Out of scope (ask if wanted)
- Other category guides (image synthesis, treatment planning) — would follow same pattern
- Interactive filter UI on the guide itself (catalogue page already covers that)
