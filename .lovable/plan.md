

# Plan: Fix Build Errors + Taiwan Medical Imaging Product Strategy

This plan addresses two separate matters:
1. **Critical build errors** in multiple Supabase edge functions
2. **Strategy for Taiwan Medical Imaging Co. products** (DeepBrain, DeepContour, Federated Learning Platform)

---

## Part 1: Fix Build Errors (11 Fixes)

### Issue Category A: TypeScript "error is of type unknown" (5 files)

In TypeScript/Deno strict mode, caught errors have type `unknown` and cannot be accessed directly with `.message`. Each catch block needs proper type checking.

| File | Line | Current Code | Fix |
|------|------|--------------|-----|
| `admin-delete-user/index.ts` | 179 | `error.message` | `error instanceof Error ? error.message : 'Internal server error'` |
| `backfill-changelog-history/index.ts` | 476 | `error.message` | `error instanceof Error ? error.message : 'Unknown error'` |
| `generate-changelog/index.ts` | 391 | `error.message` | `error instanceof Error ? error.message : 'Unknown error'` |
| `log-document-access/index.ts` | 105 | `error.message` | `error instanceof Error ? error.message : 'Unknown error'` |
| `verify-backup-code/index.ts` | 154 | `error.message` | `error instanceof Error ? error.message : 'Unknown error'` |

### Issue Category B: Resend Import Inconsistencies (6 files)

The codebase has **inconsistent Resend import patterns** causing build failures:

| File | Current Import | Problem |
|------|----------------|---------|
| `send-contact-email/index.ts` | `import { Resend } from "npm:resend@2.0.0"` | npm: specifier requires deno.json config |
| `send-deadline-reminders/index.ts` | `import { Resend } from "npm:resend@2.0.0"` | npm: specifier requires deno.json config |
| `subscribe-newsletter/index.ts` | `import { Resend } from "npm:resend@2.0.0"` | npm: specifier requires deno.json config |
| `notify-role-request-outcome/index.ts` | `import Resend from "https://esm.sh/resend@2.0.0"` | Default import not constructable |
| `notify-reviewer-assignment/index.ts` | `import Resend from "https://esm.sh/resend@2.0.0"` | Default import not constructable |
| `notify-user-approval/index.ts` | `import Resend from "https://esm.sh/resend@2.0.0"` | Default import not constructable |

**Fix**: Standardize all files to use the ESM.sh named export pattern:
```typescript
import { Resend } from "https://esm.sh/resend@2.0.0";
```

---

## Part 2: Taiwan Medical Imaging Product Strategy

### Audit Summary

| Product | Regulatory Status | Evidence Level | Recommendation |
|---------|-------------------|----------------|----------------|
| **DeepMets** | FDA 510(k) K250427 (May 2025), TFDA approved | Verified | Keep (already in database) |
| **DeepBrain** | Not FDA/CE cleared | Unverified | Do NOT add |
| **DeepContour** | Not FDA/CE cleared | Unverified | Do NOT add |
| **Federated Learning Platform** | Not a medical device | N/A | Do NOT add |

### Rationale

Based on the platform's **Tiered Inclusion Strategy** (from memory):

```text
Tier 1: Cleared products (CE/FDA) - Full entry
Tier 2: Pre-market products in regulatory submission - Entry with "Pending Approval" label
Tier 3: Academic/research tools - Entry with "Research" label
```

The other Taiwan Medical Imaging products do not meet inclusion criteria:

1. **DeepBrain** and **DeepContour**:
   - No FDA 510(k) or CE certification found
   - No clear evidence of regulatory submission (not "Pending Approval")
   - Insufficient technical documentation on official website
   - Action: **Do not add** until regulatory status can be verified

2. **Federated Learning Platform**:
   - Not a medical device/SaMD
   - Infrastructure/platform tool, not an AI radiotherapy product
   - Action: **Do not add** (out of scope for this database)

### Recommended DeepMets Enhancement

Update the current DeepMets entry with verified FDA details:

**Updates to `taiwan-medical-imaging.ts`:**

| Field | Current Value | Updated Value |
|-------|---------------|---------------|
| `regulatory.fda.class` | (missing) | `"II"` |
| `regulatory.fda.productCode` | (missing) | `"QKB, QIH"` |
| `regulatory.fda.regulationNumber` | (missing) | `"21 CFR 892.2050"` |
| `regulatory.intendedUseStatement` | Generic statement | FDA-verified statement about T1+Gd MRI, lesion size >= 10mm |
| `source` | "Automatically retrieved" | Direct FDA PDF link |
| `technicalSpecifications.population` | "Adult patients with brain metastases" | Add lesion size requirement (>= 10mm diameter) |

---

## Summary of Changes

### Files to Modify

| File | Changes |
|------|---------|
| `supabase/functions/admin-delete-user/index.ts` | Fix error type checking (line 179) |
| `supabase/functions/backfill-changelog-history/index.ts` | Fix error type checking (line 476) |
| `supabase/functions/generate-changelog/index.ts` | Fix error type checking (line 391) |
| `supabase/functions/log-document-access/index.ts` | Fix error type checking (line 105) |
| `supabase/functions/verify-backup-code/index.ts` | Fix error type checking (line 154) |
| `supabase/functions/send-contact-email/index.ts` | Fix Resend import (line 2) |
| `supabase/functions/send-deadline-reminders/index.ts` | Fix Resend import (line 2) |
| `supabase/functions/subscribe-newsletter/index.ts` | Fix Resend import (line 3) |
| `supabase/functions/notify-role-request-outcome/index.ts` | Fix Resend import (line 2) |
| `supabase/functions/notify-reviewer-assignment/index.ts` | Fix Resend import (line 2) |
| `supabase/functions/notify-user-approval/index.ts` | Fix Resend import (line 2) |
| `src/data/products/auto-contouring/taiwan-medical-imaging.ts` | Enhance FDA details for DeepMets |

---

## Technical Notes

### Error Type Handling Pattern
```typescript
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return new Response(
    JSON.stringify({ error: errorMessage }),
    { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

### Resend Import Pattern (Standardized)
```typescript
import { Resend } from "https://esm.sh/resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
```

---

## Taiwan Medical Imaging: Future Actions

If you wish to track DeepBrain and DeepContour for future inclusion, consider:

1. **Contact vendor** to request regulatory status documentation
2. **Monitor FDA database** for new 510(k) submissions from Taiwan Medical Imaging Co.
3. **Add to watchlist** (could be implemented as a "Pending Products" tracking feature)

The current DeepMets entry will be enhanced with verified FDA documentation to serve as the complete, authoritative record for this vendor's cleared products.

