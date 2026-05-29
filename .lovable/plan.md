## Fix

In `src/hooks/useTheme.ts`, change `getInitial()` so the default is always `'light'` unless the user has explicitly toggled to dark (stored in localStorage). Drop the `prefers-color-scheme: dark` fallback so users on system-dark machines don't land on dark by default.

```ts
function getInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(KEY) as Theme | null;
  return stored === 'dark' ? 'dark' : 'light';
}
```

Toggle behavior and persistence stay the same — switching to dark and back continues to work.

No other files change.
