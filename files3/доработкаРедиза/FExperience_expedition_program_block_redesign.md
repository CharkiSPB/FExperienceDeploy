# FExperience — Детальная экспедиция: блок «Программа экспедиции»: инструкция AI-агенту

## 0. Задача

Собрать тёмный блок программы по дням на `/expeditions/[slug]` по склейке
макетов A+B: заголовок, ряд табов дней (активный — orange-пилюля),
hairline под табами; ниже — двухколоночный контент дня: слева лейбл дня,
serif-заголовок, описание, буллеты и круглая стрелка переключения;
справа — крупное фото дня.

Палитра — нейтральная бумага: тёмный фон `--color-paper-dark` (#272421),
светлый текст #FFF6EE / rgba(255,246,238,.6), orange `--color-brand-600`.
Не #000 и не #1A1A1A.

ТЕКСТЫ ДНЕЙ — ТОЛЬКО из `src/data/program.ts`
(`programs[expedition.programSlug]`): поля `day`, `title`, `description`,
`image`. Не переписывать, не сокращать, не брать формулировки из макетов.

## 1. Данные и логика

- Источник: `programs[expedition.programSlug]`, дни сортируются по `day`.
- Количество табов = количество дней в данных (без хардкода; у ЮАР сейчас
  6 дней — значит 6 табов, не 7 как в макете).
- Разделитель `|` внутри `description` (существующий формат данных):
  первый сегмент — абзац описания; остальные сегменты — буллеты списка.
  Нет `|` — только абзац, без буллетов. Фиктивных буллетов не создавать.
- Блок рендерится только при `status === 'active'` и наличии программы.
  Нет программы — секция скрыта целиком.
- Переключение дня: клик по табу ИЛИ круглая стрелка (следующий день;
  на последнем — возврат к первому). Табы и стрелка синхронны.
- Фото дня — `day.image` из данных.

## 2. Точные визуальные параметры

### Секция и заголовок
```css
.expedition-program {
  background: var(--color-paper-dark);   /* #272421 */
  padding: 80px 0 88px;
}
.expedition-program__head {
  max-width: 1280px; margin: 0 auto; padding-inline: 64px;
}
.expedition-program__title {
  font: 600 clamp(28px, 2.6vw, 40px)/1.2 var(--font-display);
  color: #FFF6EE;
  margin-bottom: 32px;
}
```

### Табы дней + hairline
```css
.program-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,.12);  /* hairline под табами */
}
.program-tab {
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  font: 600 12px HelveticaNeueCyr;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255,246,238,.55);
  transition: color .2s, background .2s;
  cursor: pointer;
}
.program-tab:hover { color: #FFF6EE; }
.program-tab.active {
  background: var(--color-brand-600);
  color: #fff;
}
```
Подписи табов: `ДЕНЬ 01`, `ДЕНЬ 02`, … (номер из данных, padStart(2,'0')).

### Контент дня
```css
.program-day {
  max-width: 1280px; margin: 0 auto; padding: 48px 64px 0;
  display: grid;
  grid-template-columns: 42fr 58fr;
  gap: 48px;
  align-items: start;
}
.program-day__label {
  font: 600 12px HelveticaNeueCyr;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--color-brand-600);
  margin-bottom: 16px;
}
.program-day__title {
  font: 600 clamp(22px, 2vw, 30px)/1.25 var(--font-display);
  color: #FFF6EE;
  margin-bottom: 20px;
}
.program-day__text {
  font: 400 14.5px/1.65 HelveticaNeueCyr;
  color: rgba(255,246,238,.65);
  max-width: 460px;
}
.program-day__list {
  margin-top: 24px;
  display: flex; flex-direction: column; gap: 14px;
}
.program-day__list li {
  display: flex; align-items: center; gap: 12px;
  font: 400 13.5px/1.45 HelveticaNeueCyr;
  color: rgba(255,246,238,.75);
}
/* маркер буллета: тонкое кольцо с точкой, единый для всех пунктов */
.program-day__list li::before {
  content: '';
  flex-shrink: 0;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 1px solid rgba(255,107,44,.6);
  background: radial-gradient(circle, var(--color-brand-600) 0 3px, transparent 3.5px);
}
/* круглая стрелка переключения дня (из макета B) */
.program-day__next {
  margin-top: 32px;
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.25);
  color: #FFF6EE;
  display: grid; place-items: center;
  transition: background .3s, border-color .3s;
}
.program-day__next:hover {
  background: var(--color-brand-600);
  border-color: transparent;
}
.program-day__photo {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 12px;      /* как в макете A, не full-bleed */
}
```
- Смена дня: контент и фото пересоздаются с `key={day.day}` и короткой
  анимацией opacity 0→1 / translateY(8px)→0, 300ms, `var(--ease)`.
  Framer Motion не использовать.
- Hover: только подсветка табов/стрелки; без подъёма и свечений.

## 3. Что сохранить / не трогать

- Структуру `src/data/program.ts` — не менять, только читать.
- Hero детальной страницы и соседние блоки (что вы получите, эксперты,
  CTA, FAQ) — собираются отдельными инструкциями.
- JSON-LD, Header/Footer, RequestModal.

## 4. Что запрещено

- Переписывать/сокращать тексты дней; брать заголовки дней из макетов
  («Кейптаун — знакомство…») вместо данных сайта.
- Хардкод количества дней (7 табов при 6 днях в данных — ошибка).
- Светлый фон секции; #000 / #1A1A1A вместо `--color-paper-dark`.
- Вертикальный таймлайн с кружками-номерами из старой спеки 5.4 —
  в новом дизайне заменён табами; не возвращать.
- Сетка 3×2 дневных карточек со старого сайта — не возвращать.
- Full-bleed фото без радиуса (выбран inset-вариант макета A).
- Разные иконки на буллетах — маркер единый (кольцо с точкой).
- Glow, неон, тени, glass поверх фото.
- Рендер блока при `upcoming` / `completed` или пустой программе.

## 5. Responsive

- ≤1024px: `.program-day { grid-template-columns: 1fr; gap: 32px; }`
  фото после текста; табы — `overflow-x: auto; flex-wrap: nowrap;`
  с scroll-snap по табам; padding-inline 32px.
- ≤640px: заголовок 24px; титул дня 20px; фото `aspect-ratio: 4 / 3`;
  padding секции 56px 0; padding-inline 24px.

## 6. Критерии готовности

Тёмная секция читается как журнальный разворот программы: ряд табов с
orange-пилюлей активного дня над hairline, слева — лейбл, serif-заголовок
дня, абзац и буллеты из данных, стрелка переключения; справа — крупное
фото дня со скруглением 12px. Переключение табов и стрелки синхронно,
тексты идентичны оригинальному сайту.

## 7. Checklist

- [ ] Фон `--color-paper-dark` (#272421)
- [ ] Заголовок «Программа экспедиции» — Playfair, #FFF6EE
- [ ] Табы = дням из `programs[programSlug]`, `ДЕНЬ 01…`, активный — brand-600
- [ ] Hairline rgba(255,255,255,.12) под рядом табов
- [ ] Слева: лейбл дня orange → serif-титул → абзац → буллеты → стрелка 44px
- [ ] Тексты дней — посимвольно из `src/data/program.ts`
- [ ] `|` в description: 1-й сегмент абзац, остальные — буллеты
- [ ] Маркер буллета единый: кольцо 18px + точка brand-600
- [ ] Справа фото `day.image`, radius 12px, aspect 16/10
- [ ] Стрелка → следующий день, на последнем — первый; табы синхронны
- [ ] Смена дня: fade 300ms через `key`, без Framer Motion
- [ ] Блок скрыт при `upcoming` / `completed` / пустой программе
- [ ] ≤1024px: колонка + scroll-snap табов; ≤640px: фото 4/3
- [ ] Нет таймлайна-кружков и сетки 3×2 из старой версии
- [ ] Соседние блоки не изменены