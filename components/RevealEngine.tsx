'use client';

import { useEffect } from 'react';
import { MOTION } from '@/lib/motion';

/**
 * Drives the crossfade motion contract ([data-fx] / .in from globals.css).
 * Elements fade in once, staggered, the first time they enter the viewport.
 */
export default function RevealEngine() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-fx]'));
    if (!els.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const index = Number(el.dataset.fxIndex ?? 0);
          el.style.transitionDelay = `${index * MOTION.stagger * 1000}ms`;
          el.classList.add('in');
          observer.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => observer.observe(el));

    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.9) {
        el.classList.add('in');
        observer.unobserve(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
