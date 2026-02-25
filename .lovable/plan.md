

# Fix PPTX Export: Layout Mismatch and Image Loading

## Root Cause

The main bug causing "content outside the page" is a **slide layout mismatch**:

- The code sets `this.pptx.layout = "LAYOUT_16x9"` which creates slides that are **10 inches x 5.625 inches**
- But the layout constants use `slideWidth: 13.33` and `slideHeight: 7.5`, which are the dimensions for `LAYOUT_WIDE` (13.33" x 7.5")
- Result: all content positioned between 10" and 13.33" horizontally (and 5.625" to 7.5" vertically) falls **outside the visible slide area**
- This affects every single slide in the presentation

## Fix 1: Correct the Layout Setting

**File**: `src/utils/pptxExport.ts`, line 122

Change `this.pptx.layout = "LAYOUT_16x9"` to `this.pptx.layout = "LAYOUT_WIDE"` so the actual PowerPoint slide dimensions match the positioning constants (13.33" x 7.5").

This single change fixes all content overflow issues across every slide.

## Fix 2: Convert Images to Base64 Before Adding

**File**: `src/utils/pptxExport.ts`

The current approach uses `path` URLs for images, which requires pptxgenjs to fetch them at export time. This is fragile -- CORS errors or network issues cause images to silently fail or produce corrupted output.

Replace the image loading strategy:
- Add a helper method `fetchImageAsBase64(url: string): Promise<string>` that uses `fetch()` + `FileReader`/`canvas` to convert images to base64 data URIs before passing them to pptxgenjs
- Update `safeAddImage` to use `data` (base64) instead of `path` (URL)
- This eliminates CORS issues and ensures images are properly embedded in the PPTX file
- If an image fails to load, skip it gracefully (already handled by try/catch)

## Fix 3: Logo Aspect Ratio Preservation

**File**: `src/utils/pptxExport.ts`

When converting to base64, detect the actual image dimensions using `Image()` object and calculate proper aspect ratio within the bounding box. This ensures logos are not stretched or squished:

- Load each image with `new Image()` to get `naturalWidth` and `naturalHeight`
- Calculate the fitted dimensions within the target bounding box while preserving aspect ratio
- Pass these corrected dimensions to `addImage` along with `sizing: { type: 'contain', w, h }`

## Technical Details

### Layout Fix (line 122)
```text
Before: this.pptx.layout = "LAYOUT_16x9";   // 10" x 5.625"
After:  this.pptx.layout = "LAYOUT_WIDE";    // 13.33" x 7.5"
```

### Base64 Image Helper
New private method added to `PptxExporter`:
- `fetchImageAsBase64(url: string): Promise<{ data: string; width: number; height: number } | null>`
- Fetches the image via `fetch()`, converts to blob, reads as data URL
- Also loads via `Image()` to get natural dimensions
- Returns null on failure (graceful degradation)

### Updated `safeAddImage`
- Made `async`
- Calls `fetchImageAsBase64` first
- Uses `data` property instead of `path`
- Calculates proper fitted dimensions for aspect ratio preservation

### Updated Methods That Use Images
The following methods call `safeAddImage` and need to be made `async`:
- `addTitleSlide` (logo)
- `addCompanyLogosSlide` (company logos)
- `addProductGridSlides` (company logos on product cards)
- `addCompanyLogosByTaskSlides` (company logos per task)

### `generatePresentation` Updates
Await the async slide methods instead of calling them synchronously.

## Files Modified

1. **`src/utils/pptxExport.ts`** -- all changes are in this single file:
   - Fix layout from `LAYOUT_16x9` to `LAYOUT_WIDE`
   - Add `fetchImageAsBase64` helper method
   - Update `safeAddImage` to use base64 data
   - Make image-using slide methods async
   - Update `generatePresentation` to await async methods
