import { Mail, MapPin, Phone, Smartphone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/contact/ContactForm';
import { HqMap } from '@/components/contact/HqMap';
import { SectionHeading } from '@/components/SectionHeading';
import { Container, PageHero } from '@/components/ui';
import { company, offices } from '@/content/company';
import type { Locale } from '@/content/types';
import { cn } from '@/lib/cn';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'contact');
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const hq = offices.find((o) => o.hq)!;

  return (
    <>
      <PageHero number="18" label={t('label')} title={t('title')} lead={t('lead')} />

      <section aria-labelledby="offices-title" className="py-20 md:py-24">
        <Container>
          <h2 id="offices-title" className="label-spaced mb-8 text-brand-deep">
            {t('officesLabel')}
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[hq, ...offices.filter((o) => !o.hq)].map((o) => (
              <li
                key={o.id}
                className={cn('flex flex-col p-6 md:p-7', o.hq ? 'tri-pattern on-dark bg-ink text-steel-light' : 'border border-line bg-white')}
              >
                {o.hq ? <p className="label-spaced mb-2 text-brand-bright">{t('hq')}</p> : null}
                <h3 className={cn('text-2xl font-extrabold uppercase rtl:normal-case', o.hq && 'text-white')}>{o.name[locale].replace(/ — .*/, '')}</h3>
                <p className={cn('mt-1 font-semibold', o.hq ? 'text-white' : 'text-ink')}>{o.city[locale]}</p>
                {o.address ? (
                  <address className="mt-4 flex gap-2 not-italic">
                    <MapPin className={cn('mt-1 size-4 shrink-0', o.hq ? 'text-brand-bright' : 'text-brand')} aria-hidden="true" />
                    <span>
                      {o.address[locale].map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                  </address>
                ) : null}
                <ul className="mt-4 flex-1">
                  {o.phones.map((p) => {
                    const PhoneIcon = p.kind === 'mob' ? Smartphone : Phone;
                    return (
                      <li key={p.tel}>
                        <a
                          href={`tel:${p.tel}`}
                          className={cn('flex min-h-11 items-center gap-2 font-semibold hover:underline', o.hq ? 'text-white' : 'text-ink hover:text-brand-deep')}
                        >
                          <PhoneIcon className={cn('size-4', o.hq ? 'text-brand-bright' : 'text-brand')} aria-hidden="true" />
                          <span className="text-sm font-normal">{t(p.kind)}</span>
                          <span dir="ltr" className="tabular">
                            {p.display}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href={`mailto:${company.email}`}
                  className={cn('mt-2 flex min-h-11 items-center gap-2 font-semibold hover:underline', o.hq ? 'text-brand-bright' : 'text-brand-deep')}
                >
                  <Mail className="size-4" aria-hidden="true" />
                  <span dir="ltr">{company.email}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="form-title" className="tri-pattern bg-concrete py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading number="19" label={t('label')} title={t('formTitle')} id="form-title" />
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <h2 className="label-spaced mb-4 text-brand-deep lg:mt-[9.5rem]">{t('mapTitle')}</h2>
            <div className="frame-ticks">
              <HqMap latLng={hq.latLng!} title={`${company.legalName} — ${t('hq')}`} address={hq.address![locale].join(', ')} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
