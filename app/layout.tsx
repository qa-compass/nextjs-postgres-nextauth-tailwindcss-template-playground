import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import Script from 'next/script';

export const metadata = {
  title: 'QA Playground',
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
          // localStorage.setItem('qa-compass_access_token', '${process.env.QA_COMPASS_ACCESS_TOKEN}');
          // localStorage.setItem('qa-compass_script_config', '${process.env.QA_COMPASS_SCRIPT_CONFIG}');
          // localStorage.setItem('qa-compass_integration_config', '${process.env.QA_COMPASS_INTEGRATION_CONFIG}');
          // localStorage.setItem('qa-compass_refresh_token', '${process.env.QA_COMPASS_REFRESH_TOKEN}');
          const searchParams = new URLSearchParams(location.search)
          if (searchParams.get('qaCompass') || searchParams.get('state')?.includes('qaCompass')) {
            const script = document.createElement('script');
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
