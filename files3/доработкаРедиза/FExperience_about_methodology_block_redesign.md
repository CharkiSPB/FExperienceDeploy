# FExperience — «О нас»: блок «Наша методология» (due diligence): инструкция AI-агенту

## 0. Задача

Собрать светлый блок «Наша методология» на странице `/about` по композиции
референса ОНас.png: слева — eyebrow + заголовок с оранжевым `due diligence`
+ абзац; в центре — checklist из шести пунктов с оранжевыми галками;
справа — фото с border-radius 21px.

Палитра — нейтральная бумага (palette/neutral-paper):
фон секции — основной фон сайта; hairline — `--color-border`
rgba(26,26,26,.08); оранжевый акцент — `--color-brand-600` (#FF6B2C).
Старые персиковые #FFF1E5 / #F2DFCE НЕ использовать.

Тексты — ТОЛЬКО из раздела 1 (посимвольно из референса). Не переписывать.

## 1. Тексты — зафиксированы

- Eyebrow: `НАША МЕТОДОЛОГИЯ`
- H2: `Независимый due diligence — основа наших решений`
  (`due diligence` — `--color-brand-600`, остальное — тёмный)
- Абзац: `Собственный комплексный due diligence позволяет нам обеспечивать объективную оценку рисков и возможностей в каждом регионе.`

Checklist (6 пунктов, порядок сохранён):
1. `Правовая и регуляторная проверка`
2. `Анализ рыночной и отраслевой среды`
3. `Финансовый и налоговый анализ`
4. `Оценка операционных и логистических рисков`
5. `Проверка партнёров и ключевых контрагентов`
6. `Культурные и репутационные факторы`

## 2. Точные визуальные параметры

### Секция
```css
.about-method {
  background: var(--color-canvas);        /* #F9EEE5 */
  padding: 96px 0;                        /* 56px mobile */
}
.about-method__grid {
  max-width: 1280px;
  margin: 0 auto;
  padding-inline: 64px;                   /* 32 tablet / 24 mobile */
  display: grid;
  grid-template-columns: 1.1fr 1fr 1.1fr;
  gap: 56px;
  align-items: center;
}
```

### Левая колонка — текст
```css
.method-eyebrow {
  font: 600 12px HelveticaNeueCyr;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--color-brand-600);
}
.method-title {
  margin-top: 14px;
  font: 600 clamp(28px, 2.6vw, 40px)/1.2 var(--font-display);
  color: var(--color-text-primary);
}
.method-title .accent { color: var(--color-brand-600); }   /* due diligence */
.method-text {
  margin-top: 20px;
  font: 400 14.5px/1.65 HelveticaNeueCyr;
  color: var(--color-text-secondary);
  max-width: 380px;
}
```

### Центральная колонка — checklist
```css
.method-checklist {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.method-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.method-checklist svg {          /* CheckCircle, line-style */
  width: 20px; height: 20px;
  stroke-width: 1.5; fill: none;
  color: var(--color-brand-600);
  flex-shrink: 0;
  margin-top: 1px;
}
.method-checklist p {
  font: 400 14.5px/1.45 HelveticaNeueCyr;
  color: var(--color-text-primary);
}
```
- Иконка — Lucide `CheckCircle2` (круг с галкой, как в референсе).
- Без рамок, hairline и подложек между пунктами — только воздух.

### Правая колонка — фото
- Файл: `/images/about/duiDiligensFoto.webp` через `next/image`
  (`quality 85`, alt «Due diligence FExperience — аналитическая сессия»).
```css
.method-photo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 21px;          /* ТОЧНО 21px, не 16 и не 24 */
}
```
- Без теней, рамок, стекла и оверлеев поверх фото.

### Анимации
- Левая колонка: `.fade-up`; checklist: `.fade-up .delay-2`;
  фото: `.fade-up .delay-3`.
- Hover отсутствует — статичная editorial-композиция.

## 3. Что сохранить / не трогать

- Блок стоит между тёмной полосой «Ключевое отличие FExperience» и блоком
  «Наши эксперты» — соседей не трогать.
- Глобальные Header/Footer.
- Девять пунктов due diligence живут в ТЁМНОМ блоке (отдельная инструкция);
  здесь их НЕ дублировать.

## 4. Что запрещено

- Переписывать/сокращать тексты раздела 1.
- Переносить сюда старый dossier-список 01/09–09/09 с текущей страницы.
- Превращать checklist в карточки: background, radius, border, shadow.
- Оранжевым — только eyebrow и `due diligence`; пункты checklist — тёмные.
- border-radius фото ≠ 21px; стекло/оверлеи/тени на фото.
- Старая персиковая палитра (#FFF1E5, #F2DFCE).
- Новые CTA, H3, eyebrow внутри блока.
- Изменения соседних блоков.

## 5. Responsive

- ≤1024px: `grid-template-columns: 1fr 1fr;` текст + checklist;
  фото — ниже, на всю ширину (`grid-column: 1 / -1;`), gap 40px.
- ≤640px: одна колонка: текст → checklist → фото; gap 32px;
  H2 26px; padding секции 56px 0.

## 6. Критерии готовности

Блок читается как журнальная связка «тезис → доказательство → материал»:
слева манифест методологии с оранжевым `due diligence`, в центре — шесть
пунктов проверки с оранжевыми галками, справа — фото с мягким скруглением
21px. Пустоты нет, карточек нет, тексты идентичны референсу посимвольно.

## 7. Checklist

- [ ] Eyebrow `НАША МЕТОДОЛОГИЯ` — orange
- [ ] H2 посимвольно; `due diligence` — `--color-brand-600`
- [ ] Абзац посимвольно, secondary, max-width 380px
- [ ] Checklist: 6 пунктов посимвольно, порядок из раздела 1
- [ ] Галки — CheckCircle2 20px, stroke 1.5, brand-600
- [ ] Пункты checklist — тёмный текст, без рамок и подложек
- [ ] Фото `/images/about/duiDiligensFoto.webp`, border-radius 21px
- [ ] На фото нет теней / стекла / оверлеев
- [ ] Фон секции `--color-canvas` (#F9EEE5)
- [ ] `.fade-up` + delay на трёх колонках
- [ ] ≤1024px: текст+checklist, фото ниже; ≤640px: стек
- [ ] Старый dossier-список 01/09–09/09 сюда НЕ перенесён
- [ ] Соседние блоки не изменены