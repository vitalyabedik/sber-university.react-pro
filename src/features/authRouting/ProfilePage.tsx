import { Card } from "shared/ui/Card";
import { Page } from "shared/ui/Page";
import { PageHeader } from "shared/ui/PageHeader";
import styles from "./ProfilePage.module.css";
import { useAuth } from "./useAuth";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Page>
      <Card>
        <PageHeader>Профиль</PageHeader>

        <div className={styles.field}>
          <span className={styles.label}>Имя пользователя</span>
          <span className={styles.value}>{user?.name || "—"}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user?.email || "—"}</span>
        </div>
      </Card>
    </Page>
  );
};
