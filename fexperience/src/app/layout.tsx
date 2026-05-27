import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { RootClientLayout } from '@/components/layout/RootClientLayout';

const helveticaSans = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.otf', weight: '300', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const helveticaSerif = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.otf', weight: '300', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | FExperience', default: 'Бизнес-экспедиции с Forbes | FExperience' },
  description: 'Бизнес-экспедиции для российских предпринимателей на перспективные зарубежные рынки',
  metadataBase: new URL('https://fexperience.ru'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${helveticaSans.variable} ${helveticaSerif.variable}`}>
      <body className="antialiased bg-[#0D0805] text-white" suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}