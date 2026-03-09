# Daily-Stable Random Sorting for Products and Company 

## Problem

Currently, `useProductShuffle` generates a new random order on every page load/refresh. This makes it hard to find the same product when navigating back and forth. Make sure the same behavior is also implemented for the company pages and random sorting.

## Alternatives Considered


| Approach                                                     | Pros                                                         | Cons                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------- |
| **Daily seed-based shuffle**                                 | Deterministic per day, no storage needed, same for all users | Order changes at midnight; simple to implement  |
| **Session-stable shuffle** (current Companies page approach) | Stable within a browsing session                             | Different per user/session; resets on tab close |
| **localStorage with daily expiry**                           | Persists across tabs                                         | Unnecessary complexity vs seeded shuffle        |
| **Weekly seed**                                              | Even more stable                                             | Too long without rotation                       |


**Recommended: Daily seed-based shuffle** — A seeded pseudo-random number generator (PRNG) using the current date as the seed. All users see the same order on the same day. No storage needed. Cleanest implementation.

## Implementation

### 1. Add a seeded PRNG to `useProductSorting.ts`

Replace the current `useProductShuffle` with a `useDailyProductShuffle` that:

- Computes a seed from today's date string (`"2026-03-05"`)
- Uses a simple seeded PRNG (mulberry32) for the Fisher-Yates shuffle
- Memoizes on `[products, todayString]` so it only recomputes when the product list changes or the day rolls over

```typescript
function mulberry32(seed: number) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const useDailyProductShuffle = (products: ProductDetails[]) => {
  const today = new Date().toISOString().slice(0, 10);
  return useMemo(() => {
    const rng = mulberry32(dateToSeed(today));
    const arr = [...products];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [products, today]);
};
```

### 2. Update `ProductGrid.tsx`

- Import `useDailyProductShuffle` instead of `useProductShuffle`
- Replace the call: `const shuffledProducts = useDailyProductShuffle(filteredProducts);`

### Files Modified

- `src/hooks/useProductSorting.ts` — add seeded PRNG + `useDailyProductShuffle`, keep old export for backward compat
- `src/components/ProductGrid.tsx` — swap to new hook