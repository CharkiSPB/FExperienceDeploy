import type { Expedition } from '@/types/expedition';

const MSK_OFFSET = '+03:00';

export type ParticipationState = 'open' | 'started' | 'finished';

/** Разбирает ISO-дату с часовым поясом. */
function parseIso(value?: string): number | null {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : timestamp;
}

/** Начало календарного дня по московскому времени. */
function parseMoscowDayStart(value?: string): number | null {
  if (!value) return null;
  const date = value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  if (!date) return null;
  const timestamp = Date.parse(`${date}T00:00:00${MSK_OFFSET}`);
  return Number.isNaN(timestamp) ? null : timestamp;
}

/** Конец календарного дня по московскому времени. */
function parseMoscowDayEnd(value?: string): number | null {
  if (!value) return null;
  const date = value.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
  if (!date) return null;
  const timestamp = Date.parse(`${date}T23:59:59.999${MSK_OFFSET}`);
  return Number.isNaN(timestamp) ? null : timestamp;
}

/**
 * Состояние приёма заявок:
 * - upcoming всегда открыт;
 * - completed всегда завершён;
 * - active закрывается по participationClosesAt, затем по endDate.
 */
export function getParticipationState(
  expedition: Expedition,
  now: Date = new Date(),
): ParticipationState {
  if (expedition.status === 'completed') return 'finished';
  if (expedition.status === 'upcoming') return 'open';

  const nowMs = now.getTime();
  const endMs = parseMoscowDayEnd(expedition.endDate);
  if (endMs !== null && nowMs > endMs) return 'finished';

  const closesMs = parseIso(expedition.participationClosesAt);
  if (closesMs !== null) {
    return nowMs >= closesMs ? 'started' : 'open';
  }

  const startMs = parseMoscowDayStart(expedition.startDate);
  if (startMs !== null) {
    return nowMs >= startMs ? 'started' : 'open';
  }

  return 'open';
}

/** Открытые для заявки экспедиции: активные раньше upcoming, внутри — по дате старта. */
export function getOpenExpeditions(
  list: readonly Expedition[],
  now: Date = new Date(),
): Expedition[] {
  return list
    .filter((expedition) => getParticipationState(expedition, now) === 'open')
    .sort((a, b) => {
      const aActive = a.status === 'active' ? 0 : 1;
      const bActive = b.status === 'active' ? 0 : 1;
      if (aActive !== bActive) return aActive - bActive;

      const aStart = parseMoscowDayStart(a.startDate) ?? Number.MAX_SAFE_INTEGER;
      const bStart = parseMoscowDayStart(b.startDate) ?? Number.MAX_SAFE_INTEGER;
      return aStart - bStart;
    });
}

/**
 * Экспедиция для левой части блока «Ближайшие экспедиции»:
 * идущая сейчас → ближайшая будущая активная → ближайшая датированная upcoming
 * → первая активная/upcoming по данным.
 */
export function getHomepageSpotlightExpedition(
  list: readonly Expedition[],
  now: Date = new Date(),
): Expedition | undefined {
  const nowMs = now.getTime();
  const active = list
    .filter((expedition) => expedition.status === 'active')
    .map((expedition) => ({
      expedition,
      start: parseMoscowDayStart(expedition.startDate),
      end:
        parseIso(expedition.homepageSpotlightUntil) ??
        parseMoscowDayEnd(expedition.endDate),
    }));

  const ongoing = active
    .filter(
      ({ start, end }) =>
        start !== null && end !== null && nowMs >= start && nowMs < end,
    )
    .sort(
      (a, b) =>
        (a.end ?? Number.MAX_SAFE_INTEGER) - (b.end ?? Number.MAX_SAFE_INTEGER),
    );
  if (ongoing[0]) return ongoing[0].expedition;

  const futureActive = active
    .filter(({ start }) => start !== null && nowMs <= start)
    .sort(
      (a, b) =>
        (a.start ?? Number.MAX_SAFE_INTEGER) -
        (b.start ?? Number.MAX_SAFE_INTEGER),
    );
  if (futureActive[0]) return futureActive[0].expedition;

  const datedUpcoming = list
    .filter((expedition) => expedition.status === 'upcoming')
    .map((expedition) => ({
      expedition,
      start: parseMoscowDayStart(expedition.startDate),
    }))
    .filter(({ start }) => start !== null && nowMs <= start)
    .sort(
      (a, b) =>
        (a.start ?? Number.MAX_SAFE_INTEGER) -
        (b.start ?? Number.MAX_SAFE_INTEGER),
    );
  if (datedUpcoming[0]) return datedUpcoming[0].expedition;

  const activeUndated = active.find(({ start }) => start === null);
  if (activeUndated) return activeUndated.expedition;

  return (
    active[0]?.expedition ??
    list.find((expedition) => expedition.status === 'upcoming')
  );
}
