/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Mobile Chrome's Desktop Site mode commonly uses a ~980px layout viewport.
    // Keep the desktop layout above 900px so Desktop Site activates the real desktop UI.
    screens: {
      sm: '640px',
      md: '768px',
      lg: '900px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Theme-aware palette: every colour below is a CSS variable (see src/index.css),
      // so existing classes like text-white / text-slate-400 / bg-white/[0.02] flip
      // automatically between dark and light mode, including their opacity variants.
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        accent: '#00e0a4',
        accent2: '#3b82f6',
        white: 'rgb(var(--white) / <alpha-value>)',
        slate: {
          100: 'rgb(var(--slate-100) / <alpha-value>)',
          200: 'rgb(var(--slate-200) / <alpha-value>)',
          300: 'rgb(var(--slate-300) / <alpha-value>)',
          400: 'rgb(var(--slate-400) / <alpha-value>)',
          500: 'rgb(var(--slate-500) / <alpha-value>)',
          600: 'rgb(var(--slate-600) / <alpha-value>)',
        },
        emerald: {
          200: 'rgb(var(--emerald-200) / <alpha-value>)',
          300: 'rgb(var(--emerald-300) / <alpha-value>)',
          400: 'rgb(var(--emerald-400) / <alpha-value>)',
        },
        teal: {
          200: 'rgb(var(--teal-200) / <alpha-value>)',
          300: 'rgb(var(--teal-300) / <alpha-value>)',
        },
        blue: {
          300: 'rgb(var(--blue-300) / <alpha-value>)',
          400: 'rgb(var(--blue-400) / <alpha-value>)',
        },
      },
      // Softer, slightly longer defaults: every plain `transition` / `transition-colors` /
      // `transition-all` / `transition-opacity` in the project now eases gently instead of snapping.
      transitionDuration: { DEFAULT: '300ms' },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(.25,.8,.25,1)',
        soft: 'cubic-bezier(.22,1,.36,1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
        'grid-move': 'gridMove 24s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
