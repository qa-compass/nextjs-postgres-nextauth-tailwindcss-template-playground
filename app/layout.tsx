import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import Script from 'next/script';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="qa-compass">
        {`
        {
          const searchParams = new URLSearchParams(location.search)
          if (searchParams.get('qaCompass') || searchParams.get('state')?.includes('qaCompass')) {
            const script = document.createElement('script');
            script.setAttribute('data-qa-compass-script-id', '${process.env.QA_SCRIPT_ID}')
            script.src = 'https://www.unpkg.com/@qa-compass/toolbar/dist/index.js';
            document.head.appendChild(script);
          }
        }
      `}
      </Script>
      <body className="flex min-h-screen w-full flex-col">
        <template data-qa-compass-template=""></template>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
