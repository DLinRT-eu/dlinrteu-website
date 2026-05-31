## Problem

`hasRegulatoryApproval()` in `src/utils/productFilters.ts` only accepts CE, FDA, "MDR exempt", or investigational/pending. NMPA-only products like DeepPlan are filtered out by `getAllProducts()`, `getProductsByCompany()`, and `getTotalProductCount()` — so DeepPlan doesn't appear at `/products/company/wisdom-tech` and the homepage total stays at 79 instead of 80.

DeepContour passes only because it has FDA K232928. NMPA is already a recognized certification tag in `src/config/tags.ts` and `regulatoryUtils.ts` — the inclusion filter is the only place it's missing.

## Changes

### 1. `src/utils/productFilters.ts`
- Add helper `hasOtherRecognizedAuthorityApproval(product)` that returns true when `product.certification` (case-insensitive) contains any of: `NMPA`, `TGA`, `TFDA`, `PMDA`, `MFDS`, `Health Canada`, `ANVISA`, `MHRA`, `UKCA`.
- In `hasRegulatoryApproval()`, OR this helper into the existing return so NMPA-only (etc.) products are catalogue-eligible.
- Do not touch `isPipelineProduct` — an NMPA product with a confirmed approval is not pipeline.

### 2. Verification
- `bunx tsc --noEmit`.
- Browse `/products/company/wisdom-tech` and confirm DeepPlan renders alongside DeepContour.
- Confirm homepage total reflects 80 products.

### 3. Memory
Save `mem://policy/regulatory-approval-recognized-authorities` documenting the recognized authority list and that `hasRegulatoryApproval()` is the single gate; add a one-liner to the index Core block so future additions inherit the rule automatically.

## Out of scope
- No schema, routing, UI, or pipeline-classification changes.
- No edits to other product files' regulatory fields.
