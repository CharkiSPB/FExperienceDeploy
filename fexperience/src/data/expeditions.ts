import { Expedition } from '@/types/expedition';

export const expeditions: Expedition[] = [
  {
    slug: 'south-africa',
    title: 'Бизнес-экспедиция с Forbes в ЮАР',
    country: 'ЮАР',
    region: 'africa',
    city: 'Кейптаун, Стелленбош',
    industries: ['Энергетика и ресурсы', 'Агропром'],
    dates: '15-21 ноября 2026',
    status: 'active',
    description: '',
    shortDescription: 'Неделя погружения в экономику ЮАР: встречи с компаниями, визиты на производства, работа с экспертами и поиск точек роста для вашего бизнеса.',
    heroSketch: '/images/expeditions/UAR-bgExpeditions.webp',
    includedImage: '/images/expeditions/whatsIncluded3.webp',
    image: '/images/expeditions/south-africaC.webp',
    startDate: '2026-11-15',
    endDate: '2026-11-21',
    heroVideo: '/videos/hero-south-africa.webm',
    heroPoster: '/images/expeditions/south-africaC.webp',
    heroTitlePrimary: 'Бизнес —',
    heroTitleOpen: 'экспедиция',
    heroTitleCountry: 'в ЮАР',
    heroPills: ['Авторская программа', 'Нетворкинг первых лиц', 'Независимая экспертиза', 'Медийное сопровождение'],
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    // speakersCount: 12,
    programSlug: 'sa-program',
    rubrics: { enabled: true },
    duration: '6',
    participantsCount: '15-30',
    // price: 'По запросу',
    // spots: 0,
    fullDescription: '',
    includes: [
      'Медийное сопровождение',
      'Бизнес-сессии, нетворкинг',
      'Культурные мероприятия',
      'Проживание в отеле 5*',
      'Трансферы вип-класса',
      'Питание',
    ],
    // additionalInfo: 'Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов. Вы занимаетесь бизнесом и нетворкингом - обо всём остальном позаботится команда FExperience.',
    showDatesInMenu: true,
    timer: {
    enabled: true,
    targetDate: '2026-11-15T00:00:00Z', // ISO-формат даты начала
    label: 'До старта экспедиции в ЮАР',
  },
  },
  {
    slug: 'vietnam',
    title: 'Бизнес-экспедиция с Forbes во Вьетнам',
    country: 'Вьетнам',
    region: 'asia',
    industries: ['Промышленность', 'Логистика и торговля'],
    dates: '14-20 марта 2027',
    status: 'active',
    description: '',
    image: '/images/expeditions/vietnam.webp',
    heroSketch: '/images/expeditions/Hoshomin-bgExpeditions1.webp',
    includedImage: '/images/expeditions/whatsIncludedVietnam.webp',
    startDate: '2027-03-14',
    endDate: '2027-03-20',
    heroVideo: '/videos/hero-vietnam.webm',
    heroPoster: '/images/expeditions/vietnam.webp',
    heroTitlePrimary: 'Бизнес —',
    heroTitleOpen: 'экспедиция',
    heroTitleCountry: 'во Вьетнам',
    heroPills: ['Авторская программа', 'Нетворкинг первых лиц', 'Независимая экспертиза', 'Медийное сопровождение'],
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    // speakersCount: 8,
    programSlug: 'vietnam-program',
    rubrics: { enabled: true },
    duration: '6',
    participantsCount: '15-30',
    participantsDescription: 'предпринимателей',
    // price: 'По запросу',
    spots: 15,
    fullDescription: 'Поездка во Вьетнам — это уникальная возможность погрузиться в динамично развивающийся рынок Юго-Восточной Азии. За 5 дней вы посетите деловые встречи с представителями торговых палат, локальными производителями и дистрибьюторами, узнаете о регуляторных особенностях ведения бизнеса и построите контакты для долгосрочного партнёрства.',
    includes: [
      'Медийное сопровождение',
      'Бизнес-сессии, нетворкинг',
      'Культурные мероприятия',
      'Проживание в отеле 5*',
      'Трансферы вип-класса',
      'Питание',
    ],
    // additionalInfo: 'Мы полностью берём на себя организацию экспедиции и решение всех операционных вопросов. Вы занимаетесь бизнесом и нетворкингом - обо всём остальном позаботится команда FExperience.',
    showDatesInMenu: true,
    // ВКЛЮЧИТЬ ТАЙМЕР ВЬЕТНАМА: поменять enabled на true.
    // Дата уже стоит (= startDate). Блок на странице подхватится сам.
    timer: {
    enabled: false,
    targetDate: '2027-03-14T00:00:00Z', // = startDate экспедиции
    label: 'До старта экспедиции во Вьетнам',
  },
  //  generalPartner: {
  //   name: 'Название партнёра',
  //   logo: '/images/partners/partner-logo.svg', // путь к картинке
  // },

  },
  {
    slug: 'morocco',
    title: 'Экспедиция с Forbes в Марокко',
    country: 'Марокко',
    region: 'africa',
    industries: ['Логистика и торговля', 'Финансы и инвестиции'],
    dates: '15-21 февраля 2025',
    status: 'completed',
    description: 'Северная Африка как хаб для бизнеса: логистика, торговля, инвестиции. Встречи с регуляторами и локальными партнёрами.',
    image: '/images/expeditions/morocco.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    speakersCount: 10,
    duration: '5',
    programSlug: 'morocco-program',
    rubrics: { enabled: true },
    price: 'По запросу',
    spots: 0,
    fullDescription: 'Марокко — стратегические ворота в Африку и Европу. Экспедиция позволила участникам оценить логистические возможности, налоговые режимы и потенциал для совместных проектов.',
    includes: [
      'Проживание в бутик-отеле (6 ночей)',
      'Бизнес-сессии и встречи с регуляторами',
      'Трансферы и культурная программа',
      'Питание по программе',
      'Медийное сопровождение',
    ],
    showDatesInMenu: false,
    // Эксперты на завершённых пока скрыты; вернуть — убрать флаг
    // или указать speakersSourceSlug (например, 'south-africa').
    showSpeakers: false,
    recapTitle: 'Экспедиция в Марокко 2025',
    recapMedia: {
      video: {
        embedUrl: 'https://vkvideo.ru/video_ext.php?oid=-11982368&id=456247728&hd=4',
        pageUrl: 'https://vk.com/video-11982368_456247728',
        poster: '/images/expeditions/morocco.jpg',
        title: 'Как прошла экспедиция в Марокко 2025',
      },
      photos: [
        '/images/expeditions/morocco.jpg',
        '/images/articles/marocco2.webp',
      ],
    },
  },
  {
    slug: 'south-africa-2025',
    title: 'Бизнес-экспедиция с Forbes в ЮАР 2025',
    country: 'ЮАР',
    region: 'africa',
    city: '',
    industries: ['Энергетика и ресурсы', 'Агропром'],
    dates: '19-25 октября 2025',
    status: 'completed',
    description: 'Завершённая экспедиция в ЮАР',
    image: '/images/program/UarDay4.webp',
    heroSketch: '/images/expeditions/UAR-bgExpeditions.webp',
    includedImage: '/images/expeditions/whatsIncluded3.webp',
    duration: '',
    fullDescription: 'Экспедиция прошла в октябре 2025 года. Участники познакомились с бизнес-климатом ЮАР изнутри: встречи с предпринимателями и представителями торговых палат, посещение производств, обсуждение выхода на рынок и нетворкинг с локальным деловым сообществом.',
    includes: [
      'Медийное сопровождение',
      'Бизнес-сессии, нетворкинг',
      'Культурные мероприятия',
      'Проживание в отеле 5*',
      'Трансферы вип-класса',
      'Питание',
    ],
    showDatesInMenu: false,
    showSpeakers: false,
    recapTitle: 'Экспедиция в ЮАР 2025',
    recapMedia: {
      video: {
        embedUrl: 'https://vkvideo.ru/video_ext.php?oid=-11982368&id=456248133&hd=4',
        pageUrl: 'https://vk.com/video-11982368_456248133',
        poster: '/images/program/UarDay1.webp',
        title: 'Как прошла экспедиция в ЮАР 2025',
      },
      photos: [
        '/images/program/UarDay2.webp',
        '/images/program/UarDay3.webp',
        '/images/program/UarDay4.webp',
        '/images/program/UarDay5.1.webp',
        '/images/program/UarDay6.webp',
        '/images/program/south-africa-day1.webp',
      ],
    },
  },
  // {
  //   slug: 'uae',
  //   title: 'Экспедиция с Forbes в ОАЭ',
  //   country: 'ОАЭ',
  //   dates: 'Q2 2027',
  //   status: 'upcoming',
  //   description: 'Ближний Восток: финансовые хабы, свободные зоны, новые возможности для российского бизнеса. Встречи с представителями свободных экономических зон.',
  //   image: '/images/expeditions/uae.jpg',
  //   rubrics: { enabled: true },
  //   price: 'от 520 000 ₽',
  //   spots: 30,
  //   fullDescription: 'ОАЭ — глобальный финансовый и логистический хаб. Экспедиция сфокусирована на возможностях свободных зон, банковского сектора и инвестиционных инструментах для российского бизнеса.',
  //   includes: [
  //     'Проживание в отеле 5* (6 ночей)',
  //     'Встречи с представителями свободных зон',
  //     'Бизнес-сессии с финансовыми экспертами',
  //     'Трансферы и культурная программа',
  //     'Медийное сопровождение в Forbes',
  //   ],
  // },

  // 🆕 Новые экспедиции со статусом "Скоро"
  { slug: 'sakhalin', title: 'Бизнес-экспедиция с Forbes на Сахалин', country: 'Сахалин', region: 'russia', dates: '', status: 'upcoming', description: 'Дальний Восток: ресурсы, логистика, выход на азиатские рынки.', industries: ['Энергетика и ресурсы', 'Логистика и торговля'], image: '/images/expeditions/sakhalin.webp', heroSketch: '/images/expeditions/Sakhalin-bgExpeditions.webp', rubrics: { enabled: true }, price: 'уточняется', programSlug: '', fullDescription: '', includes: [] },
  { slug: 'india', title: 'Бизнес-экспедиция с Forbes в Индию', country: 'Индия', region: 'asia', dates: '', status: 'upcoming', description: 'Южная Азия: IT, производство, фармацевтика.', industries: ['Технологии', 'Промышленность'], image: '/images/expeditions/india.webp', price: 'уточняется', fullDescription: '' },
  { slug: 'thailand', title: 'Бизнес-экспедиция с Forbes в Таиланд', country: 'Таиланд', region: 'asia', dates: '', status: 'upcoming', description: 'Тропический хаб: гостеприимство, агробизнес, технологии.', industries: ['Агропром', 'Технологии'], image: '/images/expeditions/thailand.webp', rubrics: { enabled: true }, price: 'уточняется', programSlug: '', fullDescription: '', includes: [] },
  { slug: 'indonesia', title: 'Бизнес-экспедиция с Forbes в Индонезию', country: 'Индонезия', region: 'asia', dates: '', status: 'upcoming', description: 'Архипелаг возможностей: сырьё, цифровая экономика.', industries: ['Энергетика и ресурсы', 'Технологии'], image: '/images/expeditions/indonesia.webp', rubrics: { enabled: true }, price: 'уточняется', programSlug: '', fullDescription: '', includes: [] },
  { slug: 'brazil', title: 'Бизнес-экспедиция с Forbes в Бразилию', country: 'Бразилия', region: 'latam', dates: '', status: 'upcoming', description: 'Латинская Америка: агросектор, энергетика, финансы.', industries: ['Агропром', 'Энергетика и ресурсы', 'Финансы и инвестиции'], image: '/images/expeditions/brazilD.webp', rubrics: { enabled: true }, price: 'уточняется', programSlug: '', fullDescription: '', includes: [] },
  { slug: 'kenya', title: 'Бизнес-экспедиция с Forbes в Кению', country: 'Кения', region: 'africa', dates: '', status: 'upcoming', description: 'Восточная Африка: финтех, логистика, стартапы.', industries: ['Финансы и инвестиции', 'Технологии', 'Логистика и торговля'], image: '/images/expeditions/kenyaD.webp', rubrics: { enabled: true }, price: 'уточняется', programSlug: '', fullDescription: '', includes: [] },
] as const;

// Общие тезисы hero детальной страницы — для всех экспедиций.
// Переопределить для конкретной экспедиции можно полем heroTheses.
export const DEFAULT_HERO_THESES: NonNullable<Expedition['heroTheses']> = [
  { title: 'Погружение', sub: 'в культуру' },
  { title: 'Эксклюзивный', sub: 'нетворкинг' },
  { title: 'Лучшие', sub: 'бизнес-практики' },
];

export function getNearestExpedition(list: readonly Expedition[] = expeditions): Expedition | undefined {
  const now = Date.now();
  const upcoming = list
    .filter(e => e.timer?.enabled && e.timer.targetDate)
    .map(e => ({ e, ts: new Date(e.timer!.targetDate).getTime() }))
    .filter(({ ts }) => ts >= now)
    .sort((a, b) => a.ts - b.ts);

  return upcoming[0]?.e;
}