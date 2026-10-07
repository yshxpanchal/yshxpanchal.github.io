import { ShieldCheck, Network, Terminal, Code2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { skillGroups } from '../data/portfolio';

const iconMap = { ShieldCheck, Network, Terminal, Code2 };

export default function Skills() {
  return (
    <section id="skills" className="section-full">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Skills</span>
          <h2 className="section-title mt-5">Technical toolkit &amp; capabilities.</h2>
          <p className="section-lead">
            Grouped by domain — from security operations and networking to Linux tooling and full-stack development.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] || ShieldCheck;
            return (
              <Reveal key={group.title} delay={i * 80}>
                <div className="card card-hover h-full p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      {group.items.length} skills
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
