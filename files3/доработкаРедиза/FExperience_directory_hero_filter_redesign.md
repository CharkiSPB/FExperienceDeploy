# FExperience — «Директория экспедиций»: Hero + фильтр регионов: инструкция AI-агенту

## 0. Задача

Собрать Hero страницы `/expeditions` по референсу ДиректорияЭкспедиций.jpg:
breadcrumbs, eyebrow `НАПРАВЛЕНИЯ`, H1 `Бизнес-экспедиции с Forbes`,
подстрока; справа — прозрачная карта мира из существующего файла и
фирменная круглая печать в правом верхнем углу. Под Hero — строка
фильтра регионов (только регионы, без отраслей).

Палитра — нейтральная бумага (palette/neutral-paper):
`--color-canvas` #F9EEE5, `--color-surface` #F1E3D8,
`--color-paper-muted` #E8DCD2, `--color-brand-600` #FF6B2C.
Старые персиковые #FFF1E5 / #F2DFCE НЕ использовать.

Тексты — ТОЛЬКО из раздела 1. Не переписывать.

## 1. Тексты — зафиксированы

- Breadcrumbs: `Главная / экспедиций`
- Eyebrow: `НАПРАВЛЕНИЯ`
- H1: `Бизнес-экспедиции с Forbes`
- Подстрока: `Эксклюзивные программы бизнес-экспедиций FExperience разрабатываются с учетом специфики каждого региона.`

Фильтр регионов (5 pills):
1. `Все регионы` — активная по умолчанию
2. `Африка`
3. `Азия`
4. `Латинская Америка`
5. `Россия`

## 2. Hero — точные параметры

### Секция
```css
.directory-hero {
  position: relative;
  background: var(--color-canvas);      /* #F9EEE5 */
  padding: 40px 0 56px;                 /* сверху под хедер + отступ до фильтра */
  overflow: hidden;
}
.directory-hero__grid {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 64px;
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 48px;
  align-items: center;
  min-height: 420px;
}
```

### Breadcrumbs
```css
.directory-breadcrumbs {
  font: 400 13px HelveticaNeueCyr;
  color: var(--color-text-tertiary);
  margin-bottom: 20px;
}
.directory-breadcrumbs a { color: var(--color-text-tertiary); }
.directory-breadcrumbs a:hover { color: var(--color-brand-600); }
.directory-breadcrumbs span[aria-current] { color: var(--color-text-secondary); }
```

### Eyebrow + H1 + подстрока
```css
.directory-eyebrow {
  font: 600 12px HelveticaNeueCyr;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--color-brand-600);
  margin-bottom: 16px;
}
.directory-title {
  font: 700 clamp(40px, 4.5vw, 64px)/1.05 var(--font-display);
  color: var(--color-text-primary);
  letter-spacing: -.02em;
  margin: 0 0 20px;
  max-width: 520px;
}
.directory-subtitle {
  font: 400 16px/1.65 HelveticaNeueCyr;
  color: var(--color-text-secondary);
  max-width: 460px;
}
```

### Карта мира — существующий webp с прозрачным фоном
- Файл: `/maps/cartaDirectoriaExpeditions.webp`
  (лежит в `public/maps/`; в Next.js импортируется как `/maps/...`)
- `next/image` с `priority` (above-the-fold):
```jsx
<Image
  src="/maps/cartaDirectoriaExpeditions.webp"
  alt="География бизнес-экспедиций FExperience"
  width={720}
  height={480}
  priority
  quality={90}
  className="directory-map__image"
/>
```
- Композиция:
```css
.directory-map {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  display: grid;
  place-items: center;
}
.directory-map__image {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}
```
- Карта не имеет рамок, теней, подложек и скруглений. Прозрачный фон
  файла сливается с `--color-canvas` секции.
- НЕ заменять этот файл на SVG-контур и не генерировать новую карту.

### Печать — правый верхний угол, поверх карты
- Круглая, полупрозрачная, editorial-штамп (тот же стандарт, что на
  главной и About):
- Размер 120px desktop / 88px mobile.
- Позиция: `position: absolute; top: 8px; right: 8px; z-index: 2;`
  (внутри `.directory-map`).
- Круговая линия 1px `rgba(26,26,26,.55)` (чёрная полупрозрачная).
- Текст по окружности (textPath, 10px, letter-spacing .18em,
  fill `rgba(26,26,26,.55)`):
  `FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·`
  (ровно три повтора, круг замкнут).
- Центр: только буква `F` (без `X`), Playfair Display 700,
  color `var(--color-brand-600)`.
- Без заливки, glow, теней, rotation.

### Появление
- Левая колонка: `.fade-up`; карта: `.fade-up .delay-2`;
  печать: opacity 0→1, delay .35s.
- Hover отсутствует.

## 3. Фильтр регионов — pills под Hero

НЕ карточки, НЕ стеклянные плашки, НЕ иконки внутри pills. Только
текстовые pills с hairline-рамкой и оранжевой активной.

```css
.directory-filter {
  background: var(--color-canvas);
  padding: 0 0 56px;                    /* воздух до сетки карточек */
}
.directory-filter__row {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 64px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.filter-pill {
  padding: 10px 22px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);          /* rgba(26,26,26,.08) */
  background: transparent;
  font: 500 14px HelveticaNeueCyr;
  color: var(--color-text-secondary);
  transition: all .2s var(--ease);
  cursor: pointer;
}
.filter-pill:hover {
  border-color: var(--color-brand-600);
  color: var(--color-brand-600);
}
.filter-pill.active {
  background: var(--color-brand-600);
  border-color: var(--color-brand-600);
  color: #fff;
}
```

### Логика фильтра
- Активный pill по умолчанию — `Все регионы` (показывает все карточки).
- State: `useState<'all' | 'africa' | 'asia' | 'latam' | 'russia'>('all')`.
- Значение фильтра пробрасывается вверх (в директорию) — карточки ниже
  фильтруются по полю `region` из `src/data/expeditions.ts`.
  Реализация фильтрации карточек — в отдельной инструкции по сетке
  карточек директории.
- На этом шаге filter-pill работает как контролируемый UI; фильтрация
  сетки добавится позже без правок стилей pills.

### Без отраслевого фильтра
В референсе отраслевых pills нет — их НЕ добавлять. Старый двухрядный
фильтр (регионы + отрасли) из текущей версии страницы — удалить.

## 4. Что сохранить

- URL страницы `/expeditions` и существующую маршрутизацию карточек.
- Данные экспедиций из `src/data/expeditions.ts` (регион = поле `region`
  `'africa' | 'asia' | 'latam' | 'russia'`).
- Глобальные Header/Footer.
- Соседние секции директории (сетка карточек, CTA-полоса) собираются
  отдельными инструкциями, здесь не трогать.

## 5. Что запрещено

- Переписывать/сокращать тексты раздела 1.
- Полноэкранный hero с видео; тёмный фон hero.
- Оранжевый H1 (H1 полностью тёмный, orange только в eyebrow).
- Отраслевой фильтр; иконки внутри pills.
- SVG-контур вместо существующего webp-файла карты.
- Рамки/тени/скругления/подложки вокруг карты.
- Печать с другим текстом (`FORBES EXPERIENCE` и т.п.), монограмма `FX`,
  оранжевый круг, оранжевый текст по окружности.
- Breadcrumbs вида `Главная / Экспедиции` (короткий вариант) — использовать
  полный `Главная / Директория экспедиций`.
- Старая персиковая палитра (#FFF1E5, #F2DFCE).
- Изменения соседних блоков и глобальных компонентов.

## 6. Responsive

- ≤1024px: `grid-template-columns: 1fr 1fr; gap: 32px;`
  печать 96px; padding инлайн 32px.
- ≤640px: одна колонка — сначала текст (breadcrumbs → eyebrow → H1 →
  подстрока), ниже карта (`aspect-ratio: 4 / 3`); печать 80px,
  `top: 4px; right: 4px`.
  Фильтр: pills flex-wrap, padding инлайн 24px.
  H1 36px, подстрока 15px.

## 7. Критерии готовности

Hero читается как журнальный opener директории: слева breadcrumbs +
eyebrow + крупный Playfair-заголовок + подстрока, справа — лёгкая
прозрачная карта мира с фирменной печатью в углу. Под Hero — аккуратная
строка region-pills с активной оранжевой. Нет тёмного фона, нет видео,
нет отраслевого фильтра, нет старой персиковой палитры.

## 8. Checklist

- [ ] Breadcrumbs `Главная / Директория экспедиций`
- [ ] Eyebrow `НАПРАВЛЕНИЯ` — orange
- [ ] H1 `Бизнес-экспедиции с Forbes` — Playfair 700, тёмный, clamp до 64px
- [ ] Подстрока посимвольно, secondary, max-width 460px
- [ ] Карта `/maps/cartaDirectoriaExpeditions.webp` через `next/image`,
      `priority`, без рамок/теней/подложек
- [ ] Печать 120px в правом верхнем углу карты: круг и текст
      `rgba(26,26,26,.55)`, три повтора `FORBES FEXPERIENCE ·`,
      центр `F` — `--color-brand-600`
- [ ] Фильтр: 5 pills (`Все регионы`, `Африка`, `Азия`,
      `Латинская Америка`, `Россия`)
- [ ] Активный pill: `Все регионы` по умолчанию; стиль active —
      orange fill + белый текст
- [ ] Отраслевой фильтр НЕ добавлен
- [ ] Фон hero и фильтра `--color-canvas` (#F9EEE5)
- [ ] State фильтра пробрасывается для сетки карточек
- [ ] `.fade-up` + delay на колонках; без hover
- [ ] ≤1024px: 1fr 1fr; ≤640px: стек, печать 80px
- [ ] Палитра — только новые neutral-paper токены
- [ ] Соседние секции директории не изменены