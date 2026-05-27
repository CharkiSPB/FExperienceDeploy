import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { expeditions } from '@/data/expeditions';
import { config } from '@/data/config';

export const metadata: Metadata = {
  title: 'Направления экспедиций | Бизнес-путешествия с Forbes',
  description: 'Актуальные и предстоящие бизнес-экспедиции с Forbes: Вьетнам, ЮАР, Марокко. Нетворкинг, встречи с регуляторами, медийное сопровождение.',
  openGraph: {
    title: 'Направления экспедиций | FExperience',
    description: 'Бизнес-экспедиции на перспективные зарубежные рынки с экспертами Forbes',
    url: `${config.site.url}/expeditions`,
    type: 'website',
    images: [{ url: '/images/og-expeditions.jpg', width: 1200, height: 630, alt: 'Экспедиции FExperience' }],
  },
  alternates: {
    canonical: `${config.site.url}/expeditions`,
  },
};

const STATUS_CONFIG = {
  active: { label: 'Активна', color: 'text-[#F7931A]', bg: 'bg-[#F7931A]/10', border: 'border-[#F7931A]/40' },
  completed: { label: 'Завершена', color: 'text-[#666666]', bg: 'bg-[#666666]/10', border: 'border-[#666666]/40' },
  upcoming: { label: 'Скоро', color: 'text-[#F7931A]', bg: 'bg-[#F7931A]/10', border: 'border-[#F7931A]/40' },
} as const;

export default function ExpeditionsPage() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-12 text-center">
        Направления экспедиций
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {expeditions.map((expedition) => {
          const status = STATUS_CONFIG[expedition.status];
          const isClickable = expedition.status !== 'completed';
          
          return (
            <Link
              key={expedition.slug}
              href={isClickable ? `/expeditions/${expedition.slug}` : '#'}
              className={`group block bg-[#110F0D] border border-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 ${
                isClickable 
                  ? 'hover:border-[#F7931A]/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#000000]/50 cursor-pointer' 
                  : 'opacity-70 cursor-not-allowed'
              }`}
            >
              {/* Изображение */}
              <div className="relative w-full aspect-[16/9] bg-[#1A1A1A]">
                <Image
                  src={expedition.image}
                  alt={expedition.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                
                {/* Бейдж статуса */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color} ${status.border}`}>
                  {status.label}
                </span>
              </div>

              {/* Контент карточки */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-medium text-white group-hover:text-[#F7931A] transition-colors">
                    {expedition.title}
                  </h2>
                  <span className="text-sm text-[#A0A0A0]">{expedition.dates}</span>
                </div>
                
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4 line-clamp-3">
                  {expedition.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
                  <div className="flex items-center gap-4 text-sm text-[#A0A0A0]">
                    <span>{expedition.country}</span>
                    {expedition.speakersCount && (
                      <span>• {expedition.speakersCount} спикеров</span>
                    )}
                  </div>
                  {isClickable && (
                    <span className="text-[#F7931A] text-sm font-medium group-hover:underline">
                      Подробнее →
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}