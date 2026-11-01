import type { ComponentType } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/* eslint-disable boundaries/dependencies */ //  TODO чтобы соблюсти структуру из ДЗ
import { Header } from "widgets/header";

export interface RouteConfig {
  path: string;
  element: ComponentType;
  guard?: ComponentType;
}

export const AppRouter = ({ routes }: { routes: RouteConfig[] }) => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        {routes.map(({ path, element: Element, guard: Guard }) => (
          <Route key={path} path={path} element={Guard ? <Guard /> : <Element />}>
            {Guard && <Route index element={<Element />} />}
          </Route>
        ))}
      </Routes>
    </main>
  </BrowserRouter>
);
