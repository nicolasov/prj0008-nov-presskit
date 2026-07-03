'use client';

import { useEffect, useRef } from 'react';

/**
 * An elegant editorial side panel — not a modal, not a popup. Longer
 * material (menu, biography, rider) lives here rather than on the page.
 * Slides in from the right over a near-invisible scrim; minimal motion.
 * Esc closes, focus moves in and returns to the opener, body scroll locks.
 */
export default function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => panelRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.clearTimeout(id);
      (openerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* scrim — a quiet darkening, never a bright overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-bg-0/70 transition-opacity duration-[700ms] ease-fade ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-[min(440px,88vw)] flex-col border-l border-line bg-bg-1 outline-none transition-transform duration-[800ms] ease-fade ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-[clamp(24px,4vw,40px)] py-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">{title}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="border-none bg-transparent p-1 font-mono text-[16px] leading-none text-ink/55 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-red-bright focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[clamp(24px,4vw,40px)] py-8">{children}</div>
      </div>
    </div>
  );
}
