'use client';

import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type ExpeditionIncludedProps = {
  includes: string[];
};

// Делит название ровно на 2 строки по середине (вторая строка — остаток).
// «МЕДИЙНОЕ СОПРОВОЖДЕНИЕ» → «МЕДИЙНОЕ» / «СОПРОВОЖДЕНИЕ»,
// «ТРАНСФЕРЫ ВИП-КЛАССА» → «ТРАНСФЕРЫ» / «ВИП-КЛАССА».
function splitTwoLines(name: string): [string, string | null] {
  const words = name.split(' ');
  if (words.length < 2) return [name, null];
  const half = name.length / 2;
  let acc = '';
  for (let i = 0; i < words.length - 1; i++) {
    acc = acc ? `${acc} ${words[i]}` : words[i];
    if (acc.length >= half) return [acc, words.slice(i + 1).join(' ')];
  }
  return [words.slice(0, -1).join(' '), words[words.length - 1]];
}

export function ExpeditionIncluded({ includes }: ExpeditionIncludedProps) {
  useScrollReveal();

  if (includes.length === 0) return null;

  return (
    <section className="expedition-included" aria-label="Что включено">
      <div className="expedition-included__container">
        <div className="included-head fade-up">
          <h2 className="included-title">Что включено</h2>
          <p className="included-subtitle">
            Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов.
            Вы занимаетесь бизнесом и нетворкингом — обо всём остальном позаботится команда FExperience.
          </p>
        </div>

      </div>

      {/* Ряд пунктов — на всю ширину экрана (вне контейнера), колонки повторяют
          ширины панелей коллажа, поэтому каждая точка строго над своей панелью. */}
      <ul className="included-points">
        {includes.map((item, i) => {
          const [line1, line2] = splitTwoLines(item);
          return (
            <li key={`${item}-${i}`} className={`included-point fade-up delay-${Math.min(i + 1, 6)}`}>
              <span className="included-point__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="included-point__name">
                {line1}
                {line2 ? (
                  <>
                    <br />
                    {line2}
                  </>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="included-rule fade-up" aria-hidden="true" />

      <div className="included-media fade-up delay-1">
        <Image
          src="/images/expeditions/whatsIncluded3.webp"
          alt="Что включено в бизнес-экспедицию"
          width={2103}
          height={748}
          sizes="100vw"
          className="included-image"
        />
      </div>
    </section>
  );
}
