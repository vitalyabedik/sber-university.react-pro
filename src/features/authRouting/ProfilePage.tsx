import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/config/routes";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";
import { Page } from "shared/ui/Page";
import { PageHeader } from "shared/ui/PageHeader";
import { useAuth } from "./useAuth";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { user, isLoggingOut, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <Page>
      <Card>
        <PageHeader>Профиль</PageHeader>

        <div className={styles.field}>
          <span className={styles.label}>Имя пользователя</span>
          <span className={styles.value}>{user?.name ?? "—"}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user?.email ?? "—"}</span>
        </div>

        <Button size="block" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "Выходим…" : "Выйти"}
        </Button>
      </Card>
    </Page>
  );
};
