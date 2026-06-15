## Finding first — important caveat

The Philips document you linked is the **Ingenia MR-RT Instructions for Use (RTgo 5.12, doc 3000 113 93922/781, 2024-06)**. I parsed all 4,467 lines.

It does **not** disclose:
- number of training or validation patients
- number of centers / institutions
- algorithm performance numbers (HU MAE, dose differences, gamma pass rates)

Those numbers live in Philips white papers and peer-reviewed studies (already cited in our `categoryEvidence.evaluationData`), not in this IFU. I will not invent them.

It **does** disclose, per MRCAT variant, official **indications**, **patient selection criteria / contraindications**, and **operational limitations**. These are exactly the kind of vendor-authoritative limitations we should mirror into each product's `limitations` and `intendedUseStatement`, with the IFU as a public source.

## Suggested modifications (per product)

For all four files (`philips-mrcat-brain.ts`, `philips-mrcat-head-neck.ts`, `philips-mrcat-pelvis.ts`, `philips-mrcat-prostate.ts`):

1. Add/refresh `regulatory.intendedUseStatement` with the verbatim IFU indication line, citing the IFU URL + retrieval date (2026-06-15, publicly accessible — no `sourceAccess` needed).
2. Add an explicit `limitations` field (or extend `evaluationData.results` where `limitations` is not in the schema) with the IFU's patient-selection exclusions and operational notices. Update `source` / `lastRevised` accordingly.

Specifics drawn from the IFU:

**MRCAT Brain** (IFU p.10–11)
- Indication: "radiotherapy treatment planning for primary and metastatic brain tumor patients".
- Exclusions: large metal objects in imaging volume; cancer other than brain tumors; bone anomalies/diseases in the head area.
- Operational: continuous HU values; foreign objects (e.g. tracheal tube, CVC) may not be visualized; not usable with restricted dB/dt or restricted gradient slew rate; do not post-process MRCAT images.

**MRCAT Head and Neck** (IFU p.10–11)
- Indication: "radiotherapy treatment planning for patients with soft tissue tumors in the Head and Neck region".
- Exclusions: large metal objects (e.g. metal prosthesis); cancer other than H&N soft-tissue cancer; bone anomalies/diseases in the H&N area; body diameter at shoulder/chest >60 cm L-R or >34 cm A-P within the planning FOV.
- Operational: continuous HU values; foreign material (bolus, mouthpiece) may not be visualized; same dB/dt and post-processing restrictions as Brain.

**MRCAT Pelvis** (IFU p.10–11)
- Indication: "radiotherapy treatment planning of soft tissue cancers in the pelvic region".
- Exclusions: large metal objects (hip prosthesis etc.); cancer other than pelvic soft-tissue cancer; bone anomalies/diseases in the pelvic area; body diameter in pelvis >50 cm L-R or >30 cm A-P within FOV.
- Operational: continuous HU; signal-void volumes inside the body other than compact bone are interpreted as water/fat (HU water or fat) → potential mis-categorization of rectal gas / foreign material; generate MRCAT Pelvis **before** any contrast agent administration; dB/dt / gradient slew rate and post-processing restrictions as above.

**MRCAT Prostate** (IFU p.10–11)
- Indication: "radiotherapy treatment planning for prostate cancer patients", suitable up to the L3 vertebra including pelvic lymph node anatomies with margins.
- Exclusions: large metal objects (e.g. hip prosthesis); cancer other than prostate cancer; bone anomalies/diseases in the pelvic area; body diameter in pelvis >50 cm L-R or >30 cm A-P within FOV.
- Operational: **discrete (bulk) HU values** assigned — may not be suitable for soft-tissue dose evaluation in the very low-dose region; same signal-void, pre-contrast timing, dB/dt, and no-post-processing restrictions as Pelvis.

Common (all four):
- General Ingenia MR-RT exclusions: MRI contraindications, MR contrast-agent contraindications, claustrophobia, inability to tolerate position/scan time, treatment position unsuitable for MRI, patient weight >250 kg.

## Source disclosure block to attach to each updated field

```text
Source: Philips Ingenia MR-RT Instructions for Use, Release RTgo 5.12,
3000 113 93922/781 (2024-06), pp. 10–11 (indications, patient selection) and
pp. 63, 68 (MRCAT limitations).
URL: https://www.documents.philips.com/assets/Instruction%20for%20Use/20250625/aecaea1f0eb749a7babfb30700bf34b8.pdf?feed=ifu_docs_feed
Retrieved: 2026-06-15. Publicly accessible.
```

## What I will NOT change

- `trainingData` / `evaluationData.results` numerical fields — the IFU does not back them. Existing values (Tyagi 2017, Persson 2017, Christiansen 2017, Kemppainen 2017, FDA 510(k) K150965) stay.
- `categoryEvidence.*.evidenceRigor` / `clinicalImpact` — unchanged; the IFU is not a clinical study.
- Auto-contouring evaluation (Prostate variant) — IFU contains no auto-contouring performance numbers.

## Next step

If you approve, I'll switch to build mode and apply the four file edits + bump `lastRevised: 2026-06-15` and append the IFU citation to `source`. Let me know if you'd rather I also open a tracker note that the training/center/performance disclosures are still missing from public Philips materials so we can chase a white paper.