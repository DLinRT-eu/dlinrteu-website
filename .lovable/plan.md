
# Adding ART-Plan+ Platform Relationship to Therapanacea Products

## Verification

Based on the Therapanacea website (therapanacea.eu/our-products/), I've confirmed that all four current products are modules within the **ART-Plan+** platform:

| Product | Category | Status |
|---------|----------|--------|
| Annotate | Auto-Contouring | Active module of ART-Plan+ |
| SmartFuse | Registration | Active module of ART-Plan+ |
| MR-Box | Image Synthesis | Active module of ART-Plan+ |
| AdaptBox | Image Synthesis | Active module of ART-Plan+ |

The website explicitly states these are modules of ART-Plan+ and lists SmartPlan and TumorBox as "Coming Soon."

## Approach

The `ProductDetails` interface already has a `partOf` field designed for this exact use case:

```text
partOf: {
  name: string;              // Parent product/system name
  version?: string;          // Minimum version required
  productUrl?: string;       // URL to parent product info
  relationship?: string;     // e.g., "Module", "Feature", "Add-on", "Component"
}
```

I'll add this structured field to all four Therapanacea products to formally document their relationship to ART-Plan+ without merging them into a single product entry.

## Changes

### 1. `src/data/products/auto-contouring/therapanacea.ts` (Annotate)

Add `partOf` field:

```typescript
partOf: {
  name: "ART-Plan+",
  version: "3.1.2",
  productUrl: "https://www.therapanacea.eu/our-products/",
  relationship: "Module"
},
```

### 2. `src/data/products/registration/therapanacea.ts` (SmartFuse)

Add `partOf` field:

```typescript
partOf: {
  name: "ART-Plan+",
  version: "3.1.2",
  productUrl: "https://www.therapanacea.eu/our-products/",
  relationship: "Module"
},
```

### 3. `src/data/products/image-synthesis/therapanacea.ts` (MR-Box)

Add `partOf` field:

```typescript
partOf: {
  name: "ART-Plan+",
  version: "3.1.2",
  productUrl: "https://www.therapanacea.eu/our-products/",
  relationship: "Module"
},
```

### 4. `src/data/products/image-synthesis/therapanacea-adaptbox.ts` (AdaptBox)

Add `partOf` field:

```typescript
partOf: {
  name: "ART-Plan+",
  version: "3.1.2",
  productUrl: "https://www.therapanacea.eu/our-products/",
  relationship: "Module"
},
```

## Files to Modify

| File | Change |
|------|--------|
| `src/data/products/auto-contouring/therapanacea.ts` | Add `partOf` field to Annotate |
| `src/data/products/registration/therapanacea.ts` | Add `partOf` field to SmartFuse |
| `src/data/products/image-synthesis/therapanacea.ts` | Add `partOf` field to MR-Box |
| `src/data/products/image-synthesis/therapanacea-adaptbox.ts` | Add `partOf` field to AdaptBox |

## Result

After this change, all four products will:
- Remain as separate product entries (as requested)
- Be formally linked to the ART-Plan+ platform via the structured `partOf` field
- Continue to mention "Part of the ART-Plan+ platform" in their descriptions
- Share the same platform version (3.1.2) and product URL

This enables future UI features like showing "This product is a module of ART-Plan+" or grouping platform modules together.
