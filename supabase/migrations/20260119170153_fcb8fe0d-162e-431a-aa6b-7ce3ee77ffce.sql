-- Update December 2025 entry with improved content
UPDATE changelog_entries 
SET 
  title = 'December 2025 Release',
  description = 'Major platform enhancements including AI-powered changelog generation, improved product data management, expanded company validation tools, and regulatory badge improvements.',
  details = '## 🚀 New Features

- **AI Changelog Generation**: Automatically generate professional changelogs from repository commits using intelligent summarization
- **Content Hash Validation**: Added integrity verification for product data with hash-based change detection
- **Company Mapping Validator**: New administrative tool to validate and manage company-product relationships
- **Auto-Navigation on Role Switch**: Users now automatically navigate to the appropriate dashboard when switching roles

## ✨ Improvements

- **Product Data Management**: Bulk update capabilities and standardized validation checks across all products
- **Regulatory Badge System**: Improved MDR/FDA badge detection logic for accurate compliance display
- **Admin Certifications**: Enhanced certificate management with hash verification for data integrity
- **Multi-Role Access**: Protected routes now seamlessly support users with multiple organizational roles
- **Company Mappings**: Extended PTW mappings and resolved edge cases in company-product relationships

## 🐛 Bug Fixes

- Fixed regulatory badge matching for edge cases in product categorization
- Resolved navigation issues in admin security routes
- Corrected SEO link text across the site for better search visibility

## 🔒 Security

- Enhanced route protection for dashboard access with improved role-based controls'
WHERE entry_id = '2025-12-backfill';

-- Update November 2025 entry with improved content
UPDATE changelog_entries
SET
  title = 'November 2025 Release',
  description = 'Comprehensive update introducing the reviewer and admin guide system, enhanced company management features, improved authentication security, and streamlined product review workflows.',
  details = '## 🚀 New Features

- **Reviewer & Admin Guides**: Comprehensive documentation system for reviewers and administrators with styled navigation
- **Company Dashboard**: Dedicated management view for company representatives to oversee their products and revisions
- **Review Round Management**: Bulk actions, PDF exports, and improved assignment workflows for efficient review cycles
- **User Registration Review**: Quick action buttons enabling faster admin review of new user registrations
- **Representatives Management**: New dedicated tab for managing company representatives with proper access controls
- **MFA Security Enhancements**: Multi-factor authentication improvements with new policies and fixes

## ✨ Improvements

- **MDR Exempt Handling**: New tooltips and badges for products exempt from Medical Device Regulation
- **Product Search & Filtering**: Enhanced ProductsManager with powerful search and filtering capabilities
- **Data Controls Interface**: New DataControlsBar component for consistent data management across the platform
- **Profile Experience**: Revised user profile interface with improved consent management
- **Assignment Fairness**: Improved algorithm for distributing review assignments equitably among reviewers
- **Admin Dashboard Revisions**: Streamlined admin dashboards with better organization and usability

## 🐛 Bug Fixes

- Fixed MDR Exempt product detection for accurate regulatory status display
- Resolved GitHub links across the site for proper repository references
- Fixed certification workflow issues affecting product verification
- Corrected user ID mapping in the review system
- Resolved RLS and RPC response typing issues for data security

## 🔒 Security

- Enhanced admin access controls with dedicated RPCs for sensitive operations
- Improved RLS policies for review data protecting user information'
WHERE entry_id = 'changelog-2025-11';