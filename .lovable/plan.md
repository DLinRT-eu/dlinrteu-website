## Audit results — user ↔ company mapping for certifications

### ✅ All 28 verified reps now resolve to ≥1 product
With `getCompanyProducts` switched to canonical-id matching (previous fix) and `getCompanyIdByName`'s case-insensitive lookup, every rep id in `company_representatives` maps to products in the catalog:

| Rep id | Rep `company_name` | Products |
|---|---|---|
| accuray | Accuray® | 1 |
| ai-medical | AI Medical | 1 |
| brainlab | Brainlab | 1 |
| canon-medical | Canon Medical Systems | 3 |
| carina-ai | Carina AI | 1 |
| claripi | ClariPi | 1 |
| coreline-soft | Coreline Soft Co | 2 |
| elekta | Elekta | 2 |
| ge-healthcare | GE Healthcare (5 reps) | 8 (5 "GE Healthcare" + 3 "GE HealthCare" via case-insensitive) |
| manteia | Manteia | 3 |
| md-anderson | MD Anderson Cancer Center | 1 |
| medlever | MedLever, Inc. | 4 |
| mim-software | MIM Software (2 reps with @gehealthcare emails) | 1 |
| mirada-medical | Mirada Medical | 1 |
| mvision-ai | MVision AI | 4 |
| neuralrad | NeuralRad | 1 |
| philips-healthcare | Philips (2 reps) | 9 |
| ptw-dosimetry | PTW (2 reps) | 1 |
| pymedix | PyMedix | 1 |
| radformation | RadFormation | 3 ("Radformation"+"RadFormation" case-insensitive) |
| raysearch | RaySearch Laboratories (2 reps) | 2 |
| siemens-healthineers | Siemens Healthineers (2 reps) | 4 |
| subtle-medical | Subtle Medical | 6 |
| sun-nuclear | Sun Nuclear (Mirion Medical) (2 reps) | 3 |
| synaptiq | Synaptiq (2 reps) | 3 |
| syntheticmr | SyntheticMR | 1 |
| therapanacea | Therapanacea | 7 |
| wisdom-tech | Wisdom Tech | 2 |

### ⚠ Data-quality issues to clean up

These don't currently block any rep (none has a rep), but they leave the catalog with fragile slug fallbacks and inconsistent display names.

1. **Catalog typo**: `src/data/companies/auto-contouring.ts` has `id: "vysioner", name: "Vysioner"` but the product (`vysioneer-vbrain.ts` etc.) lists `company: "Vysioneer"`. Slug fallback makes them resolve to different ids (`vysioneer` vs `vysioner`) → product never appears on the Vysioner company page.

2. **Casing drift `GE HealthCare` → `GE Healthcare`** in 3 product files (Spectronic, plus 2 GE files). Currently works via case-insensitive lookup but is inconsistent.

3. **`Spectronic Medical (a GE HealthCare company)`** product company string doesn't match the catalog entry `Spectronic Medical`. Slug fallback creates an orphan id `spectronic-medical-a-ge-healthcare-company`. Decision needed:
   - (a) shorten to `Spectronic Medical` (matches catalog; keep parenthetical in description), **or**
   - (b) reassign these products under GE Healthcare since the subsidiary was acquired.

4. **`MedMind Technology Co., Ltd.`** product vs archived catalog `MedMind Technology` → slug mismatch.

5. **`Quanta Computer Inc.`** product vs archived catalog `Quanta Computer` → slug mismatch.

### ℹ No-rep companies (FYI, not a bug)
AIRS Medical, AlgoMedica, Carina AI (rep exists), ClariPi (rep exists), Ever Fortune AI, Hura Imaging, Inpictura, Leo Cancer Care (archived), Limbus AI, MedCom, MedMind, Oncosoft, Quanta, RefleXion (archived), Spectronic, Taiwan Medical Imaging, United Imaging, Varian (Siemens), ViewRay (archived), Vysioneer. No outreach has been made for these yet.

### ℹ Cross-affiliation observed
- `mallory.sherrill@gehealthcare.com` and `jay.obman@gehealthcare.com` are reps for **MIM Software** (GE acquired MIM). Intentional, no change.

## Proposed fixes

Item 1 (Vysioneer typo) is the only one that actively breaks a company page once a rep is added; items 2–5 are cosmetic. I'll apply items 1–2 unconditionally and need your decision on item 3.

**Build-mode changes:**
1. `src/data/companies/auto-contouring.ts` — rename `Vysioner` → `Vysioneer`, `id: "vysioner"` → `"vysioneer"`. Update `LEGACY_NAME_TO_ID` in `src/utils/companyUtils.ts` if needed.
2. Normalize `company: "GE HealthCare"` → `"GE Healthcare"` in the 3 product files that drift.
3. *Pending your decision* — for Spectronic Medical, MedMind, Quanta product strings.

**No DB changes needed** — the only rep-affecting mismatch (Accuray ®) was already fixed in the prior turn.

## Question for you
For item 3 (Spectronic Medical product company string), pick (a) shorten to `"Spectronic Medical"` to match catalog, or (b) reassign products under `"GE Healthcare"`? I'll hold the plan until you confirm so I can apply items 1–5 in one pass.
