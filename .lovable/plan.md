

# Add AI Index, AI Agent Index, and AI Safety Report References

## What to add

Three major general-purpose AI reference reports, all with verified URLs:

1. **Stanford AI Index Report 2025** (8th edition, Stanford HAI) — comprehensive annual report on AI trends, policy, and governance
   - URL: `https://hai.stanford.edu/ai-index/2025-ai-index-report`
   - Category: "AI/ML Guidelines" in ResourceLinks, "Research & Evidence" in CoreDocuments

2. **The 2025 AI Agent Index** (MIT) — documents technical and safety features of 30 deployed agentic AI systems
   - URL: `https://aiagentindex.mit.edu/`
   - Paper: `https://arxiv.org/abs/2602.17753`
   - Category: "AI/ML Guidelines" in ResourceLinks

3. **International AI Safety Report 2025** (Yoshua Bengio et al., commissioned by AI Safety Summit governments) — risks and safeguards for general-purpose AI
   - URL: `https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025`
   - Category: "AI/ML Guidelines" in ResourceLinks, "Research & Evidence" in CoreDocuments

## Files to modify

### 1. `src/components/resources/ResourceLinks.tsx`
- Add 3 new entries to the `resources` array in the "AI/ML Guidelines" category section (after line 123, before Professional Organizations)

### 2. `src/components/resources/CoreDocuments.tsx`
- Add 3 new entries to the "Research & Evidence" category (currently only has the WHO document), updating reference numbers accordingly
- Update the reference note at the bottom to reflect the new count [14] → [17]

### 3. `src/components/resources/RegulatoryLandscape.tsx`
- Add a new card for "General-Purpose AI Governance" referencing the AI Safety Report and its relevance to the AI Act's GPAI provisions (Chapter V of the AI Act covers general-purpose AI models)

## Summary
- 3 new reference entries in Extended Resources Library
- 3 new entries in Core Documents
- 1 new card in Regulatory Landscape for GPAI governance context
- No structural changes to components

