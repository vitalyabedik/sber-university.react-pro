# LESSON-7 — Сборка проектов: esbuild и swc

Ветка: lesson-7

Проект: `build-hw/` (отдельный пакет со своими зависимостями и `package.json`).

## Запуск

```bash
cd build-hw
npm ci

npm run build          # prod: приложение (app) + библиотека (lib) через esbuild
npm run build:dev      # dev: приложение без minify, с watch
npm run build:lib:swc  # бонус: библиотека через swc (esm + cjs)
```

| Скрипт                 | Что делает                                            |
| ---------------------- | ----------------------------------------------------- |
| `build` / `build:prod` | `build:app` (prod) + `build:lib`                      |
| `build:app`            | esbuild: `app/index.ts` → `dist/app.js`               |
| `build:dev`            | то же + `--dev`: без minify, `watch`                  |
| `build:lib`            | esbuild: 3 entry point → `dist/lib/esbuild/{esm,cjs}` |
| `build:lib:dev`        | библиотека без minify                                 |
| `build:lib:swc`        | swc: TypeScript → JS, `dist/lib/swc/{esm,cjs}`        |
| `clean`                | `rm -rf dist`                                         |

## Структура

```
build-hw/
├── app/
│   ├── index.ts                  // SPA: навигация + динамическая загрузка маршрута
│   ├── utils.ts                  // 7 экспортов, используются не все
│   ├── routes.ts                 // home / about / contacts через import()
│   └── pages/                    // бонус: code splitting по маршрутам
│       ├── home.ts
│       ├── about.ts
│       └── contacts.ts
├── lib/
│   ├── index.ts                  // React-зависимый код (Badge / withBadge)
│   ├── math.ts
│   └── string.ts
├── configs/
│   ├── esbuild.app.config.ts     // bundle + splitting + minify + sourcemap, watch в dev
│   ├── esbuild.lib.config.ts     // 3 entry, external, esm + cjs
│   ├── swc.lib.config.json       // swc: TypeScript, minify, sourceMaps
│   └── swc.lib.run.ts            // два прохода swc-cli (es6 / commonjs)
├── index.html                    // <script type="module" src="dist/app.js">
├── package.json
└── dist/                         // результат сборки (не коммитится)
```

## Чек-лист

### 1. Сборка приложения через esbuild (3 балла) — ✅ 3/3

- [x] Включены `bundle`, `minify`, `sourcemap` — **требование**
- [x] Результат сохраняется в `dist/app.js` (рядом `dist/app.js.map`) — **требование**
- [x] Есть импорты из `utils.ts` — **требование**
- [x] Tree shaking: неиспользуемые функции не попали в бандл — **1 балл**
- [x] Применён динамический импорт (код разбит на чанки) — **1 балл**
- [x] Сборка завершена с minify и sourcemap — **1 балл**

### 2. Сборка библиотеки через esbuild (3 балла) — ✅ 3/3

- [x] Несколько entry points: `index.ts`, `math.ts`, `string.ts` — **требование**
- [x] React указан как внешняя зависимость (`external`) — **требование**
- [x] Вывод в `esm` и `cjs` — **требование**
- [x] React и другие библиотеки исключены через external — **1 балл**
- [x] Сборка в esm и cjs — **1 балл**
- [x] Каждый entry point собран корректно (по 3 файла в каждом формате) — **1 балл**

### 3. Конфигурация production и dev-сборки (3 балла) — ✅ 3/3

- [x] Два режима: `--dev` и prod (флаги через CLI) — **требование**
- [x] dev-сборка работает с watch и без minify — **1 балл**
- [x] prod-сборка: minify, sourcemap, tree shaking — **1 балл**
- [x] Переключение режимов: `npm run build:dev` / `npm run build` — **1 балл**

### Доп. задача 1. Использование swc для сборки библиотеки (1.5 балла) — ✅ 1.5/1.5

- [x] swc корректно обрабатывает TypeScript (parser `typescript`, `.ts` без `tsx`) — **0.5 балла**
- [x] Собраны оба формата: `module.type = es6` и `commonjs` — **0.5 балла**
- [x] В конфигурации есть `minify` и `sourceMaps` — **0.5 балла**

### Доп. задача 2. Code splitting по маршрутам (1.5 балла) — ✅ 1.5/1.5

- [x] `routes.ts` с `home: () => import('./pages/home')`, `about`, `contacts` — **требование**
- [x] Динамический импорт работает — **0.5 балла**
- [x] Каждая страница в отдельном чанке (`home-*.js`, `about-*.js`, `contacts-*.js`) — **0.5 балла**
- [x] Неиспользуемые маршруты не загружаются на старте — **0.5 балла**

### Общие рекомендации — ✅

- [x] esbuild — основной сборщик; swc только для бонусной задачи; Webpack / CRA не используются
- [x] `--bundle` включён только для app и lib, у swc его нет
- [x] Содержимое `dist/` проверено (см. ниже)
- [x] `tsc --noEmit` по `app/`, `lib/`, `configs/` проходит без ошибок

---

**Итого: 9 / 9 баллов** (+3 / 3 бонусных)
