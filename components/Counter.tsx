'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Renders the final value on the server (no-JS, crawlers and screen readers get the real number),
 * then counts up from 0 the first time it scrolls into view. Motion's `animate` is loaded lazily,
 * only when a counter is about to animate, so it stays out of the critical bundle.
 */
export function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only arm if it starts below the fold, so a visible number never flashes to 0.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        import('motion').then(({ animate }) => {
          const controls = animate(0, value, {
            duration: 1.1,
            ease: [0.25, 1, 0.5, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
          });
          stop = () => controls.stop();
        });
      },
      { rootMargin: '200px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
