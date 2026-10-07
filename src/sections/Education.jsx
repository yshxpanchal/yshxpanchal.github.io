import { Terminal } from 'lucide-react';
import Reveal from '../components/Reveal';
import { education } from '../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="section-full">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Education</span>
          <h2 className="section-title mt-5">Academic timeline.</h2>
          <p className="section-lead">Formal education and specialized cybersecurity training.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <ol className="relative border-l border-white/[0.08] pl-6">
              {education.map((item, i) => (
                <li key={i} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1 flex h-3 w-3 items-center justify-center rounded-full border border-emerald-400/40 bg-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(0,224,164,0.9)]" />
                  </span>
                  <div className="card card-hover p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-md border border-emerald-400/25 bg-emerald-400/[0.06] px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
                        {item.year}
                      </span>
                      {item.meta && (
                        <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{item.meta}</span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.place}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <div className="card card-hover h-full p-6">
              <div className="flex items-center gap-2 text-emerald-300">
                <Terminal size={16} />
                <span className="font-mono text-xs uppercase tracking-widest">Training</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">Cybersecurity Trainee</h3>
              <p className="mt-1 text-sm text-slate-400">(SAKSHAM) Adani Skill Developent Center</p>
              <p className="mt-5 text-sm text-slate-400">
                Practical, hands-on training with a focus on security operations, networking, and modern defensive tooling.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
