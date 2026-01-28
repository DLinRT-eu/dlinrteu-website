

# Audit and Fix News Item Issues

## Issue 1: Badge State Table Not Rendering

### Root Cause
The markdown table is not rendering correctly due to how ReactMarkdown parses the content. Two potential issues:

1. **Emoji/Unicode characters in table cells**: The checkmark (✓) and warning (⚠) symbols may interfere with table parsing
2. **Bold markdown inside table cells**: The `**text**` syntax inside table cells can cause parsing issues

### Current Table in News Content (lines 25-29)
```markdown
| Badge | Meaning |
|-------|---------|
| ✓ **Verified by Company** (green) | Information has been certified by the manufacturer |
| ⚠ **Certification Outdated** (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |
```

### Solution
Simplify the table content to ensure proper rendering:
- Move special characters and formatting outside the table
- Use cleaner cell content

### Updated Table Content
```markdown
**Badge States:**

| Badge | Meaning |
|-------|---------|
| Verified by Company (green) | Information has been certified by the manufacturer |
| Certification Outdated (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |
```

---

## Issue 2: Contact Page Link Returns 404

### Root Cause
The news item contains a link to `/contact` (line 71 of news file):
```markdown
Visit our [Contact page](/contact) to begin the registration process.
```

However, there is **no `/contact` route** defined in `App.tsx`. The correct page is `/support` which contains the "Contact Us" section.

### Solution
Change the link from `/contact` to `/support`:
```markdown
Visit our [Support & Contact page](/support) to begin the registration process.
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/news/company-certification-launch.ts` | Fix table formatting and update contact link |

---

## Detailed Changes

### File: `src/data/news/company-certification-launch.ts`

**Change 1 - Fix table (lines 23-29)**:

```typescript
// From:
**Badge States:**

| Badge | Meaning |
|-------|---------|
| ✓ **Verified by Company** (green) | Information has been certified by the manufacturer |
| ⚠ **Certification Outdated** (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |

// To:
**Badge States:**

| Badge | Meaning |
|-------|---------|
| Verified by Company (green) | Information has been certified by the manufacturer |
| Certification Outdated (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |
```

**Change 2 - Fix link (line 71)**:

```typescript
// From:
Visit our [Contact page](/contact) to begin the registration process.

// To:
Visit our [Contact page](/support) to begin the registration process.
```

---

## Summary

Two fixes for the news item:
1. Remove special characters (✓, ⚠) and bold formatting from table cells to ensure proper Markdown table parsing
2. Update the contact link from non-existent `/contact` to the valid `/support` route

