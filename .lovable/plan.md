

# Company Certification Page Plan

## Analysis: Content Overlap Assessment

I reviewed the existing content to ensure no duplication:

| Existing Content | Focus Area |
|-----------------|------------|
| `company-certification-launch.ts` (news) | Announcement of the program launch |
| `CompanyGuide.tsx` | How to use the dashboard, submit revisions |
| `Roles.tsx` | General role descriptions |
| `RolesFAQ.tsx` | General role FAQs (approval times, conflicts) |

**Gap Identified:** No dedicated content explaining:
1. The step-by-step certification workflow (verifying product accuracy vs. submitting changes)
2. Badge states and what they mean in detail
3. Certification-specific FAQs (re-certification, badge expiry, etc.)

## Solution: Create Dedicated Certification Page

Create a new page at `/company/certification` that provides:
- Detailed certification process
- Badge states explained with visual examples
- Certification-specific FAQs
- Links to existing guides (no duplication)

---

## File to Create

### New Page: `src/pages/company/CompanyCertification.tsx`

**Route:** `/company/certification` (publicly accessible - helps prospective company reps)

**Structure:**
1. **Hero Section** - Brief intro to certification program
2. **Quick Links** - To related pages (CompanyGuide, Roles, Support)
3. **Badge States Explained** - Visual cards for each badge state (green, amber, none)
4. **Certification Process** - Step-by-step guide for certifying products
5. **Prerequisites** - What's needed before certification
6. **FAQ Section** - Certification-specific questions only

---

## Content Outline

### Hero Section
- Title: "Company Certification Program"
- Subtitle explaining what certification means (manufacturer-verified accuracy)

### Badge States Section (with visual cards)
```text
[ Green Badge Card ]
VERIFIED BY COMPANY
- What it means
- How users benefit
- Validity period

[ Amber Badge Card ]
CERTIFICATION OUTDATED
- When this appears
- How to update
- What users see

[ No Badge Card ]
NOT YET CERTIFIED
- Default state
- How to get started
```

### Step-by-Step Certification Process
1. Ensure you have Company Representative access (link to registration in CompanyGuide)
2. Access Company Dashboard
3. Select product to certify
4. Review all product information
5. Click "Certify Product"
6. Add optional notes
7. Submit certification

### Prerequisites Card
- Must be verified company representative
- Product must belong to your company
- Previous certification not pending review

### FAQ Section (Certification-specific only)

| Question | Existing Coverage |
|----------|-------------------|
| "When does certification expire?" | NEW - not covered elsewhere |
| "What happens when product info changes?" | NEW - badge state change |
| "Can I certify products from another company?" | NEW |
| "Do I need to certify every product?" | NEW |
| "What if I find incorrect information?" | Links to revision workflow in CompanyGuide |
| "How long is certification valid?" | NEW |

**Questions NOT included (already covered in RolesFAQ.tsx):**
- How to request company role
- Role approval time
- Role conflicts with reviewer

---

## Route Addition

**File:** `src/App.tsx`

Add new route (publicly accessible for prospective companies):
```typescript
const CompanyCertification = lazy(() => import("./pages/company/CompanyCertification"));

// In Routes:
<Route path="/company/certification" element={<CompanyCertification />} />
```

---

## Cross-Linking Updates

### Update news item to link to new page:
**File:** `src/data/news/company-certification-launch.ts`

Change:
```markdown
Visit our [Contact page](/support) to begin the registration process.
```
To:
```markdown
Visit our [Company Certification Guide](/company/certification) to learn more and begin the registration process.
```

### Add link in CompanyGuide.tsx:
Add a card linking to the certification page in the quick navigation section.

---

## Summary of Changes

| File | Action |
|------|--------|
| `src/pages/company/CompanyCertification.tsx` | NEW - Dedicated certification page |
| `src/App.tsx` | Add route for certification page |
| `src/data/news/company-certification-launch.ts` | Update link to new page |
| `src/pages/company/CompanyGuide.tsx` | Add navigation link to certification page |

---

## Non-Duplicate Content Strategy

The new page will:
- Focus exclusively on **product certification** (the badge system)
- Link to CompanyGuide for registration/revision workflows
- Link to RolesFAQ for general role questions
- Provide new FAQs specific to certification only

This avoids duplication while providing a complete resource for companies interested in the certification program.

