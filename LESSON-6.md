# LESSON-6 — React Router v6+: авторизация, защищённые маршруты

Ветка: lesson-6

## Запуск

```bash
npm ci && npm run dev
npm run build
```

## Структура

```
src/
├── main.tsx                           // createRoot → <App />
├── store.ts                           // configureStore + baseApi
├── app/
│   ├── App.tsx                        // App = withProviders(AppRoutes)
│   ├── providers/
│   │   ├── index.ts                   // compose + withProviders
│   │   ├── auth/withAuthContext.tsx   // HOC <AuthProvider> из фичи
│   │   ├── redux/withStore.tsx        // HOC <Provider store>
│   │   ├── redux/index.ts
│   │   └── toastify/withToastify.tsx  // HOC ToastContainer
│   └── routes/
│       ├── paths.ts                   // реэкспорт ROUTES
│       ├── routes.tsx                 // routeConfig
│       ├── AppRoutes.tsx              // routeConfig + fallback → <AppRouter routes />
│       └── index.ts
├── features/
│   ├── authRouting/
│   │   ├── AuthContext.tsx            // AuthContext + AuthProvider
│   │   ├── useAuth.ts
│   │   ├── ProtectedRoute.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── PublicPage.tsx
│   │   ├── AppRouter.tsx
│   │   ├── ProfilePage.module.css
│   │   ├── ProtectedRoute.module.css
│   │   ├── PublicPage.module.css
│   │   ├── api/authApi.ts             // RTK Query: login / signUp / logout / getMe
│   │   └── index.ts
│   ├── loginForm/                     // форма входа (react-hook-form + zod)
│   │   ├── model/schema.ts
│   │   ├── ui/LoginForm.tsx
│   │   └── index.ts
│   └── registerForm/                  // регистрация (ручка + тосты)
│       ├── model/schema.ts
│       ├── ui/RegisterForm.tsx
│       ├── ui/SocialLinks.tsx         // прошлый урок, не менялся
│       ├── ui/SocialLinks.module.css
│       ├── ui/SubscribeWizard.tsx     // прошлый урок, не менялся
│       ├── ui/SubscribeWizard.module.css
│       └── index.ts
├── pages/register/                    // /register
│   └── ui/
│       ├── RegisterPage.tsx
│       └── RegisterPage.module.css
├── widgets/header/
│   ├── config.ts
│   ├── ui/Header.tsx
│   ├── ui/Header.module.css
│   └── index.ts
└── shared/
    ├── api/
    │   ├── baseApi.ts                 // маршрутизация запросов + prepareHeaders
    │   └── config.ts                  // API_BASE_URL, AUTH_API_BASE_URL, префиксы
    ├── config/
    │   ├── constants.ts               // AUTH_TOKEN_LS_KEY
    │   └── routes.ts                  // ROUTES
    ├── lib/
    │   ├── authContext.ts             // createAuthContext (дефолтное значение)
    │   ├── compose.ts                 // compose — свёртка списка HOC-ов
    │   ├── localStorage.ts            // saveToLocalStorage / loadFromLS / clearLS
    │   ├── tokenStorage.ts            // getAuthToken / getAuthHeaders
    │   ├── errors.ts                  // parseErrorMessage / getErrorMessage
    │   └── index.ts
    ├── model/auth.ts                  // DTO и AuthContextModel
    └── ui/
        ├── Button/                    // + size: compact | block
        ├── Card/                      // белая карточка (новый)
        ├── FormField/
        ├── Page/                      // отступы страницы (новый)
        └── PageHeader/                // заголовок h1/h2 (новый)
```

API: `https://api.v2.react-learning.ru` (константа `AUTH_API_BASE_URL`).

## Чек-лист

### 1. Компонент ProtectedRoute и useAuth (3 балла) — ✅ 3/3

- [x] Проверка доступа через контекст, а не напрямую через `localStorage` — **требование**
- [x] Редирект на `/login` при отсутствии авторизации — **требование**
- [x] Отображение вложенных маршрутов через `<Outlet />` — **требование**
- [x] Использован `useContext` + `Outlet` — **1 балл**
- [x] Редирект через `<Navigate replace />` — **1 балл**
- [x] Поведение корректно при обновлении страницы — **1 балл**

### 2. Страница LoginPage (3 балла) — ✅ 3/3

- [x] Обязательные поля `email` и `password` — **требование**
- [x] Асинхронная отправка запроса — **требование**
- [x] После успешного входа — переход на защищённую страницу — **требование**
- [x] Логин работает и сохраняет токен — **1 балл**
- [x] Контекст обновляется корректно — **1 балл**
- [x] После логина идет редирект — **1 балл**

### 3. Защищённая страница ProfilePage (3 балла) — ✅ 3/3

- [x] Страница недоступна без логина — **требование**
- [x] После авторизации отображается имя пользователя — **требование**
- [x] При обновлении страницы данные пользователя восстанавливаются — **требование**
- [x] Проверка авторизации работает — **1 балл**
- [x] Информация загружается с сервера — **1 балл**
- [x] Поведение корректно после F5 — **1 балл**

### Доп. задача. Страница PublicPage + автоматический выход (до 3 бонусных баллов) — ✅ 3/3

- [x] Создан открытый маршрут `/public`, доступный всем — **требование**
- [x] Кнопка «Выйти» на странице профиля: удаляет токен, очищает контекст, возвращает на `/login` — **требование**
- [x] Используется `navigate("/login", { replace: true })` при выходе — **рекомендация**
- [x] После выхода защищённые маршруты недоступны — **рекомендация**
- [x] Кнопка выхода работает и очищает контекст — **1 балл**
- [x] Происходит редирект на `/login` — **1 балл**
- [x] После выхода доступ к `/profile` невозможен — **1 балл**

### Рекомендации задания — ✅

- [x] Всё реализовано через React Router v6+ (`<Routes>` / `<Route>`)
- [x] Используется API `https://api.v2.react-learning.ru/api`
- [x] Проект структурирован по фичам (`features/authRouting`)
- [x] Проверено, что доступ к приватным маршрутам ограничен (см. примечания)

---

**Итого: 12 / 9 баллов** (+3 бонусных)
