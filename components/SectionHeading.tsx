import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  number: string;
  label: string;
  title?: string;
  lead?: string;
  /** dark = for charcoal bands */
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
  id?: string;
}

/**
 * Oversized teal chapter number beside a charcoal title block. Echoes the profile's numbered chapters.
 * Uses logical properties so it mirrors in RTL.
 */
export function SectionHeading({ number, label, title, lead, tone = 'light', as = 'h2', className, id }: SectionHeadingProps) {
  const Heading = as;
  const dark = tone === 'dark';
  return (
    <header className={cn('mb-10 grid gap-x-6 gap-y-4 md:mb-14 md:grid-cols-[auto_1fr] md:items-end', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'font-display text-[4.5rem] leading-[0.8] font-extrabold tracking-tight tabular md:text-[7.5rem]',
          dark ? 'text-brand-bright/90' : 'text-brand',
        )}
      >
        {number}
      </span>
      <div className={cn('border-s-4 ps-5 md:pb-2', dark ? 'border-brand-bright' : 'border-ink')}>
        <p className={cn('label-spaced mb-3', dark ? 'text-brand-bright' : 'text-brand-deep')}>{label}</p>
        {title ? (
          <Heading
            id={id}
            className={cn(
              'text-4xl font-extrabold uppercase md:text-5xl rtl:normal-case',
              dark ? 'text-white' : 'text-ink',
            )}
          >
            {title}
          </Heading>
        ) : null}
        {lead ? (
          <p className={cn('mt-4 max-w-2xl text-lg', dark ? 'text-steel-light' : 'text-steel')}>{lead}</p>
        ) : null}
      </div>
    </header>
  );
}
