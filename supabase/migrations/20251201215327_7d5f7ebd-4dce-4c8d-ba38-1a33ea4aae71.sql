-- Insert 3 changelog entries for October, November, December 2025
INSERT INTO public.changelog_entries (
  id, 
  entry_id,
  version, 
  date, 
  category, 
  title, 
  description, 
  details, 
  status, 
  published_at,
  auto_generated
)
VALUES 
  (
    gen_random_uuid(),
    '2025-10-initial',
    'Oct 2025', 
    '2025-10-01', 
    'feature', 
    'October 2025 Updates', 
    'Website migration and improvements', 
    E'### 🚀 New Features\n- **Repository Migration**: Successfully migrated from DLinRT-eu/website to DLinRT-eu/dlinrteu-website\n\n### ✨ Improvements\n- Website infrastructure updates\n- Code organization improvements', 
    'published', 
    NOW(),
    false
  ),
  (
    gen_random_uuid(),
    '2025-11-initial',
    'Nov 2025', 
    '2025-11-01', 
    'feature', 
    'November 2025 Updates', 
    'Changelog system and AI features', 
    E'### 🚀 New Features\n- **Changelog System**: Added automated changelog generation from GitHub commits\n- **AI Summarization**: Integrated Lovable AI Gateway for human-readable changelog summaries\n\n### ✨ Improvements\n- Enhanced admin dashboard\n- Better commit categorization', 
    'published', 
    NOW(),
    false
  ),
  (
    gen_random_uuid(),
    '2025-12-initial',
    'Dec 2025', 
    '2025-12-01', 
    'feature', 
    'December 2025 Updates', 
    'Latest improvements and fixes', 
    E'### 🚀 New Features\n- Ongoing development and improvements\n\n### ✨ Improvements\n- Repository configuration updates\n- Changelog backfill system refinements', 
    'published', 
    NOW(),
    false
  );