# FExperience — «О нас»: Hero + полоса 4 колонок: инструкция AI-агенту

## 0. Задача

Заменить текущий центрированный Hero страницы `/about` на editorial split
по референсу ОНас.png: слева breadcrumbs + крупное «О нас» + statement +
абзац; справа — скетч из `images/about/FonHeroAbout.webp` и круглая печать
в правом верхнем углу. Под Hero — полоса из четырёх колонок
(миссия / для кого / подход / ценности) с line-иконками и вертикальными
hairline-разделителями.

Палитра — НОВАЯ нейтральная бумага (ветка palette/neutral-paper):
--color-canvas #F9EEE5, --color-surface #F1E3D8, --color-elevated #FFF8F3,
--color-paper-light #FCF7F2, --color-paper-dark #272421,
--color-paper-muted #E8DCD2, --color-border rgba(26,26,26,.08).
Старые персиковые #FFF1E5 / #F2DFCE НЕ использовать.
Оранжевый акцент — фирменный `--color-brand-600` (#FF6B2C).

Тексты — ТОЛЬКО из раздела 1 (посимвольно из референса). Не переписывать.

## 1. Тексты — зафиксированы

- Breadcrumbs: `Главная / О нас`
- H1: `О нас`
- Statement: `FExperience — деловые экспедиции для предпринимателей и лидеров, которые создают будущее.`
  (`FExperience` — оранжевый, остальное — тёмный)
- Абзац: `Мы объединяем бизнес, знания и новые географии, чтобы вы могли увидеть мир шире, найти сильных партнёров и принять решения, которые меняют ваш бизнес.`

Четыре колонки (заголовок + описание):
1. `Наша миссия` — `Помогать предпринимателям принимать смелые решения и находить возможности там, где другие их не видят.`
2. `Для кого` — `Для собственников бизнеса, инвесторов и топ-менеджеров, ориентированных на рост и новые рынки.`
3. `Наш подход` — `Экспедиционный формат, локальная экспертиза и глубокое погружение в деловую среду каждого региона.`
4. `Наши ценности` — `Экспертность, открытость, партнёрство и результат, который остаётся с вами надолго.`

## 2. Hero — точные параметры

```css
.about-hero {
  position: relative;
  background: var(--color-canvas);      /* #F9EEE5 */
  overflow: hidden;
  padding: 40px 0 64px;
}
.about-hero__grid {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 64px;
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 48px;
  align-items: center;
}
.about-breadcrumbs { font: 400 13px HelveticaNeueCyr; color: var(--color-text-tertiary); }
.about-breadcrumbs span[aria-current] { color: var(--color-text-secondary); }

.about-hero__title {
  font: 700 clamp(56px, 6.5vw, 92px)/1.05 var(--font-display);
  color: var(--color-text-primary);
  letter-spacing: -.02em;
  margin: 24px 0 32px;
}
.about-hero__statement {
  font: 600 clamp(20px, 1.8vw, 26px)/1.35 var(--font-display);
  color: var(--color-text-primary);
  max-width: 480px;
}
.about-hero__statement .accent { color: var(--color-brand-600); }
.about-hero__text {
  margin-top: 24px;
  font: 400 15.5px/1.65 HelveticaNeueCyr;
  color: var(--color-text-secondary);
  max-width: 460px;
}
```

### Скетч справа
- Файл: `/images/about/FonHeroAbout.webp` через `next/image`
  (`quality 85`, `priority` не обязателен — не LCP-первый элемент, но
  above-the-fold → `priority` допустим).
- Правая колонка: изображение во всю ширину колонки, `object-fit: contain`,
  без border-radius, без теней, без рамок и подложек — скетч должен
  растворяться в бумаге, как на референсе.
- Допускается легкий выход за правую границу контейнера
  (`margin-right: -64px` на desktop), если файл это композиционно
  поддерживает; не обязателен.

### Печать (правый верхний угол, поверх скетча)
- Круглая, полупрозрачная, editorial-штамп — тот же стандарт, что на
  главной: круг и текст по окружности — `rgba(26,26,26,.55)`; в центре `F`,
  Playfair Display 700, `var(--color-brand-600)`.
- Текст по окружности (textPath, 10px, letter-spacing .18em):
  `FORBES FEXPERIENCE · FORBES FEXPERIENCE · FORBES FEXPERIENCE ·`
  (ровно три повтора, круг замкнут).
- Размер 132px desktop / 96px mobile.
- Позиция: `position: absolute; top: 40px; right: 56px; z-index: 2;`
  поверх скетча, не перекрывает текст левой колонки.
- Без заливки, glow, теней, rotation.

## 3. Полоса 4 колонок под Hero

НЕ карточки: без background, border-radius, box-shadow. Четыре колонки,
разделённые вертикальными hairline, на втором бумажном слое.

```css
.about-mission {
  background: var(--color-surface);            /* #F1E3D8 */
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.about-mission__grid {
  max-width: 1280px;
  margin: 0 auto;
  padding: 56px 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.about-mission__col { padding: 0 32px; }
.about-mission__col:first-child { padding-left: 0; }
.about-mission__col:last-child  { padding-right: 0; }
.about-mission__col + .about-mission__col {
  border-left: 1px solid var(--color-border);
}
.mission-head { display: flex; align-items: center; gap: 14px; }
.mission-head svg {
  width: 28px; height: 28px;
  stroke-width: 1.25; fill: none;
  color: var(--color-text-primary);
  opacity: .8;
  flex-shrink: 0;
}
.mission-title { font: 600 18px/1.2 var(--font-display); color: var(--color-text-primary); }
.mission-desc  {
  margin-top: 14px;
  font: 400 13.5px/1.6 HelveticaNeueCyr;
  color: var(--color-text-secondary);
}
```
Описание начинается от левого края колонки (выравнивание по иконке),
как на референсе.

Иконки (Lucide, единый линейный стиль):
- Наша миссия — `Compass`
- Для кого — `Users`
- Наш подход — `Globe`
- Наши ценности — `Mountain` (гора с флажком на референсе; если нужен
  флажок — кастомный SVG в том же line-стиле, stroke 1.25)

## 4. Анимации

- Левая колонка Hero: `.fade-up`; скетч: `.fade-up .delay-2`;
  печать: opacity 0→1, delay .35s.
- Колонки полосы: `.fade-up` + `.delay-1…4`.
- Hover отсутствует (статичная editorial-композиция).

## 5. Что сохранить / что не трогать

- Глобальные Header/Footer — без изменений.
- Следующие блоки страницы «О нас» (тёмная полоса «Ключевое отличие»,
  методология, эксперты, CTA) — собираются отдельными инструкциями,
  здесь НЕ трогать.
- Данные и маршрутизацию; файл скетча не редактировать.

## 6. Что запрещено

- Переписывать/сокращать тексты раздела 1.
- Старая персиковая палитра (#FFF1E5, #F2DFCE) в этом блоке.
- Превращать 4 колонки в карточки: background, radius, shadow, border
  вокруг колонки.
- Оранжевые иконки; иконки в кругах/квадратах.
- Печать с другим текстом («FORBES EXPERIENCE» и т.п.), монограмма `FX`,
  непрозрачная печать.
- Рамки/тени/скругления вокруг скетча.
- Центрированный hero старого образца.

## 7. Responsive

- ≤1024px: hero — одна колонка (текст → скетч); печать 96px,
  `top: 24px; right: 24px` поверх скетча; полоса — 2×2:
  `.about-mission__col:nth-child(even) { border-left: 1px solid var(--color-border); }`
  `.about-mission__col:nth-child(n+3) { border-top: 1px solid var(--color-border); margin-top: 32px; padding-top: 32px; }`
  padding колонок 0 24px.
- ≤640px: полоса — одна колонка; между колонками горизонтальные hairline
  (border-top), padding 24px 0; H1 44px; statement 20px.

## 8. Checklist

- [ ] Breadcrumbs `Главная / О нас`
- [ ] H1 `О нас` — Playfair 700, clamp до 92px
- [ ] Statement посимвольно; `FExperience` — orange
- [ ] Абзац посимвольно, secondary, max-width 460px
- [ ] Скетч `/images/about/FonHeroAbout.webp`, без рамок/теней, растворяется в бумаге
- [ ] Печать 132px справа вверху: круг+текст rgba(26,26,26,.55), три повтора
      `FORBES FEXPERIENCE ·`, центр `F` orange
- [ ] Полоса: 4 колонки на `--color-surface`, вертикальные hairline
- [ ] Иконки Compass / Users / Globe / Mountain, 28px, stroke 1.25, тёмные
- [ ] Тексты четырёх колонок посимвольно
- [ ] Нет карточек (background/radius/shadow) в полосе
- [ ] Палитра — только новые neutral-paper токены
- [ ] `.fade-up` + delay; без hover
- [ ] ≤1024px: 2×2; ≤640px: стек с горизонтальными hairline
- [ ] Соседние блоки и глобальные компоненты не изменены


Требования к SVG, чтобы встало красиво: viewBox квадратный, fill="none" stroke="currentColor" stroke-width="1.25" — цвет и стиль подтянутся сами.