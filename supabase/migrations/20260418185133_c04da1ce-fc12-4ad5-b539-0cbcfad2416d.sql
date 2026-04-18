INSERT INTO public.changelog_entries (entry_id, version, date, category, title, description, details, status, auto_generated, published_at, author)
VALUES (
  'regulatory-audit-2026-04',
  '2026.04',
  '2026-04-17',
  'improvement',
  'Regulatory audit & catalogue refresh (April 2026)',
  'Refreshed FDA 510(k) clearances and added a newly identified AI auto-contouring product to the catalogue.',
  E'## Updates\n\n- **Radformation AutoContour**: Updated to V5 (FDA K260509, cleared 2026-03-19, Special 510(k)).\n- **MIM Contour ProtégéAI+**: Updated FDA clearance to K253270 (cleared 2026-03-27).\n- **Varian Ethos**: Noted Ethos 2.0 announcement (2026-02-18); K-number pending public release.\n\n## New products\n\n- **Quanta Computer — QOCA® image Smart RT Contouring System** (FDA K231855, cleared 2024-02-13). AI-based OAR auto-contouring on planning CT.\n\n## Notes\n\n- Per-vendor verification pass across ~80 active products against FDA QKB clearances and recent vendor announcements (ESTRO/ASTRO 2025, Q1 2026).\n- EUDAMED CE verification remains limited due to module incompleteness; CE status continues to rely on vendor disclosures.',
  'published',
  false,
  now(),
  'DLinRT Editorial Team'
)
ON CONFLICT (entry_id) DO NOTHING;