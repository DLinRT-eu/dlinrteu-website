# Product Review Documentation

Quick reference for reviewing and managing products on DLinRT.eu.

## Quick Links

- **[Review Guide](./GUIDE.md)** - Complete guide for reviewing and adding products
- **[Field Reference](../FIELD_REFERENCE.md)** - Definitions for every product data field

## Quick Start

### For Reviewers

1. Open product in web interface
2. Click "Review" button
3. Follow guided checklist
4. Submit changes

### For Contributors

1. Choose appropriate product category
2. Use example templates from `src/data/products/examples/`
3. Fill in required fields
4. Add company logo to `public/logos/`
5. Submit through interface

## Product Features

### Multi-Category Support

Products can belong to multiple categories using the `secondaryCategories` field for products with multiple functionalities.

### Versioning Support

Track multiple versions through separate entries with `version` and `releaseDate` fields.

## Need Help?

- **Admins**: See [Admin Guide](../ADMIN_GUIDE.md)
- **Reviewers**: See [Reviewer Guide](../REVIEWER_GUIDE.md)
- **Issues**: Open an issue on GitHub
