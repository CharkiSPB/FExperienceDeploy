import Image from 'next/image';
import type { CSSProperties } from 'react';
import { partnerBanner } from '@/data/partnerBanner';

export function PartnerBanner() {
  if (!partnerBanner.enabled) return null;

  const mediaStyle = {
    '--partner-banner-aspect': `${partnerBanner.imageWidth} / ${partnerBanner.imageHeight}`,
  } as CSSProperties;

  return (
    <section className="home-partner-banner" aria-label="Партнёрский баннер">
      <a
        className="home-partner-banner__link"
        href={partnerBanner.website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${partnerBanner.name} — перейти на сайт`}
      >
        <span className="home-partner-banner__media" style={mediaStyle}>
          <Image
            src={partnerBanner.image}
            alt={partnerBanner.alt}
            fill
            sizes="100vw"
            className="home-partner-banner__image"
          />
        </span>
      </a>
    </section>
  );
}
