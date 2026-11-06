# LESSON-9 — React 19: useActionState, useOptimistic, reducer в action

Ветка: lesson-9

Страница для демонстрации: `/react19-examples`.

## Запуск

```bash
npm ci
npm run dev            # открыть http://localhost:5173/react19-examples
npx tsc -b             # проверка типов
npm run build          # tsc -b + vite build
```

## Структура

```
src/
├── features/
│   └── react19Examples/
│       ├── FormWithAsyncSave.tsx        // useActionState: idle → saving → success
│       ├── TodoListOptimistic.tsx       // useOptimistic: задача видна до ответа сервера
│       ├── ActionStateWithReducer.tsx   // useActionState + редюсер
│       ├── React19Examples.module.css   // общие стили трёх компонентов
│       └── index.ts
├── pages/
│   └── react19Examples/
│       ├── ui/
│       │   ├── React19ExamplesPage.tsx  // стенд со всеми тремя компонентами
│       │   └── React19ExamplesPage.module.css
│       └── index.ts
├── app/routes/routes.tsx                // маршрут ROUTES.react19Examples
├── shared/config/routes.ts              // + react19Examples: '/react19-examples'
└── widgets/header/config.ts             // + ссылка «React 19» в обоих меню
```

`TodoListOptimistic` переиспользует `Task` и `TaskCard` из `entities/task` (как `features/taskList`): тип задачи и карточка одни на проект, а состояние списка живёт внутри компонента — `useTasks`/RTK Query для имитации сервера не нужны.

Компилятор (`babel-plugin-react-compiler`) не подключался: в `package.json` его нет, а задание требует проверить сборку только «если включён». При включении потребовался бы отдельный плагин к `@vitejs/plugin-react`.

## Чек-лист

### 1. Компонент FormWithAsyncSave (4 балла) — ✅ 4/4

- [x] Форма управляется через `useActionState` — **1 балл** (`const [state, submitAction, isPending] = useActionState(submit, initialState)`, `<form action={submitAction}>`)
- [x] Асинхронная логика реализована корректно — **1 балл** (action — `async`, `await wait(1000)`, `isPending` даёт статус во время ожидания)
- [x] UI отражает статусы idle / saving / success — **1 балл** (текст кнопки и строка «Статус», `disabled` на время отправки; `saving` берётся из `isPending`, `idle`/`success` — из состояния action)
- [x] Поля формы сбрасываются после успешного сабмита — **1 балл** (action возвращает новый объект `{ status: 'success' }`, поэтому состояние обновляется на каждом сабмите, и React очищает инпуты)

### 2. Компонент TodoListOptimistic (5 баллов) — ✅ 5/5

- [x] Используется `useOptimistic` — **1 балл**
- [x] Задача появляется мгновенно в списке — **2 балла** (`addOptimisticTask({ id, title, completed: false })` внутри `startTransition` до `await`)
- [x] Реализация работает без багов и дублирования — **2 балла** (у оптимистичной записи тот же `id`, что у серверной, — при замене списка ключи совпадают, дублей нет; тип и карточка взяты из `entities/task`)

### Бонус. Компонент ActionStateWithReducer (3 балла) — ✅ 3/3

- [x] Используется редюсер внутри `useActionState` — **1 балл** (`formReducer` с действием `submitSuccess`, статусы `submitting` / `success`; action прогоняет состояние через редюсер)
- [x] Все поля формы обрабатываются и отправляются — **1 балл** (`name`, `email`, `role` читаются из `FormData`)
- [x] После отправки форма сбрасывается — **1 балл** (React очищает поля после ответа action; `submitSuccess` сохраняет `savedValues` для строки «Сохранено», текст статуса идёт в `<output aria-live="polite">`)

**Итого: 12 / 9** (+3 бонусных)
