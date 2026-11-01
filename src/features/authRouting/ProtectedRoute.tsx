import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "shared/config/routes";
import { Page } from "shared/ui/Page";
import styles from "./ProtectedRoute.module.css";
import { useAuth } from "./useAuth";

export const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Page>
        <p className={styles.checking}>Проверка авторизации…</p>
      </Page>
    );
  }

  if (!isAuth) return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;

  return <Outlet />;
};
