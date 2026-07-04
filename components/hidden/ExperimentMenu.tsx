/**
 * TEMPORARY — internal preview navigation. Not a feature.
 *
 * Lets us hop between the experimental gallery previews without typing URLs
 * while we decide which one ships. It renders ONLY on preview deployments and
 * local dev — never in production (gated on VERCEL_ENV, because Vercel builds
 * every deployment, previews included, with NODE_ENV=production, so NODE_ENV
 * cannot tell them apart). Delete this file, its mount in layout.tsx, and the
 * `env` block in next.config.ts before launch.
 */

const EXPERIMENTS = [
  { label: 'Gallery A · Exhibition', ref: 'feat/premium-creative-director-redesign', url: 'https://prj0008-nov-presskit-git-feat-premiu-f07eb0-nicolasovs-projects.vercel.app' },
  { label: 'Gallery B · Contact Sheets', ref: 'exp/gallery-b', url: 'https://prj0008-nov-presskit-git-exp-gallery-b-nicolasovs-projects.vercel.app' },
  { label: 'Gallery C · Fullscreen', ref: 'exp/gallery-c', url: 'https://prj0008-nov-presskit-git-exp-gallery-c-nicolasovs-projects.vercel.app' },
  { label: 'Gallery D · Magazine', ref: 'exp/gallery-d', url: 'https://prj0008-nov-presskit-git-exp-gallery-d-nicolasovs-projects.vercel.app' },
  { label: 'Gallery E · Infinite Wall', ref: 'exp/gallery-e', url: 'https://prj0008-nov-presskit-git-exp-gallery-e-nicolasovs-projects.vercel.app' },
];

export default function ExperimentMenu() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;

  const current = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ?? '';

  return (
    <nav
      aria-label="Preview navigation (temporary)"
      className="fixed bottom-[4.5rem] left-3 z-[100] flex flex-col gap-[3px] font-mono text-[10px] leading-[1.6] tracking-[0.12em] opacity-30 transition-opacity duration-200 ease-linear hover:opacity-95"
    >
      <span className="mb-1 uppercase text-ink/40">Preview · gallery</span>
      {EXPERIMENTS.map((e) => {
        const active = e.ref === current;
        return (
          <a
            key={e.ref}
            href={e.url}
            className={`no-underline ${active ? 'text-red-bright' : 'text-ink/70 hover:text-ink'}`}
          >
            <span className="text-ink/30">{active ? '●' : '○'}</span> {e.label}
          </a>
        );
      })}
    </nav>
  );
}
