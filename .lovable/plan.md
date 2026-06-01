## Update MIM Contour ProtégéAI+ product entry

Edit `src/data/products/auto-contouring/mim-software.ts`:

**Version & compatibility**
- `version`: `"2.0"` → `"1.4.0"`
- Add MIM platform compatibility: append `"Requires MIM 7.4.5 or later"` to `technology.integration` and mention in `description` or `keyFeatures`.

**supportedStructures** — replace entire array with the user-supplied list, stripping the literal word "New" from any entries (e.g. `Thorax CT: A_Aorta_Asc`, `Thorax CT: A_LAD`, `Thorax CT: Chestwall_L/R`, `Thorax CT: Rib`). New groups added:
- **Female Pelvis CT**: Bag_Bowel, Bladder, Bowel, CaudaEquina, Colon_Sigmoid, Femur_Head_L, Femur_Head_R, LN_Pelvics, Rectum, SacralPlex, Sacrum, UteroCervix
- **Abdomen CT**: add CaudaEquina (already has the rest)
- **Head & Neck**: remove duplicate `Bone_Mandible` (typo in source), keep one
- **Thorax CT**: add A_Aorta_Asc, A_LAD, Chestwall_L, Chestwall_R, Rib
- Pelvis CT: drop `Sacrum`? No — user list keeps Sacrum, remove no entries. Reconcile against existing list and use the user list as source of truth.
- Drop "Head & Neck: LN_Neck_VIB_*" etc. if not in new list (current file has none, OK).

**Metadata**
- `lastUpdated` / `lastRevised`: bump to today (2026-06-01).
- `source`: note "Structure list updated 2026-06-01 per vendor; v1.4.0 requires MIM 7.4.5+."

No schema, route, filter, counting, or evidence/regulatory changes.
