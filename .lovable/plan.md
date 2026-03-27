

# Assessment: uTPS OmniplanTx (United Imaging)

## What I Found

On the **uRT-linac 506c** product page (CE marked, not FDA cleared), the "Intelligent Radiotherapy Platform" section describes two AI-adjacent features "powered by uIPW and uTPS OmniplanTx":

1. **Intelligent Auto-Contouring** — generates OAR and target contours within seconds, supports 100+ models for lung, rectal, and cervical cancers
2. **Autoplan** — one-click treatment plan generation using 3D dose modelling, beam orientation optimization, and auto-optimization

## Inclusion Assessment

| Criterion | Status |
|-----------|--------|
| Explicit AI/DL in intended use | **Unclear** — uses "intelligent" and "auto" but no explicit "deep learning" or "AI" language on the product page |
| Standalone product | **No** — integrated feature of the uRT-linac 506c system |
| CE MDR clearance | **Inherited** from uRT-linac 506c system CE mark; no standalone TPS clearance found |
| FDA clearance | **No** — page states "Not available for sale in all markets" |
| Public documentation | **Minimal** — only the linac product page mentions it; no standalone product page, datasheet, or whitepaper found |
| Published evidence | **None found** — no PubMed or conference publications specific to OmniplanTx autoplanning |

## Recommendation: Do Not Add Yet

OmniplanTx does **not** meet the platform's inclusion criteria for these reasons:

1. **No explicit AI/DL claim** — "intelligent" and "automated" could describe rule-based or knowledge-based planning without neural networks. The inclusion policy requires products "using AI/Deep Learning (neural networks) for core clinical radiotherapy tasks."
2. **Insufficient public documentation** — same reason AATMA and QOCA Smart RT remain archived. There is no standalone product page, no technical documentation, and no evidence characterizing what algorithm drives the autoplanning.
3. **Not independently marketed** — it's a feature of the uRT-linac 506c, similar to how Varian Ethos AI segmentation is a feature of the Ethos linac. However, Ethos had explicit FDA-cleared AI intended use language and published evidence — OmniplanTx has neither.

## If You Still Want to Add It

If you have additional information (e.g., company confirmation that it uses deep learning, or a standalone CE certificate), the product would go in `src/data/products/treatment-planning/united-imaging.ts` as an E0/I0 entry with `secondaryCategories: ["Auto-Contouring"]` since it covers both contouring and planning. But based on publicly available information today, I'd recommend waiting until United Imaging publishes clearer AI claims or obtains standalone regulatory clearance.

