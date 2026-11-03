import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First Canadian O.M-LTD',
  robots: { index: false, follow: true },
};

/** Static export has no middleware, so "/" forwards to the default locale. */
export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <p>
          <Link href="/en/">English</Link> · <Link href="/ar/" lang="ar">العربية</Link>
        </p>
      </body>
    </html>
  );
}
