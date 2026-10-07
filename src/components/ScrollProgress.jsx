import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    // Coalesce scroll/resize events into one DOM write per animation frame (no React re-render).
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 shadow-[0_0_12px_rgba(0,224,164,0.7)]"
        style={{ width: '0%', transition: 'width 0.18s cubic-bezier(.25,.8,.25,1)' }}
      />
    </div>
  );
}
