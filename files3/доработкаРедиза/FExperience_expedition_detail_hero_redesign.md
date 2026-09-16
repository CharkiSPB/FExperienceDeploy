# FExperience — Детальная экспедиция: Hero: инструкция AI-агенту

## 0. Задача

Заменить текущий тёмный фото-Hero детальной страницы `/expeditions/[slug]`
на светлый editorial Hero по макетам A+B: слева breadcrumbs + H1 +
мета-строка (дата + города) + описание + ОДНА кнопка; справа — скетч
направления, растворённый в бумаге, с фирменной печатью в правом верхнем
углу.

Палитра — нейтральная бумага (palette/neutral-paper):
`--color-canvas` #F9EEE5, `--color-text-primary` #1A1A1A,
`--color-text-secondary` #6D6D6D, `--color-text-tertiary` #A0A0A0,
`--color-border` rgba(26,26,26,.08), orange `--color-brand-600` #FF6B2C.

ВАЖНО ПРО ИЗОБРАЖЕНИЕ: скетч используется ТОЛЬКО в Hero детальной
страницы. В карточках директории, превью экспедиций и любых других
местах остаются текущие изображения (`expedition.image` /
`expedition.imageEvening`) — НЕ заменять их скетчем.

## 1. Тексты и данные (не хардкодить)

- Breadcrumbs: `Главная / Экспедиции / {страна}`
  (ссылки: `/`, `/expeditions`; последний_crumb — без ссылки, orange).
- H1: `{title}` из данных — для ЮАР: `Бизнес-экспедиция с Forbes в ЮАР`.
- Мета-строка (две группы с иконками):
  - `Calendar` 16px + даты из данных (`startDate`/`endDate`, формат
    «15–21 ноября 2026»);
  - `MapPin` 16px + города из поля `city` («Кейптаун, Стелленбос»).
- Описание: `shortDescription` из данных.
- Кнопка: ОДНА — `Стать участником` (открывает существующий
  `RequestModal` через `ExpeditionContext`, пресет текущей экспедицией).
  Кнопки «Скачать программу» НЕТ.
- Тег-пилюли из старого Hero (ПОГРУЖЕНИЕ / НЕТВОРКИНГ / ПРАКТИКИ) в Hero
  НЕ переносятся — в макетах их нет.

## 2. Точные визуальные параметры

### Секция
```css
.expedition-hero {
  position: relative;
  background: var(--color-canvas);      /* #F9EEE5 */
  padding: 40px 0 64px;
  overflow: hidden;
}
.expedition-hero__grid {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 64px;
  display: grid;
  grid-template-columns: 46fr 54fr;
  gap: 48px;
  align-items: center;
  min-height: 480px;
}
```

### Левая колонка
```css
.expedition-breadcrumbs {
  font: 400 13px HelveticaNeueCyr;
  color: var(--color-text-tertiary);
  margin-bottom: 24px;
}
.expedition-breadcrumbs a:hover { color: var(--color-brand-600); }
.expedition-breadcrumbs [aria-current] { color: var(--color-brand-600); }

.expedition-hero__title {
  font: 700 clamp(40px, 4.2vw, 60px)/1.08 var(--font-display);
  color: var(--color-text-primary);
  letter-spacing: -.02em;
  margin: 0 0 24px;
  max-width: 560px;
}
.expedition-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}
.expedition-hero__meta-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: 500 14px HelveticaNeueCyr;
  color: var(--color-text-secondary);
}
.expedition-hero__meta-item svg {
  width: 16px; height: 16px;
  stroke-width: 1.5;
  color: var(--color-text-tertiary);
}
.expedition-hero__desc {
  font: 400 15.5px/1.65 HelveticaNeueCyr;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin-bottom: 32px;
}
/* Единственная CTA — существующий .btn-liquid */
.expedition-hero__cta { /* btn-liquid, без изменений компонента */ }
```

### Правая колонка — изображение + печать
- Изображение: `/images/expeditions/UAR-bgExpeditions.webp` для
  `south-africa` через `next/image` (`quality 90`, alt «ЮАР — рельеф
  региона экспедиции»).
- Источник пути — поле данных `heroSketch`; для `south-africa` задать
  `/images/expeditions/UAR-bgExpeditions.webp`. Если у экспедиции поля
  `heroSketch` нет — fallback: `expedition.image` в той же композиции.
```css
.expedition-hero__sketch {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
}
.expedition-hero__sketch img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}
```
- Изображение без рамок, теней, скруглений и подложек — растворяется в бумаге.
- Печать — фирменный стандарт (как на главной и About):
  - 128px desktop / 92px mobile; `position: absolute; top: 0; right: 0;`
    внутри `.expedition-hero__sketch`; `z-index: 2`;
  - круг и текст по окружности `rgba(26,26,26,.55)`:
    `FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·`
    (ровно три повтора, круг замкнут);
  - центр: `F`, Playfair Display 700, `var(--color-brand-600)`;
  - без заливки, glow, теней, rotation.

### Анимации
- Левая колонка `.fade-up`; скетч `.fade-up .delay-2`;
  печать opacity 0→1 delay .35s. Hover отсутствует.

## 3. Логика статусов (одна кнопка во всех шаблонах)

- `active`: кнопка `Стать участником` → RequestModal (пресет экспедиции).
- `upcoming`: кнопка `Оставить заявку` → тот же RequestModal
  (lead-логика спеки 5.6); вторая кнопка НЕ добавляется.
- `completed`: кнопка в Hero отсутствует; вместо неё `.btn-text`
  `Смотреть активные экспедиции →` на `/expeditions`.
- Даты/города/описание — всегда из данных текущей экспедиции.

## 4. Что сохранить / не трогать

- Текущие изображения (`image` / `imageEvening`) в директории, превью и
  карточках — НЕ заменять скетчем.
- `RequestModal`, `ExpeditionContext`, JSON-LD разметку страницы.
- Глобальные Header/Footer; кнопка «Стать партнёром» в хедере детальных
  страниц (спека 10.4) — не трогать.
- Соседние блоки детальной страницы (программа, эксперты и т.д.) —
  собираются отдельными инструкциями.

## 5. Что запрещено

- Тёмный фото-Hero, оверлей-градиенты поверх фото, белый текст H1.
- Две кнопки; кнопка «Скачать программу».
- Тег-пилюли каскадом из старого Hero.
- Хардкод страны/дат/городов/описания — только `src/data`.
- Рамки/тени/скругления/подложки вокруг скетча.
- Печать с другим текстом, монограмма `FX`, оранжевый круг/текст по кругу.
- Старая персиковая палитра (#FFF1E5, #F2DFCE).
- Замена изображений в директории/превью на скетч.

## 6. Responsive

- ≤1024px: одна колонка — текст, ниже скетч (`aspect-ratio: 16 / 9`);
  печать 96px; padding-inline 32px; H1 40px.
- ≤640px: H1 34px; мета-строка столбцом (gap 12px); кнопка full-width;
  скетч `aspect-ratio: 4 / 3`; печать 80px.

## 7. Критерии готовности

Hero читается как титульный разворот экспедиции: breadcrumbs → крупный
Playfair H1 → дата и города с иконками → описание → одна оранжевая кнопка;
справа — скетч направления в бумаге с фирменной печатью в углу. Никакого
тёмного фото-фона, второй кнопки и тег-пилюль. В директории и превью —
прежние изображения.

## 8. Checklist

- [ ] Breadcrumbs `Главная / Экспедиции / {страна}`, последний crumb orange
- [ ] H1 из данных (`title`), Playfair 700, тёмный
- [ ] Мета: Calendar + даты, MapPin + города — из данных
- [ ] Описание = `shortDescription`
- [ ] ОДНА кнопка: `Стать участником` (active) / `Оставить заявку`
      (upcoming) / `.btn-text` (completed)
- [ ] Нет кнопки «Скачать программу» и тег-пилюль
- [ ] Скетч `/images/expeditions/UAR-bgExpeditions.webp` только в Hero
      детальной; fallback `expedition.image` при отсутствии `heroSketch`
- [ ] Директория/превью используют прежние изображения
- [ ] Печать 128px: круг+текст rgba(26,26,26,.55), три повтора
      `FORBES FEXPERIENCE ·`, центр `F` orange
- [ ] Фон `--color-canvas`; нет тёмного фона и оверлеев
- [ ] RequestModal открывается с пресетом экспедиции
- [ ] `.fade-up` + delay; без hover
- [ ] ≤1024px и ≤640px по разделу 6
- [ ] JSON-LD, Header/Footer, соседние блоки не изменены