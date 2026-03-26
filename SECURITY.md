# Security Policy & Implementation

## Table of Contents

1. [Reporting Vulnerabilities](#reporting-vulnerabilities)
2. [Scope](#scope)
3. [Security Features](#security-features)
4. [Security Checklist](#security-checklist)
5. [Monitoring & Response](#monitoring--response)

---

## Reporting Vulnerabilities

We take security, accuracy, and integrity very seriously.

If you discover a security vulnerability or any critical issue that could compromise:

- User data
- Website stability
- Information authenticity
- Third-party copyrights

**Please report it confidentially** instead of publicly disclosing it.

### How to Report

- Email: m.maspero at umcutrecht.nl
- Alternatively, open a private GitHub [Security Advisory](https://docs.github.com/en/code-security/security-advisories) if available for this repository.

Please include:

- A clear description of the vulnerability
- Steps to reproduce (if applicable)
- Any suggested fixes or mitigation ideas

We will respond within **5 business days** and aim to resolve any verified security issues promptly.

---

## Scope

This project consists mainly of public, factual information.

Security reports are **in-scope** if they involve:

- Unauthorized access or modification of the repository
- Malicious code or dependency vulnerabilities
- Leakage of confidential contributor information
- Data integrity risks (e.g., tampering of commercial product descriptions)
- Misinformation that could lead to clinical safety risks

### Out of Scope

The following are *not* considered security vulnerabilities:

- Typos, broken links, or formatting issues
- Disagreements over interpretation of technical data
- Lack of endorsements or certifications from manufacturers

(These can be reported via regular GitHub Issues.)

---

## Security Features

### 1. Rate Limiting

- **Contact Form**: 3 attempts per 5 minutes
- **Newsletter Signup**: Protected via database constraints
- **Analytics**: Graceful handling of duplicate visitor tracking

### 2. Content Security Policy (CSP)

- Strict CSP headers prevent XSS attacks
- Only allows trusted sources for scripts and styles
- Blocks inline scripts and unsafe eval

### 3. Security Headers

- `Strict-Transport-Security`: Forces HTTPS connections
- `X-Content-Type-Options`: Prevents MIME type sniffing
- `X-Frame-Options`: Prevents clickjacking
- `X-XSS-Protection`: Browser XSS protection
- `Referrer-Policy`: Controls referrer information

### 4. Input Validation

- All forms use Zod schema validation
- Server-side validation in edge functions
- Sanitized database queries via Supabase client

### 5. Database Security

- Row Level Security (RLS) enabled on all tables
- Public access policies only where necessary
- Proper unique constraints to prevent duplicates

### 6. Role-Based Access Control (RBAC)

- **Row Level Security (RLS)** enforced on all database tables
- Role-based route protection (Admin, Reviewer, Company)
- Four user roles: User, Reviewer, Company Representative, Administrator
- Automatic admin bypass for company certifications
- Maximum 5 verified representatives per company
- Activity logging for company representative actions
- Audit logs for admin actions and role changes

### 7. View Security

Database views use `security_invoker = on` to ensure RLS policies are respected:
- `reviews_with_github_tracking` - Reviewer assignment data
- `analytics_summary` - Platform analytics
- `company_products` - Company product relationships
- `analytics_public` - Restricted to authenticated users only

This prevents RLS bypass attacks where views could expose data from underlying tables.

---

## GDPR Compliance

### Data Anonymization

- **IP Addresses**: All IP addresses are hashed using SHA-256 before storage
- **Columns**: `ip_hash` used consistently across:
  - `mfa_activity_log`
  - `consent_audit_log`
  - `security_events`
  - `profile_document_access_log`
- **Data Export**: User data exports redact IP hashes and user agents

### User Rights Implementation

| Right | GDPR Article | Implementation |
|-------|--------------|----------------|
| Right to Erasure | Art. 17 | `delete-account` edge function |
| Data Portability | Art. 20 | `DataExport` component with JSON download |
| Consent Management | Art. 7 | Cookie consent with versioned audit log |
| Access Request | Art. 15 | Profile page with all user data visible |

### Data Export Contents

Users can export their data via Profile → Data Export:
- Profile information
- Role assignments
- Review history
- MFA activity (sanitized - no IP addresses or user agents)
- GDPR privacy notice included in export files

### Cookie Consent

- Analytics tracking only activates with explicit consent
- Consent stored with version and timestamp in `consent_audit_log`
- `isTrackingAllowed()` gate on all tracking operations
- `clearTrackingIds()` for consent withdrawal

---

## Security Checklist

- [x] All external links use rel="noopener noreferrer" when target="_blank"
- [x] User input is validated and sanitized (search, filters, forms)
- [x] Dependencies are regularly audited (see CI)
- [x] No secrets or credentials are committed to the repo
- [x] Data files are checked for consistency and correctness
- [x] Error boundaries are used for critical UI components
- [x] All forms use proper CSRF and XSS protections
- [x] Security policy is documented and up to date
- [x] Database views use security_invoker for RLS enforcement
- [x] IP addresses hashed before storage (GDPR compliance)

---

## Monitoring & Response

### Security Event Logging

The system logs the following security events:

- Failed form submissions
- Rate limit violations
- Unusual activity patterns

### Response Procedures

1. **Rate Limit Exceeded**: Automatic temporary blocking
2. **Failed Submissions**: Logged with security context
3. **Database Errors**: Graceful degradation with logging

### Regular Maintenance

**Weekly Tasks**:

- Review security logs
- Check for failed authentication attempts
- Monitor database performance

**Monthly Tasks**:

- Review and update security policies
- Test incident response procedures
- Update security documentation

### Database Cleanup

- Automatic cleanup of analytics data older than 1 year
- Regular monitoring of constraint violations
- Proper error handling for duplicate entries

### GDPR Compliance

- Cookie consent management
- User data deletion capabilities
- Transparent data collection practices

---

## Disclosure Policy

We practice **coordinated disclosure**:

- We will acknowledge receipt of your report
- We will work privately with you to understand and resolve the issue
- We will publicly disclose security incidents only after a fix is available
- You will be credited for responsible disclosure if desired

---

## Thank You!

We greatly appreciate your help in making this project safe, reliable, and trustworthy for the entire radiotherapy community.

---

**Last Updated**: February 2, 2026
