# Archived Companies

This folder contains company entries that have been removed from the 
main website but are preserved for potential future use.

## Why Archived?

These companies no longer have active products on the platform:
- Their products do not use AI or deep learning
- Their products are not used to monitor or implement AI-based solutions

## Companies in Archive

| Company | Reason |
|---------|--------|
| RefleXion Medical | Products (SCINTIX, X2) use signal processing, not deep learning |
| Leo Cancer Care | Product (Marie) is a hardware patient positioner |
| ViewRay | MRIdian A3i uses deformable registration, not AI/DL |

## Restoration

To restore a company to the website:
1. Move the relevant `.ts` file back to the main companies folder
2. Update `src/data/companies/radiotherapy-equipment.ts` (or appropriate category) to include the company
3. Update this folder's `index.ts` to remove the import
4. Ensure the company's products are also restored from `src/data/products/archived/`

Last updated: 2026-01-29
