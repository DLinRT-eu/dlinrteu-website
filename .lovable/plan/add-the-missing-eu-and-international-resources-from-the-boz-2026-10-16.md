# Add the missing EU and international resources from the BoZ/KPMG AI regulation overview

Source: "Overzicht wet- en regelgeving AI", version 1.0 (29 May 2026; standards tab dated 4 May 2026). All Resources page text stays in English. Dutch national laws and Dutch-only guidance are left out.

## Already on the page (no change)
MDR, IVDR, AI Act and the Digital Omnibus (COM(2025) 836), the MDR/IVDR simplification proposal (COM(2025) 1023), GDPR (mentioned only in the checklist and standards), the GPAI Code of Practice, NIST AI RMF 1.0, ISO/IEC 42001 and ISO 14971.

## Added to "Core documents"
EU Regulatory Framework group:
- GDPR, Regulation (EU) 2016/679: official text, in force. Today it is only mentioned, not linked.
- European Health Data Space (EHDS), Regulation (EU) 2025/327: in force with phased application.
- Commission guidelines on the definition of an AI system (Art. 3(1) AI Act, Feb 2025): guidance.

New "Adjacent EU legislation" group, marked as relevant but not AI-specific:
- Data Act, Regulation (EU) 2023/2854.
- NIS2 Directive, (EU) 2022/2555. The note says it applies to hospitals as essential entities.

## Added to "Standards and guidelines"
- ISO/IEC TS 4213 (ML classification performance) and ISO/IEC TR 24028 (trustworthiness in AI).
- NIST AI 600-1 (Generative AI Profile) and NIST AI 100-2 (adversarial ML taxonomy).
- EU HLEG ALTAI self-assessment list.
- EU model contractual AI clauses (Public Buyers Community), listed under procurement.
- OWASP GenAI Security Project and Stanford HELM, marked as relevant mainly for LLM-based tools.

## Excluded (national, Dutch only)
Wgbo, UAVG, Wkkgz, Wabpvz, Wegiz, Cbw, NEN 7510/7513, IAMA, the NVZ/NFU and Sigra papers, AI-Kompas, Vilans/ActiZ, Leidraad Kwaliteit AI, Toolkaart, ARBIT/PIANOo and Beslishulp BZK. The KPMG obligation register and definitions tab are also left out: they are Dutch, licensed text and duplicate the primary legislation.

## Technical details
- Files: `src/components/resources/CoreDocuments.tsx`, `StandardsGuidelines.tsx`, and possibly `ResourceLinks.tsx` for library links.
- Every new entry gets a URL, a version, a status and `lastVerified` = the date its link is checked. Each URL is checked live before it is added, and any link that cannot be verified is dropped.
- The footnote range "[1]–[20]" is extended to match the new reference numbers, and `RESOURCES_LAST_AUDIT` is moved to the check date.
- The overview is credited as a cross-check source in a short note, with no Dutch content copied.
- Checks: type check and build, then a browser pass over /resources-compliance.
