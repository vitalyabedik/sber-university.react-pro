import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/config/routes";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";
import { Page } from "shared/ui/Page";
import { PageHeader } from "shared/ui/PageHeader";
import styles from "./PublicPage.module.css";
import { useAuth } from "./useAuth";

export const PublicPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <Page>
      <Card>
        <PageHeader>Публичная страница</PageHeader>
        <p className={styles.text}>Эта страница доступна всем пользователям без авторизации.</p>
        <Button
          size="block"
          variant="primary"
          onClick={() => navigate(isAuth ? ROUTES.profile : ROUTES.login)}
        >
          {isAuth ? "Перейти в профиль" : "Войти"}
        </Button>
      </Card>
    </Page>
  );
};
