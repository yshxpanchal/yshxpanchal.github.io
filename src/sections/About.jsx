import { BadgeCheck, GraduationCap, Shield, Network } from 'lucide-react';
import Reveal from '../components/Reveal';
import { profile, aboutFacts } from '../data/portfolio';

const iconMap = [GraduationCap, Shield, BadgeCheck, Network];

export default function About() {
  return (
    <section id="about" className="section-full">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2 className="section-title mt-5">Focused on security, driven by curiosity.</h2>
          <p className="section-lead">A quick snapshot of who I am and what I'm working toward.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="card card-hover h-full p-6 sm:p-8">
              <div className="space-y-4 text-[15px] leading-relaxed text-slate-300">
                {profile.about.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="grid h-full grid-cols-2 gap-4">
              {aboutFacts.map((fact, i) => {
                const Icon = iconMap[i % iconMap.length];
                return (
                  <div key={fact.label} className="card card-hover flex flex-col justify-between p-5">
                    <Icon size={20} className="text-emerald-300" />
                    <div className="mt-6">
                      <p className="font-display text-base font-semibold text-white">{fact.label}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500">{fact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
