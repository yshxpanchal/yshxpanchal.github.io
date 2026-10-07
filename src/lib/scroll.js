// Reliable, soft section navigation.
// Why not scrollIntoView / behavior:'smooth'? The browser's smooth scroll is fast, nearly linear and
// measures the target once. If anything above the target changes height mid-scroll (GitHub repos
// loading, reveal animations) it lands a few pixels off. This helper runs its own eased animation
// (gentle start, gentle landing) and re-measures the target on every frame, so one click always lands
// exactly, and the motion feels soft.

let token = 0;
let busy = false;

export const isAutoScrolling = () => busy;

const targetTop = (el) => Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY));

// easeInOutCubic: slow start, smooth middle, slow landing.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Longer trips take a bit longer, but never feel sluggish or abrupt.
const durationFor = (distance) => Math.min(1500, Math.max(650, 450 + Math.sqrt(distance) * 15));

const notifyNavigationComplete = (id) => {
  window.dispatchEvent(new CustomEvent('portfolio:section-navigation-complete', { detail: { id } }));
};

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const mine = ++token;
  busy = true;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cancelEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  const finish = () => {
    if (mine === token) busy = false;
    cancelEvents.forEach((ev) => window.removeEventListener(ev, onUser));
  };
  const onUser = () => { token++; finish(); };
  cancelEvents.forEach((ev) => window.addEventListener(ev, onUser, { passive: true }));

  if (reduce) {
    window.scrollTo({ top: targetTop(el), behavior: 'instant' });
    finish();
    notifyNavigationComplete(id);
    return;
  }

  const from = window.scrollY;
  const duration = durationFor(Math.abs(targetTop(el) - from));
  const started = performance.now();
  let corrections = 0;

  const tick = (now) => {
    if (mine !== token) return;

    const t = Math.min(1, Math.max(0, (now - started) / duration));
    const target = targetTop(el); // live measurement: follows the target if the layout shifts
    const y = from + (target - from) * ease(t);
    window.scrollTo({ top: y, behavior: 'instant' });

    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }

    settle();
  };

  // Animation done: if late layout changes moved the target, snap to the exact spot (a few frames max).
  const settle = () => {
    if (mine !== token) return;
    const top = targetTop(el);
    if (Math.abs(top - window.scrollY) > 2 && corrections < 4) {
      corrections++;
      window.scrollTo({ top, behavior: 'instant' });
      requestAnimationFrame(settle);
      return;
    }
    finish();
    notifyNavigationComplete(id);
  };
  requestAnimationFrame(tick);
}
