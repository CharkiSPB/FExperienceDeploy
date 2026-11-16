'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { expeditions } from '@/data/expeditions';
import { getHomepageSpotlightExpedition } from '@/lib/expeditionStatus';
import type { Expedition } from '@/types/expedition';

const statusLabels: Record<Expedition['status'], string> = {
  active: 'Активна',
  upcoming: 'Скоро',
  completed: 'Завершена',
};

function formatDates(dates: string) {
  return dates.replace(/-/g, '—');
}

/**
 * Детерминированный fallback для SSR и первого клиентского рендера:
 * без Date.now(), чтобы сервер и клиент совпали при гидратации.
 */
function getFallbackSpotlight(): Expedition | undefined {
  const active = expeditions
    .filter((expedition) => expedition.status === 'active')
    .sort((a, b) =>
      (a.startDate ?? '9999-12-31').localeCompare(b.startDate ?? '9999-12-31'),
    );

  return (
    active[0] ??
    expeditions.find((expedition) => expedition.status === 'upcoming') ??
    expeditions[0]
  );
}

export function FeaturedMarkets() {
  const [spotlight, setSpotlight] = useState<Expedition | undefined>(
    getFallbackSpotlight,
  );

  // Главная статическая: пересчитываем по текущей дате уже на клиенте.
  useEffect(() => {
    const update = () => {
      const next =
        getHomepageSpotlightExpedition(expeditions, new Date()) ??
        getFallbackSpotlight();
      setSpotlight((current) =>
        current?.slug === next?.slug ? current : next,
      );
    };

    update();
    const intervalId = window.setInterval(update, 60_000);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') update();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  // Три карточки тёмной панели: Вьетнам + upcoming, без дубля левой экспедиции.
  const cards = useMemo(() => {
    const vietnam = expeditions.find((expedition) => expedition.slug === 'vietnam');
    const upcoming = expeditions.filter(
      (expedition) => expedition.status === 'upcoming',
    );
    const seen = new Set<string>();

    return [vietnam, ...upcoming]
      .filter((expedition): expedition is Expedition => Boolean(expedition))
      .filter((expedition) => {
        if (expedition.slug === spotlight?.slug || seen.has(expedition.slug)) {
          return false;
        }
        seen.add(expedition.slug);
        return true;
      })
      .slice(0, 3);
  }, [spotlight?.slug]);

  if (!spotlight) return null;

  return (
    <section className="program-block">
      {/* Левая половина — full-bleed фото + существующая glass-card */}
      <div className="program-block__media">
        <Image
          key={spotlight.slug}
          src={spotlight.image}
          alt={`Бизнес-экспедиция в ${spotlight.country}`}
          fill
          sizes="(min-width: 1025px) 48vw, 100vw"
        />

        <div className="featured-expedition-panel">
          <span className="featured-expedition-status">
            {statusLabels[spotlight.status]}
          </span>
          <h3>{spotlight.country}</h3>
          <p className="featured-expedition-type">Бизнес-экспедиция</p>
          <p className="featured-expedition-date">{formatDates(spotlight.dates)}</p>
          <Link
            href={`/expeditions/${spotlight.slug}`}
            className="btn-liquid btn-liquid--sm"
          >
            <span className="btn-liquid-text">Подробнее →</span>
          </Link>
        </div>
      </div>

      {/* Правая половина — единая тёмная поверхность */}
      <div className="program-block__panel">
        <span className="eyebrow-dash" aria-hidden="true" />
        <span className="program-block__eyebrow">Ближайшие экспедиции</span>
        <h2 className="program-block__title">
          Горизонт новых возможностей открывается там, где начинается неизведанное.
        </h2>
        {/* <p className="program-block__paragraph">{paragraph}</p> */}
        <p className="program-block__paragraph">Благодаря участию в деловых мероприятиях, встречам с органами власти и местными предпринимателями, вы сможете оценить не только потенциал развития бизнеса, но и скрытые угрозы нового рынка - в России и зарубежом.</p>

        {cards.length > 0 && (
          <div className="program-days">
            {cards.map((exp) => (
              <Link
                href={`/expeditions/${exp.slug}`}
                className="program-day"
                key={exp.slug}
              >
                <div className="program-day__imgwrap">
                  <Image
                    src={exp.image}
                    alt={`Бизнес-экспедиция в ${exp.country}`}
                    fill
                    sizes="(min-width: 1025px) 17vw, 72vw"
                  />
                </div>
                <span className="program-day__num">{exp.country}</span>
                <p className="program-day__text">
                  {exp.dates ? formatDates(exp.dates) : statusLabels[exp.status]}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
