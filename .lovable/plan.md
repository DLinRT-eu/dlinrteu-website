

# Fix Badge State Table Rendering in News Item

## Problem

The badge state table in the news item is not rendering because the `ReactMarkdown` component in `NewsDetail.tsx` restricts allowed HTML elements. Table elements (`table`, `thead`, `tbody`, `tr`, `th`, `td`) are not in the allowlist.

**Current allowedElements (line 68):**
```typescript
allowedElements={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'br']}
```

## Solution

Add table-related elements to the `allowedElements` array so markdown tables render properly.

## Changes Required

### File: `src/pages/NewsDetail.tsx`

**Line 68** - Update the `allowedElements` array to include table elements:

```typescript
// From:
allowedElements={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'br']}

// To:
allowedElements={['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td']}
```

## Result

After this change, the badge state table will render as a proper HTML table:

| Badge | Meaning |
|-------|---------|
| Verified by Company (green) | Information has been certified by the manufacturer |
| Certification Outdated (amber) | Product was certified but information has since been updated |
| No badge | Product has not yet been certified by the company |

The table will inherit styling from the `prose` CSS classes already applied to the container (`prose-blue`), ensuring it matches the overall design.

## Files Modified

| File | Change |
|------|--------|
| `src/pages/NewsDetail.tsx` | Add table elements to `allowedElements` array (line 68) |

