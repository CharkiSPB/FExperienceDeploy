import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { RootClientLayout } from '@/components/layout/RootClientLayout';







const playfair = Playfair_Display({ subsets: ['cyrillic', 'latin'], variable: '--font-serif', display: 'swap' });
const inter = Inter({ subsets: ['cyrillic', 'latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: { template: '%s | FExperience', default: 'Бизнес-экспедиции с Forbes | FExperience' },
  description: 'Бизнес-экспедиции для российских предпринимателей на перспективные зарубежные рынки',
  metadataBase: new URL('https://fexperience.ru'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#0D0805] text-white" suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}