# Consolidate TheraPanacea under ART-Plan

## Goal
Represent TheraPanacea’s current public offering as three ART-Plan applications—**Segmentation**, **Planning**, and **Adaptive**—while preserving the former product names, their evidence, and every existing link.

## Verified basis
- TheraPanacea’s current website presents **ART-Plan™** through three application areas: Segmentation, Planning, and Adaptive.
- Its current technical-information page identifies the regulated device as **ART-Plan+™ v3.2.1** and describes the same functions within that single device.
- The former names remain useful historical/module references, but the current main site no longer presents most of them as standalone products. AdaptBox and SmartPlan still appear in current page copy; the older US site still lists the wider former module lineup.
- No explicit vendor statement says the underlying functions or evidence were merged. The catalogue consolidation will therefore change presentation and identity, not blend unlike evidence.

## Changes

### 1. Create three canonical product records
- **ART-Plan Segmentation**: combine the former Annotate, TumorBox, BrachyBox, MR-Box, and SmartFuse presentation.
  - Preserve CT/MR OAR, lymph-node, tumour, brachytherapy, MR-to-synthetic-CT, and registration capabilities as clearly labelled functional sections.
  - Keep modality/anatomy-specific structures and limitations separated.
  - Keep MR synthetic CT and registration evidence attributable to those functions rather than implying that all Segmentation capabilities share it.
- **ART-Plan Planning**: replace the standalone SmartPlan presentation while retaining its prostate scope, evidence, and regulatory limitations.
- **ART-Plan Adaptive**: replace the standalone AdaptBox presentation while retaining CBCT-to-synthetic-CT, dose reconstruction, DIR/target propagation, monitoring, and offline adaptation scope.

The parent brand shown to users will be ART-Plan; the legal/regulatory section will explicitly state ART-Plan+™ v3.2.1 and distinguish the FDA-cleared v3.1.0 where relevant.

### 2. Preserve product-name history
- Add a structured “Previously referred to as” history for each application, including former name, function, applicable version/period when known, and source.
- Show this history on product pages near the product identity/parent relationship, without implying that old marketing names were separate regulatory devices.
- Keep publication titles and quotations unchanged when they use a historical name.

### 3. Preserve evidence granularity
- Extend the existing task-scoped evidence pattern so the Segmentation record can separate contouring, tumour segmentation, brachytherapy, MR synthetic CT, and registration evidence.
- Retain every attributable publication and its current E/L/R assessment; recompute only the consolidated application’s displayed maxima using the existing canonical scoring helper.
- Remove known indirect/misattributed context from scoring where applicable, including MESCAL from Adaptive while retaining it with the MR synthetic-CT function.
- Preserve source disclosure, safety limitations, structure provenance, and the educational/non-clinical-validation wording.

### 4. Retire old catalogue entries safely
- Remove the eight old records from active category exports and replace the company portfolio with the three canonical application IDs.
- Redirect every former product URL—including existing pipeline aliases—to the matching new application page.
- Preserve old IDs as aliases/supersession history so exports and external references remain traceable.
- Before changing stored references, inspect actual product-linked rows (drafts, reviewer assignments, revisions, user-product records, and other product-ID tables). Migrate only rows that exist, with a reviewed ID mapping; do not create duplicate rows or change unrelated products.

### 5. Update connected content
- Update the TheraPanacea company page, product counts, category listings, structure comparison, integrated-module links, news links, and cross-product references to the three current application names.
- Update the field guide with the rule: catalogue entries follow the vendor’s current application boundaries, while former module names remain source-attributed aliases.
- Record the consolidation architecture in `AGENTS.md` and update the dated audit worklist so retired IDs are not reported as eight active products.

## Validation
- Add tests for old-ID → canonical-ID mapping, redirects, company portfolio membership, task-scoped evidence resolution, and structure retention.
- Confirm there are exactly three active TheraPanacea application records and no duplicate catalogue cards.
- Run the focused tests, evidence validator, type checks, build, and existing test suite; report unrelated pre-existing lint failures separately.
- Browser-check the company page, all three product pages, former URLs, category filters, evidence tabs/history, and structure counts on desktop and mobile.

## Technical details
- Prefer a typed alias/history field in `ProductDetails` over embedding history only in prose.
- Reuse `categoryEvidence` resolution and the canonical evidence-matrix scorer; introduce function-level blocks only where category-level separation is insufficient.
- Keep source files for historical records only if needed for provenance, but do not export them as active products.
- Any database migration will follow existing Supabase role/grant and RLS conventions and will be limited to product-ID remapping.
