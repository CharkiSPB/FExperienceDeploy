# Визуальный аудит FExperience — 2026-09-14

> Только чтение, без изменений кода. Источники: `fexperience/src/app/globals.css:1-5063`, `src/components/sections/*`, `src/components/layout/*`, `src/components/shared/*`, `src/data/*`, `files3/*`, `todo.md`.
> Цель: зафиксировать точки для будущих визуальных фиксов. К этому вернёмся позже.

## 1. Где живёт визуал

- Вся дизайн-система — `src/app/globals.css:1-5063`. Tailwind v4 CSS-first, `tailwind.config.*` нет (`postcss.config.mjs:3` → `@tailwindcss/postcss`).
- Структура файла:
  - `1-75` — `@theme` токены
  - `78-138` — `:root` градиенты/алиасы + `.gradient-*`, `base`, скейл `1024-1280`
  - `117-135` — `body::before` paper-noise
  - `155-168` — `fade-up`
  - `171-312` — `btn-liquid / btn-outline` + модификаторы
  - `314-392` — `glass-01/02`
  - `391-418` — badges
  - `421-691` — `why-section/grid/card`
  - `693-730` — `glass-signature`
  - `734-808` — `header-bar`, `mobile-nav-link`
  - `810-842` — `cookie-banner`
  - `843-1422` — heroSlider / hero-slide / compact / seal / title / pills / controls + адаптив `1024/767`
  - `1427-1562` — `final-cta`
  - `1564-1636` — `media-photos/stats`
  - `1638-1718` — `reviews/testimonials`
  - `1719-1831` — `faq`
  - `1838-2026` — `home-countdown`
  - `2028-2174` — `stats-band`
  - `2182-2392` — `project/platform/pills/media+seal`
  - `2394-2628` — `featured-expedition-panel` + `program-block`
  - `2635-2768` — `position-section` (Good Vibes)
  - `2776-3405` — about (`hero/mission/diff/method/experts`)
  - `3415-3785` — directory (`hero/filter/grid/exp-card/outro`)
  - `3792-3988` — expedition-detail legacy
  - `3998-4643` — detail redesign (`expedition-hero/program/included/experts`)
  - `4653-5063` — `request-modal 50/50 z-200`

### 1.1. Токены (`@theme:4-75`, `:root:78-112`)

- Бумага: `canvas #F9EEE5:7`, `surface #F1E3D8:9`, `elevated #FFF8F3:11`, `paper-light #FCF7F2:13`, `paper-dark #272421:15`, `paper-muted #E8DCD2:17`, `footer #EEE9E3:19`.
- Текст/бордер: `primary #1A1A1A:21`, `secondary #6D6D6D:22`, `tertiary #A0A0A0:23`, `border rgba(26,26,26,.08):24`.
- Бренд: `100 #FFF0E8`, `200 #FFE8D6`, `300 #FFB089`, `400 #FF8A54`, `500 #FF7722`, `600 #FF6B2C`, `700 #B7410E` (`27-33`, дубль `39-45`).
- Декор: `continent-outline #FFE6D8:36`.
- Шрифты: `display=var(--font-playfair):48`, `serif/sans Helvetica:49-50`. Факт (`layout.tsx:7-49`): `playfair=Philosopher 400/700`, `sans/serif=HelveticaNeueCyr 300/400/500/700`, `handwritten=good-vibes-pro 400`.
- Радиусы: `sm 8 / md 16 / lg 24 / pill 999` (`53-56`, дубль в `:root:101-104`).
- Тени: `resting 0 4px 16px .05`, `hover 0 12px 32px .09`, `glass 0 8px 40px .06`, `glow 0 0 24px rgba(255,107,44,.35)`, `liquid 0 0 40px rgba(255,107,44,.25)` (`59-63`).
- Blur-токены `20/32px:66-67` объявлены, но везде хардкод `blur(14/16/18/20/22/24px)`.
- Градиенты (`79-80`): `editorial-warm 135deg #F9EEE5→#F1E3D8`, `signature 45deg #B7410E→#FF7722 55%→#FFE8D6`.
- Алиасы (`83-105`): `bg-canvas/surface/elevated/paper-light/paper-muted/paper-dark`, `text-primary/secondary/tertiary`, `orange-100..700=brand`, `border-hairline`, `continent-outline`, `ease cubic-bezier(.16,1,.3,1)`.
- Noise (`108-111`): `paper-bg #FFF8F3`, `opacity .018 / quiet .012 / editorial .024`.
- Второй `:root:2776-2778`: `--line rgba(35,30,25,.12)` только для about.

### 1.2. Ключевые классы

- Стекло: `glass-01:314 + ::before:336 + ::after fog+screen:353`, `glass-02:378` (коммент `blur 32px`, реально `blur(14px):381`), `glass-signature:694`.
- Кнопки: `btn-liquid:171 + ::before radial:202 + ::after hairline:216`, `btn-liquid--secondary:262`, `--sm:279`, `--lg:286`, `--on-light:1033`, `btn-outline:291`, `btn-text:4132`.
- Градиенты: `gradient-editorial-warm:137`, `gradient-signature:138`.
- Hairline — отдельного класса нет, только `var(--color-border)` / `var(--border-hairline)` в `faq-item:1754`, `testimonial-author:1701`, `recap-stats:3888` и т.д.
- Eyebrow/H2 — единой системы нет, разрозненные: `stats-band-eyebrow:2051`, `project-eyebrow:2196`, `eyebrow-dash:2214`, `about-eyebrow:2785`, `directory-eyebrow:3469`, `method-eyebrow:3161`, `program-block__eyebrow:2491`, `home-countdown__eyebrow:1908`, `testimonial-eyebrow:1680` и др.

### 1.3. Брейкпоинты

- Объявлены `sm 640 / md 768 / lg 1024 / xl 1280 / xxl 1440` (`70-74`), но `min-width:640/768/1280/1440` в файле не используются.
- Реально: `@media` 47 шт — `1024px` 14 раз, `767px` 7 раз, `640px` 10 раз, `639px` 2 раза (`1547,1713`), `768px` 1 раз (`3975`), `700px:1977`, `420px:2002`, `900px:2732`, `1025px:666`.
- Скейл `1024-1280:151-153` — `html{font-size:14px !important}` с комментом «СОХРАНИТЬ без изменений».
- Подход desktop-first. Нестыки: `min-width:1025px:666` vs `max-width:1024px:1352` — дырка 1024–1025px; `640 vs 639 vs 767 vs 768` — 4 мобильных порога без системы.

## 2. Hero (`Hero.tsx`, `globals.css:843-1422`)

Структура `src/components/sections/Hero.tsx`:
- `73` `Hero()` — `activeIndex`, `isModalOpen`, `useExpedition().setActiveExpeditionSlug`.
- `78-82` Embla `loop/dragFree=false`, `84-93` `on('select')` → `setActiveIndex + setActiveExpeditionSlug`.
- `99-101` `section.hero-slider > viewport > container`, `106-178` `article.hero-slider__slide > .hero-slide` на каждую `HERO_EXPEDITIONS` (`33-39` фильтр `status==='active'` сорт по `startDate`).
- `109-130` `hero-slide__media > video + Image poster`, `132,135` overlay + glass, `138-173` `hero-compact > pills + h1 + CTA`, `176` `HeroSeal`.
- `103-104` нормализация `Бизнес — → Бизнес-` + обрезка `с Forbes`, `148-156` `line1/line2/country/date`, `159-172` CTA `join (btn-liquid--on-light) + details (btn-outline)`.
- `41-71` `HeroSeal({slug})` SVG 200×200, `image w1971` в `viewBox 320` при вьюпорте `64×68`.

CSS:
- Каркас `844-876`: `slider height:100vh min-720 overflow:hidden`, `container flex`, `slide flex:0 0 100%`, `slide min-720`.
- Медиа `868-896`: `media left:var(--hero-panel-w) width:calc(100%-panel)`, `panel 40%:869 → 45% @1024:1353 → 58% mobile:1370`; `video/poster absolute cover center-right`, `poster display:none:898` (только mobile `block:1373-1374`, video `none`).
- Стекло `915-939`: `width:panel bg:canvas border-right`, килл псевдо `display:none !important:928-939`.
- Compact `942-1022`: `absolute left0 top0 w:panel h100% z3 flex center padding:100px 28px 96px 36px pointer-events:none`, `pills grid:957`, `pill 10px uppercase white .62:965`, `title clamp(46px,4.6vw,68px):988-1005`, `country brand-600`, `date 13px`, `CTA pointer-events:auto margin-top:84px:1015-1022`.
- Seal `1067-1078`: `absolute left:panel top50% translate(-50%,-50%) 188px z4 opacity .92` → `160px @1024:1356`, `118px top52% mobile:1382`.
- Legacy лесенка `1086-1175` (`title-layer/title/forbes/title-open 35vw/title-country 35vw+4em/--south-africa/--vietnam/join/details/pills/controls/dots`) — в JSX не рендрится, остался только `hero-compact`.
- Контролы `1294-1349`: `arrows absolute z10 left3% top93% 44px`, `dots bottom24`, mobile `controls right24 bottom140, dots display:none:1420-1421`.

Риски Hero:
- [ ] `852-857,1371-1372` — только `vh`, нет `svh/dvh` → прыжок высоты на iOS; `min-720/640` переполняет landscape.
- [ ] `110-129 + 1373-1374` — desktop грузит `video(preload=metadata)+Image priority fill 100vw` одновременно → двойной LCP, рассинхрон кадра.
- [ ] `103` — жёсткая нормализация копирайта сломается при смене текста в `expeditions.ts`.
- [ ] Пер-слаг `hero-slide__title-country--{slug}` мёртв, новый slug упадёт в дефолт.
- [ ] `59-67` — кроп `F_logo.svg` `1971px → 64×68` хрупкий.
- [ ] Печать на `left:panel-w` + `58% mobile` перекрывает заголовок/CTA на узких.
- [ ] `1021 margin-top:84px + 1375 padding-top:28%` — CTA упирается в низ при длинных pills.
- [ ] `86-93` — начальный `setActiveExpeditionSlug` не вызывается до первого `select` → контекст может не совпасть с `HERO[0]`.
- [ ] Стрелки `z10` поверх стекла, mobile `bottom:140px` могут налезть на CTA/печать.

## 3. Countdown (`CountdownTimer.tsx`, `globals.css:1841-2026`)

- `8-11,55` — `{expeditionSlug?, variant?:'homepage'}`, дефолт `south-africa` (коммент `56` говорит «Вьетнам» — рассинхрон).
- `57-65` — `find(slug) → null` если `!timer.enabled/targetDate`; `68-91` тик `setInterval 1000`, `mounted`-гейт `93-95` → двойной `null` = layout-shift / пустая секция; прошлое `targetDate` даёт `00` но секция остаётся (`13-17`).
- `26-53` — `AnimatePresence popLayout motion.span key=display y -35%→35% .22s`, `33-34` reduced-motion → static.
- CSS: `section padding 88/96 + gradient + url(/images/countdown-bg.webp):1841-1853`, `card min(920px) blur22 border white.72 radius28:1855-1869`, `glow ::before/::after blur70/65 z0:1872-1899`, `values grid 4col + hairline top/bottom:1917-1924`, `divider ::before:1935-1943`, `number clamp(48,5vw,72) brand-600 + glow text-shadow:1953-1960`, `wrap overflow:visible min-height:1.12em:1945-1951`, `@700/@420` ужимки до `32px:1977-2011`.

Риски:
- [ ] `variant` только `homepage`, ветвления нет — «детальный» вариант молча рендерит homepage.
- [ ] `overflow:visible` + анимация каждую секунду — цифры перекрывают соседние ячейки/divider.
- [ ] `grid 4x1fr + pad 16px 4px` на `320px` впритык, длинный `caption страна·даты` переносится.

## 4. Header / Footer / Root

`Header.tsx:111-300`:
- `113` `header.header-bar.fixed.top-0.z-50 > glass + inner(h16/md:h20 max1600)`.
- `58` `overDarkHero=(/ или /expeditions/[slug]) && !isScrolled`, `105-109` инверсия `white→primary` по `y>40`.
- `60-83` скролл `y>40`, `showJoin = y>heroHeight && !onFinalCta(top<=vh*.6)` через `querySelector(.hero-slider/.final-cta)`.
- `117-126` лого black SVG `197×34`, `129-158` nav `hidden xl:flex`, `161-172` CTA `hidden xl:flex`, `175-177` burger `xl:hidden` (планшет 768–1280 всегда бургер).
- `182-290` мобильное меню `AnimatePresence fixed inset0 z50 blur20 slide x100% .35s`, `28px Philosopher`, Telegram `13 https://t.me/Milena_Amor:240-255`, CTA full-width.
- `86-98` скролл-лок `body overflow + lenis:pause/resume`, `292-300` всегда монтирует `RequestModal + PartnerModal`.

`RootClientLayout.tsx:25-41` — `ExpeditionProvider > Preloader + LenisProvider(Header+main+Footer) + RequestModal + CookieBanner` (модалка/куки вне Lenis-провайдера).

`Footer.tsx:151-181` — `footer#contacts bg-footer #EEE9E3 border-t brand15%`, Newsletter `24px + input h12 pill + btn-liquid--sm` (успех только локальный state `10-51`), ContinentalNav `regions → /expeditions?region=id:53-67`, колонки `grid2/md:4:71-149` (Экспедиции захардкожены `Вьетнам,ЮАР,Бразилия,Сахалин:83-89`), Telegram иконка-only `119-128`, низ `лого+copyright+address`.

Риски:
- [ ] `Header:113 z50 == меню 190 z50` — одинаковый z, край хедера мелькает при анимации.
- [ ] Лого всегда чёрное, nav/burger белые на hero — чёрное на тёмном видео нечитаемо (`119` vs `105-109`).
- [ ] Зависимость от `.hero-slider/.final-cta` в DOM (`67-75`): без hero join появится рано, без final-cta — не скроется.
- [ ] `offset -88 (Header:46)` vs `-80 (LenisProvider:26)` — рассинхрон якоря `#contacts`.
- [ ] Модалки/куки вне `LenisProvider` — `pause()` им недоступен, на mobile Lenis disabled (`48-51`) остаётся только `body overflow`.
- [ ] Footer `83-89` ведёт на неактивные деталки (active только ЮАР/Вьетнам); Telegram без текстового label; `input+кнопка` переполняют `360px`.

## 5. Модалки + Cookie (z-войны)

- `RequestModal:39`, `PartnerModal:34-37`, `ParticipantModal:32-37`, `CookieBanner` без пропсов.
- `Request:141-163 + 4653-4676` — `.request-modal fixed inset0 z-200 grid center padding24 bg rgba(20,16,12,.62) blur8`, панель `grid 1fr1fr min(1080px) max-height min(860px,100vh-48px) radius20 bg paper-dark`.
- `Partner:124-143` — тот же класс/z. `Participant:147-172` — `fixed z-[60] bg-black/80 p4`, панель `max-w-md + modalki.webp` (другой стек, без `.request-modal`, без Esc/трапа).
- `Cookie:33-41` — `fixed z-[100] bottom0 / md:bottom6 left6 max420 glass-01:314-375 + 811-830`, delay `400ms:14-22` поверх прелоадера, «Отклонить» пишет `accepted=true:50,53`.
- Скролл-лок везде `body overflow hidden/unset` (`Request:82-86`, `Partner:67-71`, `Participant:78-82`), Lenis трогает только Header. Backdrop-click везде `onClick=onClose + stopPropagation`.
- `ModalAside:88-117 + 4707-4720` — `.request-modal__content absolute w50% pointer-events:none`, `benefits grid 4col:4761` в `540px` половине + `seal right40 top38%:4747-4751`.
- Mobile `5015-5053`: `1col, media/content display:none, form overflow:visible, max-height:none` — длинная форма уходит под клавиатуру iOS; селект экспедиции — нативный (`Request 211-223`) vs `CustomSelect` (Partner/Participant) → рассинхрон UX.

Порядок: `z50 header/menu < z60 participant < z100 cookie < z200 request/partner`.
- [ ] Cookie поверх Participant, Participant тонет под Request при одновременном открытии.
- [ ] До 3 `RequestModal` в дереве дергают `body overflow` независимо (один закрылся → `unset`, второй ещё открыт).

## 6. Секции главной 2.2–2.11

| Секция | Компонент | Layout / типографика | Data | Эталон | Риск |
|---|---|---|---|---|---|
| MarketReality | `MarketReality.tsx` — header `eyebrow-dash+Экспансия+H2+lead` + `stats-band 3x icon92+countup+label+desc` | фон только в CSS, Playfair-размеры в tsx нет, hairline нет | хардкод `17-45`, `marketReality.ts` игнор | `Build 2.2 + stats_block_redesign` | Равные колонки vs `40/30/30`; иконки не по спеке; `delay-1..3 fade-up` массовый |
| Platform | `PlatformStatement.tsx` — `project-grid текст+медиа`, слева `eyebrow+H2 хардкод+sub+pills`, справа `photo 720×900 + seal FORBES` | ~55/45 | `platformStatement.ts` частично (`eyebrow,subText,principles:65,81,84-90`), `H2:68-70` хардкод, `cta` мертво | `Build 2.3 + project_block_redesign v3` | Pills `radius999` запрещены; нет CTA слева; печать absolute налезает mobile |
| Регионы | `RegionSelector.tsx + .css` — `grid 4fr gap16`, карта `110px scale1.2`, `num 11px terracotta`, `name Playfair 20px`, `desc 12.5px`, `arrow 32px orange-600`, фон `paper-muted #E8DCD2` | `4-в-ряд`, `1024:2col,640:1col` | хардкод `16-48`, `regions.ts` игнор, нет `directionCount/dots` | `REGION_LOCK + SVG_Lock + Build 2.4` | Противоречие: `4-in-row` vs `2×2`; терракота vs `8px #FF6B2C dots`; `russia translateX(-25%)` кроп |
| Featured | `FeaturedMarkets.tsx` — `split: left full-bleed nearest.photo+glass(status/H3/type/date/btn) / right dark panel eyebrow+H2+3x program-day(img+country+dates)` | тёмная панель | `getNearestExpedition(timer)` → сейчас ЮАР + `vietnam+2 upcoming` | `Build 2.5 + program_block_redesign` | Тёмная vs светлый spread; 3 image-cards vs `hairline+1 glass`; текст про РФ хардкод |
| Позиция | `PositionManifesto.tsx` — `line+label+title span.accent+footer + illustration absolute` | без grid | без data | `block_after_stats_redesign` | Нет печати 50/50; `illustration webp` без `sizes` — CLS/перекрытие |
| Why | `WhyFExperience.tsx` — `max1280 header eyebrow13 brand-600+H2 30/48 + why-grid 5 вариантов glass/label/typographic/sheet/signature` | самое чистое соответствие | `whyComposition+whyUs` полное | `Build 2.6+14.10 + 2.6Why.md` | Mobile риск схлопывания `featured 520px + signature` в одинаковые карточки |
| Media | `MediaCoverage.tsx` — `grid 1col / md 50/50 gap16`, слева `mediaForbes1.webp fill`, справа `H2 28/36 + 3 stat-row` | `50/50` | `mediaLayer.ts` | `Build 2.7` | 1 фото vs 2 с наложением `nout+zhyrnal 420px`; `50/50` vs `45/55`; `fill` без высоты — 0-height mobile |
| Reviews | `Reviews.tsx` — header `eyebrow+arrows` + Embla `loop` + `testimonial-card(“-mark+label+quote+photo96+name+company)` + `counter 01/NN + progress` | карусель карточек | `reviews.ts` | `Build 2.8+14.9` | Сетка vs `1 stage 460 + 1 glass 620 blur24 + цитата 32-48`; длинные цитаты рвут высоту |
| FAQ | `FAQ.tsx` — `faq-inner header(emblem roza-vetrov1+H2 clamp26-36 nowrap) + list button question+Plus + answer-wrap` | `2-col?` | `faq.ts` | `Build 2.9 + faq_block_redesign` | `whitespace-nowrap` overflow mobile; Plus без `rotate45` в tsx (только CSS) |
| FinalCTA | `FinalCTA.tsx` — `final-cta background+panel center H2+desc+btn-liquid-lg /expeditions#form` | center stack | без data | `Build 2.10` | Минимальный — проверить `max640 + radial` в CSS |
| Directory | `ExpeditionsDirectory.tsx` — hero `grid текст + bgpaint cartaDirectoria 70vw + seal` + фильтр 5 pills + `Активные NN` + `grid exp-card(fill+overlay+badge+region+country+date/Скоро+arrow)` + outro + архив | соответствует доработке | `expeditions.ts` сорт `active by startDate+upcoming` | `directory_hero/grid_redesign + Build 4.1-4.4` | `bgpaint 70vw priority` перекрывает текст mobile; `delay-(i%6)+1` против Calm Motion |
| Exp.Hero | `ExpeditionHero.tsx` — `bgpaint sketch/fallback south-africaC 60vw+seal + grid breadcrumbs+H1+meta Calendar/MapPin+theses+shortDesc+CTA` | светлый hero | `expedition.* + heroDate` | `expedition_detail_hero_redesign + Build 6.4` | Тезисы запрещены эталоном; fallback ЮАР всем без скетча |
| Exp.Program | `ExpeditionProgram.tsx` — `head title+tabs День NN + detail body(label01+H3+lead+ul/#subhead/~after)+photo fill 58vw`, парсер `\|/~/\#`, `null` если `!active` | тёмный `#272421` только в CSS | `program.ts + status` | `expedition_program_block_redesign` | Нет круглой стрелки next; табы 6 шт overflow; `key` по тексту — дубли схлопнутся |
| Exp.Included | `ExpeditionIncluded.tsx` — `head(dash+label+subtitle)+ul 6x num01/+name fade-up` | full-width сетка в CSS | `includes[]` | `included_block_redesign v2` | Нет line-иконок; риск 6-в-ряд desktop |

Противоречия спекам (из чтения):
1. `MarketReality` — ни `2.2 asym+hairline`, ни `stats_redesign равные+ступенька`.
2. `Platform` — `pills+фото` vs `numbered-list hairline + CTA слева`; `ПРОЕКТ/FEXPERIENCE` vs `02/FEXPERIENCE`.
3. `RegionSelector` — `4-in-row terracotta` vs `2×2 + /maps/continents/ + dots x/y/status + counts 3/4/1/1 + Смотреть направления`; `asia 4` vs лок `5`; `sakhalin active` vs спека `скоро`.
4. `Featured/Media/Reviews` — тёмные панели/карточки vs светлый spread/hairline/stage+glass.
5. `ExpeditionHero` — тезисы остались vs «НЕ переносить».
6. `expeditions.ts vs regions.ts vs Redesign 6.3` — `morocco completed` ок, но `sakhalin/india/kenya/brazil` статусы дрейфуют. Нужен единый Source of Truth.

## 7. Системные ловушки

- [ ] Дубли: `brand-100..700 ×2`, `radius ×2`, `featured-expedition-panel ×2 (2400/2564)`, `--bg-paper-dark #272421` vs коммент `#261D18:2457`.
- [ ] `!important` 12 шт (`132-133,152,923-924,936-938,2015-2016,2023-2024`).
- [ ] `z-index` только хардкод, шкалы нет. `body::before z-40:121` выше контента, ниже «header z-50» по комменту `114-116`, но `header-bar:734` без `z-index` (`glass z:0:745`, `inner z:1:758`).
- [ ] Фикс-px: `seal 188/160/118`, `arrow 44`, `join bottom 96/88`, `compact padding 100/96/36 + CTA 84px`, `project-grid 1640/128:2188`, `about-hero padding 120:2805` («завышен из-за фикс-хедера»), `request-field 150+52:4835,4851`.
- [ ] Хрупкая vw-лесенка: `35vw+4em:1155`, `38vw+4em:1359`, `24vw+4em:1392`, `margin-top:-1.18em:1145`; `nowrap:1166,1173,3481`.
- [ ] `overflow:hidden ~20` (`856,874,925,1429,4586,4673`…) режет `seal` и sticky; `program-days + hero-pills overflow-x:auto:2610,1409` без клавиатурного доступа.
- [ ] `multiply:127 + screen:362 + fog-texture.png:358` (если файла нет — грязь), `backdrop-filter` в 10+ местах (`469,541,583,1212,1468,1863,2410`), `header-bar` сознательно без blur `731`, `color-mix:747` не везде.
- [ ] `hero-compact pointer-events:none:954`, `request-modal__content absolute w50% pointer-events:none:4707`, `project-media__frame right:85%:2286` (рамка за фото).
- [ ] `glass-02` коммент `blur 32px` vs код `blur(14px):381`.

## 8. Эталоны (что считать правдой)

- `files3/FExperience_Redesign_Spec_v4_FINAL_CLEAN.md:195-245` — гл.5–6.1: Continental без glass-cards, Market asym, Platform 55/45 без pills, Featured spread, `MapContinent` только деталка.
- `files3/FExperience_Build_Spec_AI_Agent_FINAL_CLEAN.md:2.2-2.11 (437-801), 14.9-14.10 (4382-4511)` — точные значения: `2.2 40/30/30 96/64px`, `2.3 1180px 55/45 H2 48px`, `2.4 2×2 34-44px`, `2.5 spread 48-72px`, `2.6 mosaic 1.25/.75fr №01 520px blur22`, `2.7 45/55 2 фото 420px H2 36px stats 40px`, `2.8 stage 460 + glass 620 blur24 цитата 32-48`, `2.9 800px center 17px+Plus rotate45`, `2.10 640px center H2 40px btn 20/48`.
- Локи: `2.6Why.md` (PHOTO→GLASS→DARK TYPE, `blur22 saturate115% radius22`, `number #F29A72 clamp42-64`), `HOMEPAGE_COUNTDOWN_RESTYLE_LOCK.md` (`920px radius28 blur22 4 значения без карточек`), `REGION_SELECTOR_FINAL_IMPLEMENTATION_LOCK.md` (`2×2 Playfair 52-78 glass blur18 map .16 terracotta points 7px #f46b3b`), `Continental_Navigation_SVG_Lock.md` (`/public/maps/continents/*.svg dots 8px #FF6B2C без glow route-lines запрещены`), `Hero_Editorial_Glass_Pills.md` (3 тезиса `blur18 01/02/03 9px dot 5px #FF6A2A`).
- `files3/доработкаРедиза/*.md` — более поздние правки, местами противоречат главе 2 (stats 3 равные без hairline, project с фото+печать, позиция 50/50 с печатью, directory с картой+печатью, detail-hero без пилюль, program тёмный с табами, included сетка с иконками, FAQ с розой ветров слева). При конфликте — уточнять, какой слой новее.

## 9. Очередь проверки (когда вернёмся)

1. Hero: `svh/dvh`, video/poster, печать/CTA на `360/768/1024/1280`.
2. Header: лого на видео, `z-50/50`, `offset -88/-80`, планшет-бургер.
3. RegionSelector: `4-в-ряд vs 2×2+dots`, `regions.ts` vs хардкод, `translateX(-25%)` России.
4. MarketReality/Platform: выбрать один эталон (гл.2 vs доработка), оживить `marketReality.ts` или удалить.
5. Countdown `320-360`, модалки `z-60/100/200`, `nowrap` FAQ/Directory, `bgpaint 70vw` Directory/Detail.
6. `todo.md`: висячий `[ ] 2.11 Footer` (дубль `[x]`), визуальная проверка `desktop/tablet/mobile`, `npm run build`.

## 10. Статус `todo.md` на момент аудита

- `[x]` фундамент 1–7, Hero 2.1, секции 2.2–2.10, футер-рестайл (первый пункт 2.11).
- `[ ]` дубль `2.11 Footer`, визуальная проверка каждой секции, финальный `npm run build`.
