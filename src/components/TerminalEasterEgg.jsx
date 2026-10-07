import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Terminal, X } from 'lucide-react';
import { profile } from '../data/portfolio';
import { scrollToSection } from '../lib/scroll';
import usePresence from '../lib/usePresence';

const HELP = `Available commands:
  help        - show this help
  whoami      - print identity
  skills      - list core skills
  projects    - show project names
  contact     - show contact links
  clear       - clear the terminal
  exit        - close the terminal`;

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { mounted, state } = usePresence(open, 320);
  const [lines, setLines] = useState([
    { type: 'sys', text: "[ ok ] secure shell established — type 'help' to begin" },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const editing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable;
      if (e.key === '`' && !editing) { e.preventDefault(); setOpen((v) => !v); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const homeSection = document.getElementById('home');
    const onScroll = () => setShowBackToTop(homeSection ? homeSection.getBoundingClientRect().bottom <= 0 : window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const next = [...lines, { type: 'in', text: `$ ${raw}` }];

    switch (cmd) {
      case 'help': next.push({ type: 'out', text: HELP }); break;
      case 'whoami': next.push({ type: 'out', text: `${profile.name} — ${profile.headline}` }); break;
      case 'skills': next.push({ type: 'out', text: 'Cybersecurity · Networking · Linux Tools · Development' }); break;
      case 'projects': next.push({ type: 'out', text: 'GitHub repositories · live project data' }); break;
      case 'contact':
        next.push({ type: 'out', text: [
          `linkedin: ${profile.linkedin || 'add link'}`,
          `linkedin: ${profile.linkedin.replace('https://www.', '')}`,
          `github: ${profile.github || 'add link'}`,
        ].join('\n') });
        break;
      case 'clear': setLines([]); setInput(''); return;
      case 'exit': setOpen(false); setInput(''); return;
      default: next.push({ type: 'err', text: `command not found: ${cmd}` });
    }
    setLines(next);
    setInput('');
  };

  return (
    <>
      {showBackToTop && (
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="fixed bottom-20 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-panel/90 text-slate-300 shadow-lg backdrop-blur transition hover:border-emerald-400/40 hover:text-emerald-300 active:scale-95 sm:flex"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-emerald-400/30 bg-panel/90 text-emerald-300 shadow-[0_0_25px_-8px_rgba(0,224,164,0.8)] backdrop-blur transition hover:scale-105 hover:bg-emerald-400/10 active:scale-95 sm:flex"
        aria-label="Open terminal"
        title="Press ` to open terminal"
      >
        <Terminal size={18} />
      </button>

      {mounted && (
        <div
          className="ui-backdrop fixed inset-0 z-[80] flex items-end justify-end bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
          data-state={state}
        >
          <div
            className="ui-panel card flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden bg-bg/95 sm:h-[500px]"
            data-state={state}
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2">yash@portfolio:~</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white" aria-label="Close terminal">
                <X size={16} />
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
              {lines.map((l, i) => (
                <pre key={i} className={`whitespace-pre-wrap break-words ${
                  l.type === 'in' ? 'text-emerald-300'
                  : l.type === 'err' ? 'text-red-400'
                  : l.type === 'sys' ? 'text-slate-500'
                  : 'text-slate-300'
                }`}>{l.text}</pre>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); run(input); }}
              className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 font-mono text-sm"
            >
              <span className="text-emerald-400">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
