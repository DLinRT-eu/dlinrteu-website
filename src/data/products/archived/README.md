# Archived Products

This folder contains product entries that have been removed from the 
main website but are preserved for potential future use.

## Why Archived?

These products do not meet the platform's criteria:
- They do not use AI or deep learning
- They are not used to monitor or implement AI-based solutions

## Products in Archive

| Product | Company | Reason |
|---------|---------|--------|
| Marie Upright Patient Positioner | Leo Cancer Care | Hardware patient positioner |
| SCINTIX Biology-Guided Radiotherapy | RefleXion Medical | Signal processing, not DL |
| RefleXion X2 Platform | RefleXion Medical | Hardware platform |

## Restoration

To restore these products to the website:
1. Move the relevant `.ts` file back to the appropriate category folder
2. Update the category's `index.ts` to import and include the products
3. Update `src/data/products/archived/index.ts` to remove the import

Last updated: 2026-01-27
