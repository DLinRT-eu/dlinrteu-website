## Issues

1. The preview is still in dark mode because the previous session wrote `'dark'` to `localStorage['dlinrt-theme']` (before light became the default). The hook still honors that stored value, so the user is stuck in dark.
2. On mobile (current viewport 411px), the `ThemeToggle` is hidden because it sits inside a `hidden md:flex` container in `Header.tsx`. The mobile `Sheet` nav doesn't include it either.

## Fix

### `src/hooks/useTheme.ts`
Bump the storage key to invalidate any previously persisted `'dark'` value so everyone restarts on light, then opts in fresh:

```ts
const KEY = 'dlinrt-theme-v2';
```

`getInitial()` already returns `'light'` unless the new key holds `'dark'`, so this single change forces a one-time reset and preserves all future toggles.

### `src/components/Header.tsx`
Pull `ThemeToggle` out of the desktop-only `hidden md:flex` container so it is rendered at all breakpoints. Place it just before the mobile menu trigger area inside the existing flex row, e.g.:

```tsx
<div className="flex items-center gap-2">
  <ThemeToggle />
  <MobileNav />
</div>
```

…or simply render `<ThemeToggle />` alongside `MobileNav` with `className="ml-auto"` so it sits between the brand link and the menu button on small screens. The existing desktop placement of the toggle in the `hidden md:flex` toolbar is removed to avoid duplicates.

No other files change. No styling overhaul, no behavior change beyond visibility + storage-key bump.
