# Monaco structures per model, anatomy, market dates, Elekta company page

## 1. Monaco structure list split by model
Use the same convention as TheraPanacea and the other multi-model products: a separate structures file, with each model named in the region label so the Structure Comparison tool sees each model separately.
- "Female Pelvis Intact (MR): …" — 15 structures, including Uterocervix
- "Female Pelvis Hysterectomy (MR): …" — 14 structures, no Uterocervix
- "Male Pelvis (MR): …" — 13 structures
- "Head & Neck (MR): …" — 38 structures
- Total 80 entries across four models, replacing the current 66 entries grouped by body area. Names stay as the manual's own output labels, from tables 4, 5, 11 and 17.

## 2. Anatomical site filled in
- Monaco: Pelvis, Head & Neck. IRIS: Pelvis.
- Why the box shows "-": the product page's "Anatomical Location" box only reads an older field, while these products (and most others) store their body sites in the newer one. I'll make the box fall back to the newer field, so it fills in for every product that has sites, not just Elekta. It's a display-only change; filters and exports already read both.

## 3. On market since
- Monaco Segmentation: 2026. FDA K252002 was cleared on 19 Feb 2026; the release date is already set.
- IRIS Evo: change from "2022" to 2024. The earliest dated public source is Elekta Evo with Iris, launched May 2024 (ITN press release, already cited; release date 2024-05-14). I'll do a quick web search for an earlier Iris launch (e.g. on Versa HD), and only use an earlier year if a dated source shows one.

## 4. Elekta company page
The Elekta company record lists only IRIS. I'll add the Monaco segmentation product, so the company page shows both current Elekta products. The archived AATMA entry stays archived, as now.

## Checks
Run the catalogue tests and the evidence checker, then open the Monaco page, the IRIS page and the Elekta company page.

## Technical details
- New file src/data/products/auto-contouring/elekta-monaco-structures.ts; elekta-monaco.ts imports it.
- In GeneralInformationDetails.tsx, the anatomy display becomes `anatomy ?? anatomicalLocation`. The editor field is unchanged.
- Add the Monaco product to Elekta's product list in src/data/companies/radiotherapy-equipment.ts.
