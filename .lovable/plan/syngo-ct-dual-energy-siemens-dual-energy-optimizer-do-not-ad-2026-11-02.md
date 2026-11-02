# syngo.CT Dual Energy (siemens-dual-energy-optimizer): do not add

## Finding
Siemens' product page describes syngo.CT Dual Energy as a viewer for dual-energy CT data. It offers Optimum Contrast (a blend of the high-kV and low-kV images to reduce noise) and monoenergetic images (calculated as if taken at a single X-ray energy, to reduce noise and metal artefacts). Both are classical physics and image-processing methods. The page makes no claim of AI, deep learning or neural networks, and it is not a radiotherapy-specific tool.

The DLinRT inclusion rule covers only AI and deep learning, and leaves out classical image processing. So this product should not be added.

The ID `siemens-dual-energy-optimizer` is not in the catalogue. It appears only in an old helper script (`scripts/company-product-mapping.ps1`) that lists Siemens product IDs. Nothing on the website uses it.

## Proposed change
- Remove `siemens-dual-energy-optimizer` from the Siemens list in `scripts/company-product-mapping.ps1`, so the script no longer points to a product that doesn't exist.
- No product, company page or evidence changes.

## Not covered
- Siemens' DirectDensity and DirectSPR features (dual-energy stopping-power images for proton planning) are also physics-based. They are not checked here and would need a separate source showing AI use before they could be considered.
