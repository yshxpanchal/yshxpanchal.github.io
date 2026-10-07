import { useState } from 'react';
import { Award, ExternalLink, Eye } from 'lucide-react';
import Reveal from '../components/Reveal';
import CertificateModal from '../components/CertificateModal';
import LinkButton from '../components/LinkButton';
import { certifications } from '../data/portfolio';

export default function Certifications() {
  const [selected, setSelected] = useState(null);
  const visibleCertificates = certifications.filter((cert) => !cert.placeholder);

  return (
    <section id="certifications" className="section-full">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">Certifications</span>
          <h2 className="section-title mt-5">Verified learning &amp; credentials.</h2>
          <p className="section-lead">Industry-recognized programs and hands-on training.</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleCertificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 80}>
              <div className="card card-hover group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300">
                    <Award size={20} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{cert.date || 'Add date'}</span>
                </div>

                <h3 className="mt-5 font-display text-base font-semibold leading-snug text-white">{cert.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-emerald-300/80">{cert.org}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{cert.description}</p>

                <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <button
                    onClick={() => setSelected(cert)}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 transition hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                  >
                    <Eye size={13} /> View Details
                  </button>
                  <LinkButton href={cert.url} className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400 transition hover:text-slate-200">
                    <ExternalLink size={13} />
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
