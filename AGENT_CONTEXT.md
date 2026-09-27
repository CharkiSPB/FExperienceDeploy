# Контекст проекта FExperience — для ИИ-агентов

> Бортовой журнал: карта кодовой базы, принятые решения С константами и причинами,
> грабли с командами диагностики, схема деплоя. Прочитай целиком + `DEPLOY.md`
> перед любой задачей. Без секретов — можно хранить в репо.
> Ветки: `redesign` (работа/превью), `main` деплой-репо (прод), `main-backup*` (откаты).

## 0. TL;DR для быстрого старта

- Сайт: `fexperience/`, Next.js 16.2.4 + React 19 + Tailwind v4 CSS-first, TS strict.
  Прод `https://fexperience.forbes.ru` (RelaxDev, автодеплой из `FExperienceDeploy`,
  там только `fexperience/`). Синк машин — `FExperienceRediz`.
- Весь визуал — `src/app/globals.css` (~5200 строк). Данные — `src/data/*` (SoT).
  Заявки: модалки → `POST /api/lead` → AmoCRM (если задан) → SMTP на `MAIL_TO`.
- Проверки: `npx tsc --noEmit`, `npm run build`, скриншоты Playwright через dev-сервер.
- Git: точечный `add`, никаких `add -A` на `redesign` (рядом untracked `files3/`),
  после мержа грепать `<<<<<<<` по `src` И `public`.

## 1. Карта кодовой базы (что где лежит)

```
fexperience/src/
  app/
    page.tsx              главная: Hero + 10 секций (половина через dynamic)
    layout.tsx            шрифты (Philosopher/Helvetica/GoodVibes), metadataBase, YandexMetrika
    globals.css           ВСЯ дизайн-система (~5200 строк, диапазоны ниже)
    about/AboutContent.tsx + page.tsx   страница «О нас» (hero, методология, diff, эксперты)
    expeditions/page.tsx              каталог (hero + фильтр + сетка + архив)
    expeditions/[slug]/page.tsx       деталка: Hero → Program → Included → Experts → Countdown
    expeditions/[slug]/program/page.tsx
    articles/[slug]/page.tsx + page.tsx + ArticlesGrid/Filters  (данные из .mdx через lib/mdx)
    speakers/ privacy/ terms/
    api/lead/route.ts     единственный API: zod-схемы ×3, rate limit, MX-check, Amo, email
    robots.ts / sitemap.ts  (домен ТОЛЬКО fexperience.forbes.ru; статьи — из .mdx, см. §5)
  components/
    sections/Hero.tsx             главный слайдер (Embla; ВИДЕО ЗАКОММЕНТИРОВАНО — still-кадры, см. §3)
    sections/RegionSelector.tsx + .css   регионы 4-в-ряд (не 2×2 из спек — так решили)
    sections/ExpeditionHero/Program/Included/Experts.tsx  деталка
    sections/ExpeditionsDirectory.tsx  каталог (своя печать directory-seal)
    sections/{MarketReality,PlatformStatement,FeaturedMarkets,PositionManifesto,
      WhyFExperience,MediaCoverage,Reviews,FAQ,FinalCTA}.tsx
    layout/Header.tsx (2 модалки + бургер; CTA showJoin зависит от .hero-slider/.final-cta в DOM)
    layout/Footer.tsx (Newsletter шлёт subscribe в /api/lead) + RootClientLayout.tsx
    shared/RequestModal.tsx (участник, 50/50 с ModalAside) — ОТПРАВКА ВКЛЮЧЕНА (была демо-заглушка!)
    shared/PartnerModal.tsx (партнёр) + ParticipantModal.tsx (z-60, другой стек!) + ModalAside.tsx
    shared/CountdownTimer.tsx (variant только 'homepage') + CookieBanner + Preloader
    maps/{Africa,Asia,Latam,Russia}Map.tsx
  data/expeditions.ts  (slug/country/status/даты/heroVideo/heroPoster/heroPills/includes/
                        timer/includedImage + DEFAULT_HERO_THESES + getNearestExpedition)
  data/speakers.ts     (photo/photoScale/isForbes/forbesBadge/expeditionSlugs; есть дубль id:2!)
  data/{regions,program,contacts,faq,reviews,config,articles/articles/index}.ts
  lib/mail.ts          (clean/esc, buildSubject/buildHtml, SMTP Yandex 465, TLS strict)
  lib/mdx.ts           (getArticles/getArticleBySlug/getAllArticleSlugs — fs, только build/server)
  hooks/useScrollReveal.ts (докласс .visible) + useCountUp.ts
  config/expeditionEditorial.ts
```

Диапазоны `globals.css`: токены 1–138 → кнопки 171–312 → glass 314–392 →
header 734–808 → hero 843–1422 → countdown 1841–2026 → directory 3415–3785 →
detail 3998–4643 (hero 3998–, included ~4530–, experts ~4680–) → модалки 4653–конец.

## 2. Критические механики (как устроено, с константами)

### 2.1. Hero главной: still-кадры вместо видео
Видео закомментировано в `Hero.tsx` (инструкция возврата — в комментарии рядом).
`HERO_STILLS = { 'south-africa': '/images/expeditions/south-africaC.webp',
vietnam: '/videos/VietnamMen.webp' }` (да, webp лежит в `videos/` — так задумано).
Desktop показывает `.hero-slide__poster--desktop`, mobile — обычный постер
(в медиа `@media 767` desktop-still скрыт). Вертикальным кадрам НЕ ставить contain
без подложки — будет плашка; cover режет (~11% при 2:3 в слоте 3:4 — приемлемо).

### 2.2. Маска hero деталки (урок: переход — ВСЕГДА одним слоем!)
Два слоя с разными концами = видимый шов. Финал (`globals.css` ~4016):
`mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,.10) 6%,
rgba(0,0,0,.40) 11%, rgba(0,0,0,.70) 16%, rgba(0,0,0,.88) 21%, #000 28%)`,
контейнер `left: 32%`. Печать на стыке (`top 60% / left 6%`).

### 2.3. Блок «Что включено»: точки + коллаж
- Точки якорятся на КОЛОНКУ (`li::after`, не на текст!) — иначе пляшут при разной длине строк.
- Колонки НЕравномерные: `25.5% 18.3% 13.5% 14.5% 17.8% 10.4%` — замер белых
  разделителей коллажа, `gap: 0` (любой gap ломает привязку). Ряд ВНЕ контейнера
  (full-bleed, как картинка) — иначе системы координат не совпадают.
- Ровно 2 строки текста — делает `splitTwoLines()` в компоненте (половина по символам),
  НЕ CSS (`max-width: Nch` давал 3 строки).
- Картинка на экспедицию: поле `includedImage` в данных (`vietnam → whatsIncludedVietnam`,
  `south-africa → whatsIncluded3`, дефолт whatsIncluded3). Размеры в `Image` обязаны
  совпадать с реальными (иначе сплющивание!) — проверять через PIL.
- Планшет ≤1024: сетка 3×2, точки скрыты. Мобильный: картинка скрыта, вертикальный
  таймлайн (бордер слева + точки). Ловушка: `display:none` планшета перебивает мобильное
  (та же специфичность!) — в мобильном явно `display:block`.

### 2.4. Печати (6 шт.: Hero, деталка, about, каталог, платформа, модалка)
Текст был длиннее окружности → «FEXPE». Везде `textLength={465}` (`r=74`; у Hero
`r=76` → 478) + `lengthAdjust="spacing"`. Центр — кроп `F_logo.svg` (`width=1971`
в `viewBox 320`). Файл логотипа общий — битый SVG = пустые центры ВЕЗДЕ.

### 2.5. Теги вместо пилюль (Hero 4 шт., Platform 3 шт.)
Классы НЕ переименовывали (минимум диффа): визуал plain-текст, lowercase через CSS
(данные целы), `#` отдельным оранжевым спаном. Сетка hero: `gap: 18px 28px`.
Мобильный hero: тезисы абсолютом справа поверх фото (`top 104px, left 100%+10px,
width 36vw`, column) + `text-shadow` для читаемости.

### 2.6. Модалки заявок: поток и грабли
- `RequestModal` (участник): отправка была ОТКЛЮЧЕНА «для демо» с фейковым успехом —
  главный урок: «отправляется, но не приходит» → читать `onSubmit` первым делом.
  Сейчас: реальный `fetch /api/lead {formType:'participant', ...}`, ошибки сервера
  показываются текстом. Фото слева = по слагу страницы из ВСЕХ экспедиций
  (было только active → upcoming показывали ЮАР); селект включает страницу даже
  при `upcoming`; пустые даты рендерятся без «—».
- `PartnerModal` (партнёр, `formType:'partner'`), `ParticipantModal` (z-60, свой стек,
  localStorage-антидубль — не защита). До 3 `RequestModal` в дереве (Header+Hero+layout).
- z-порядок: header/menu 50 < participant 60 < cookie 100 < request/partner 200.
- `/api/lead`: zod `.min/.max` (имена 150, компании 200, телефон 10–30, email ≤254);
  in-memory троттлинг 10/IP/10мин → 429; webhook ТОЛЬКО `https://`;
  400 отдаёт одно сообщение (не `issues` целиком); MX-check email fail-open
  (режем только «нет ни MX, ни A», таймаут 3с → пропуск).
- `mail.ts`: `clean()` (снос `\r\n` — header injection) + `esc()` (HTML в теле);
  subject «Новая заявка участника/партнёра: Имя» / «Новая подписка: email»;
  SMTP Yandex 465, `rejectUnauthorized: true`; ошибки — warn, API всё равно 200.
- Подписка футера: `formType:'subscribe'`, без чекбокса согласия (дизайн не трогали).

### 2.7. Фото команды: бокс 3:4 + `object-position: top` + `quality={90}`
Штриховка сыплется на q75 → 90. Кроп определяется ПРОПОРЦИЕЙ, не размером
(бокс 0.75: оригинал 0.72 → кроп 4%, новый 0.67 → 11%). Персональный зум —
`photoScale` в данных → CSS-переменная `--photo-zoom` (ховер preserved через calc);
на боксе `overflow:hidden`, иначе зум лезет на текст (было!).

### 2.8. Прочее точечное
- Табы программы mobile: `overflow-x:auto` + mask-фейд справа (affordance).
- `sitemap.ts` — `async`, статьи из `getArticles()` (.mdx), НЕ из мёртвого хардкода;
  домен везде `https://fexperience.forbes.ru` (layout, sitemap, robots, config).
  301: `/expeditions/new-delhi → /india` в `next.config.ts`.
- Кнопка «Стать партнёром»: белый текст только поверх тёмного hero (`overDarkHero`),
  иначе тёмный; бордер всегда `brand-600` (классы `--brand/--on-dark`).
- Тезисы hero деталки закомментированы (спека запрещает); sitemap upcoming не индексирует.

## 3. Диагностика (команды, проверено в бою)

- Маркеры после мержа: `Get-ChildItem src,public -Recurse | Select-String '^<<<<<<< '`
  (проверять И public — `F_logo.svg` с маркерами = пустые печати везде).
- Зомби node: `Get-Process node | ? StartTime -gt (Get-Date).AddHours(-3) | Stop-Process -Force`
  (иначе скринишь СТАРЫЙ код с висящего dev-сервера — было трижды!).
- Реальный vs файловый CSS: computed через evaluate
  (`getComputedStyle(el).height`, `getComputedStyle(el,'::after').display`) —
  файл может врать при залипшем HMR; лечится сносом `.next` + `Ctrl+F5`.
- Скриншоты: dev-сервер + `preloader div.z-[100]` удалить + `.fade-up → .visible` +
  проскроллить страницу stepwise (иначе reveal-зоны пустые в fullPage).
- Референсы картинок: `git ls-files <path>` (404 на проде, если файл не в гите!);
  размеры — PIL; `width/height` в `Image` = реальным.
- Отправки: смотреть терминал dev (`[mail] ...`), письма — в `MAIL_TO` из `.env.local`
  (gitignored!). Тестовые письма удалять из ящика.
- Merge: `git config core.fileMode false`; дифф только `git diff --ignore-cr-at-eol`
  (иначе шум CRLF/LF + `644→755`); `add/add` бинарников → `--theirs`;
  истории неродственные → только force-push (см. DEPLOY.md).
- Порты тестовых серверов: 3100+ по порядку, гасить после (`Get-NetTCPConnection -LocalPort`).

## 4. Что НЕ делать (платные уроки)

1. Два слоя перехода вместо одного (шов). 2. Якорь точек на текст (пляска).
3. `gap` в привязанной сетке. 4. Переносы через CSS вместо кода (3 строки).
5. `flex-1` во flex-колонке (съедает height — поле схлопнулось до 19px!).
6. `add -A` на `redesign` (утянет untracked `files3/` в публичный деплой-репо).
7. Пуш в `main` без превью. 8. Тестовые заявки на превью/проде (валятся на реальный ящик).
9. Новые картинки без `git ls-files`-проверки и сверки размеров. 10. Додумывать —
   сначала computed/grep/скрин.

## 5. Долги (не блокеры релиза)

- Чекбокс/согласие в подвале подписки (152-ФЗ); кнопка «Отклонить» в CookieBanner
  сейчас = «Принять» (пишет `accepted=true`); капчи нет (троттлинга хватает пока);
  CSP не вводим (убьёт инлайн Метрики); при переезде статей на CMS включить
  `rehype-sanitize` (пакет уже в зависимостях!); в `speakers.ts` дубль `id: 2`.
