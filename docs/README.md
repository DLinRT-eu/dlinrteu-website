# DLinRT.eu Documentation

> Comprehensive documentation for the Deep Learning in Radiotherapy platform

Welcome to the DLinRT.eu documentation. This index helps you navigate to the right guide based on your role and needs.

---

## 📚 Quick Navigation

| I want to... | Go to |
|--------------|-------|
| Manage users, rounds, and companies | [Admin Guide](#-admin-guide) |
| Review assigned products | [Reviewer Guide](#-reviewer-guide) |
| Use visual editing to update products | [Visual Editing](#-visual-editing) |
| Understand the assignment system | [Assignment Guide](#-assignment-guide) |
| Add or update product data | [Product Guide](#-product-guide) |
| Understand product fields | [Field Reference](#-field-reference) |

---

## 🔐 Admin Guide

**File**: [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

Complete guide for platform administrators covering:

- **User Management** - Roles, permissions, and access control
- **Review Rounds** - Creating and managing structured review cycles
- **Reviewer Assignment** - Manual and automatic product assignments
- **Company Management** - Representatives, verifications, and certifications
- **Product Edit Approvals** - Reviewing and approving visual edits
- **Security Monitoring** - Audit logs and security events
- **Changelog Management** - Release notes and dual-repository backfill
- **Registration Review** - Approving new user registrations

**Key Routes**:
- `/admin` - Dashboard
- `/admin/users` - User management
- `/admin/review-rounds` - Review rounds
- `/admin/companies` - Company management
- `/admin/edit-approvals` - Product edit approvals
- `/admin/changelog` - Changelog management

---

## 👤 Reviewer Guide

**File**: [REVIEWER_GUIDE.md](./REVIEWER_GUIDE.md)

Essential guide for reviewers covering:

- **Getting Started** - Role overview and responsibilities
- **Setting Preferences** - Categories, companies, and products expertise
- **Understanding Assignments** - How matching works
- **Reviewing Products** - Step-by-step review process
- **Managing Workload** - Time management and prioritization
- **Best Practices** - Do's, don'ts, and communication

**Key Routes**:
- `/reviewer/dashboard` - Reviewer workspace
- `/reviewer/due-reviews` - Upcoming deadlines
- `/profile` - Manage preferences

---

## ✏️ Visual Editing

**File**: [REVIEWER_GUIDE.md](./REVIEWER_GUIDE.md#4-reviewing-products)

In-browser product editing system:

- **Edit Mode** - Click "Edit" on any product page to enter visual editing
- **Smart Editors** - Dropdowns for categories, multi-select for modalities
- **Auto-Save** - Drafts saved every 30 seconds
- **Approval Workflow** - Submit edits for admin review before GitHub sync
- **GitHub Integration** - Approved edits automatically create pull requests

**Who Can Edit**:
- Administrators (all products)
- Reviewers (assigned products)
- Company Representatives (own company products)

**Alternative**: Direct GitHub editing is still supported for those who prefer it

---

## 🎯 Assignment Guide

**File**: [REVIEWER_ASSIGNMENT_GUIDE.md](./REVIEWER_ASSIGNMENT_GUIDE.md)

Deep dive into the reviewer assignment system:

- **Preference System** - Three-dimensional expertise (categories, companies, products)
- **Review Round Management** - Creating rounds and selecting reviewers
- **Assignment Algorithm** - Weighted scoring and workload balancing
- **Manual Override** - Preview and adjust assignments
- **Audit Trail** - Complete assignment history tracking
- **Email Notifications** - Automated reviewer notifications

**Technical Reference**:
- `reviewer_expertise` table - Stores preferences
- `assignment_history` table - Tracks all changes
- `notify-reviewer-assignment` edge function - Sends emails

---

## 📦 Product Guide

**File**: [review/GUIDE.md](./review/GUIDE.md)

Guide for working with product data:

- **Reviewing Products** - Verification workflow
- **Adding New Products** - File structure and requirements
- **Product Categories** - All 10 categories explained
- **Multi-Category Products** - Using secondary categories
- **Product Versioning** - Tracking versions over time
- **Field Requirements** - Required vs optional fields

**Categories**:
Auto-Contouring • Clinical Prediction • Image Enhancement • Image Synthesis • Performance Monitor • Platform • Reconstruction • Registration • Tracking • Treatment Planning

---

## 📋 Field Reference

**File**: [FIELD_REFERENCE.md](./FIELD_REFERENCE.md)

Complete reference for all product data fields:

- **Core Identification** - id, name, company, description
- **Classification & Clinical Scope** - modality, anatomy, structures
- **Regulatory** - CE, FDA, TGA status and clearances
- **Technical & Deployment** - specs, integrations, processing
- **Market & Pricing** - availability, pricing models
- **Evidence & Limitations** - clinical evidence, caveats
- **Platform & AI Classification** - usesAI, monitorsAIProducts, modules
- **Company Certification** - verification workflow fields

---

## 📁 Additional Resources

### Examples

**Location**: [examples/products/](./examples/products/)

Example product templates demonstrating:
- Complete field usage
- Multi-category support
- AI classification fields
- Versioning patterns

### Database Setup

**File**: [REVIEWER_SETUP.sql](./REVIEWER_SETUP.sql)

SQL scripts for:
- Reviewer expertise tables
- Assignment history tracking
- RPC functions

### Review Workflow

**Location**: [review/](./review/)

- [GUIDE.md](./review/GUIDE.md) - Product review guide
- [README.md](./review/README.md) - Quick reference

---

## 🔒 Security & Compliance

**File**: [SECURITY.md](../SECURITY.md)

Security features and GDPR compliance documentation:

- **Row Level Security (RLS)** with restrictive policies
- **GDPR compliance** - data export, anonymization, consent management
- **IP address hashing** for privacy (SHA-256)
- **View security** using `security_invoker = on`
- **Healthcare interoperability** - FHIR R4 export

### Key Security Features

| Feature | Implementation |
|---------|----------------|
| Data Export | Profile → Data Export (JSON) |
| Account Deletion | Profile → Delete Account |
| Cookie Consent | Versioned audit log |
| IP Anonymization | SHA-256 hashing |

---

## 🏥 Healthcare Interoperability

Products can be exported in FHIR R4 format for hospital system integration.

### FHIR Export

- **Format**: FHIR R4 Bundle with DeviceDefinition resource
- **Terminology**: SNOMED CT, DICOM, ICD-10 mappings
- **Location**: Product detail page → Export → FHIR

### FHIR Readiness Score

| Score | Label | Criteria |
|-------|-------|----------|
| 4 | Excellent | Full terminology + regulatory IDs |
| 3 | Good | Most mappings present |
| 1-2 | Fair | Partial mappings |
| 0 | Limited | No standard mappings |

---

## 🔗 External Resources

- **Platform**: [https://dlinrt.eu](https://dlinrt.eu)
- **GitHub**: [DLinRT-eu/dlinrteu-website](https://github.com/DLinRT-eu/dlinrteu-website)
- **Contact**: info@dlinrt.eu

---

## 📝 Contributing to Documentation

When updating documentation:

1. **Keep it current** - Update dates when making changes
2. **Cross-reference** - Link related guides where helpful
3. **Use examples** - Include code snippets and screenshots
4. **Be consistent** - Follow existing formatting patterns

---

*Last Updated: February 2, 2026*
