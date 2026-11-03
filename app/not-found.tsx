import Link from 'next/link';
import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['800'], display: 'swap', preload: false });
const inter = Inter({ subsets: ['latin'], display: 'swap', preload: false });

export const metadata: Metadata = { title: 'Page not found | FCOM', robots: { index: false } };

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${inter.className} tri-pattern on-dark grid min-h-screen place-items-center bg-ink p-6 text-white`}>
        <main className="max-w-lg">
          <p className={`${barlow.className} text-[7rem] leading-none text-brand-bright`}>404</p>
          <h1 className={`${barlow.className} mt-4 text-4xl text-white uppercase`}>Page not found</h1>
          <p className="mt-3 text-steel-light" lang="ar" dir="rtl">
            الصفحة غير موجودة
          </p>
          <p className="mt-8 flex flex-wrap gap-3">
            <Link href="/en/" className="inline-flex min-h-12 items-center bg-brand px-6 font-semibold text-white hover:bg-brand-deep">
              Go to home
            </Link>
            <Link href="/ar/" lang="ar" className="inline-flex min-h-12 items-center border-2 border-white/70 px-6 font-semibold text-white">
              الصفحة الرئيسية
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
