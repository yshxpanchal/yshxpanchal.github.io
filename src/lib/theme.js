// Dark / light theme.
// The active theme lives on <html data-theme="dark|light"> (set before first paint by the
// inline script in index.html). All colours are CSS variables, see src/index.css.
import { useSyncExternalStore } from 'react';

const KEY = 'portfolio-theme';
const EVT = 'portfolio-themechange';
const META_COLOR = { dark: '#04070c', light: '#f4f7fb' };

export const getTheme = () =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

function paint(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme]);
  window.dispatchEvent(new Event(EVT));
}

let busy = false;

export function setTheme(next, origin) {
  if (busy || next === getTheme()) return;
  try { localStorage.setItem(KEY, next); } catch { /* private mode */ }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { paint(next); return; }

  busy = true;
  const root = document.documentElement;

  if (typeof document.startViewTransition === 'function') {
    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const farthestX = Math.max(x, window.innerWidth - x);
    const farthestY = Math.max(y, window.innerHeight - y);

    root.style.setProperty('--theme-reveal-x', `${x}px`);
    root.style.setProperty('--theme-reveal-y', `${y}px`);
    root.style.setProperty(
      '--theme-reveal-radius',
      `${Math.ceil(Math.hypot(farthestX, farthestY))}px`
    );
    root.classList.add('theme-vt');
    const transition = document.startViewTransition(() => paint(next));
    const done = () => {
      root.classList.remove('theme-vt');
      root.style.removeProperty('--theme-reveal-x');
      root.style.removeProperty('--theme-reveal-y');
      root.style.removeProperty('--theme-reveal-radius');
      busy = false;
    };
    transition.finished.then(done, done);
    return;
  }

  // Without View Transitions, switch directly instead of animating every element separately.
  paint(next);
  busy = false;
}

export function toggleTheme(origin) {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark', origin);
}

const subscribe = (cb) => {
  window.addEventListener(EVT, cb);
  return () => window.removeEventListener(EVT, cb);
};

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark');
  return { theme, isDark: theme === 'dark', toggle: toggleTheme };
}
