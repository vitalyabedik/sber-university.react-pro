import type { RegisterValues } from "features/registerForm/model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "features/registerForm/model/schema";
import { FormField } from "shared/ui/FormField";
import { SocialLinks } from "./SocialLinks";
import styles from "./RegisterForm.module.css";

type Props = {
  onSubmitSuccess?: (data: RegisterValues) => void;
};

export const RegisterForm = ({ onSubmitSuccess }: Props) => {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      socialLinks: [{}],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = (data: RegisterValues) => {
    console.log("📦 Registered user:", data);
    onSubmitSuccess?.(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      <h2 className={styles.heading}>Регистрация</h2>

      <FormField
        label="Имя пользователя"
        name="username"
        register={register}
        error={errors.username}
      />
      <FormField label="Email" name="email" type="email" register={register} error={errors.email} />
      <FormField
        label="Пароль"
        name="password"
        type="password"
        register={register}
        error={errors.password}
      />
      <FormField
        label="Подтверждение пароля"
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword}
      />

      <SocialLinks control={control} errors={errors} />

      <button type="submit" className={styles.submitButton}>
        Зарегистрироваться
      </button>
    </form>
  );
};
