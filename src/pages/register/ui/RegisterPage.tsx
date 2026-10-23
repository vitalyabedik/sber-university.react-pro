import { RegisterForm, SubscribeWizard } from "features/registerForm";
import { Page } from "shared/ui/Page";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => (
  <Page className={styles.content}>
    <RegisterForm />
    <SubscribeWizard />
  </Page>
);
