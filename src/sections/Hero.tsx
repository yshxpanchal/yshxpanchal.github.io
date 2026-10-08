import { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, MessageCircle, ShieldCheck, Cpu, Activity } from 'lucide-react';
import { profile } from '../data/portfolio';
import BrandIcon from '../components/BrandIcon';
import { scrollToSection } from '../lib/scroll';
import NetworkBackground from '../components/NetworkBackground';

function useTypewriter(words: readonly string[], typeSpeed = 70, deleteSpeed = 35, pause = 1600): string {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const scrollTo = (id: string) => scrollToSection(id);

  return (
    <section
      id="home"
      className="section-full relative isolate overflow-hidden hero-network-section text-slate-200"
    >
      {/* Network is intentionally scoped to the hero only. No fixed/full-page layer. */}
      <NetworkBackground />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="hero-copy animate-[hero-in_1.1s_cubic-bezier(.22,1,.36,1)_both] [animation-delay:1.55s] lg:col-span-7">
            <div className="eyebrow">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Available for opportunities
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {profile.name.split(' ')[0]}{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent glow-text">
                {profile.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-2 font-mono text-sm text-emerald-300 sm:text-base">
              <span className="text-slate-500">&gt;</span>
              <span>{typed}</span>
              <span className="inline-block h-4 w-[2px] animate-blink bg-emerald-400 align-middle" />
            </div>

            <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                View Projects <ArrowRight size={16} />
              </button>
              {profile.resumeUrl ? (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <ExternalLink size={16} /> View Resume
                </a>
              ) : (
                <button onClick={() => scrollTo('contact')} className="btn-ghost">
                  <MessageCircle size={16} /> Contact Me
                </button>
              )}
            </div>

            <div className="mt-9 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">connect</span>
              <span className="h-px w-8 bg-white/10" />
              {[
                profile.email && { name: 'Gmail', href: `mailto:${profile.email}`, label: 'Gmail' },
                profile.linkedin && { name: 'LinkedIn', href: profile.linkedin, label: 'LinkedIn' },
                profile.github && { name: 'GitHub', href: profile.github, label: 'GitHub' },
              ].filter(Boolean).map(({ name, href, label }) => (
                <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5 text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300"
                  aria-label={label}>
                  <BrandIcon name={name} size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5" aria-hidden="true">
            <div className="relative min-h-[340px]">
              <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-tr from-emerald-400/[0.08] via-transparent to-blue-400/[0.06] blur-2xl" />
              <div className="card relative overflow-hidden p-5 sm:p-6 opacity-75 backdrop-blur-sm">
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="relative">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">secure@node-01</span>
                  </div>

                  <div className="mt-4 space-y-2 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                    <p className="text-slate-500"><span className="text-emerald-400">$</span> init --profile</p>
                    <p className="text-slate-300"><span className="text-slate-500">name:</span> {profile.name}</p>
                    <p className="text-slate-300"><span className="text-slate-500">role:</span> Cybersecurity Trainee</p>
                    <p className="text-slate-300"><span className="text-slate-500">focus:</span> SOC · Detection · Networking</p>
                    <p className="text-emerald-300/90">
                      <span className="text-slate-500">status:</span> monitoring
                      <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      { icon: ShieldCheck, label: 'SecOps' },
                      { icon: Cpu, label: 'Networking' },
                      { icon: Activity, label: 'Detection' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] py-3 text-[10px] uppercase tracking-widest text-slate-400">
                        <Icon size={16} className="text-emerald-300" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
