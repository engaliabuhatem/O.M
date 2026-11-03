import { cn } from '@/lib/cn';

/** Inline FCOM mark (building, set-square, base slab). Rebuilt from the profile cover. */
export function LogoMark({ mono = false, className }: { mono?: boolean; className?: string }) {
  const line = mono ? '#FFFFFF' : '#2B2B2B';
  const fill = mono ? 'none' : '#FFFFFF';
  const accent = mono ? '#FFFFFF' : '#00799E';
  return (
    <svg viewBox="0 0 120 72" className={cn('block', className)} aria-hidden="true" focusable="false">
      <g fill="none" stroke={line} strokeWidth="1.1">
        <path d="M12 40h6v20h-6z" fill={fill} />
        <path d="M13.5 41v19M15 41v19M16.5 41v19" strokeWidth=".6" />
        <path d="M26 52h66v8H26z" fill={fill} />
        <path
          d="M28 53v7M30.5 53v7M33 53v7M35.5 53v7M38 53v7M40.5 53v7M43 53v7M45.5 53v7M48 53v7M50.5 53v7M53 53v7M55.5 53v7M58 53v7M60.5 53v7M63 53v7M65.5 53v7M68 53v7M70.5 53v7M73 53v7M75.5 53v7M78 53v7M80.5 53v7M83 53v7M85.5 53v7M88 53v7"
          strokeWidth=".55"
        />
        <path d="M20 46h74v6H20z" fill={fill} />
        <path d="M18 14h24v32H18z" fill={fill} />
        <path d="M22 14a8 6 0 0 1 16 0" />
        <path
          d="M18 17.2h24M18 20.4h24M18 23.6h24M18 26.8h24M18 30h24M18 33.2h24M18 36.4h24M18 39.6h24M18 42.8h24"
          strokeWidth=".9"
        />
      </g>
      <path fill={accent} fillRule="evenodd" d="M44 10l42 34H44zm6.5 13.5v14.5h17.8z" />
      <rect x="6" y="61" width="96" height="5" rx="1" fill={accent} />
    </svg>
  );
}

export function Logo({ mono = false, compact = false }: { mono?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark mono={mono} className={cn('h-auto transition-[width] duration-200', compact ? 'w-11 md:w-12' : 'w-11 md:w-14')} />
      <span className="flex flex-col leading-none" dir="ltr">
        <span className={cn('font-display text-lg whitespace-nowrap font-extrabold tracking-wide md:text-xl', mono ? 'text-white' : 'text-brand-deep')}>
          First Canadian
        </span>{' '}
        <span className={cn('mt-1 text-xs font-semibold tracking-[0.2em]', mono ? 'text-steel-light' : 'text-steel')}>
          O.M-LTD
        </span>
      </span>
    </span>
  );
}
