'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'bqv2-theme';
export type Theme = 'light' | 'dark';

/**
 * Reads the user's theme preference from localStorage (with fallback
 * to prefers-color-scheme) and keeps every .bqv2 root on the page in
 * sync via the data-theme attribute. Every change persists.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  // Initial read after mount — server renders light, then we sync.
  useEffect(() => {
    let next: Theme = 'light';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        next = stored;
      } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        next = 'dark';
      }
    } catch {
      /* ignore — fall back to light */
    }
    setThemeState(next);
    applyTheme(next);
  }, []);

  // Follow OS-level dark/light changes mid-session — but only when
  // the user hasn't made an explicit toggle choice. Their click wins.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return; // explicit choice locks the theme
      } catch {
        /* ignore */
      }
      const next: Theme = e.matches ? 'dark' : 'light';
      setThemeState(next);
      applyTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return { theme, setTheme, toggle };
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.bqv2').forEach((el) => {
    el.setAttribute('data-theme', theme);
  });
}
