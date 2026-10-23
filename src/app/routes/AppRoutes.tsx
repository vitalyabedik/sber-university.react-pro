import { Navigate } from "react-router-dom";
import { AppRouter } from "features/authRouting";
import { ROUTES } from "shared/config/routes";
import type { RouteConfig } from "./routes";
import { routeConfig } from "./routes";

const FALLBACK_ROUTE: RouteConfig = {
  path: ROUTES.notFound,
  element: () => <Navigate to={ROUTES.public} replace />,
};

export const AppRoutes = () => <AppRouter routes={[...routeConfig, FALLBACK_ROUTE]} />;
