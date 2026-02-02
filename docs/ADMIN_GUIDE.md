# Admin Guide

> Complete guide for administrators managing the DLinRT.eu platform

## Quick Access

- **Admin Dashboard**: `/admin` - Overview of all admin functions
- **Analytics Dashboard**: `/admin/dashboard` - Platform analytics and metrics
- **User Management**: `/admin/users` - Manage user roles and permissions
- **Review Assignment**: `/admin/reviews` - Assign product reviews to reviewers
- **Review Rounds**: `/admin/review-rounds` - Create and manage review rounds
- **Company Management**: `/admin/companies` - Manage company representatives
- **Certification Management**: `/admin/certifications` - View all product certifications
- **User Product Adoptions**: `/admin/user-products` - Track user product interests
- **Company Mapping Validator**: `/admin/company-mapping-validator` - Validate company data mappings
- **Product Edit Approvals**: `/admin/edit-approvals` - Review and approve visual edits
- **Security Dashboard**: `/admin/security` - Monitor security events
- **Security Monitoring**: `/admin/security-monitoring` - Detailed security monitoring
- **Changelog Management**: `/admin/changelog` - Manage release notes
- **Changelog Generator**: `/admin/changelog-generator` - Generate changelog from commits
- **Registration Review**: `/admin/registrations` - Review user registrations

---

## Table of Contents

1. [User Management](#1-user-management)
2. [Review Round Management](#2-review-round-management)
3. [Reviewer Assignment](#3-reviewer-assignment)
4. [Company Management](#4-company-management)
5. [Security Monitoring](#5-security-monitoring)
6. [Registration Review](#6-registration-review)
7. [Changelog Management](#7-changelog-management)
8. [Certification Management](#8-certification-management)
9. [Product Edit Approvals](#9-product-edit-approvals)

---

## 1. User Management

Manage user accounts, roles, and permissions.

### Accessing User Management
**Route**: `/admin/users`

### Features
- **Search & Filter**: Search by name, email, or institution; filter by role
- **Sortable Columns**: Click column headers to sort
- **Role Management**: Add/remove admin, reviewer, or company roles
- **Role Requests**: Approve or reject user role elevation requests

### Adding/Removing Roles

1. Find the user in the list
2. Click their row to expand details
3. Use "Add Role" dropdown to assign roles
4. Click X on existing roles to remove them

**Available Roles**:
- `admin` - Full system access
- `reviewer` - Can review products
- `company` - Company representative access

---

## 2. Review Round Management

Organize product reviews in structured rounds with balanced assignments.

### Accessing Review Rounds
**Route**: `/admin/review-rounds`

### Creating a Review Round

1. Navigate to Review Rounds page
2. Click "Create New Round"
3. Fill in details:
   - **Name**: e.g., "Q1 2025 Product Review"
   - **Deadline**: Target completion date
4. Select products to include
5. Click "Create Round"

### Assigning Reviewers

The system uses intelligent assignment based on:
- Reviewer preferences (expertise, companies, products)
- Current workload balance
- Historical assignment patterns

**Steps**:
1. Open the round details
2. Click "Auto-Assign" for balanced distribution
3. Review assignments in preview
4. Manually adjust if needed
5. Click "Confirm Assignments"
6. System sends email notifications automatically

### Round Status Tracking
- View completion progress
- See individual reviewer status
- Access audit trail of changes
- Export assignment reports

---

## 3. Reviewer Assignment

Assign individual product reviews to reviewers.

### Accessing Review Assignment
**Route**: `/admin/reviews`

### Manual Assignment

1. Select product from dropdown
2. Choose reviewer (system shows workload)
3. Set priority (low, medium, high, critical)
4. Set deadline
5. Add notes (optional)
6. Click "Assign Review"

### Bulk Operations
- Use review rounds for multiple assignments
- Export assignment lists
- Track completion status

**See also**: [Reviewer Assignment Guide](./REVIEWER_ASSIGNMENT_GUIDE.md) for detailed workflows

---

## 4. Company Management

Manage company representatives, product ownership, and certifications.

### Accessing Company Management
**Route**: `/admin/companies`

### Interface Overview

The Company Management page has **four tabs**:

1. **Overview** - Statistics and quick actions
2. **All Companies** - Browse all companies with representatives
3. **Pending Verifications** - Review pending representative requests
4. **Representatives** - Full list of all company representatives

All tabs support **search, sorting, and export** (CSV/Excel).

### Verifying Company Representatives

1. Go to "Pending Verifications" tab
2. Review user's company claim
3. Verify documentation (if provided)
4. Approve or reject request
5. Maximum **5 verified representatives** per company

### Representative Limits

- Each company can have up to **5 verified representatives**
- Representatives must be verified before they can certify products
- **Admins can certify any company's products** without being a representative

### Admin Certification Privileges

Administrators have special certification capabilities:
- Can certify products for **any company** without being listed as a representative
- Full oversight of all company activities
- Access to all company revisions and certifications

### Assigning Products to Companies

1. Select company representative from Representatives tab
2. Choose products they can manage
3. Set access level
4. Save assignments

### Company Oversight

Admins have full visibility of:
- All company revisions across all companies
- Product update/certification requests
- Verification status
- Company representative activities
- Activity audit logs

---

## 5. Security Monitoring

Monitor platform security and user activities.

### Accessing Security Dashboard
**Route**: `/admin/security`

### Key Metrics
- Failed login attempts
- Suspicious activity patterns
- Role escalation requests
- Database access logs

### Security Best Practices

1. **Regular Audits**: Review user permissions monthly
2. **Role Principle**: Grant minimum necessary permissions
3. **Monitor Logs**: Check security dashboard weekly
4. **Review Requests**: Respond to role requests promptly
5. **Update Access**: Remove access for inactive users

### Emergency Procedures

**Suspected Breach**:
1. Document the issue
2. Revoke affected user's access immediately
3. Review security logs
4. Change admin credentials if needed
5. Report to project lead

**Inappropriate Content**:
1. Remove content immediately
2. Document incident
3. Warn or suspend user
4. Review moderation policies

---

## Common Admin Tasks

### Granting Admin Access

**Via Database** (Supabase Dashboard):
```sql
-- Check if user exists
SELECT id, email FROM auth.users WHERE email = 'user@example.com';

-- Grant admin role
INSERT INTO public.user_roles (user_id, role, granted_by)
VALUES ('user-uuid-here', 'admin', auth.uid())
ON CONFLICT (user_id, role) DO NOTHING;
```

**Via Application**:
1. Go to `/admin/users`
2. Find the user
3. Add "admin" role

### Removing User Access

1. Navigate to User Management
2. Find user
3. Remove all roles
4. Optionally suspend account (via Supabase Auth)

### Managing Product Reviews

1. Assign via Review Rounds for structured reviews
2. Use direct assignment for urgent reviews
3. Monitor progress in admin dashboard
4. Follow up on overdue reviews

---

## Troubleshooting

### User Can't Access Admin Pages
- **Check**: User has admin role in `user_roles` table
- **Check**: User is logged in with correct account
- **Check**: RLS policies are applied correctly

### Reviews Not Appearing
- **Check**: Review assigned correctly in database
- **Check**: Reviewer has reviewer role
- **Check**: Product exists in system

### Permission Errors (403)
- **Check**: RLS policies on tables
- **Check**: User roles are correctly assigned
- **Check**: No circular dependencies in policies
- **Apply**: Latest RLS fix migration if needed

---

## Additional Resources

- [Reviewer Guide](./REVIEWER_GUIDE.md) - For understanding reviewer workflow
- [Reviewer Assignment Guide](./REVIEWER_ASSIGNMENT_GUIDE.md) - Detailed assignment procedures
- [Field Reference](./FIELD_REFERENCE.md) - Complete product field definitions

---

---

## 6. Registration Review

Review and approve new user registrations.

### Accessing Registration Review
**Route**: `/admin/registrations`

### Features
- View pending user registrations
- Review institutional email verification
- Approve or reject registrations
- Add notes for rejections

---

## 7. Changelog Management

Manage platform changelog entries and generate release notes from GitHub commits.

### Routes
- `/admin/changelog` - View and edit changelog entries
- `/admin/changelog-generator` - Generate changelog from commits

### Features
- Create and edit changelog entries with Markdown support
- Auto-generate from GitHub commits using AI summarization
- Publish, archive, or keep entries as drafts
- Track version history with monthly releases
- Live preview before publishing

### Repository History & Backfill

The changelog system supports the full project history across repository migrations:

| Period | Repository |
|--------|------------|
| April 2025 - September 2025 | `DLinRT-eu/website` (original) |
| October 2025 - Present | `DLinRT-eu/dlinrteu-website` (current) |

The **backfill function** automatically queries both repositories to generate complete changelog entries from the project's launch in April 2025.

### Backfill Process

To generate missing changelog entries:
1. Navigate to `/admin/changelog`
2. Click "Backfill History" to run the backfill function
3. The system will fetch commits from both repositories
4. AI generates professional summaries for each month
5. Existing entries are not duplicated

### Entry Fields
- **Version**: Format `YYYY.MM.0` (e.g., `2025.10.0`)
- **Title**: Month and year (e.g., "October 2025 Release")
- **Description**: 1-2 sentence user-focused summary
- **Details**: Full Markdown content with categorized changes
- **Status**: `draft`, `published`, or `archived`

### Best Practices
- Review AI-generated descriptions before publishing
- Use the edit dialog to refine content and add context
- Ensure descriptions highlight user-facing benefits
- Keep details organized by category (Features, Improvements, Fixes)

### Technical Reference
- `backfill-changelog-history` - Queries both repositories, generates AI summaries
- `generate-changelog` - Single-month changelog generation
- `auto-generate-monthly-changelog` - Scheduled monthly generation (current repo only)

---

## 8. Certification Management

Overview of all product certifications.

### Accessing Certification Management
**Route**: `/admin/certifications`

### Features
- View all product certifications across companies
- Filter by company, product, or date
- Export certification reports
- Monitor certification activity

---

## 9. Product Edit Approvals

Review and approve product edits submitted by reviewers and company representatives via visual editing.

### Accessing Edit Approvals
**Route**: `/admin/edit-approvals`

### Features
- View all pending edits requiring review
- Compare changes using visual diff viewer
- Approve or reject edits with feedback
- Sync approved edits to GitHub (creates PR automatically)

### Draft Status Lifecycle

| Status | Description |
|--------|-------------|
| `draft` | Work in progress, auto-saved every 30 seconds |
| `pending_review` | Submitted by author, awaiting admin review |
| `approved` | Ready to sync to GitHub |
| `rejected` | Returned to author with feedback |
| `applied` | Synced to GitHub as pull request |

### Review Workflow

1. Navigate to Edit Approvals page
2. Open "Pending Review" tab
3. Click "View Changes" to see diff comparison
4. Review the edit summary provided by author
5. Click "Approve" or "Reject"
6. Provide feedback (required for rejections)
7. For approved edits: Click "Sync to GitHub"

### GitHub Integration

When you click "Sync to GitHub" on an approved edit:
1. A new branch is created: `visual-edit/{product_id}/{timestamp}`
2. Product file is updated with the edited data
3. Pull request is opened automatically
4. Draft status changes to "applied"
5. PR link is displayed for review

**Requirement**: `GITHUB_TOKEN` must be configured in Supabase Edge Functions secrets.

### Alternative: Direct GitHub Editing

Product data can still be edited directly via GitHub for those who prefer traditional version control:
1. Clone the repository locally
2. Edit product files in `src/data/products/`
3. Create a pull request for review
4. Changes are reviewed and merged by maintainers

---

## 10. Data Privacy & GDPR

Manage user data privacy and ensure GDPR compliance.

### User Data Export

Users can export all their data via Profile → Data Export.

**What's Exported**:
- Profile information (name, email, institution)
- Role assignments
- Review history
- Company representative status
- Product adoptions
- MFA activity (sanitized - no IP addresses)

**Privacy Measures Applied**:
- IP addresses are hashed (SHA-256) before storage
- User agents redacted in exports
- GDPR privacy notice included in export files
- Export timestamp for audit trail

### IP Address Anonymization

All IP addresses are hashed before storage using SHA-256:

| Table | Column | Purpose |
|-------|--------|---------|
| `mfa_activity_log` | `ip_hash` | MFA verification tracking |
| `consent_audit_log` | `ip_hash` | Cookie consent records |
| `security_events` | `ip_hash` | Security incident tracking |
| `profile_document_access_log` | `ip_hash` | Document access audit |

### Consent Audit Log

Cookie consent is tracked with full audit trail:
- Consent version recorded
- Timestamp of consent/withdrawal
- Hashed IP for compliance verification

### Database View Security

All sensitive database views use `security_invoker = on`:

| View | Purpose | Protection |
|------|---------|------------|
| `reviews_with_github_tracking` | Reviewer assignments | RLS enforced |
| `analytics_summary` | Platform metrics | RLS enforced |
| `company_products` | Company relationships | RLS enforced |
| `analytics_public` | Public stats | Authenticated only |

This prevents RLS bypass attacks where views could expose underlying table data.

### User Account Deletion

Users can delete their account via Profile → Delete Account:
1. MFA verification required (if enabled)
2. Password re-authentication
3. Cascading deletion of all user data
4. Audit log entry created
5. Irreversible after confirmation

---

**Last Updated**: February 2, 2026
