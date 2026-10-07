# Portfolio Code Review — Improvements Applied

## Reliability
- Repaired the incomplete generator output caused by the missing final README heredoc.
- Removed broken placeholder URLs from rendered links and replaced them with safe disabled states.
- Added a reusable `LinkButton` component for URL-aware external/internal links.
- Added a Replit run configuration.
- Added the missing social-preview image referenced by the HTML metadata.

## UX
- Added GitHub to the primary navigation.
- Added project-filter accessibility with `aria-pressed` and live-result updates.
- Improved certificate details and prevented empty credential links from looking functional.
- Improved contact form behavior: it now prepares a real `mailto:` message instead of displaying a fake "queued" success state.
- Resume controls now clearly indicate when the resume PDF has not been configured.

## Accessibility
- Added dialog semantics to the certificate modal.
- Added better labels and focus-visible states.
- Added reduced-motion handling both for reveal animations and global CSS animation/scroll behavior.
- Avoided the terminal keyboard shortcut triggering while the user is typing in an input/textarea.

## Content hygiene
- Kept unknown email, GitHub profile, certificate IDs, certificate dates, repository URLs, and training details empty instead of fabricating values.
- Removed empty training placeholder blocks from the rendered experience section.
- Updated achievement numbers to reflect the six listed projects and two named certifications.

## Validation
- All JavaScript/JSX source files pass TypeScript JSX transpilation syntax checks.
- All relative source imports resolve to existing files.
- Favicon and Open Graph image assets are present.

## Environment note
Dependency installation could not be completed in this environment because the npm registry request timed out. The project remains configured for `npm install && npm run dev` in Replit, where dependencies can be installed normally.

## Round 2 fixes
- **Scroll / lower section peeking:** every section now fills exactly one screen (`.section-full`, 100svh), so the next section no longer shows underneath.
- **Double-click on nav button:** new `src/lib/scroll.js` re-measures after the scroll settles and corrects any drift (caused by content above changing height, e.g. GitHub repos loading), so one click lands exactly. Removed CSS `scroll-behavior: smooth` so it can't fight the script.
- **Contact:** removed email everywhere (contact section, footer, hero, terminal). New LinkedIn-first contact panel with topic chips, editable message, and "Copy & open LinkedIn".
- **Footer:** redesigned with quick links, LinkedIn/GitHub icons, and back-to-top.

## Round 3 — desktop view + dark/light mode
- **Desktop view on phones:** the viewport tag is now set by an inline script in `index.html` (runs before first paint). When the browser is in "Desktop site" mode (detected: touch + small screen + UA without "Mobile"), the page asks for a 1280px layout viewport, so the real desktop layout renders instead of staying at phone width.
- **Dark / light mode:** animated sun↔moon button in the mobile menu and desktop navbar. Telegram-style wipe: switching to light grows the new theme outward from the toggle; switching back to dark shrinks the light theme inward into it (View Transitions, with a solid-layer fallback for other browsers). Reduced-motion users get an instant switch. Choice is remembered; dark stays the default.
- **How theming works:** colours are CSS variables in `src/index.css` (`:root` = dark, `:root[data-theme='light']` = light), wired into `tailwind.config.js` for `white`, `slate-100…600`, `emerald-200/300/400`, `teal-200/300`, `blue-300/400`, `bg`, `panel`. Existing classes flip automatically, so new components only need those colours.
- The hero's 3D topology background is inverted to dark-on-white in light mode.
- Desktop nav tightened so all 7 links fit at ~900–1100px; Resume button hides between 900–1279px to make room.

## Round 4 — smoothness pass (no style changes)
Only timing, easing, and hand-offs were changed; every animation keeps its existing look.
- **Global softness (`tailwind.config.js`):** default `transition` is now 300ms with a gentle ease-out curve (was 150ms). Every hover/focus/colour fade in the project inherits it. New `ease-soft` utility for slides.
- **Section scrolling (`src/lib/scroll.js`):** replaced the browser's fast, near-linear smooth-scroll with an eased animation (soft start, soft landing, duration scales with distance). It re-measures the target every frame, so it still lands exactly in one click; any wheel/touch/key cancels it.
- **Scroll reveals:** longer, softer curve; `will-change` is released once an entrance finishes (`Reveal.jsx`, `.is-done`) so finished blocks stop holding GPU layers.
- **Loader:** its fade-out was never visible (it was unmounted the instant the fade began). It is now unmounted after the 0.75s fade, and the hero text starts its entrance as the loader dissolves.
- **Overlays:** certificate modal and terminal now fade/rise in and out (`src/lib/usePresence.js`) instead of popping.
- **Navbar:** active underline fades/grows instead of popping; menu/close icon cross-fades; mobile drawer slides over 500ms.
- **Scroll progress bar:** updates once per animation frame straight on the DOM (no React re-render per scroll event).
- **Hero 3D field:** rotation/pulse now use real elapsed time (identical speed on 60/90/120Hz screens, no stutter on dropped frames) and the canvas fades in once loaded.
- Untouched on purpose: the theme-switch wipe (`src/lib/theme.js` and its CSS).

## Round 6 — glitch-free light ↔ dark cross-fade
- **Root cause 1:** both page layers faded with normal blending, so mid-fade the combined opacity dipped below 100% (visible flash on the navbar and boxes). Now the old page stays opaque and only the new page fades in on top (`theme-fade-in`, 600ms, ease-in-out, fill-mode `both`) — an exact old→new mix every frame.
- **Root cause 2:** the navbar, cards and chips run their own 300–500ms colour transitions, which kept fading *inside* the new view and after the cross-fade ended. `html.theme-vt` (set in `src/lib/theme.js` for the duration of the switch) now freezes all other transitions; the sun/moon icons are excluded via `data-theme-icon` so their swap still animates.
