## Verdict

**Do not add ZAP Surgical / ZAP-X / ZAP-Axon as an active DLinRT.eu product** at this time. Based on vendor and press sources reviewed today (2026-05-20), the system fails the project's AI/DL inclusion gate (`mem://constraints/ai-dl-technology-threshold`).

## Evidence collected

Sources consulted (search date 2026-05-20):

1. https://zapsurgical.com/zap-axon/ — official product page. Lists: fusion, contouring, planning & optimization, evaluation, approval. The only named algorithm is a **"Krylov quadratic optimizer"** (classical numerical optimization, not ML/DL). No mention of AI, deep learning, neural networks, or learned auto-contouring.
2. https://zapsurgical.com/news/zap-unveils-the-zap-axon-radiosurgery-planning-system/ — March 2025 launch release. Same feature set; no AI claims.
3. https://www.businesswire.com/news/home/20251111492537/en/ — Nov 2025 FDA 510(k) + CE clearance announcement. Same Krylov optimizer pitch.
4. https://www.medicaleconomics.com/view/zap-surgical-systems-gains-fda-ce-clearance-for-ai-ready-brain-radiosurgery-planning-platform — headline calls it **"AI-ready"** (forward-looking marketing). Direct quote from Alex Maslowski, PhD, VP Software at ZAP Surgical: *"As the first system in its field built entirely on modern web technologies, Axon is uniquely positioned to rapidly integrate and fully harness the power of AI."* — future tense, no shipped AI component.
5. https://www.itnonline.com/content/radiosurgery-planning-system-receives-fda-510k%C2%A0ce-clearance — mirrors the press release; no AI features described.

## Why this fails the inclusion gate

Per `mem://constraints/ai-dl-technology-threshold`, DLinRT.eu requires shipped ML/DL technology; classical image processing and classical optimization are explicitly excluded. ZAP-Axon's current public technical claim is a Krylov quadratic optimizer — a deterministic numerical method, not learned. Vendor framing is explicitly "AI-ready", which is exactly the marketing pattern the threshold policy was written to filter out.

The director's claim ("there is AI") is not corroborated by any current public source for any cleared ZAP product. It may refer to a roadmap item, a research collaboration, or a future module — none of which qualify under our inclusion policy until shipped and identifiable.

## Proposed actions (no source files edited in this plan)

1. **Reply to the director** with a short note citing the Maslowski quote and asking for a specific, citable AI component (module name, model card, paper, 510(k) summary section, or vendor white paper). Template included below.
2. **Add a Pipeline watch entry** at `src/data/products/pipeline/zap-axon.ts` only **after** the director (or vendor) provides a concrete AI module name. Until then, no entry — Pipeline is for identified pre-market AI products, not for "vendor says AI is coming".
3. **Log the audit decision**: append a one-line note to `/mnt/documents/product-audit-2026-05-20-zap-surgical.md` recording the sources, the date, and the "excluded — fails AI/DL gate" verdict so a future reviewer doesn't re-litigate it.
4. **Re-review trigger**: if ZAP publishes (a) an AI auto-contouring module, (b) a learned dose prediction model, or (c) a 510(k)/CE clearance that names an ML component, re-open the assessment and create a proper product entry under the appropriate category (likely Auto-Contouring and/or Treatment Planning).

## Draft message to the director

> Thanks for flagging ZAP. I checked the public sources (vendor site, March 2025 launch release, Nov 2025 FDA/CE clearance release, Medical Economics coverage). The only algorithm ZAP currently names in ZAP-Axon is a Krylov quadratic optimizer, which is classical numerical optimization — not ML/DL. ZAP's own VP of Software, Alex Maslowski, describes Axon as *"uniquely positioned to rapidly integrate … AI"* (future tense), and the press headline calls it "AI-ready". Under DLinRT.eu's inclusion policy we list shipped AI/DL products, not roadmap items, so I have not added ZAP. If you have a specific cleared AI module name, model card, paper, or vendor document, send it over and I will re-assess.

## Out of scope for this plan

- No edits to `src/data/products/**`.
- No changes to companies registry.
- No new edge functions, UI changes, or migrations.
- The full Phase A/B mechanical fix work from the prior audit is unaffected.
