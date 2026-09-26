# AutoContour targets, Pipeline additions, new-product and logo check

## 1. AutoContour 2.8 shows no target volumes
The 2.8 list uses Radformation's own names. The 2.7 list turned the breast targets into "CTV Breast L/R". On the 2.8 page, the likely equivalents are guideline-named volumes: `Breast_RTOG_L/R`, `Breasts_RTOG`, `Chestwall_ESTRO_L/R`, `Chestwall_RC_L/R`, and possibly `ProstateBed`. The site only recognises names that contain CTV, GTV or PTV (plus MVision's `Br_..._RTOG` pattern), so these are counted as organs.
- Check Radformation's page and model notes, and the 2.7 source, for which of these the vendor describes as target (CTV) volumes.
- Mark only the confirmed ones as targets, using a narrow AutoContour-specific name rule in the structure classifier, as was done for MVision. Names stay exactly as the vendor writes them.
- If Radformation doesn't say, leave them as organs and state that in the entry's source note. Nothing gets relabelled on a guess.

## 2. Pipeline additions from the ASTRO news item
- **AtomoAI** (US, AI tumour contouring, no regulatory approval found): add a Pipeline entry and its company record, using only public, vendor-reported claims with their sources. Then link it from the news item.
- **Cortechs.ai** has FDA clearance, so it isn't a Pipeline product. It stays deferred to the review round.
- **SeeTreat**, **5thPort**, **Gosta Labs**, **Artera** and **OptiPlan** stay excluded, as the news already says.
- If there are other companies you meant for the Pipeline, tell me their names.

## 3. Check that the new products were added properly
Products to check: RatoAI (AiRato), RadOncAI (InformAI), DeepBT Detector-Plus (Aitewan), and the new Pipeline entry. For each one:
- the product is registered in its category list and shows up in search, the category page and the company page;
- the product's company name matches the company record (for example, "AiRato, Inc." on the product versus "AiRato" on the company record), and the company record lists the product;
- the news links open the right product pages.

## 4. Company logos
RatoAI, RadOncAI and DeepBT Detector-Plus all use the placeholder image right now.
- Download each company's official logo from its own website, save it with the other company logos, and point the product (and company record, if logos are set there) to it.
- Do the same for AtomoAI.
- Take a browser screenshot of the company and product pages to confirm the logos load.
- If a site has no logo I can download, keep the placeholder and report it.

## Checks
Typecheck, validate:evidence, and a browser check of the AutoContour page to confirm the target count, plus the Pipeline page and the pages above.
