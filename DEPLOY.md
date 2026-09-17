# Деплой FExperience — схема работы

> Два репозитория, у каждого своя роль. Не путать.
>
> - **FExperienceRediz** (`rediz`) — РАБОЧИЙ. Здесь живёт всё: код, спеки `files3/`, доки.
>   Синхронизация между компьютерами идёт только через него.
> - **FExperienceDeploy** (`deploy`) — ДЕПЛОЙНЫЙ. Его смотрит RelaxDev.
>   Только папка `fexperience/` + служебное. Спек `files3/` и секретов тут нет и быть не должно.
> - Репозиторий **публичный** — пароли, `.env.local`, `files3/` в него не пушить никогда.

## Ветки (деплой-репо)

| Ветка | Роль | Трогать |
|---|---|---|
| `main` | Прод (`fexperience.forbes.ru`). Пуш сюда = мгновенная пересборка сайта | Только переключением из `redesign`, см. ниже |
| `redesign` | Превью-стенд. Пуш сюда = пересборка превью, прод цел | Рабочая ветка для всех правок |
| `main-backup` | Слепок прода перед переключением. Откат в один пуш | Не трогать, пока всё стабильно |

## Обычный цикл правки (этот компьютер)

```powershell
cd C:\Users\Charki\Desktop\FinalFexperienceRediz
git checkout redesign
git status --short          # посмотреть, что поменялось
git add -A
git commit -m "понятное описание изменения"
git push deploy redesign    # → пересоберётся ПРЕВЬЮ, прод не тронется
```

Проверить превью-URL в панели `relaxdev.ru/projects/fexperiencedeploy`.
Всё ок → переключение прода (см. «Переключение прода»).

## Переключение прода (только по отдельной команде)

```powershell
# 1. Страховка: бэкап текущего прода (делать КАЖДЫЙ раз перед шагом 2)
git push deploy refs/remotes/deploy/main:refs/heads/main-backup

# 2. Переключение (истории репозиториев неродственные — форс штатный)
git push deploy redesign:main --force
```

Дальше: ждать пересборку 3–7 минут → `Ctrl+F5` на `https://fexperience.forbes.ru` →
одна тестовая подписка (письмо потом удалить) → Метрика «онлайн» →
переотправить `sitemap.xml` в Вебмастере.

## Откат прода (если что-то пошло не так)

```powershell
git push deploy main-backup:main --force
```

RelaxDev пересоберёт предыдущую версию. Время простоя — минуты.

## Второй компьютер (синк через РАБОЧИЙ репозиторий)

```powershell
# Там: зафиксировать и отправить работу
git add -A
git commit -m "описание"
git push rediz <имя-ветки>     # например: git push rediz main

# Здесь: забрать
git fetch rediz
git log --oneline rediz/main -5   # посмотреть, что приехало
git merge rediz/main              # влить (конфликты разбираем руками, не вслепую)
```

Запрещено: возить код флешкой/архивом, править один и тот же файл на двух
машинах без синка, пушить в `FExperienceDeploy` со второго компьютера
напрямую в `main`.

## Проверки перед пушем

```powershell
cd fexperience
npx tsc --noEmit -p tsconfig.json
npm run build
```

Билд должен закончиться `✓ Compiled successfully` и таблицей роутов.
Сборка падает → в прод не пушить, чинить локально.

## Запреты

1. Не пушить в `main` деплой-репо напрямую и не править код через сайт GitHub —
   прод пересоберётся без превью.
2. Не пушить `files3/`, `.env.local`, пароли. Проверка перед пушем:
   `git status --short` — там не должно быть `files3/`, `.env*` (кроме `.env.example`).
3. Поменял переменную с `NEXT_PUBLIC_` — нужна пересборка (при пуше произойдёт сама).
   Серверные (`SMTP_*`, `MAIL_TO`) меняются в панели RelaxDev, код трогать не надо.
4. Тестовые заявки/подписки слать только локально (с тестовым `MAIL_TO`)
   или ОДНУ на превью/проде — и удалять письмо после.

## Текущие remote (справка)

```powershell
git remote -v
# deploy → https://github.com/CharkiSPB/FExperienceDeploy.git  (прод + превью)
# rediz  → https://github.com/CharkiSPB/FExperienceRediz.git   (рабочий синк)
```

Превью-URL: `https://fexperiencedeploy-git-redesign.preview.relaxdev.ru/`
Прод: `https://fexperience.forbes.ru/`
