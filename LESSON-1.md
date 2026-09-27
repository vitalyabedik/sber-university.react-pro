# LESSON-1 — React + TypeScript + Feature-Sliced Design

Ветка: lesson-1

## Запуск

```bash
npm ci && npm run dev
npm run build
```

## Чек-лист

### 1. Создайте проект по FSD (3 балла) — ✅ 3/3

- [x] Проект инициализирован через Vite (React + TypeScript) — **1 балл**
- [x] Структура каталогов соответствует FSD: `app/`, `entities/`, `features/`, `shared/`, `pages/`, `widgets/` — **1 балл**
- [x] Настроен ESLint с `eslint-plugin-boundaries` для проверки правил FSD (запрет кросс-слойных импортов) — **1 балл**
  - Настроены tsconfig paths для абсолютных импортов: `shared/*`, `entities/*`, `features/*`, `widgets/*`, `pages/*`, `app/*`
  - Подключены Prettier, jsx-a11y, react-hooks

### 2. Реализуйте сущности Task (3 балла) — ✅ 3/3

- [x] Тип `Task` описан в `entities/task/model/types.ts`: `id`, `title`, `completed` — **1 балл**
- [x] Компонент `TaskCard` — презентационный, принимает props, без side-effects — **1 балл**
- [x] Стили через `TaskCard.module.css` (CSS Modules) — **1 балл**

### 3. Создайте компонент «Список задач» (3 балла) — ✅ 3/3

- [x] Кастомный хук `useTasks` с фильтрацией и удалением — **1 балл**
- [x] Фильтрация по статусу: `all`, `completed`, `incomplete` — реализована — **в чек-листе**
- [x] Удаление задачи через `removeTask(id)` — реализовано — **в чек-листе**
- [x] Компонент `TaskList` рендерит отфильтрованные задачи — **1 балл**
- [x] State-хук + проброс пропсов — **1 балл**

### 4. Выведите задачи на странице (2 балла) — ✅ 2/2

- [x] Страница `TaskPage` в слое `pages/tasks/` — **1 балл**
- [x] Виджет `TaskWidget` инкапсулирует логику и пробрасывает данные в `TaskList` — **1 балл**

### Доп. задача (1 бонусный балл) — ✅ 1/1

- [x] Компонент `FilterButton` в `shared/ui/FilterButton/` — использует `shared/ui/Button` — **1 балл**

---

**Итого: 12 / 10 баллов**
