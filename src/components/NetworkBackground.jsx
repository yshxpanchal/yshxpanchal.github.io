import { useEffect, useRef } from 'react';

const CFG = {
  areaPerParticle: 14000,
  minParticles: 26,
  maxParticles: 150,
  linkDist: 140,
  mouseLinkDist: 200,
  repelDist: 130,
  repelStrength: 3.0,
  baseSpeed: 0.22,
  wrapPad: 60,
};

const DARK_PALETTE = [
  [52, 211, 153],
  [16, 185, 129],
  [110, 231, 183],
];

const LIGHT_PALETTE = [
  [5, 150, 105],
  [4, 120, 87],
  [13, 148, 136],
];

const DARK_CURSOR = [110, 231, 183];
const LIGHT_CURSOR = [4, 120, 87];

const BUCKETS = 10;
const TAU = Math.PI * 2;

function makeSprite(rgb, size = 64) {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = size;
  const context = sprite.getContext('2d');
  if (!context) return sprite;

  const radius = size / 2;
  const [r, g, b] = rgb;
  const gradient = context.createRadialGradient(
    radius, radius, 0,
    radius, radius, radius,
  );

  gradient.addColorStop(0, `rgba(${r},${g},${b},1)`);
  gradient.addColorStop(0.18, `rgba(${r},${g},${b},0.65)`);
  gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.16)`);
  gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return sprite;
}

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let palette = DARK_PALETTE;
    let cursorRgb = DARK_CURSOR;
    let particleSprites = palette.map((rgb) => makeSprite(rgb));

    const mouse = { x: 0, y: 0, active: false };
    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    let rafId = 0;
    let running = false;
    let lastTime = 0;
    let reducedMotion = false;
    let resizeQueued = false;

    function isLightTheme() {
      return document.documentElement.dataset.theme === 'light';
    }

    function applyTheme() {
      const light = isLightTheme();
      palette = light ? LIGHT_PALETTE : DARK_PALETTE;
      cursorRgb = light ? LIGHT_CURSOR : DARK_CURSOR;
      particleSprites = palette.map((rgb) => makeSprite(rgb));
      render();
    }

    function createParticle() {
      const angle = Math.random() * TAU;
      const speed = CFG.baseSpeed * (0.4 + Math.random() * 1.2);
      const pad = CFG.wrapPad;

      return {
        x: Math.random() * (w + pad * 2) - pad,
        y: Math.random() * (h + pad * 2) - pad,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        ox: 0,
        oy: 0,
        size: 9 + Math.random() * 11,
        color: (Math.random() * palette.length) | 0,
      };
    }

    function build() {
      const target = Math.round((w * h) / CFG.areaPerParticle);
      const count = Math.max(
        CFG.minParticles,
        Math.min(CFG.maxParticles, target),
      );
      particles = Array.from({ length: count }, createParticle);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);

      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      build();
      render();
    }

    function update(dt) {
      const pad = CFG.wrapPad;
      const repelDist = CFG.repelDist;
      const repel2 = repelDist * repelDist;
      const decay = Math.pow(0.9, dt);

      for (const particle of particles) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        if (particle.x < -pad) particle.x = w + pad;
        else if (particle.x > w + pad) particle.x = -pad;

        if (particle.y < -pad) particle.y = h + pad;
        else if (particle.y > h + pad) particle.y = -pad;

        if (mouse.active) {
          const px = particle.x + particle.ox;
          const py = particle.y + particle.oy;
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < repel2 && distanceSquared > 0.0001) {
            const distance = Math.sqrt(distanceSquared);
            const falloff = 1 - distance / repelDist;
            const push = falloff * falloff * CFG.repelStrength * dt;

            particle.ox += (dx / distance) * push;
            particle.oy += (dy / distance) * push;
          }
        }

        particle.ox *= decay;
        particle.oy *= decay;
      }
    }

    function render() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      const linkDist = CFG.linkDist;
      const maxD2 = linkDist * linkDist;
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      const nodeCount = particles.length;

      for (let i = 0; i < nodeCount; i += 1) {
        const a = particles[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;

        for (let j = i + 1; j < nodeCount; j += 1) {
          const b = particles[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          const dx = ax - bx;
          const dy = ay - by;
          const d2 = dx * dx + dy * dy;

          if (d2 > maxD2) continue;

          const t = 1 - Math.sqrt(d2) / linkDist;
          const bucket = Math.min(BUCKETS - 1, (t * BUCKETS) | 0);
          paths[bucket].moveTo(ax, ay);
          paths[bucket].lineTo(bx, by);
        }
      }

      const [lr, lg, lb] = palette[0];
      ctx.lineWidth = 1;

      for (let i = 0; i < BUCKETS; i += 1) {
        const t = (i + 1) / BUCKETS;
        const alpha = Math.pow(t, 1.6) * (isLightTheme() ? 0.36 : 0.55);
        ctx.strokeStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
        ctx.stroke(paths[i]);
      }

      if (mouse.active) {
        const mouseLinkDist = CFG.mouseLinkDist;
        const mouseLinkDist2 = mouseLinkDist * mouseLinkDist;
        const [cr, cg, cb] = cursorRgb;

        for (const particle of particles) {
          const px = particle.x + particle.ox;
          const py = particle.y + particle.oy;
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;

          if (d2 > mouseLinkDist2) continue;

          const t = 1 - Math.sqrt(d2) / mouseLinkDist;
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(t * t * 0.42).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      for (const particle of particles) {
        const size = particle.size;
        ctx.drawImage(
          particleSprites[particle.color],
          particle.x + particle.ox - size / 2,
          particle.y + particle.oy - size / 2,
          size,
          size,
        );
      }

      const cores = new Path2D();
      for (const particle of particles) {
        const px = particle.x + particle.ox;
        const py = particle.y + particle.oy;
        cores.moveTo(px + 1.1, py);
        cores.arc(px, py, 1.1, 0, TAU);
      }

      ctx.fillStyle = isLightTheme()
        ? 'rgba(5, 80, 60, 0.62)'
        : 'rgba(220, 255, 240, 0.55)';
      ctx.fill(cores);
      ctx.globalCompositeOperation = 'source-over';
    }

    function frame(now) {
      if (!running) return;

      const delta = lastTime ? now - lastTime : 16.667;
      lastTime = now;
      const dt = Math.min(delta / 16.667, 3);

      update(dt);
      render();
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reducedMotion) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onResize() {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        resize();
      });
    }

    function onPointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
    }

    function applyMotionPreference() {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion) {
        stop();
        render();
      } else {
        start();
      }
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => applyMotionPreference();

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          applyTheme();
          break;
        }
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionChange);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(onMotionChange);
    }

    resize();
    applyTheme();
    applyMotionPreference();

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      themeObserver.disconnect();

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', onMotionChange);
      } else if (motionQuery.removeListener) {
        motionQuery.removeListener(onMotionChange);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="network-background"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
