import { BookOpen, Code2, ExternalLink, GitFork, Github, Star } from 'lucide-react';
import Reveal from '../components/Reveal';
import LinkButton from '../components/LinkButton';
import { githubConfig, githubData } from '../data/portfolio';

export default function GitHubActivity() {
  const repos = githubData.repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <section id="projects" className="section-full overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-emerald-400/[0.025] blur-3xl" />
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow"><Github size={12} /> Projects &amp; Open Source</span>
              <h2 className="section-title mt-5">Projects, directly from GitHub.</h2>
              <p className="section-lead">Public projects from my GitHub profile, saved with the portfolio so this section stays available without relying on live API requests.</p>
            </div>
            <LinkButton href={githubConfig.profileUrl} className="btn-ghost w-fit text-xs">
              View GitHub Profile <ExternalLink size={14} />
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            <Stat label="Public repos" value={githubData.profile.public_repos} icon={BookOpen} />
            <Stat label="Followers" value={githubData.profile.followers} icon={Github} />
            <Stat label="Following" value={githubData.profile.following} icon={Code2} />
            <Stat label="Account" value="Public" icon={Star} />
          </div>
        </Reveal>

        {repos.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {repos.map((repo, i) => (
              <Reveal key={repo.id} delay={i * 60}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover group block h-full p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-emerald-300">
                        <Code2 size={17} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-base font-semibold text-white">{repo.name}</h3>
                        <p className="mt-0.5 text-[11px] text-slate-500">{repo.language || 'Repository'}</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-slate-600 transition group-hover:text-emerald-300" />
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-400">
                    {repo.description || 'Public project repository by Yash Panchal.'}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                    <span className="inline-flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                    <span className="ml-auto font-mono uppercase tracking-wider">Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] text-emerald-300">
        <Icon size={15} />
      </span>
      <div>
        <p className="font-display text-lg font-semibold text-white">{value}</p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value));
}
