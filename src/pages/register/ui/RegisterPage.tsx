import { RegisterForm } from "features/registerForm";
import { SubscribeWizard } from "features/registerForm/ui/SubscribeWizard";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => (
  <div className={styles.container}>
    <RegisterForm />
    <SubscribeWizard />
  </div>
);
