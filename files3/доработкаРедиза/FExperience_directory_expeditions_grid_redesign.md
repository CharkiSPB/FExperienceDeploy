# FExperience — «Директория»: статус-строка + сетка карточек экспедиций: инструкция AI-агенту

## 0. Задача

Собрать секцию экспедиций страницы `/expeditions` под фильтр-блок:
статус-строка «АКТИВНЫЕ NN — сейчас» с горизонтальной hairline (как на
текущем сайте) + единая сетка фото-карточек по референсу
ДиректорияЭкспедиций.jpg: активные первыми, остальные следом.

Палитра — нейтральная бумага (palette/neutral-paper):
фон секции `--color-canvas` #F9EEE5; hairline `--color-border`
rgba(26,26,26,.08); оранжевый `--color-brand-600` #FF6B2C.

## 1. Данные и логика (не хардкодить)

Источник: `src/data/expeditions.ts`. В сетку попадают записи со статусом
`active` и `upcoming`. `completed` (Марокко) в сетку НЕ попадает
(архив — отдельный блок, собирается отдельной инструкцией).

Порядок карточек:
1. `active` — первыми, сортировка по `startDate` по возрастанию.
2. `upcoming` — следом, в порядке данных.

Текущий ожидаемый состав (сверка, не хардкод):
- АКТИВНА: `ЮАР` — 15–21 ноября 2026
- АКТИВНА: `Вьетнам` — 14–20 марта 2027
- СКОРО: `Бразилия`, `Индия`, `Индонезия`, `Кения`, `Сахалин`, `Таиланд`

Региональный фильтр из Hero-инструкции применяется к этой сетке
(фильтрует по полю `region`).

## 2. Статус-строка «АКТИВНЫЕ NN — сейчас»

Сохраняется с текущего сайта: заголовок + динамическое число +
горизонтальная линия под строкой.

```css
.directory-status {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 56px 0 20px;
  border-bottom: 1px solid var(--color-border);   /* линия под строкой */
}
.directory-status__title {
  font: 700 14px HelveticaNeueCyr;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}
.directory-status__count {
  font: 400 13px HelveticaNeueCyr;
  color: var(--color-text-tertiary);
}
```
- Число = количество `active` в ТЕКУЩЕЙ выборке (с учётом фильтра региона),
  формат с ведущим нулём: `String(n).padStart(2, '0')` + ` — сейчас`.
  Сейчас без фильтра: `02 — сейчас`. Будет одна активная: `01 — сейчас`.
- Если активных в выборке 0 — строка скрывается целиком (вместе с линией).
- НЕ хардкодить «02».

## 3. Сетка карточек

```css
.directory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 40px 0 96px;
}
.exp-card {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  isolation: isolate;
}
.exp-card__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .5s var(--ease);
}
.exp-card:hover .exp-card__img { transform: scale(1.04); }
.exp-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    180deg,
    rgba(26,26,26,0) 42%,
    rgba(26,26,26,.72) 100%
  );
  pointer-events: none;
}
```

### Бейдж статуса — верхний левый угол, ТОЛЬКО у active
```css
.exp-card__badge {
  position: absolute; top: 16px; left: 16px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: var(--color-brand-600);      /* фирменный оранжевый */
  color: #fff;
  font: 600 11px HelveticaNeueCyr;
  letter-spacing: .06em;
  text-transform: uppercase;
}
```
- У `active`: бейдж `АКТИВНА`.
- У `upcoming`: бейджа в углу НЕТ — статус живёт в строке даты (ниже).

### Контент карточки (низ, поверх градиента)
```css
.exp-card__content {
  position: absolute; left: 20px; right: 20px; bottom: 18px;
  z-index: 2;
}
.exp-card__region {
  font: 600 11px HelveticaNeueCyr;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,255,255,.6);
  margin-bottom: 8px;
}
.exp-card__name {
  font: 600 28px/1.15 var(--font-display);
  color: #fff;
}
.exp-card__foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}
.exp-card__date {
  font: 500 13px HelveticaNeueCyr;
  letter-spacing: .02em;
  color: rgba(255,255,255,.78);
}
/* у upcoming вместо даты — статус */
.exp-card__date--soon {
  text-transform: uppercase;
  letter-spacing: .06em;
  color: rgba(255,255,255,.6);
}
.exp-card__arrow {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(26,26,26,.45);
  border: 1px solid rgba(255,255,255,.25);
  backdrop-filter: blur(8px);
  color: #fff;
  display: grid; place-items: center;
  flex-shrink: 0;
  transition: background .3s, border-color .3s;
}
.exp-card:hover .exp-card__arrow {
  background: var(--color-brand-600);
  border-color: transparent;
}
```
- Регион карточки — текстовая мета над названием (АФРИКА / АЗИЯ /
  ЛАТИНСКАЯ АМЕРИКА / РОССИЯ), не пилюля.
- Дата у `active` — из данных (`startDate`/`endDate`), формат
  «15–21 ноября 2026». У `upcoming` — текст `СКОРО` вместо даты.
- Вся карточка — ссылка на `/expeditions/[slug]`.

### Анимации
- Карточки: `.fade-up` + `.delay-1…6` циклически.
- Hover: только zoom фото 1.04 и подсветка стрелки; без translateY.

## 4. Responsive

- ≤1024px: `grid-template-columns: repeat(2, 1fr);`
- ≤640px: одна колонка; `aspect-ratio: 4 / 3;` имя 24px.
- Статус-строка сохраняется на всех брейкпоинтах.

## 5. Что сохранить / не трогать

- Hero директории и фильтр регионов (отдельная инструкция) — не трогать.
- Старые отдельные секции-списки «СКОРО» и «АРХИВ» с текущей страницы
  в этой инструкции НЕ воссоздавать: upcoming живут в общей сетке,
  archived — отдельный блок позже.
- Данные и маршрутизацию (`/expeditions/[slug]`).
- Глобальные Header/Footer.

## 6. Что запрещено

- Хардкод списка экспедиций, дат и числа «02» — всё из `src/data`.
- Бейдж «АКТИВНА» не оранжевый / бейдж у upcoming-карточек.
- Дата у upcoming-карточек (вместо неё — `СКОРО`).
- Включение `completed` в сетку.
- Карточки-карточки: белый фон, рамки, тени, radius > 16px.
- Отдельные списки СКОРО/АРХИВ внутри этой секции.
- Hover-подъём карточек; glow; неон.
- Изменения соседних блоков.

## 7. Критерии готовности

Строка «АКТИВНЫЕ 02 — сейчас» с hairline открывается секцией; ниже —
плотная сетка 3×N фото-карточек: две активные с оранжевым бейджем и датами
первыми, шесть «скоро» со статусом вместо даты. Фильтр региона сужает
сетку и число в статус-строке. Никаких дублирующих списков и хардкода.

## 8. Checklist

- [ ] Статус-строка: `АКТИВНЫЕ` + `NN — сейчас` + hairline снизу
- [ ] Число динамическое, padStart(2,'0'); при 0 активных строка скрыта
- [ ] Сетка: active (по дате) → upcoming (порядок данных); completed вне сетки
- [ ] 8 карточек при полном фильтре (2 active + 6 upcoming)
- [ ] У active: бейдж `АКТИВНА` (brand-600, белый текст) в верхнем левом углу
- [ ] У active: дата «15–21 ноября 2026» / «14–20 марта 2027» из данных
- [ ] У upcoming: вместо даты `СКОРО`, углового бейджа нет
- [ ] Регион — текстовая мета над названием, не пилюля
- [ ] Круглая стрелка 40px внизу справа; hover → brand-600
- [ ] Hover: zoom фото 1.04, без translateY
- [ ] Фильтр региона фильтрует сетку и число в статус-строке
- [ ] 3 колонки desktop / 2 tablet / 1 mobile
- [ ] `.fade-up` + stagger
- [ ] Соседние блоки и списки СКОРО/АРХИВ не тронуты