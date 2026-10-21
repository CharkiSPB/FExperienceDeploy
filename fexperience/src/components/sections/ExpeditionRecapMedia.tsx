'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import type { ExpeditionRecapMedia as RecapMedia } from '@/types/expedition';

const MAX_PHOTOS = 6;

/** Стабильный хеш, чтобы порядок фото совпадал на сервере и клиенте. */
function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * «Рандомный» порядок без прыжков при гидрации: одинаковый seed —
 * одинаковый результат. Фото в данных не нужно сортировать вручную.
 */
function shufflePhotos(photos: readonly string[], seed: string): string[] {
  const result = [...photos];
  let state = hashString(seed) || 1;

  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = Math.floor((state / 4294967296) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

type ExpeditionRecapMediaProps = {
  media?: RecapMedia;
  title?: string;
};

export function ExpeditionRecapMedia({ media, title }: ExpeditionRecapMediaProps) {
  const video = media?.video;
  const photoPool = media?.photos;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const gallery = useMemo(() => {
    const photos = photoPool ?? [];
    return shufflePhotos(photos, `${title ?? ''}-${photos.join('|')}`).slice(0, MAX_PHOTOS);
  }, [photoPool, title]);

  const close = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  // Esc, блокировка прокрутки и focus trap на время модалки.
  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.dispatchEvent(new Event('lenis:pause'));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.dispatchEvent(new Event('lenis:resume'));
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, close]);

  if (!video && gallery.length === 0) return null;

  const openVideo = (event: MouseEvent<HTMLAnchorElement>) => {
    // Если embed-ссылки нет — даём ссылке открыть VK в новой вкладке.
    // Ctrl/Cmd/Shift-клик тоже не перехватываем: пусть открывается в новой вкладке.
    if (
      !video?.embedUrl ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    setIsOpen(true);
  };

  const embedSrc = video?.embedUrl
    ? `${video.embedUrl}${video.embedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : '';

  return (
    <>
      <div className="recap-media">
        <div className="recap-media__head">
          <span className="eyebrow-dash" aria-hidden="true" />
          <p className="dir-label">Архив экспедиции</p>
          <h3 className="recap-media__title">Как это было</h3>
        </div>

        {video && (
          <a
            ref={triggerRef}
            href={video.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="recap-media__video"
            onClick={openVideo}
            aria-label={`Смотреть видео: ${video.title ?? title ?? 'экспедиция'}`}
          >
            {video.poster && (
              <Image
                src={video.poster}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1040px"
                className="recap-media__video-poster"
              />
            )}
            <span className="recap-media__video-overlay" aria-hidden="true" />
            <span className="recap-media__play" aria-hidden="true">
              <Play size={28} fill="currentColor" />
            </span>
            <span className="recap-media__video-note">VK Video</span>
            {video.title && (
              <span className="recap-media__video-title">{video.title}</span>
            )}
          </a>
        )}

        {gallery.length > 0 && (
          <div
            className="recap-media__grid"
            data-count={Math.min(gallery.length, 3)}
          >
            {gallery.map((src, index) => (
              <figure key={`${src}-${index}`} className="recap-media__photo">
                <Image
                  src={src}
                  alt={title ? `Фото экспедиции: ${title}` : 'Фото экспедиции'}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="recap-media__photo-img"
                />
              </figure>
            ))}
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            className="recap-media-modal"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              className="recap-media-modal__dialog"
              role="dialog"
              aria-modal="true"
              aria-label={video?.title ?? 'Видео экспедиции'}
            >
              <button
                ref={closeRef}
                type="button"
                className="recap-media-modal__close"
                onClick={close}
                aria-label="Закрыть видео"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="recap-media-modal__frame">
                {video && (
                  <iframe
                    src={embedSrc}
                    title={video.title ?? 'Видео экспедиции'}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                    allowFullScreen
                    loading="lazy"
                  />
                )}
              </div>

              {video?.pageUrl && (
                <a
                  href={video.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="recap-media-modal__fallback"
                >
                  Не воспроизводится? Открыть в VK <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
