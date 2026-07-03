import type { ReactNode } from 'react';

/**
 * Exactly one accent word per heading — a reading guide, never
 * decoration. See docs/03-design-system.md.
 */
export default function Accent({ children }: { children: ReactNode }) {
  return <span className="text-red-bright">{children}</span>;
}
