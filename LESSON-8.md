# LESSON-8 — Порталы: Tooltip, ConfirmDialog, PortalShowcase

Ветка: lesson-8

Страница для демонстрации: `/portal-showcase`.

## Запуск

```bash
npm ci
npm run dev            # открыть http://localhost:5173/portal-showcase
npx tsc -b             # проверка типов
npm run build          # tsc -b + vite build
```

## Структура

```
src/
├── shared/
│   ├── lib/
│   │   └── theme/
│   │       ├── ThemeContext.tsx   // ThemeContext + ThemeProvider + useTheme (бонус)
│   │       └── index.ts
│   └── ui/
│       ├── Tooltip/
│       │   ├── Tooltip.tsx        // компонент через createPortal
│       │   ├── TooltipPosition.ts // позиции: top / bottom / left / right
│       │   ├── Tooltip.module.css // изоляция стилей + тема через класс
│       │   ├── Anchor.module.css
│       │   ├── useTooltip.ts      // hover-состояние и измерение позиции
│       │   ├── tooltipPlacement.ts// расчёт top/left по позиции
│       │   ├── config.ts          // константы: задержка, отступ, #tooltip-root
│       │   └── index.ts
│       └── ConfirmDialog/
│           ├── ConfirmDialog.tsx   // окно через createPortal
│           ├── ConfirmDialog.module.css
│           ├── useConfirmDialog.tsx// Promise<boolean>
│           └── index.ts
├── pages/
│   └── portal-showcase/
│       ├── index.ts
│       └── ui/
│           ├── PortalShowcase.tsx
│           └── PortalShowcase.module.css
└── app/routes/routes.tsx          // маршрут ROUTES.portalShowcase
```

Плюс `index.html` — узел монтирования `<div id="tooltip-root"></div>`.

Плюс правка `tsconfig.app.json` — убран `erasableSyntaxOnly` (он запрещает `enum`, нужный в `TooltipPosition.ts`).

## Чек-лист

### 1. Компонент Tooltip (3 балла) — ✅ 3/3

- [x] Появляется по `onMouseEnter`, исчезает по `onMouseLeave` — **1 балл**
- [x] Рендерится через `createPortal` в отдельный DOM-узел — **1 балл**
- [x] Позиция и контент передаются через props — **1 балл**

### 2. События и изоляция стилей (3 балла) — ✅ 3/3

- [x] Клик по кнопке всплывает до контейнера — **1 балл**
- [x] Tooltip не наследует стили якоря — **1 балл**
- [x] Изоляция через CSS-модули — **1 балл**

### 3. ConfirmDialog (3 балла) — ✅ 3/3

- [x] Рендерится через `createPortal` — **1 балл**
- [x] Возвращает результат через `Promise<boolean>` — **1 балл**
- [x] Кастомные заголовок, описание, тексты кнопок — **1 балл**

### 4. PortalShowcase (1 балл) — ✅ 1/1

- [x] Работают оба портала на одной странице — **1 балл**

### Бонус. ThemeContext внутри портала (1 балл) — ✅ 1/1

- [x] Значение контекста сохраняется внутри портала — **1 балл**
- [x] Переключатель темы на PortalShowcase

**Итого: 11 / 10** (+ 1 бонусный)
