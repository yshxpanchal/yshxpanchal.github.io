import { useEffect, useRef } from 'react';
import { X, ExternalLink, Award } from 'lucide-react';
import LinkButton from './LinkButton';
import usePresence from '../lib/usePresence';

export default function CertificateModal({ certificate, onClose }) {
  // Keep the last certificate around so the content stays visible while the exit animation plays.
  const lastRef = useRef(certificate);
  if (certificate) lastRef.current = certificate;
  const shown = certificate || lastRef.current;
  const { mounted, state } = usePresence(Boolean(certificate), 320);

  useEffect(() => {
    if (!certificate) return undefined;

    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!mounted || !shown) return null;

  const hasCredential = Boolean(shown.url && !shown.placeholder);

  return (
    <div
      className="ui-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      data-state={state}
      onClick={onClose}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui-panel card relative w-full max-w-lg overflow-hidden p-6 sm:p-8"
        data-state={state}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-title"
      >
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md border border-white/10 bg-white/[0.03] p-1.5 text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
          aria-label="Close certificate dialog"
        >
          <X size={16} />
        </button>

        <div className="relative">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300">
            <Award size={22} />
          </div>
          <h3 id="certificate-title" className="font-display text-xl font-semibold text-white">{shown.name}</h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-emerald-300">{shown.org}</p>
          <p className="mt-4 text-sm text-slate-300">{shown.description}</p>

          <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Date</dt>
              <dd className="mt-1 text-sm text-slate-200">{shown.date || 'Add date'}</dd>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Credential ID</dt>
              <dd className="mt-1 break-all text-sm text-slate-200">{shown.credentialId || 'Add credential ID'}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {hasCredential ? (
              <LinkButton href={shown.url} className="btn-primary text-xs">
                <ExternalLink size={14} /> View Credential
              </LinkButton>
            ) : (
              <span className="btn-ghost cursor-not-allowed text-xs opacity-50">
                Credential link not added
              </span>
            )}
            <button onClick={onClose} className="btn-ghost text-xs">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
