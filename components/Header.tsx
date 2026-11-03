'use client';

import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { NAV } from '@/lib/site';
import { Logo } from './Logo';

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/$/, '') || '/';
  return href === '/' ? p === '/' : p === href || p.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === 'ar' ? 'en' : 'ar';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Drawer: Escape closes, focus is trapped, body scroll locked.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'Tab') {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <a
        href="#main"
        className="fixed start-4 top-3 z-[100] -translate-y-24 bg-brand-deep px-4 py-3 font-semibold text-white focus:translate-y-0"
      >
        {t('skip')}
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b bg-white transition-[box-shadow,border-color] duration-200',
          scrolled ? 'border-line shadow-[0_6px_24px_rgb(0_0_0/0.06)]' : 'border-transparent',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 transition-[height] duration-200 md:px-8',
            scrolled ? 'h-16' : 'h-[76px]',
          )}
        >
          <Link href="/" className="flex min-h-11 items-center">
            <Logo compact={scrolled} />
          </Link>

          <nav aria-label={t('primary')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.filter((n) => n.key !== 'contact').map((n) => {
                const active = isActive(pathname, n.href);
                return (
                  <li key={n.key}>
                    <Link
                      href={n.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative flex min-h-11 items-center px-3 font-display text-[1.05rem] font-bold tracking-wide uppercase transition-colors rtl:normal-case',
                        active ? 'text-brand-deep' : 'text-ink hover:text-brand-deep',
                      )}
                    >
                      {t(n.key)}
                      {active ? (
                        <span aria-hidden="true" className="absolute inset-x-3 bottom-1.5 h-0.5 bg-safety" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={pathname}
              locale={other}
              lang={other}
              hrefLang={other}
              aria-label={`${t('switchLang')} — ${t('switchLangLabel')}`}
              className="flex min-h-11 min-w-11 items-center justify-center border border-line px-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand-deep"
            >
              {t('switchLang')}
            </Link>
            <Link
              href="/contact"
              className="hidden min-h-11 items-center bg-brand px-5 font-display text-[1.05rem] font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-deep md:flex rtl:normal-case"
            >
              {t('cta')}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="flex size-11 items-center justify-center text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? t('close') : t('menu')}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/50 transition-opacity duration-200 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
        onClick={close}
      />
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('primary')}
        inert={!open}
        className={cn(
          'tri-pattern on-dark fixed inset-y-0 end-0 z-50 flex w-[min(88vw,380px)] flex-col bg-ink px-6 pt-5 pb-8 transition-transform duration-200 ease-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between">
          <Logo mono />
          <button
            type="button"
            className="flex size-11 items-center justify-center text-white"
            aria-label={t('close')}
            onClick={close}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={t('primary')} className="mt-10">
          <ul className="space-y-1">
            {NAV.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <li key={n.key}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center border-b border-white/10 font-display text-2xl font-bold tracking-wide uppercase rtl:normal-case',
                      active ? 'text-brand-bright' : 'text-white',
                    )}
                  >
                    {t(n.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-auto flex min-h-12 items-center justify-center bg-brand font-display text-lg font-bold tracking-wide text-white uppercase rtl:normal-case"
        >
          {t('cta')}
        </Link>
      </div>
    </>
  );
}
