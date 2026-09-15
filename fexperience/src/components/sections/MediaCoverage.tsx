import Image from 'next/image';
import { mediaLayer } from '@/data/mediaLayer';

export function MediaCoverage() {
  return (
    <section className="bg-surface px-6 py-20 md:px-16 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-y-8 md:grid-cols-[50%_50%] md:gap-16">
          {/* Фото-блок: медийное сопровождение Forbes — один кадр */}
          <div className="media-photos">
            <div className="media-photo-single">
              <Image
                src="/images/media/mediaForbes1.webp"
                alt="Медийное сопровождение Forbes на экспедиции"
                fill
                sizes="(min-width: 768px) 42vw, 85vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Заголовок + три строки статистики */}
          <div>
            <h2 className="font-display text-[28px] font-semibold leading-[1.15] text-text-primary md:text-[36px]">
              {mediaLayer.title}
            </h2>
            <p className="mt-4 max-w-[440px] font-sans text-[16px] leading-[1.6] text-text-secondary">
              {mediaLayer.subtitle}
            </p>
            <div className="media-stats">
              {mediaLayer.stats.map((stat) => (
                <div key={stat.label} className="media-stat-row">
                  <span className="media-stat-kicker">{stat.kicker}</span>
                  <span className="media-stat-number">{stat.number}</span>
                  <span className="media-stat-label">{stat.label}</span>
                  <div className="media-stat-desc">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}