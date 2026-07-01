import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { RootClientLayout } from '@/components/layout/RootClientLayout';
import { YandexMetrika } from '@/components/shared/YandexMetrika';

const helveticaSans = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const helveticaSerif = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
});


export const metadata: Metadata = {
  title: { template: '%s | FExperience', default: 'Бизнес-экспедиции с Forbes | FExperience' },
  description: 'Бизнес-экспедиции для российских предпринимателей на перспективные зарубежные рынки',
  metadataBase: new URL('https://fexperience.ru'),
  verification: {
    yandex: '4facb07931b3fd31',
    google: 'TTyyANnmVGkerAJNk4ZQOK5xdvLODbXOLkfKjSnNByA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${helveticaSans.variable} ${helveticaSerif.variable}`}>
      <body className="antialiased bg-[#0D0805] text-white" suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
        <YandexMetrika />
      </body>
    </html>
  );
}