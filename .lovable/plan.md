
# Documentation Update Plan

## Overview

This plan updates all relevant documentation to reflect recent security improvements, GDPR compliance measures, FHIR export functionality, and ensures all "Last Updated" timestamps are current.

---

## Files to Update

### 1. SECURITY.md (Root)

**Current State**: Last updated November 29, 2025

**Changes**:
- Add new section "## GDPR Compliance" with detailed compliance measures
- Update "Database Security" section to document:
  - `security_invoker` views for RLS enforcement
  - IP hash anonymization across all tables
  - Restrictive RLS policies for anonymous access
- Add "Data Export & Portability" section
- Add "View Security" subsection documenting security_invoker usage
- Update timestamp to February 2, 2026

**New Content to Add**:
```markdown
### GDPR Compliance

#### Data Anonymization
- **IP Addresses**: All IP addresses are hashed using SHA-256 before storage
- **Columns**: `ip_hash` used consistently across `mfa_activity_log`, `consent_audit_log`, `security_events`, `profile_document_access_log`
- **Data Export**: User data exports redact IP hashes and user agents

#### User Rights Implementation
| Right | Implementation |
|-------|----------------|
| Art. 17 (Erasure) | `delete-account` edge function |
| Art. 20 (Portability) | `DataExport` component with JSON download |
| Art. 7 (Consent) | Cookie consent with versioned audit log |

#### View Security
Database views use `security_invoker = on` to ensure RLS policies are respected:
- `reviews_with_github_tracking`
- `analytics_summary`
- `company_products`
- `analytics_public` - restricted to authenticated users only
```

---

### 2. docs/README.md (Documentation Index)

**Current State**: Last updated January 28, 2026

**Changes**:
- Add "Healthcare Interoperability" section linking to FHIR export
- Add "Security & Compliance" quick link to SECURITY.md
- Update timestamp to February 2, 2026
- Add GDPR compliance overview

**New Content**:
```markdown
## 🔒 Security & Compliance

**File**: [SECURITY.md](../SECURITY.md)

Security features and GDPR compliance documentation:
- Row Level Security (RLS) with restrictive policies
- GDPR compliance (data export, anonymization, consent management)
- IP address hashing for privacy
- Healthcare interoperability (FHIR R4 export)
```

---

### 3. docs/ADMIN_GUIDE.md

**Current State**: Last updated January 28, 2026

**Changes**:
- Add section "10. Data Privacy & GDPR" covering:
  - User data export functionality
  - IP anonymization practices
  - Consent audit logs
- Update Security Monitoring section with view security information
- Add timestamp update to February 2, 2026

**New Section**:
```markdown
## 10. Data Privacy & GDPR

### User Data Export
Users can export all their data via Profile → Data Export.

**What's Exported**:
- Profile information
- Role assignments
- Review history
- MFA activity (sanitized - no IP addresses)

**Privacy Measures**:
- IP addresses are hashed (SHA-256) before storage
- User agents redacted in exports
- GDPR privacy notice included in export files

### Database View Security
All sensitive views use `security_invoker = on`:
- Prevents RLS bypass via views
- Restricts analytics to authenticated users
- Ensures reviewer data protected
```

---

### 4. docs/FIELD_REFERENCE.md

**Current State**: Last updated January 28, 2026

**Changes**:
- Add "Healthcare Interoperability" section for FHIR export fields
- Document FHIR readiness scoring system
- Update timestamp to February 2, 2026

**New Section**:
```markdown
## Healthcare Interoperability (FHIR Export)

Products can be exported in FHIR R4 DeviceDefinition format for healthcare system integration.

### FHIR Readiness Score

The system calculates a readiness score (0-4) based on terminology mappings:

| Check | Requirement | Points |
|-------|-------------|--------|
| Modality | Has DICOM code mapping | 1 |
| Anatomy | Has SNOMED CT code mapping | 1 |
| Disease | Has ICD-10/SNOMED code mapping | 1 |
| Regulatory | Has FDA/CE identifiers | 1 |

**Labels**:
- 0 points: Limited
- 1-2 points: Fair
- 3 points: Good
- 4 points: Excellent

### FHIR Export Options

| Option | Purpose |
|--------|---------|
| Include Warnings Report | Download unmapped terminology report |
| Standard Export | FHIR R4 Bundle with DeviceDefinition resource |
```

---

### 5. README.md (Root)

**Current State**: Contains basic security mention

**Changes**:
- Add "Security & GDPR Compliance" subsection under Key Features
- Add FHIR export mention under Key Features
- Add link to SECURITY.md in documentation section

**Updated Key Features**:
```markdown
## Key Features

- **Product Database**: Comprehensive catalog of AI/ML products in radiotherapy
- **Multi-Role System**: User, Reviewer, Company Representative, Admin roles
- **Company Certifications**: Verified product certifications from manufacturers
- **Review System**: Structured product review with assignment workflows
- **Compliance Resources**: Regulatory information and compliance checklists
- **Research Initiatives**: Database of datasets, challenges, and model zoos
- **User Tracking**: Track products you use or are evaluating
- **Community Experiences**: Share and view product adoption experiences
- **Healthcare Interoperability**: FHIR R4 export for hospital system integration
- **GDPR Compliance**: Data export, anonymization, and consent management
```

---

### 6. DOCUMENTATION_LINKS.md

**Current State**: Last updated November 29, 2025

**Changes**:
- Update to February 2, 2026
- Add "Healthcare Interoperability" section
- Add GDPR compliance documentation links

**New Section**:
```markdown
## Healthcare Interoperability

- **FHIR Export**: Available on product detail pages
  - FHIR R4 DeviceDefinition format
  - SNOMED CT and DICOM terminology
  - Readiness scoring for data quality
```

---

### 7. .lovable/plan.md (Update Existing)

**Current State**: Shows security audit completed

**Changes**:
- Add documentation update completion status
- Reference all updated files

---

## Summary of Changes

| File | Primary Updates |
|------|-----------------|
| `SECURITY.md` | GDPR section, view security, IP anonymization |
| `docs/README.md` | Security quick link, FHIR mention |
| `docs/ADMIN_GUIDE.md` | Data privacy section, GDPR practices |
| `docs/FIELD_REFERENCE.md` | FHIR export fields, readiness scoring |
| `README.md` | Key features update (FHIR, GDPR) |
| `DOCUMENTATION_LINKS.md` | Healthcare interop, timestamp update |
| `.lovable/plan.md` | Documentation completion status |

---

## Technical Details

### Files to Create
None - all updates are to existing files

### Files to Modify
1. `SECURITY.md` - Add GDPR, view security, update timestamp
2. `docs/README.md` - Add security section, update timestamp
3. `docs/ADMIN_GUIDE.md` - Add section 10 (GDPR), update timestamp
4. `docs/FIELD_REFERENCE.md` - Add FHIR section, update timestamp
5. `README.md` - Update key features
6. `DOCUMENTATION_LINKS.md` - Add healthcare interop, update timestamp
7. `.lovable/plan.md` - Add documentation status

### Timestamp Updates
All documentation timestamps updated to: **February 2, 2026**
