import { useEffect, useState } from 'react';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import BrandIcon from '../components/BrandIcon';
import { profile } from '../data/portfolio';

const EMAIL = profile.email;
const LINKEDIN_HANDLE = new URL(profile.linkedin).pathname.split('/').filter(Boolean).at(-1);
const GITHUB_HANDLE = new URL(profile.github).pathname.split('/').filter(Boolean).at(-1);

function useLocalTime(timeZone = 'Asia/Kolkata') {
  const read = () =>
    new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone,
    });
  const [time, setTime] = useState(read);

  useEffect(() => {
    const id = setInterval(() => setTime(read()), 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const TILE =
  'relative flex h-full flex-col justify-between gap-[18px] overflow-hidden rounded-[18px] ' +
  'border border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-white/[0.012] p-[22px] ' +
  'transition duration-300 md:min-h-[240px]';
const TILE_LINK = `${TILE} group hover:-translate-y-1 hover:border-emerald-400/35`;
const TILE_ACCENT =
  'border-emerald-400/30 bg-gradient-to-br from-emerald-400/[0.10] to-emerald-400/[0.025]';
const ICO =
  'grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300';
const ICO_PLAIN = 'border-white/10 bg-white/[0.04] text-slate-300';
const LABEL = 'block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500';
const VALUE =
  'block truncate text-[15.5px] font-semibold text-slate-100 transition group-hover:text-white';
const NOTE = 'block text-[12.5px] text-slate-400';

export default function Contact() {
  const time = useLocalTime();

  const channels = [
    {
      name: 'LinkedIn',
      label: 'LinkedIn',
      value: LINKEDIN_HANDLE,
      note: 'Best way to reach me',
      href: profile.linkedin,
      accent: true,
      badge: 'Preferred',
    },
    {
      name: 'Gmail',
      label: 'Gmail',
      value: EMAIL,
      note: 'Send me an email',
      href: `mailto:${EMAIL}`,
    },
    {
      name: 'GitHub',
      label: 'GitHub',
      value: GITHUB_HANDLE,
      note: 'Code & projects',
      href: profile.github,
      plain: true,
    },
  ];

  return (
    <section id="contact" className="section-full !pb-1 !pt-16 sm:!pt-20">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mt-4">Let&apos;s connect and build something secure.</h2>
          <p className="section-lead">
            Open to internships, SOC analyst roles, and cybersecurity collaborations. Pick whichever
            way is easiest for you.
          </p>
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-[18px]">
          {channels.map(({ name, label, value, note, href, accent, badge, plain }) => (
            <Reveal key={label} className="h-full md:col-span-2">
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className={`${TILE_LINK} ${accent ? TILE_ACCENT : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`${ICO} ${plain ? ICO_PLAIN : ''}`}>
                    <BrandIcon name={name} size={19} />
                  </span>
                  <span className="flex items-center gap-2.5">
                    {badge && (
                      <span className="whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-400/[0.12] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-emerald-300">
                        {badge}
                      </span>
                    )}
                    <ArrowUpRight
                      size={17}
                      className="text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    />
                  </span>
                </div>
                <div>
                  <span className={LABEL}>{label}</span>
                  <span className={VALUE}>{value}</span>
                  <span className={NOTE}>{note}</span>
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal className="h-full md:col-span-3">
            <div className={TILE}>
              <div className="flex items-center justify-between">
                <span className={ICO}>
                  <MapPin size={18} />
                </span>
              </div>
              <div>
                <span className={LABEL}>Location</span>
                <span className={VALUE}>{profile.location}</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full md:col-span-3">
            <div className={TILE}>
              <div className="flex items-center justify-between">
                <span className={ICO}>
                  <Clock size={18} />
                </span>
              </div>
              <div>
                <span className={LABEL}>Local time</span>
                <span className={VALUE}>{time} IST</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-center border-t border-white/[0.06] pt-5">
          <p className="font-mono text-xs text-slate-500">© 2026 Made by {profile.name}.</p>
        </div>
      </div>
    </section>
  );
}
