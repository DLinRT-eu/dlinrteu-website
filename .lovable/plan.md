## Goal
Let visitors increase or decrease the base font size across the whole site, within a reasonable range, with the choice persisted across sessions.

## Approach
Drive everything from the root `<html>` font-size. Tailwind's `rem` units (text-sm, text-base, spacing, etc.) all scale from this single value, so one CSS variable change resizes the entire UI consistently — no per-component edits needed.

## Steps

1. **Create `useFontSize` hook** (`src/hooks/useFontSize.ts`)
   - Levels: `small` (87.5% / 14px), `normal` (100% / 16px, default), `large` (112.5% / 18px), `xlarge` (125% / 20px). Four steps keeps the range reasonable and avoids breaking layouts.
   - Persist in `localStorage` under `dlinrt-font-size-v1`.
   - Apply by setting `document.documentElement.style.fontSize` on mount and on change.
   - Initialize synchronously (like `useTheme`) to avoid a flash.

2. **Create `FontSizeControl` component** (`src/components/common/FontSizeControl.tsx`)
   - Compact group with three buttons: `A-`, `A`, `A+` (decrease / reset / increase).
   - Disabled states at min/max.
   - Tooltips ("Decrease text size", "Reset", "Increase text size").
   - `aria-label`s for accessibility; announces current level via `aria-live` politely.

3. **Mount in the header** (`src/components/Header.tsx`)
   - Place next to the existing theme toggle so it's reachable from every page.
   - On mobile, include it in the mobile menu sheet alongside the theme toggle.

4. **Guardrails**
   - Clamp values so users cannot exceed the four defined levels.
   - Keep changes scoped to `html { font-size }` — do not touch component CSS, Tailwind config, or design tokens.

## What is intentionally NOT changed
- No changes to `index.css` design tokens, Tailwind config, or any page/component styles.
- No backend, no Supabase, no per-user persistence (localStorage only, matches the existing theme pattern).
- Header layout untouched apart from inserting the new control next to the theme toggle.

## Files
- New: `src/hooks/useFontSize.ts`
- New: `src/components/common/FontSizeControl.tsx`
- Edit: `src/components/Header.tsx` (insert control in desktop actions + mobile menu)
