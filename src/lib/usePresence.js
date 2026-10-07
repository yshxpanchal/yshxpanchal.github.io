import { useEffect, useState } from 'react';

// Keeps an overlay mounted long enough to play its exit animation.
//   const { mounted, state } = usePresence(open, 320);
//   mounted -> render the overlay;  state -> 'open' | 'closed' (use as data-state for CSS)
export default function usePresence(open, exitMs = 320) {
  const [lingering, setLingering] = useState(open);

  useEffect(() => {
    if (open) {
      setLingering(true);
      return undefined;
    }
    const t = window.setTimeout(() => setLingering(false), exitMs);
    return () => window.clearTimeout(t);
  }, [open, exitMs]);

  return { mounted: open || lingering, state: open ? 'open' : 'closed' };
}
