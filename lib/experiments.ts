/**
 * TEMPORARY — preview-only experiment index. Not a feature.
 *
 * Lets us compare the gallery explorations from inside the real menu while we
 * decide which ships. Gated on VERCEL_ENV (Vercel builds every deployment,
 * previews included, with NODE_ENV=production — so NODE_ENV can't tell a
 * preview from production; VERCEL_ENV can). Shows on preview + local dev, never
 * in production. Delete this file, the "Experiments" block in Nav, and the
 * `env` block in next.config.ts before launch.
 */
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';
export const CURRENT_REF = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ?? '';

export type Experiment = { label: string; ref: string; url: string };

export const EXPERIMENTS: Experiment[] = [
  { label: 'Gallery A · Exhibition', ref: 'feat/premium-creative-director-redesign', url: 'https://prj0008-nov-presskit-git-feat-premiu-f07eb0-nicolasovs-projects.vercel.app' },
  { label: 'Gallery B · Contact Sheets', ref: 'exp/gallery-b', url: 'https://prj0008-nov-presskit-git-exp-gallery-b-nicolasovs-projects.vercel.app' },
  { label: 'Gallery C · Fullscreen', ref: 'exp/gallery-c', url: 'https://prj0008-nov-presskit-git-exp-gallery-c-nicolasovs-projects.vercel.app' },
  { label: 'Gallery D · Magazine', ref: 'exp/gallery-d', url: 'https://prj0008-nov-presskit-git-exp-gallery-d-nicolasovs-projects.vercel.app' },
  { label: 'Gallery E · Infinite Wall', ref: 'exp/gallery-e', url: 'https://prj0008-nov-presskit-git-exp-gallery-e-nicolasovs-projects.vercel.app' },
];
