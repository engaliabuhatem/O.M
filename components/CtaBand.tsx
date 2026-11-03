import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/content/types';
import { ButtonLink, Container } from './ui';

export async function CtaBand({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.cta' });
  return (
    <section aria-labelledby="cta-title" className="tri-pattern on-dark relative overflow-hidden bg-brand-deep py-16 text-white md:py-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-title" className="text-4xl font-extrabold text-white uppercase md:text-5xl rtl:normal-case">
            {t('title')}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-white/90">{t('text')}</p>
        </div>
        <ButtonLink href="/contact" arrow className="bg-white !text-ink hover:!bg-ink hover:!text-white">
          {t('button')}
        </ButtonLink>
      </Container>
    </section>
  );
}
