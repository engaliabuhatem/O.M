import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[1440px] px-4 md:px-8', className)}>{children}</div>;
}

type Variant = 'primary' | 'secondary' | 'ghost-dark' | 'text';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-deep px-6',
  secondary: 'border-2 border-ink text-ink hover:bg-ink hover:text-white px-6',
  'ghost-dark': 'border-2 border-white/70 text-white hover:bg-white hover:text-ink px-6',
  text: 'text-brand-deep hover:text-ink underline-offset-4 hover:underline',
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  arrow = false,
  className,
  ...rest
}: { href: ComponentProps<typeof Link>['href']; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<
  ComponentProps<typeof Link>,
  'href' | 'children' | 'className'
>) {
  return (
    <Link
      href={href}
      className={cn(
        'group/btn inline-flex min-h-12 items-center gap-2 font-display text-lg font-bold tracking-wide uppercase transition-colors duration-150 rtl:normal-case',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow ? <Arrow className="size-5 transition-transform duration-150 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" /> : null}
    </Link>
  );
}

/** Direction-aware arrow: mirrors in RTL. */
export function Arrow({ className }: { className?: string }) {
  return <ArrowRight aria-hidden="true" className={cn('rtl:-scale-x-100', className)} />;
}

/** UTM survey label, rendered LTR in both languages. */
export function UtmLabel({ e, n, className }: { e: number; n: number; className?: string }) {
  return (
    <span className={cn('mono-coord', className)} dir="ltr">
      E {Math.round(e)} · N {Math.round(n)}
    </span>
  );
}

export function PageHero({
  label,
  title,
  lead,
  number,
}: {
  label: string;
  title: string;
  lead?: string;
  number: string;
}) {
  return (
    <section className="tri-pattern on-dark relative overflow-hidden bg-ink text-white">
      <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
      <div className="ruler-x absolute inset-x-0 top-0 text-white/30" aria-hidden="true" />
      <Container className="relative py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-10">
          <span aria-hidden="true" className="font-display text-[5.5rem] leading-[0.8] font-extrabold text-brand-bright tabular md:text-[9rem]">
            {number}
          </span>
          <div className="border-s-4 border-brand-bright ps-5">
            <p className="label-spaced mb-3 text-brand-bright">{label}</p>
            <h1 className="text-[2.6rem] font-extrabold text-white uppercase md:text-7xl rtl:normal-case">{title}</h1>
            {lead ? <p className="mt-5 max-w-2xl text-lg text-steel-light md:text-xl">{lead}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
