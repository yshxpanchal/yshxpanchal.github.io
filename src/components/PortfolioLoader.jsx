import { useEffect, useState } from 'react';

const WORDS = ['Fetching...', 'Analyzing...', 'Securing...', 'Ready'];
const STEP_MS = 400;
const FADE_MS = 750; // must match portfolio-loader-out in index.css

export default function PortfolioLoader() {
  const [word, setWord] = useState(WORDS[0]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let hideTimer;
    const timers = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setWord('Ready');
      hideTimer = window.setTimeout(() => setHidden(true), 320);
      return () => window.clearTimeout(hideTimer);
    }

    WORDS.forEach((item, index) => {
      if (index === 0) return;
      timers.push(window.setTimeout(() => setWord(item), index * STEP_MS));
    });

    // Unmount only after the CSS fade-out (starts at 1.6s) has finished, so it dissolves instead of cutting.
    hideTimer = window.setTimeout(() => setHidden(true), WORDS.length * STEP_MS + FADE_MS + 50);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="portfolio-loader"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div className="portfolio-loader__text">{word}</div>
    </div>
  );
}
