import { useState, useEffect } from 'react';

export function useDarkMode(initialValue = false) {
  const [isDarkMode, setIsDarkMode] = useState(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        setIsDarkMode(true);
      }

      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkMode(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return [isDarkMode, setIsDarkMode] as const;
}
