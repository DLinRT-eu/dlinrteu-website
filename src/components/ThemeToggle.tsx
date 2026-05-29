import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth settle-in on mount
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = theme === 'dark';

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'h-8 w-8 p-0 relative overflow-hidden rounded-full',
        'transition-all duration-700 ease-out will-change-transform',
        mounted
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-1 scale-90',
      ].join(' ')}
    >
      <Sun
        className={[
          'h-3.5 w-3.5 absolute inset-0 m-auto transition-all duration-500 ease-out',
          isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100',
        ].join(' ')}
      />
      <Moon
        className={[
          'h-3.5 w-3.5 absolute inset-0 m-auto transition-all duration-500 ease-out',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50',
        ].join(' ')}
      />
    </Button>
  );
};

export default ThemeToggle;
