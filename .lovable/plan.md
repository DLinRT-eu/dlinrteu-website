# Audit: users ↔ companies ↔ products ↔ internal links

Ran a structural audit across `src/data/products/**`, `src/data/companies/**`, and the `company_representatives` table (28 verified reps). Below are the findings grouped by severity, with the fix I'd apply for each in a build-mode pass.

## ✅ Reps → catalog (all resolve)

All 28 verified reps map to ≥1 product through `getCompanyIdByName` (case-insensitive + legacy aliases). No rep currently sees an empty certification list.

One minor cleanup: rep `company_id = "syntheticmr"` has **no matching catalog entry** (only SyntheticMR's archived product `symri` exists). Lena Aredal will see an empty product list until either (a) a live SyntheticMR product is added, or (b) `symri` is un-archived. **Action:** flag, do not auto-fix — needs your input on whether SyntheticMR should be a live catalog entry.

## 🔴 Errors — broken internal references (5)

`company.productIds` pointing to product IDs that don't exist anywhere in the catalog. These cause 404s from company pages.


| Company            | Missing productId              | Likely fix                                                                                               |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| radformation       | `radformation-clearcheck`      | Remove (no such product file; AutoContour exists as `radformation-autocontour`)                          |
| ge-healthcare      | `ge-dlip-ct`                   | Remove (not in catalog; covered by `ge-truefidelity` etc.)                                               |
| philips-healthcare | `philips-auto-contouring`      | Replace with `philips-mrcat-prostate-auto-contouring` (which exists but is unlinked — see orphans below) |
| sun-nuclear        | `sun-nuclear-suncheck-patient` | Remove (no file)                                                                                         |
| varian             | `varian-mobius3d`              | Remove from live `varian` entry (product is archived)                                                    |


## 🟠 Orphans — products not linked from any company (3)

These show up on category pages but not on the company page.


| Product                                  | Company       | Fix                                                                                      |
| ---------------------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `philips-mrcat-prostate-auto-contouring` | Philips       | Add to `philips-healthcare.productIds` (replaces broken `philips-auto-contouring` above) |
| `ge-irt-theranostics-pipeline`           | GE Healthcare | Add to `ge-healthcare.productIds`                                                        |
| `synaptiq-mediq-rt-4dct-pipeline`        | Synaptiq      | Add to `synaptiq.productIds`                                                             |


## 🟡 Warnings — company-name string drift (3)

Products resolve via slug/case-insensitive fallback, but the strings drift from the canonical catalog name. Cosmetic but fragile.


| Product                      | Current `company`    | Canonical                                      | Fix                                                                  |
| ---------------------------- | -------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| `radformation-autocontour`   | "Radformation"       | "RadFormation"                                 | Normalize to "RadFormation"                                          |
| `medmind-rt-mind-ai`         | "MedMind Technology" | catalog only has archived "MedMind Technology" | Decision: revive MedMind in live catalog, **or** archive the product |
| `quanta-qoca-image-smart-rt` | "Quanta Computer"    | catalog only has archived "Quanta Computer"    | Same decision as MedMind                                             |


## ✅ Clean

- No duplicate product IDs.
- No "wrong-company assignment" (where a `productIds` entry points to a product whose `company` field belongs to a different catalog entry).
- All other reps resolve to the correct canonical id (post the prior Accuray® / GE HealthCare casing fixes).

## Proposed build-mode pass

I'd apply in one commit (no DB changes needed):

1. **Remove broken refs** from `productIds` in `radformation`, `ge-healthcare`, `philips-healthcare`, `sun-nuclear`, and live `varian` (5 IDs).
2. **Add 3 orphan IDs** to their respective company entries.
3. **Normalize** `"Radformation"` → `"RadFormation"` in `src/data/products/auto-contouring/radformation.ts`.
4. **Hold** on MedMind / Quanta / SyntheticMR pending your decision (revive in catalog vs. archive product).

## Questions for you

- **MedMind & Quanta**: revive the catalog entries (live) such that next to the vendors with live AI product in the catalog also the company entry.
- **SyntheticMR**: same question — Lena (verified rep) currently sees no products.
- **Varian (live)**: should `varian-mobius3d` be removed from the live company's `productIds`