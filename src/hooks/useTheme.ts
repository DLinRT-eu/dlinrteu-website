import { useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';
const KEY = 'dlinrt-theme';

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const t = getInitial();
    if (typeof document !== 'undefined') apply(t);
    return t;
  });

  useEffect(() => {
    apply(theme);
    try { localStorage.setItem(KEY, theme); } catch {}
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle, setTheme };
}
