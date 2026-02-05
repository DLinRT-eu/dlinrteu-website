

# Company Representative Workflow UX Improvements

## Current State Summary

After analyzing the company representative workflow, I found several areas where the user experience can be enhanced to make the certification and revision process more intuitive and actionable.

### What Works Well
- Comprehensive documentation on `/company/guide` and `/company/certification`
- Proper role-based access control
- Clear certification process steps
- Working RPC functions for secure data operations
- 10 verified company representatives across 6 companies

### Identified Issues
- No product verifications created yet (0 certifications despite active reps)
- Confusing navigation between 3 different company pages
- Product IDs shown instead of user-friendly names
- No proactive prompts or task assignments for certification

---

## Proposed Improvements

### 1. Consolidate Company Navigation

**Problem**: Three separate pages cause confusion:
- `/company/dashboard` - Certify/Revision dialogs
- `/company/overview` - Stats and products
- `/company/products` - Certification manager

**Solution**: Merge functionality into a unified dashboard experience

| Current | Proposed |
|---------|----------|
| 3 separate pages | 1 unified dashboard with tabs |
| Confusion about which page to use | Clear single entry point |
| Duplicated navigation links | Streamlined navigation |

### 2. Add Certification Progress Indicator

**Problem**: No visibility into certification coverage

**Solution**: Add a progress widget showing:
- X of Y products certified
- Products needing re-certification (outdated)
- Products never certified

```text
+----------------------------------+
|  Certification Progress          |
|  ================================|
|  [████████░░] 80% Complete       |
|  8 Certified | 2 Need Attention  |
+----------------------------------+
```

### 3. Replace Product IDs with Human-Readable Names

**Problem**: UI shows technical product IDs like "mvision-ai-contouring"

**Solution**: Show product name with company context
- Before: `Product ID: mvision-ai-contouring`
- After: `Contour+ (MVision AI)`

### 4. Add "Products Needing Attention" Section

**Problem**: No proactive guidance on what to certify

**Solution**: Add a prominent section at the top of the dashboard showing:
- Products never certified
- Products with outdated certifications
- Recently updated products needing review

### 5. Improve Onboarding for New Company Representatives

**Problem**: New reps land on dashboard with no clear next action

**Solution**: Add an onboarding checklist:
1. Review your company's products
2. Verify product information accuracy
3. Certify your first product
4. Set up notifications

### 6. Clarify Certification vs. Revision

**Problem**: Users don't understand the difference

**Solution**: Add contextual help:
- **Certify**: Confirm existing information is accurate (adds verified badge)
- **Suggest Revision**: Propose changes to update product information

### 7. Add Quick Actions to Product Cards

**Problem**: Must open dialogs to take action

**Solution**: Add inline action buttons on product cards:
- "Certify Now" button for uncertified products
- "Re-certify" button for outdated certifications
- "Suggest Edit" button for corrections

### 8. Mobile-Optimized Company Header Navigation

**Problem**: Company links not prominent on mobile

**Solution**: Add company-specific navigation items to mobile menu

---

## Implementation Plan

### Phase 1: Quick Wins (Low Effort, High Impact)

1. **Replace product IDs with names** in certification dialogs and cards
2. **Add certification status badges** to product cards in overview
3. **Consolidate links** - remove redundant navigation buttons
4. **Add help tooltips** explaining Certify vs. Revision

### Phase 2: Dashboard Improvements

1. **Add certification progress widget** with visual progress bar
2. **Add "Needs Attention" section** highlighting uncertified products
3. **Add quick action buttons** to product cards
4. **Improve empty states** with guided next steps

### Phase 3: Navigation Consolidation

1. **Merge dashboard pages** into single unified view
2. **Update all navigation links** to point to unified dashboard
3. **Deprecate redundant routes**

### Phase 4: Future Enhancements

1. **Task assignment system** for batch certification (previously discussed)
2. **Email notifications** for certification reminders
3. **Bulk certification** for multiple products

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/company/Dashboard.tsx` | Replace product IDs with names, add progress indicator |
| `src/pages/company/CompanyDashboardOverview.tsx` | Add certification status badges, quick actions |
| `src/pages/company/ProductsManager.tsx` | Improve product cards with names and actions |
| `src/components/Header.tsx` | Streamline company navigation links |
| `src/utils/companyUtils.ts` | Add helper to resolve product names |

---

## Expected Outcomes

- **Increased certification rate**: Clear guidance and quick actions
- **Reduced confusion**: Single dashboard, clear terminology
- **Better onboarding**: New reps know what to do immediately
- **Improved data quality**: More products certified = more trusted information

