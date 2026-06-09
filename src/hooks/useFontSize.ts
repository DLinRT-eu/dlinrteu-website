import { useCallback, useEffect, useState } from 'react';

export type FontSizeLevel = 'small' | 'normal' | 'large' | 'xlarge';

const KEY = 'dlinrt-font-size-v1';

export const FONT_SIZE_PX: Record<FontSizeLevel, number> = {
  small: 14,
  normal: 16,
  large: 18,
  xlarge: 20,
};

const ORDER: FontSizeLevel[] = ['small', 'normal', 'large', 'xlarge'];

function getInitial(): FontSizeLevel {
  if (typeof window === 'undefined') return 'normal';
  const stored = localStorage.getItem(KEY) as FontSizeLevel | null;
  return stored && stored in FONT_SIZE_PX ? stored : 'normal';
}

function apply(level: FontSizeLevel) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.fontSize = `${FONT_SIZE_PX[level]}px`;
}

export function useFontSize() {
  const [level, setLevel] = useState<FontSizeLevel>(() => {
    const l = getInitial();
    apply(l);
    return l;
  });

  useEffect(() => {
    apply(level);
    try { localStorage.setItem(KEY, level); } catch {}
  }, [level]);

  const index = ORDER.indexOf(level);
  const canDecrease = index > 0;
  const canIncrease = index < ORDER.length - 1;

  const increase = useCallback(() => {
    setLevel((l) => {
      const i = ORDER.indexOf(l);
      return i < ORDER.length - 1 ? ORDER[i + 1] : l;
    });
  }, []);

  const decrease = useCallback(() => {
    setLevel((l) => {
      const i = ORDER.indexOf(l);
      return i > 0 ? ORDER[i - 1] : l;
    });
  }, []);

  const reset = useCallback(() => setLevel('normal'), []);

  return { level, increase, decrease, reset, canIncrease, canDecrease };
}
