import { NewsItem } from "@/types/news";

export const companyCertificationLaunch: NewsItem = {
  id: "company-certification-launch",
  date: "2026-01-28",
  title: "Internal Review Complete & Company Certification Program Launches",
  summary: "All products have undergone peer-review using the 4-eyes principle, and DLinRT.eu opens its certification program to manufacturers. Look for the new 'Verified by Company' badge on certified products.",
  content: `
## Internal Peer-Review Complete

We are pleased to announce that **all products in our database have undergone internal peer-review** following the 4-eyes principle. Every product listing has been reviewed by at least two independent reviewers to increase data accuracy.

While this does not guarantee perfection, it significantly improves the reliability of the information presented. We remain committed to continuous improvement and welcome feedback from the community.

## Introducing Company Certification

Starting at the end of this week, we are launching our **Company Certification Program**. This program enables manufacturers to directly verify and certify the accuracy of their product information listed on DLinRT.eu.

## The "Verified by Company" Badge

Products that have been certified by their manufacturers will display a new verification badge:

**Badge States:**

| Badge | Meaning |
|-------|---------|
| Verified by Company (green) | Information has been certified by the manufacturer |
| Certification Outdated (amber) | Product was certified but information has since been updated; re-certification needed |
| No badge | Product has not yet been certified by the company |

This green badge indicates that:
- A verified company representative has reviewed the product information
- The manufacturer confirms the accuracy of the listed details
- The certification is current and the product data matches the certified version

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

Visit our [Company Certification Guide](/company/certification) to learn more and begin the registration process.

### For the Community
The certification program works alongside our independent reviewer community. Together, we ensure that DLinRT.eu remains the most trusted and accurate resource for AI in radiotherapy.

---

*For questions about company certification, please contact us at info@dlinrt.eu*
`
};
