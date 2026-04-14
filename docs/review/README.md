# Product Review Documentation

Quick reference for reviewing and managing products on DLinRT.eu.

## Quick Links

- **[Review Guide](./GUIDE.md)** - Complete guide for reviewing and adding products
- **[Field Reference](../FIELD_REFERENCE.md)** - Definitions for every product data field

## Quick Start

### For Reviewers (Visual Editing)

1. Open product in web interface
2. Click **"Edit"** button in header
3. Modify fields using inline editors and dropdowns
4. Set evidence level (always visible now!)
5. Click **"Submit"** to send for admin approval
6. Approved edits sync to GitHub automatically

### For Reviewers (GitHub)

1. Clone the repository
2. Edit product files in `src/data/products/`
3. Create a pull request
4. Changes reviewed by maintainers

### For Contributors

1. Choose appropriate product category
2. Use example templates from `src/data/products/examples/`
3. Fill in required fields
4. Add company logo to `public/logos/`
5. Submit through interface or GitHub PR

## Visual Editing Features

The visual editor provides specialized editors for different field types:

| Field Type | Editor Style |
|------------|--------------|
| Category | Single-select dropdown |
| Modality, Anatomy | Multi-select with chips |
| Regulatory | Full CE/FDA/TGA editor |
| Evidence | Evidence links with level classification |
| Structures | OAR/GTV/Elective classification |

### Evidence Level Classification

Every product should have an evidence level (0-6). The **Evidence & Limitations** section is now always visible on product pages to ensure this is set.

## Product Features

### Multi-Category Support

Products can belong to multiple categories using the `secondaryCategories` field for products with multiple functionalities.

### Versioning Support

Track multiple versions through separate entries with `version` and `releaseDate` fields.

## Need Help?

- **Admins**: See [Admin Guide](../ADMIN_GUIDE.md) (includes Edit Approvals)
- **Reviewers**: See [Reviewer Guide](../REVIEWER_GUIDE.md) (includes Visual Editing)
- **Issues**: Open an issue on GitHub

## Providing Feedback on Products

There are several ways to report missing or incorrect product information:

| Method | Login Required? | Best For |
|--------|----------------|----------|
| **Visual Editor** — Log in, open a product, click "Edit", modify fields, and submit for admin approval. | DLinRT account | Reviewers fixing data directly |
| **GitHub Issue** — Open an issue at [dlinrteu-website/issues](https://github.com/DLinRT-eu/dlinrteu-website/issues/new) describing the problem and a supporting reference. | GitHub account | Reporting a problem without editing |
| **GitHub Pull Request** — Fork the repo, edit the product file in `src/data/products/[category]/`, and open a PR. See [CONTRIBUTING.md](../CONTRIBUTING.md). | GitHub account | Developers making code-level changes |
| **Public Feedback Form** — Go to [dlinrt.eu/support](https://dlinrt.eu/support#product-feedback) and fill in the form. | None | Anyone spotting an error or missing product |

For full details see the [Reviewer Guide § How to Provide Feedback](../REVIEWER_GUIDE.md#4-how-to-provide-feedback-on-products).
