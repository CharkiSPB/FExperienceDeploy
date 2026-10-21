export type ExpeditionRegion = 'africa' | 'asia' | 'latam' | 'russia';

export type ExpeditionRecapVideo = {
  /** Ссылка для iframe-плеера VK (video_ext.php). */
  embedUrl: string;
  /** Обычная страница ролика — фолбэк, если встраивание недоступно. */
  pageUrl: string;
  poster?: string;
  title?: string;
};

export type ExpeditionRecapMedia = {
  video?: ExpeditionRecapVideo;
  /** Простой пул фото: без подписей и раскладок, показываются в перемешанном виде. */
  photos?: string[];
};

export type Expedition = {
  slug: string;
  title: string;
  country: string;
  dates: string;
  status: 'active' | 'completed' | 'upcoming';
  description: string;
  image: string;
  imageEvening?: string;
  videoUrl?: string;
  speakersCount?: number;
  programSlug?: string;
  rubrics?: { enabled?: boolean };
  additionalInfo?: string;
  duration?: string;
  participantsCount?: string;
  participantsDescription?: string;
  showDatesInMenu?: boolean;
  includes?: string[];
  fullDescription?: string;
  price?: string;
  spots?: number;

  timer?: {
    enabled: boolean;
    targetDate: string;
    label: string;     
  };

  generalPartner?: {
    name: string;
    logo: string;
    description?: string;
  };

  // ── Поля для редизайна (опциональные, из раздела 12.3) ──
  region?: ExpeditionRegion;
  industries?: string[];
  city?: string;
  shortDescription?: string;
  heroVideo?: string;
  heroPoster?: string;
  ogImage?: string;

  // Картинка-коллаж блока «Что включено» (своя для каждой экспедиции)
  includedImage?: string;

  // ── Hero-поля для главной (раздел 10.2) ──
  heroSketch?: string; // скетч ТОЛЬКО для Hero детальной страницы
  startDate?: string;
  endDate?: string;
  heroTitlePrimary?: string;
  heroTitleOpen?: string;
  heroTitleCountry?: string;
  heroPills?: string[];
  heroTheses?: { title: string; sub: string }[];
  pullQuote?: {
    text: string;
    author: string;
    company: string;
  };
  liveStats?: {
    businessPercent: number;
    culturePercent: number;
    localBusinessPercent: number;
    russianCompaniesPercent: number;
    govPercent: number;
    participantsTurnover: string;
  };
  completedStats?: {
    speakersCount: number;
    participantsCount: number;
  };

  // ── Архив завершённой экспедиции ──
  recapTitle?: string;
  recapMedia?: ExpeditionRecapMedia;
  /** Скрыть экспертов на странице (по умолчанию показываются). */
  showSpeakers?: boolean;
  /** Переиспользовать состав экспертов другой экспедиции. */
  speakersSourceSlug?: string;
};