export const applyStoredTheme = () => {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = stored === 'dark' || (!stored && prefersDark);
  if (shouldUseDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const toggleTheme = (): boolean => {
  if (typeof document === 'undefined') return false;
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  return isDark;
};
