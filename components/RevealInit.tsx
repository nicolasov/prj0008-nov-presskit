'use client';

import { useEffect } from 'react';

export default function RevealInit() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduce) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let i = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = i * 70;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('revealed');
            observer.unobserve(el);
            i++;
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    );

    els.forEach((el) => observer.observe(el));

    // Immediately reveal elements already in viewport
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.95) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });

    // Failsafe: ensure nothing stays hidden after 1.8s
    const failsafe = setTimeout(() => {
      els.forEach((el) => {
        if (!el.classList.contains('revealed')) el.classList.add('revealed');
      });
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return null;
}
