
-- Update changelog entry descriptions with professional, user-focused summaries

-- Update January 2026
UPDATE changelog_entries 
SET description = 'Enhanced changelog management with dual-repository backfill and preview editing, investigational product support, improved reviewer dashboard controls, and updated company data including new logos and ExcelJS-powered exports.',
    updated_at = now()
WHERE version = '2026.01.0';

-- Update October 2025
UPDATE changelog_entries 
SET description = 'Major authentication overhaul introducing role-based access control, MFA verification, comprehensive admin dashboard, and streamlined password reset workflows with enhanced security policies.',
    updated_at = now()
WHERE version = '2025.10.0';

-- Update September 2025
UPDATE changelog_entries 
SET description = 'Introduced certification analytics with distribution charts, automatic product revision tracking, redesigned header navigation, and the new Resources & Compliance page for regulatory information.',
    updated_at = now()
WHERE version = '2025.09.0';

-- Update August 2025
UPDATE changelog_entries 
SET description = 'Security-focused release with enhanced access controls, PPTX export functionality for product comparisons, newsletter system refactoring, and multiple product data updates.',
    updated_at = now()
WHERE version = '2025.08.0';

-- Update July 2025
UPDATE changelog_entries 
SET description = 'Launched the product comparison feature with PDF export capabilities, enhanced company validation, improved certification filtering, and security cookie handling improvements.',
    updated_at = now()
WHERE version = '2025.07.0';

-- Update June 2025
UPDATE changelog_entries 
SET description = 'Introduced GDPR-compliant analytics, DOI citations for supported structures, model card export functionality, advanced search capabilities, and team member randomization.',
    updated_at = now()
WHERE version = '2025.06.0';

-- Update May 2025 (Platform Launch)
UPDATE changelog_entries 
SET description = 'Platform foundation release featuring Terms of Use page, privacy policy updates, Resend email integration, RSS feed system, and initial Supabase connection for newsletter functionality.',
    updated_at = now()
WHERE version = '2025.05.0';
