

# News Item: Company Certification Launch Announcement 

## Overview

Create a new news item announcing:
0. we have finished our round of internal peer-review: all the products have undergone the 4 eyes principle. Which does noit mean that info is perfect, but that accuracy has been increaese
1. Recent platform updates (DICOM format standardization, contact info cleanup)
2. Opening of company certification system at the end of the week
3. Introduction of the "Verified by Company" badge that will appear on products

## New Files to Create

### 1. News Item File

**File:** `src/data/news/company-certification-launch.ts`

```typescript
import { NewsItem } from "@/types/news";

export const companyCertificationLaunch: NewsItem = {
  id: "company-certification-launch",
  date: "2026-01-28",
  title: "Company Certification Program Launches: Manufacturers Can Now Verify Product Information",
  summary: "DLinRT.eu opens its certification program to medical device companies, enabling manufacturers to verify and certify their product information. Look for the new 'Verified by Company' badge on certified products.",
  content: `
## Introducing Company Certification

We are pleased to announce the official launch of our **Company Certification Program**, opening to all manufacturers at the end of this week. This program enables companies to directly verify and certify the accuracy of their product information listed on DLinRT.eu.

## The "Verified by Company" Badge

Products that have been certified by their manufacturers will display a new verification badge:

![Verified by Company Badge](/images/verified-badge-example.png)

This green badge indicates that:
- A verified company representative has reviewed the product information
- The manufacturer confirms the accuracy of the listed details
- The certification is current and the product data matches the certified version

### Badge States

Products may display different badge states:

| Badge | Meaning |
|-------|---------|
| **Verified by Company** (green) | Information has been certified by the manufacturer |
| **Certification Outdated** (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |

## How It Works

### For Company Representatives

1. **Register** as a company representative on DLinRT.eu
2. **Verify** your identity and company affiliation
3. **Review** your company's product listings
4. **Certify** that the information is accurate
5. **Update** information when changes occur

### For Users

When browsing products, look for the verification badge to identify products with manufacturer-confirmed information. This adds an additional layer of trust beyond our independent expert reviews.

## Recent Platform Updates

Alongside this launch, we have implemented several data quality improvements:

### DICOM Format Standardization
All DICOM format references have been standardized across the database:
- **DICOM-RTSTRUCT** for structure sets
- **DICOM-RTPLAN** for treatment plans  
- **DICOM-RTDOSE** for dose distributions

### Data Cleanup
Product contact information has been streamlined, removing outdated fields and focusing on verified company and product website links.

## Get Involved

### For Companies
If you represent a medical device company with products listed on DLinRT.eu, we encourage you to:
1. Register your company representative account
2. Verify your products during the upcoming certification round
3. Keep your product information up to date

Visit our [Contact page](/contact) to begin the registration process.

### For the Community
The certification program works alongside our independent reviewer community. Together, we ensure that DLinRT.eu remains the most trusted and accurate resource for AI in radiotherapy.

---

*For questions about company certification, please contact us at info@dlinrt.eu*
`
};
```

### 2. Update News Index

**File:** `src/data/news.ts`

Add the import and include in the NEWS_ITEMS array:

```typescript
import { companyCertificationLaunch } from "./news/company-certification-launch";

export const NEWS_ITEMS: NewsItem[] = [
  companyCertificationLaunch,  // Add at top (newest first)
  december2025PlatformUpdate,
  // ... rest of items
];
```

## Badge Visual Example

The existing badge that will appear on certified products is already implemented in `ProductHeaderInfo.tsx`:

```text
┌─────────────────────────────────────────────────┐
│  ✓ Verified by Company (Jan 28, 2026)          │
└─────────────────────────────────────────────────┘
   └── Green background with BadgeCheck icon
```

**Badge Variants:**

```text
VALID CERTIFICATION:
┌─────────────────────────────────────────────────┐
│ ✓ Verified by Company (Jan 28, 2026)           │  ← Green badge
└─────────────────────────────────────────────────┘

OUTDATED CERTIFICATION:
┌─────────────────────────────────────────────────┐
│ ⚠ Certification Outdated (certified Jan 15)    │  ← Amber badge
└─────────────────────────────────────────────────┘
```

The badge uses:
- **BadgeCheck** icon from lucide-react
- **success** variant (green) when valid
- **warning** variant (amber) when outdated
- Tooltip with verification date and notes

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/news/company-certification-launch.ts` | **NEW** - Create news item |
| `src/data/news.ts` | Add import and include in NEWS_ITEMS array |

## Summary

This news item:
- Announces the company certification program launch
- Explains the badge system with visual reference
- Describes the different badge states
- Details the certification process for companies
- Mentions recent platform improvements (DICOM standardization, data cleanup)
- Provides clear call-to-action for company representatives

