import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setVisible(true);
      setDone(true);
      return undefined;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -12px 0px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Once the entrance has finished, release will-change so finished blocks stop holding GPU layers.
  const onTransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform') setDone(true);
  };

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${done ? 'is-done' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
}
