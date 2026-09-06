# FExperience — «О нас»: блок команды/экспертов: инструкция AI-агенту

## 0. Задача

Собрать блок команды на странице `/about` по композиции карточек из
референса ОНас.png (фото слева + панель с именем и ролью справа),
НО без карусели: без стрелок, без свайпа, без ссылки
«Смотреть всех экспертов».

Сейчас в данных ТРИ эксперта (команда Forbes Russia). Раскладка обязана
корректно принимать до ПЯТИ карточек без правок кода: добавленные записи
просто переносятся на второй ряд той же ширины.

Тексты — ТОЛЬКО из оригинального сайта (раздел 1). Композиция и стиль
карточки — из референса. Палитра — нейтральная бумага
(palette/neutral-paper): canvas #F9EEE5, surface #F1E3D8,
border rgba(26,26,26,.08); оранжевый — `--color-brand-600`.

## 1. Тексты — зафиксированы (оригинальный сайт)

- Eyebrow: `КОМАНДА`
- H2: `Люди, которые ведут экспедицию`

Карточки (рендерятся из `src/data/speakers.ts`, `isForbes: true` —
тексты должны совпадать с данными посимвольно, не хардкодить):
1. Бейдж `Forbes` на фото; мета `FORBES RUSSIA`;
   имя `Марина Матыцина`;
   роль `Генеральный директор Forbes Russia`
2. Бейдж `Forbes`; мета `FORBES RUSSIA`;
   имя `Денис Кошкин`;
   роль `Исполнительный директор Forbes Russia`
3. Бейдж `Forbes`; мета `FORBES RUSSIA`;
   имя `Анастасия Никитина`;
   роль `Директор по устойчивому развитию и международным проектам Forbes Russia`

## 2. Раскладка — НЕ слайдер, рост 3 → 5 без правок

```css
.experts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;   /* 2 карточки во втором ряду — центрированы */
}
.expert-card {
  width: calc((100% - 48px) / 3);   /* 3 в ряд на desktop */
}
```
- 3 карточки — один ряд; 4–5 — второй ряд той же ширины, центрированный.
- НЕ использовать Embla/свайп/автопрокрутку в этом блоке.
- НЕ добавлять стрелки, pagination, «Смотреть всех экспертов».

### Секция
- Фон: `--color-canvas` (#F9EEE5); padding 96px 0 / 56px mobile.
- Контейнер 1280px, padding-inline 64 / 32 / 24px.
- Eyebrow `КОМАНДА` — brand-600, uppercase, 12px, ls .1em.
- H2 — Playfair 600 clamp(28px, 2.6vw, 40px), text-primary;
  margin: 14px 0 40px.

## 3. Карточка — композиция референса

```css
.expert-card {
  display: grid;
  grid-template-columns: 45fr 55fr;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-surface);      /* #F1E3D8 — панель как в референсе */
}
.expert-card__photo { position: relative; min-height: 280px; }
.expert-card__photo img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .4s var(--ease);
}
.expert-card:hover .expert-card__photo img { transform: scale(1.03); }

/* Бейдж Forbes — как на оригинальном сайте: тёмная пилюля вверху слева */
.forbes-badge {
  position: absolute; top: 12px; left: 12px;
  display: inline-flex; align-items: center;
  padding: 5px 12px;
  background: #1A1A1A;
  border-radius: var(--radius-pill);
  font: 600 11px HelveticaNeueCyr; color: #fff;
  letter-spacing: .04em; text-transform: uppercase;
}

.expert-card__panel {
  padding: 20px 20px 16px;
  display: flex; flex-direction: column;
}
.expert-meta {
  font: 600 11px HelveticaNeueCyr;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--color-text-tertiary);
}
.expert-name {
  margin-top: 8px;
  font: 600 18px/1.25 var(--font-display);
  color: var(--color-text-primary);
}
.expert-role {
  margin-top: 8px;
  font: 400 12.5px/1.55 HelveticaNeueCyr;
  color: var(--color-text-secondary);
}
/* LinkedIn — круг 32px, тёмный, внизу справа; рендерить ТОЛЬКО если
   в данных есть ссылка (data.linkedin). Нет ссылки — иконки нет. */
.expert-linkedin {
  margin-top: auto; align-self: flex-end;
  width: 32px; height: 32px; border-radius: 50%;
  background: #1A1A1A; color: #fff;
  display: grid; place-items: center;
}
```
- Без box-shadow, без border вокруг карточки, без hover-подъёма
  (только zoom фото 1.03).
- Фото и бейдж — существующие ассеты/стили оригинального сайта.

## 4. Данные

- Источник: `src/data/speakers.ts` (поле `isForbes`), существующая логика.
- Не создавать параллельный массив; не хардкодить имена/роли в JSX.
- Добавление 2 экспертов в будущем = добавление записей в данные;
  раскладка (раздел 2) переносит их автоматически.

## 5. Responsive

- ≤1024px: `.expert-card { width: calc((100% - 24px) / 2); }`
- ≤640px: `.expert-card { width: 100%; grid-template-columns: 1fr; }`
  фото сверху (`position: relative; aspect-ratio: 4 / 3; min-height: 0;`),
  панель ниже; LinkedIn и бейдж сохраняются.

## 6. Что запрещено

- Слайдер/карусель (Embla), стрелки, pagination, свайп в этом блоке.
- Ссылка «Смотреть всех экспертов».
- Переписывать имена/роли/мета; добавлять тексты не с оригинального сайта.
- Оранжевые имена (в референсе имена тёмные serif — так и оставить;
  orange только в eyebrow).
- Карточные тени, border, radius > 16px, glass поверх карточек.
- Хардкод состава (блок обязан переживать 3→5 записей без правок вёрстки).
- Изменения соседних блоков и глобальных компонентов.

## 7. Критерии готовности

Блок читается как деловой roster: три карточки в ряд (фото + Forbes-бейдж
слева, бежевая панель с мета/именем/ролью справа), при росте данных до
пяти — аккуратный центрированный второй ряд. Никакого слайдера и лишних
навигационных элементов. Тексты идентичны оригинальному сайту.

## 8. Checklist

- [ ] Eyebrow `КОМАНДА`, H2 `Люди, которые ведут экспедицию`
- [ ] 3 карточки из `src/data/speakers.ts` (isForbes), тексты посимвольно
- [ ] Карточка: фото 45% слева + панель `--color-surface` справа
- [ ] Бейдж `Forbes` на фото (тёмная пилюля, как на оригинальном сайте)
- [ ] Мета `FORBES RUSSIA`, имя — Playfair 600 18px тёмное, роль — secondary
- [ ] LinkedIn-круг 32px — только при наличии ссылки в данных
- [ ] НЕ слайдер: нет стрелок, pagination, свайпа, «Смотреть всех экспертов»
- [ ] flex-wrap + width calc((100%−48px)/3): 3 в ряд, 4–5 → второй ряд
- [ ] Hover — только zoom фото 1.03
- [ ] ≤1024px: 2 в ряд; ≤640px: стек (фото сверху)
- [ ] Палитра neutral-paper; нет теней/бордеров/стекла
- [ ] Соседние блоки не изменены