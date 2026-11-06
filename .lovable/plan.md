# Catalogue name check, new-product search and pipeline revision

## 1. Product name check (all current products)
- For each catalogue product, compare the name and version against the vendor's current product page (and the newest FDA 510(k) summary where one exists).
- Flag renames, merged/split products and discontinued items. Handle them with the existing patterns: name history, central aliases so old links keep working, and the discontinued page when there is a source for the withdrawal.
- Fix clear renames that have a source. Ask you about unclear cases before changing anything.

## 2. Search for missing products
- Go through each catalogue company's AI/radiotherapy product pages, plus recent FDA 510(k) clearances (product codes MUJ, IYE, LLZ, JAK, LNH; 2025–2026) and ASTRO/ESTRO 2026 announcements.
- Apply the inclusion gate: the product must use AI/deep learning for a core radiotherapy function and have a recognised approval (CE, FDA, NMPA, TGA, etc.).
- AI tools with no approval yet go to the pipeline list (Tier 2) instead of the main catalogue.
- New entries follow the house style: a disclosed source for every fact, evidence scored E/L with "pending reviewer check" where it applies, and Elekta-style per-model structure lists.

## 3. Pipeline revision
- Re-check all pipeline products, and any candidates from step 2, for new approvals. Move a product into the main catalogue when the approval is confirmed.
- Update "last checked" dates. Note the AtomoAI "iCon" tool again if it now has an approval.

## 4. Report
- One list: renamed / merged / discontinued / added / moved from the pipeline / looked at but not added (with the reason).
- Also saved as a CSV in Files.
- Run the catalogue tests and the evidence checker.

## Limits
- EUDAMED blocked automated searches last time. I'll try once and won't record a "not found" result if the search fails.
- If a vendor page can't be read, I'll mark that product "unverified" instead of guessing.

## Technical notes
- Aliases: `src/utils/productAliases.ts`. Lifecycle: `productLifecycle`. Pipeline data: under `src/data/products` (pipeline hub). Company lists: `src/data/companies/*`.
