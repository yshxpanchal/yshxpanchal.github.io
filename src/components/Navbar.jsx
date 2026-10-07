import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Download, Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio';
import { scrollToSection, isAutoScrolling } from '../lib/scroll';
import BrandIcon from './BrandIcon';
import { ThemeSwitch } from './ui/theme-switch-button';

export default function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && !isAutoScrolling() && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onNavigationComplete = (event) => setActive(event.detail.id);
    window.addEventListener('portfolio:section-navigation-complete', onNavigationComplete);
    return () => window.removeEventListener('portfolio:section-navigation-complete', onNavigationComplete);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const go = (id, keepMenuOpen = false) => {
    if (!keepMenuOpen) setOpen(false);
    setActive(id);
    scrollToSection(id);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
        scrolled ? 'navbar-scrolled border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}>
        <nav className="container-x flex h-16 items-center justify-between">
        <button onClick={() => go('home')} aria-label="Go to homepage" className="group flex items-center text-slate-200">
          <img src="/navbar-logo.png" alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => go(link.id)}
                className={`relative rounded-md px-2.5 py-2 text-[13px] font-medium transition xl:px-3 ${
                  active === link.id ? 'text-emerald-300' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-2.5 -bottom-[1px] h-[2px] origin-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition duration-500 ease-soft xl:inset-x-3 ${
                    active === link.id ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} download className="btn-ghost hidden text-xs sm:inline-flex">Resume</a>
          ) : (
            <span className="btn-ghost hidden cursor-not-allowed text-xs opacity-50 sm:inline-flex">Resume</span>
          )}
          <ThemeSwitch className="hidden lg:flex" />
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-300 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <span className="relative grid h-[18px] w-[18px] place-items-center">
              <Menu size={18} className={`absolute transition duration-300 ease-soft ${open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X size={18} className={`absolute transition duration-300 ease-soft ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`} />
            </span>
          </button>
        </div>
        </nav>
      </header>

    {createPortal(
      <>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close navigation menu"
          aria-hidden={!open}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
            open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        <aside
          id="mobile-navigation"
          aria-hidden={!open}
          inert={open ? undefined : ''}
          className={`fixed bottom-0 right-0 top-0 z-[75] flex w-[82vw] max-w-[340px] flex-col overflow-y-auto border-l border-white/[0.07] bg-panel transition-[transform,box-shadow] duration-500 ease-soft lg:hidden ${
            open ? 'translate-x-0 shadow-[-12px_0_32px_rgba(0,0,0,0.28)]' : 'translate-x-full shadow-none'
          }`}
        >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,224,164,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,224,164,0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_80%)]" />
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-[18px] py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Menu</span>
          <div className="flex items-center gap-2">
            <ThemeSwitch className="h-8 w-8 rounded-md border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-emerald-400/35 hover:text-emerald-300" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-8 w-8 place-items-center rounded-md border border-white/[0.08] bg-white/[0.02] text-slate-300 transition hover:border-emerald-400/35 hover:text-emerald-300"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile navigation" className="relative flex flex-col gap-0.5 px-2 py-2.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`group relative flex items-center justify-between rounded-lg px-3.5 py-3 text-left text-sm font-medium transition ${
                active === link.id
                  ? 'bg-emerald-400/[0.06] text-emerald-300 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded before:bg-emerald-400 before:shadow-[0_0_8px_rgba(0,224,164,0.8)]'
                  : 'text-slate-300 hover:bg-white/[0.03] hover:text-emerald-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mx-[18px] h-px bg-white/[0.06]" />

        <div className="relative mt-auto flex flex-col gap-3.5 border-t border-white/[0.06] px-[18px] pb-[22px] pt-4">
          <div className="flex gap-2">
            {[
              profile.linkedin && { name: 'LinkedIn', href: profile.linkedin },
              profile.github && { name: 'GitHub', href: profile.github },
              profile.email && { name: 'Gmail', href: `mailto:${profile.email}` },
            ].filter(Boolean).map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={name}
                className="grid h-[38px] flex-1 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-slate-400 transition hover:border-emerald-400/35 hover:bg-white/[0.04]"
              >
                <BrandIcon name={name} size={16} />
              </a>
            ))}
          </div>

          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} download className="btn-primary h-[42px] w-full text-[13px]">
              <Download size={14} /> Download Resume
            </a>
          ) : (
            <span className="btn-primary h-[42px] w-full cursor-not-allowed text-[13px] opacity-50" aria-disabled="true">
              <Download size={14} /> Resume unavailable
            </span>
          )}
        </div>
        </aside>
      </>,
      document.body
    )}
    </>
  );
}
