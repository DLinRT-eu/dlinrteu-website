-- Delete the manually created changelog entries so they can be replaced with AI-generated ones
DELETE FROM public.changelog_entries 
WHERE entry_id IN ('2025-10-initial', '2025-11-initial', '2025-12-initial');