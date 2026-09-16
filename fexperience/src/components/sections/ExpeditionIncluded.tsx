'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type ExpeditionIncludedProps = {
  includes: string[];
};

export function ExpeditionIncluded({ includes }: ExpeditionIncludedProps) {
  useScrollReveal();

  if (includes.length === 0) return null;

  return (
    <section className="expedition-included" aria-label="Что включено">
      <div className="expedition-included__container">
        <div className="included-head fade-up">
          <span className="eyebrow-dash" aria-hidden="true" />
          <p className="included-label">Что включено</p>
          <p className="included-subtitle">
            Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов.
            Вы занимаетесь бизнесом и нетворкингом — обо всём остальном позаботится команда FExperience.
          </p>
        </div>

        {/* Схема 2026-09-14: 3 пункта → оранжевая линейка → картинка → остальные пункты.
            Нумерация сквозная 01–06, цифры+слеш оранжевые, текст чёрный капсом. */}
        <ul className="included-points">
          {includes.slice(0, 3).map((item, i) => (
            <li key={`${item}-${i}`} className={`included-point fade-up delay-${Math.min(i + 1, 6)}`}>
              <span className="included-point__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}/
              </span>
              <span className="included-point__name">{item}</span>
            </li>
          ))}
        </ul>

      </div>

      <div className="included-rule fade-up" aria-hidden="true" />

      <div className="included-media fade-up delay-1">
        <Image
          src="/images/expeditions/whatsIncluded2.webp"
          alt="Что включено в бизнес-экспедицию"
          width={1774}
          height={887}
          sizes="100vw"
          className="included-image"
        />
      </div>

      <div className="expedition-included__container">
        <ul className="included-points included-points--bottom">
          {includes.slice(3).map((item, i) => (
            <li key={`${item}-${i + 3}`} className={`included-point fade-up delay-${Math.min(i + 1, 6)}`}>
              <span className="included-point__num" aria-hidden="true">
                {String(i + 4).padStart(2, '0')}/
              </span>
              <span className="included-point__name">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="included-rule included-rule--bottom fade-up" aria-hidden="true" />
    </section>
  );
}
