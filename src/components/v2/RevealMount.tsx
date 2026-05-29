'use client';

import { useEffect } from 'react';

/**
 * Headless client component that wires up scroll-driven reveal for any
 * descendant of a .bqv2 root tagged with the `.reveal` class.
 *
 * Drop one of these into a page (any depth — it queries the document)
 * and elements with `.reveal` fade + slide into place as they enter
 * the viewport. Respects prefers-reduced-motion. After 2.5s anything
 * still off-screen is force-revealed, so failed observers can't strand
 * content invisibly.
 */
export default function RevealMount() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.bqv2 .reveal'));

    if (reduce) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));

    const safety = window.setTimeout(() => {
      items.forEach((el) => el.classList.add('in'));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
