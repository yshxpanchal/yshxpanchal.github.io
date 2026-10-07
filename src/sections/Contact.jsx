import { useEffect, useState } from 'react';
import { MapPin, Clock, Copy, Check, ArrowUpRight, Briefcase, ShieldCheck, Users, MessageCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import BrandIcon from '../components/BrandIcon';
import { profile } from '../data/portfolio';

const topics = [
  {
    id: 'internship',
    label: 'Internship',
    icon: Briefcase,
    text: (n) => `Hi Yash, I'm ${n}. I came across your portfolio and would like to talk with you about an internship opportunity.`,
  },
  {
    id: 'soc',
    label: 'SOC Analyst role',
    icon: ShieldCheck,
    text: (n) => `Hi Yash, I'm ${n}. We have a SOC / security analyst opening and your profile looks like a great fit. Would you be open to a quick chat?`,
  },
  {
    id: 'collab',
    label: 'Collaboration',
    icon: Users,
    text: (n) => `Hi Yash, I'm ${n}. I liked your security and networking projects on GitHub and would love to collaborate on something.`,
  },
  {
    id: 'hello',
    label: 'Just saying hi',
    icon: MessageCircle,
    text: (n) => `Hi Yash, I'm ${n}. I visited your portfolio and wanted to connect.`,
  },
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function useLocalTime(timeZone = 'Asia/Kolkata') {
  const read = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone });
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Contact() {
  const time = useLocalTime();
  const [topicId, setTopicId] = useState('internship');
  const [name, setName] = useState('');
  const [custom, setCustom] = useState(null); // user-edited message; null = use template
  const [status, setStatus] = useState('');

  const topic = topics.find((t) => t.id === topicId);
  const message = custom ?? topic.text(name.trim() || '[your name]');

  const pickTopic = (id) => {
    setTopicId(id);
    setCustom(null);
    setStatus('');
  };

  const copyMessage = async () => {
    const ok = await copyText(message);
    setStatus(ok ? 'Message copied to clipboard.' : 'Could not copy automatically. Select the text and copy it manually.');
  };

  const sendViaLinkedIn = async () => {
    const ok = await copyText(message);
    setStatus(ok ? 'Message copied. Paste it into the LinkedIn chat that just opened.' : 'LinkedIn opened. Copy your message from the box and paste it in the chat.');
    window.open(profile.linkedin, '_blank', 'noopener,noreferrer');
  };

  const channels = [
    { name: 'Gmail', label: 'Gmail', value: profile.email, note: 'Send me an email', href: `mailto:${profile.email}` },
    { name: 'LinkedIn', label: 'LinkedIn', value: 'yash2k5', note: 'Best way to reach me', href: profile.linkedin, primary: true },
    { name: 'GitHub', label: 'GitHub', value: profile.github.replace('https://github.com/', ''), note: 'Code & projects', href: profile.github },
  ];

  const socialLinks = [
    profile.email && { name: 'Gmail', href: `mailto:${profile.email}`, label: 'Email' },
    profile.linkedin && { name: 'LinkedIn', href: profile.linkedin, label: 'LinkedIn' },
    profile.github && { name: 'GitHub', href: profile.github, label: 'GitHub' },
  ].filter(Boolean);

  return (
    <section id="contact" className="section-full !pb-1 !pt-16 sm:!pt-20">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title mt-4">Let&apos;s connect and build something secure.</h2>
          <p className="section-lead">Open to internships, SOC analyst roles, and cybersecurity collaborations.</p>
        </Reveal>

        <div className="mt-4 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="space-y-3">
              {channels.map(({ name, label, value, note, href, primary }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`card card-hover group flex items-center gap-4 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    primary ? 'border-emerald-400/30 bg-emerald-400/[0.04]' : ''
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300">
                    <BrandIcon name={name} size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{label}</p>
                    <p className="truncate text-sm text-slate-100">{value}</p>
                    <p className="text-xs text-slate-500">{note}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-300" />
                </a>
              ))}

              <div className="grid grid-cols-2 gap-3">
                <div className="card p-4">
                  <MapPin size={16} className="text-emerald-300" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">Location</p>
                  <p className="text-sm text-slate-200">{profile.location}</p>
                </div>
                <div className="card p-4">
                  <Clock size={16} className="text-emerald-300" />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">Local time</p>
                  <p className="text-sm text-slate-200">{time} IST</p>
                </div>
              </div>

              <div className="card flex items-center gap-3 p-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="font-mono text-xs text-slate-400">status: <span className="text-emerald-300">open to opportunities</span></p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="card relative overflow-hidden p-3 sm:p-6">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">secure-channel@yash</span>
                </div>

                <p className="mt-3 font-mono text-[13px] text-slate-400"><span className="text-emerald-400">$</span> ./connect --topic</p>

                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Message topic">
                  {topics.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => pickTopic(id)}
                      aria-pressed={topicId === id}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                        topicId === id
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-emerald-400/30 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={13} /> {label}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Your name</label>
                  <input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex from Acme Security"
                    className="mt-2 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-emerald-400/40 focus:bg-white/[0.03]"
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Message (editable)</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setCustom(e.target.value)}
                    className="mt-2 w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm leading-relaxed text-slate-100 outline-none transition focus:border-emerald-400/40 focus:bg-white/[0.03]"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={sendViaLinkedIn} className="btn-primary text-xs">
                    <BrandIcon name="LinkedIn" size={14} /> Copy &amp; open LinkedIn
                  </button>
                  <button type="button" onClick={copyMessage} className="btn-ghost text-xs">
                    {status.startsWith('Message copied to') ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />} Copy message
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-7 flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-center">
          <p className="text-center font-mono text-xs text-slate-500 sm:text-left">
            © 2026 Made by {profile.name}.
          </p>
          <div className="flex items-center justify-center sm:justify-center">
            
          </div>
        </div>
      </div>
    </section>
  );
}
