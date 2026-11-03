'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react';

/**
 * Fade/slide-in once when scrolled into view: 240ms ease-out, transform + opacity only.
 * Zero-dependency (IntersectionObserver + CSS) so it adds nothing to the critical bundle.
 * Content is visible without JS and with prefers-reduced-motion (see .reveal in globals.css).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only animate things that start below the fold; anything already visible stays put.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = 'in';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
