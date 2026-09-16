'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ProgramDay } from '@/types/program';

type ExpeditionProgramProps = {
  program: ProgramDay[];
  status: string;
};

type DayBlock = { type: 'bullet' | 'after' | 'heading'; text: string };

/* Порядок сегментов сохраняется: `~` в начале сегмента — обычный абзац,
   `#` — белый мини-заголовок, остальные после первого — буллеты */
function splitDayDescription(description: string): {
  lead: string;
  blocks: DayBlock[];
} {
  const parts = description
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);
  let lead = '';
  let leadSet = false;
  const blocks: DayBlock[] = [];
  for (const part of parts) {
    if (part.startsWith('~')) {
      const text = part.slice(1).trim();
      if (text) blocks.push({ type: 'after', text });
    } else if (part.startsWith('#')) {
      const text = part.slice(1).trim();
      if (text) blocks.push({ type: 'heading', text });
    } else if (!leadSet) {
      lead = part;
      leadSet = true;
    } else {
      blocks.push({ type: 'bullet', text: part });
    }
  }
  return { lead, blocks };
}

/* Группирует подряд идущие буллеты в один <ul>, `~`-абзацы — между ними */
function renderDayBlocks(blocks: DayBlock[]): ReactNode {
  const nodes: ReactNode[] = [];
  let currentBullets: string[] = [];
  const flushBullets = () => {
    if (currentBullets.length === 0) return;
    const items = currentBullets;
    currentBullets = [];
    nodes.push(
      <ul key={`ul-${nodes.length}`} className="program-detail__list">
        {items.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>,
    );
  };
  blocks.forEach((block) => {
    if (block.type === 'bullet') {
      currentBullets.push(block.text);
    } else if (block.type === 'heading') {
      flushBullets();
      nodes.push(
        <p
          key={`h-${nodes.length}`}
          className="program-detail__subhead"
        >
          {block.text}
        </p>,
      );
    } else {
      flushBullets();
      nodes.push(
        <p
          key={`p-${nodes.length}`}
          className="program-detail__text program-detail__text--after"
        >
          {block.text}
        </p>,
      );
    }
  });
  flushBullets();
  return nodes;
}

export function ExpeditionProgram({ program, status }: ExpeditionProgramProps) {
  useScrollReveal();
  const [activeDay, setActiveDay] = useState(1);

  // Только active + непустая программа; сортировка по дню
  if (status !== 'active' || program.length === 0) return null;
  const days = [...program].sort((a, b) => a.day - b.day);
  const current = days.find((d) => d.day === activeDay) ?? days[0];

  const { lead, blocks } = splitDayDescription(current.description || '');
  const dayNumber = String(current.day).padStart(2, '0');
  const dayTitle = current.title || `День ${current.day}`;

  return (
    <section className="expedition-program" aria-label="Программа экспедиции">
      <div className="expedition-program__head fade-up">
        <h2 className="expedition-program__title">Программа экспедиции</h2>
        <div className="program-detail-tabs" role="tablist" aria-label="Дни программы">
          {days.map((day) => (
            <button
              key={day.day}
              type="button"
              role="tab"
              aria-selected={day.day === current.day}
              onClick={() => setActiveDay(day.day)}
              className={`program-detail-tab${day.day === current.day ? ' active' : ''}`}
            >
              День {String(day.day).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <div className="program-detail" key={current.day}>
        <div className="program-detail__body">
          {current.title ? (
            <>
              <p className="program-detail__label">День {dayNumber}</p>
              <h3 className="program-detail__title">{current.title}</h3>
            </>
          ) : (
            <h3 className="program-detail__title program-detail__title--accent">
              День {current.day}
            </h3>
          )}
          {lead && <p className="program-detail__text">{lead}</p>}
          {renderDayBlocks(blocks)}
        </div>
        <div className="program-detail__photo">
          {current.image && (
            <Image
              src={current.image}
              alt={dayTitle}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="program-detail__img"
            />
          )}
        </div>
      </div>
    </section>
  );
}
