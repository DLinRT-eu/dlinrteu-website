## Goal

Fix the broken `supportedStructures` rendering on Therapanacea Annotate, restore MR-Box / AdaptBox structure lists from the vendor pages, propagate the official ART-Plan+ limitations to every Therapanacea product, and homogenize the "module of ART-Plan+" framing.

All edits are confined to five product files plus a small `partOf` normalization. No schema, UI, or backend changes.

---

## 1. `src/data/products/auto-contouring/therapanacea.ts` (Annotate)

The current `Annotate` object lumps all CT models into one flat `supportedStructures` list with many duplicate names (e.g. `Esophagus`, `Heart`, `Brachial Plexus (L/R)` repeated), which is the "incorrect syntax" the user is seeing — the comparison view dedupes by name and the structures effectively disappear or collide.

Rewrite `supportedStructures` to follow the project's mandatory `Region: Structure Name` convention so each of the seven CT models is preserved as a distinct group. Source: `https://www.therapanacea.eu/our-products/annotate/`.

The seven CT models become these prefixes (matching the user's list):

1. `Head & Neck:` (OARs from Grégoire 2014 + cervical LN levels IA–VIIB)
2. `Female Thorax / Breast:` (Offersen 2015 OARs + IMC / interpectoral / L1–L3 / supraclavicular LNs)
3. `Male Thorax:` (Offersen-equivalent OARs, no breast structures, no IMC)
4. `Heart Sub-Structures:` (Duane 2017 / Lee 2017 cardiac substructures: LAD, LMCA, circumflex, atria, ventricle segments, coronary sinus, pericardium, pulmonary arteries, ascending/thoracic aorta, vena cava sup./inf.)
5. `SBRT Lung:` (UK SABR 2019 OARs)
6. `Pelvis Male:` (Gay 2012 OARs + `CTVn Prostate` target)
7. `Pelvis Female:` (Gay 2012 OARs + gynecological LNs + `CTVt Gyneco` target)

Each existing entry is reassigned to one (or more, if truly shared) of these regions; nothing is deleted. Anchor URLs per model are recorded in `structuresProvenance.notes`.

Additional fixes on the same object:

- Add `additionalClearances` entry for FDA **K211539** (already mentioned in notes) into `trainingData` / `evaluationData` description so the FDA-disclosed training-population caveats (adult-only, English-language sites, scanner-population restrictions from the 510(k) summary) are visible. Add a sentence to `trainingData.description` summarising the FDA-disclosed dataset framing (multi-institutional retrospective CT cohorts, adult patients, contours by board-certified clinicians) and keep `disclosureLevel: "partial"`.
- Append the ART-Plan+-wide limitations (see §5) to `limitations`.
- Normalize `partOf` to the shared shape from §4.

`TumorBox` (same file) is left as-is except for the §4 `partOf` normalization and §5 limitations append; the user only flagged the seven CT Annotate models.

---

## 2. `src/data/products/image-synthesis/therapanacea.ts` (MR-Box)

Add a `supportedStructures` array (currently absent) covering the three MR models from `https://www.therapanacea.eu/our-products/mr-box/`, using `Region: Structure Name` form:

- `Brain T1:` Anterior Cerebellum, Chiasma, Cochlea (L/R), Cornea (L/R), Encephalon, Eye Lens (L/R), Hippocampus (L/R), Hypophyse, Hypothalamus (L/R), Lacrimal Gland (L/R), Medulla Oblongata, Midbrain, Optical Nerve (L/R), Pons, Posterior Cerebellum, Retina (L/R), Spinal Cord, VSCC (L/R). Guideline: EPTN consensus 2018.
- `Pelvis T2 Elekta (Male):` Anal Canal, Bladder, Femoral Head (L/R), Pelvis (L/R), Penile Bulb, Prostate, Rectum, Sacrum, Seminal Vesicle. Guideline: ESTRO ACROP / Salembier 2018.
- `Pelvis Male & Abdo TrueFISP:` Anal Canal, Femoral Head (L/R), Penile Bulb, Prostate, Rectum, Seminal Vesicle, Sigmoid Colon, Abdominal Aorta, Duodenum, Kidney (L/R), Large Bowel, Liver, Pancreas, Stomach, Vena Cava Inferior. Guidelines: RTOG Jabbour 2014, RTOG Kong 2011.

Add `structuresProvenance` pointing at the MR-Box page with the three anchor URLs in `notes`.

Append a `guidelines[]` block referencing EPTN 2018, ESTRO ACROP Salembier 2018, RTOG Jabbour 2014, RTOG Kong 2011 (DOIs already present in other product files where available).

Append §5 limitations.

Normalize `partOf` per §4.

---

## 3. `src/data/products/image-synthesis/therapanacea-adaptbox.ts` (AdaptBox)

Replace the current mixed `supportedStructures` (which contains free-text headings like `"FDA-cleared AdaptBox anatomy: Head & Neck"`) with a clean list for the single `Pelvis (Male)` AI-contouring model documented at `https://www.therapanacea.eu/our-products/adaptbox/`:

- `Pelvis Male:` Anal Canal, Bladder, Femoral Head (L/R), Penile Bulb, Prostate, Rectum, Seminal Vesicle, Sigmoid

(FDA-cleared anatomies H&N and Breast/Thorax remain documented under `regulatory.fda.notes` and `anatomicalLocation` — they are sCT-generation anatomies, not OAR-contouring models, per the vendor page.)

Add `structuresProvenance` with the AdaptBox anchor URL.

Append §5 limitations.

Normalize `partOf` per §4.

---

## 4. Homogenize "ART-Plan+ module" framing

In every Therapanacea product (Annotate, TumorBox, MR-Box, AdaptBox, SmartFuse in `registration/therapanacea.ts`, and the two pipeline modules SmartPlan / BrachyBox in `pipeline/therapanacea.ts`) set:

```ts
partOf: {
  name: "ART-Plan+",
  version: "3.2.0",                                  // current public version per technical-information-2 page
  productUrl: "https://www.therapanacea.eu/our-products/",
  relationship: "Module"
}
```

Pipeline modules use the same shape but keep `version` omitted (pre-market).

---

## 5. Shared ART-Plan+ limitations (source: technical-information-2 page)

Add the following abridged limitations to every Therapanacea product's `limitations[]` array (deduplicated against any product-specific items already present):

- Contours generated by ART-Plan+ must be verified and validated by an authorized user before clinical use.
- Image-quality dependent: low-resolution, noisy, lossy-compressed, or artefact-laden volumes (e.g. implants) can degrade contour quality.
- Adult patients only; auto-contouring may be inappropriate for paediatric volumes.
- Automatic contouring may fail or produce inappropriate contours when Patient Position (DICOM 0018,5100) or Patient Sex (0010,0040) tags are missing or incorrect, when the patient is not supine, for unusually high slice counts, or for post-surgical anatomy (e.g. prostatectomy).
- Pelvic/abdominal auto-contouring may produce inappropriate contours on CT images of patients under 60 years.
- H&N lymph nodes, lacrimal glands and pharyngeal constrictor muscles: best performance on contrast-enhanced CT; degraded on non-contrast or non-Siemens-Sensation-Open scanners, and on patients <50 or >79 years.
- MR auto-contouring is only validated for the supported sequences/anatomies: Brain T1, Abdo TrueFISP, Pelvis T2, Pelvis TrueFISP. (MR-Box / Annotate-MRI)
- CBCT-based synthetic CT (AdaptBox): augmented slices outside the native CBCT FOV are not reliable for contours or dose; quality of synCT must be reviewed before use.
- Dose engine (SmartPlan / dose computation) must be validated by the user before clinical use; only Monaco-Mosaiq, Eclipse-ARIA and RayStation are validated TPS/R&V targets; ballistic configuration limited to 1–2 beams.
- Only the latest RTPlan linked to a given RTSS is consumed.

Product-specific subset: SmartFuse and MR-Box get the imaging / MR / synCT items; AdaptBox additionally gets the augmented-FOV item; SmartPlan/TumorBox/BrachyBox keep the planning-engine and pipeline caveats; Annotate keeps the auto-contouring caveats.

---

## 6. Out of scope

- No changes to `src/types/productDetails*`, UI components, or the comparison page.
- No changes to evidence scoring (`evidenceRigor` / `clinicalImpact` / `adoptionReadiness`) — only descriptive fields are touched.
- No changes to other vendors' products.
- No changes to docs in `docs/`; the field-reference doc already covers the conventions used here.

---

## Verification

After edits, the project will be auto-rebuilt. Spot-check via Playwright on `/product/therapanacea-annotate`, `/product/mr-box-synthetic`, `/product/therapanacea-adaptbox`, and the comparison page that each of the 7/3/1 model groups is rendered without name collisions.
