# AutoContour — apply Yvette Wilbur's suggestions in house style

Yvette Wilbur (Radformation) submitted one pending suggestion on 6 Nov, changing two fields: **anatomy** and **guidelines**. AutoContour currently has neither field; everything else in the suggestion matches the live page.

## Her suggestion
- **Anatomy** (17 items): Brain, Head & Neck, Thorax, Abdomen, Male Pelvis, Female Pelvis, HDR Female Pelvis, Breast & Chestwall, Brain MRT1, Male Pelvis MRT2, Male Pelvis MR TRUFI, HDR Female Pelvis MRT2, Abdomen MR TRUFI, Male Pelvis CBCT, Multisite.
- **Guidelines**: "AAPM TG-263" (full), "ESTRO Guidelines" (full).

## How it will be adapted to house style
- **Anatomy**: other products list plain body regions, not model names or scanner sequences. Keep the regions (Brain, Head & Neck, Thorax, Breast & Chestwall, Abdomen, Male Pelvis, Female Pelvis, plus "Multisite"). Fold the modality/sequence variants (MR T1/T2, TRUFI, CBCT, HDR) into regions they belong to; these already show under Modality and in the structure list. The broader anatomical location list stays unchanged.
- **Guidelines**: use the same layout as Limbus/MVision (name, version, reference, link, compliance).
  - AAPM TG-263, 2018, DOI 10.1002/mp.12909, full — matches the TG-263 note already on the page.
  - "ESTRO Guidelines" is too vague to cite. Replace it with the specific named consensus guidelines the page already lists under key features (ESTRO, EPTN, DAHANCA/EORTC, RTOG/NRG) only where Radformation's public pages state alignment; mark them "partial" unless the vendor says all models follow them. Anything without a public source is left out, per the source-disclosure rule.
- Keep source note: "Vendor-submitted (Yvette Wilbur, Radformation, 2026-11-06)".

## Then
- Mark her draft as applied with a short review note explaining the adaptations.
- Run the catalogue tests and evidence checker, and check the AutoContour page in the browser.

## Technical details
- Edit `src/data/products/auto-contouring/radformation.ts` (`anatomy`, `guidelines`).
- Update `product_edit_drafts` row `62ea59a1…` status to `applied` with `review_notes`.
