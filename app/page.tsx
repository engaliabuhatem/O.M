import Link from 'next/link';
import type { Metadata } from 'next';
import { withBase } from '@/lib/site';

export const metadata: Metadata = {
  title: 'First Canadian O.M-LTD',
  robots: { index: false, follow: true },
};

/** Static export has no middleware, so "/" forwards to the default locale. */
export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${withBase('/en/')}`} />
        <link rel="canonical" href={withBase('/en/')} />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <p>
          <Link href="/en/">English</Link> · <Link href="/ar/" lang="ar">العربية</Link>
        </p>
      </body>
    </html>
  );
}
