'use client';

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { ModalSeal } from '@/components/shared/ModalAside';
import { config } from '@/data/config';
import type { Expedition } from '@/types/expedition';

export type ExpeditionContactMode = 'started' | 'finished' | 'unavailable';

type ExpeditionContactPanelProps = {
  expedition?: Expedition;
  mode: ExpeditionContactMode;
  onClose: () => void;
};

const COPY: Record<ExpeditionContactMode, { title: string; text: string }> = {
  started: {
    title: 'Экспедиция началась',
    text: 'Для уточнения возможного участия в текущей экспедиции свяжитесь с нами',
  },
  finished: {
    title: 'Экспедиция завершена',
    text: 'Экспедиция завершена. Если у вас остались вопросы, свяжитесь с нами.',
  },
  unavailable: {
    title: 'Свяжитесь с нами',
    text: 'Сейчас нет открытых экспедиций для заявки. Свяжитесь с нами, чтобы обсудить участие.',
  },
};

export function ExpeditionContactPanel({
  expedition,
  mode,
  onClose,
}: ExpeditionContactPanelProps) {
  const { text } = COPY[mode];
  const title =
    mode === 'started' && expedition
      ? `Мы уже в ${expedition.country}`
      : COPY[mode].title;
  const subtitle = expedition
    ? `${expedition.country}${expedition.dates ? ` · ${expedition.dates.replace(/-/g, '—')}` : ''}`
    : null;

  return (
    <>
      <div className="request-modal__mobile-head" aria-hidden="true">
        <ModalSeal size={72} />
      </div>
      <h3 className="request-modal__title">{title}</h3>
      <h3 className="request-modal__title-mobile">{title}</h3>
      <span className="request-modal__title-line" aria-hidden="true" />

      <div className="request-modal__contact">
        {subtitle && (
          <p className="request-modal__contact-expedition">{subtitle}</p>
        )}
        <p className="request-modal__contact-text">{text}</p>

        <div className="request-modal__contact-links">
          <a
            href={config.expeditionContact.phoneHref}
            className="request-modal__contact-link"
          >
            <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
            <span>{config.expeditionContact.phone}</span>
          </a>
          <a
            href={`mailto:${config.expeditionContact.email}`}
            className="request-modal__contact-link"
          >
            <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
            <span>{config.expeditionContact.email}</span>
          </a>
        </div>

        <Link
          href="/expeditions"
          className="btn-text request-modal__contact-all"
          onClick={onClose}
        >
          Другие экспедиции <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}
