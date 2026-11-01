import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { LoginPage, ProfilePage, ProtectedRoute, PublicPage } from "features/authRouting";
import { ROUTES } from "shared/config/routes";
import { RegisterPage } from "pages/register";
import { PortalShowcase } from "pages/portal-showcase";

export interface RouteConfig {
  path: string;
  element: ComponentType;
  guard?: ComponentType;
}

export const routeConfig: RouteConfig[] = [
  { path: ROUTES.home, element: () => <Navigate to={ROUTES.public} replace /> },
  { path: ROUTES.public, element: PublicPage },
  { path: ROUTES.login, element: LoginPage },
  { path: ROUTES.register, element: RegisterPage },
  { path: ROUTES.profile, element: ProfilePage, guard: ProtectedRoute },
  { path: ROUTES.portalShowcase, element: PortalShowcase },
  { path: ROUTES.notFound, element: () => <Navigate to={ROUTES.public} replace /> },
];
