import { zodResolver } from "@hookform/resolvers/zod";
//  TODO чтобы соблюсти структуру из ДЗ
// eslint-disable-next-line boundaries/dependencies
import { useAuth, useSignUpMutation } from "features/authRouting";
import type { RegisterValues } from "features/registerForm/model/schema";
import { registerSchema } from "features/registerForm/model/schema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "shared/config/routes";
import { getErrorMessage } from "shared/lib/errors";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";
import { FormField } from "shared/ui/FormField";
import { PageHeader } from "shared/ui/PageHeader";
import { SocialLinks } from "./SocialLinks";
import styles from "./RegisterForm.module.css";

type Props = {
  onSubmitSuccess?: (data: RegisterValues) => void;
};

export const RegisterForm = ({ onSubmitSuccess }: Props) => {
  const [signUpRequest, { isLoading }] = useSignUpMutation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      socialLinks: [],
    },
  });

  const onFormSubmit = async (values: RegisterValues) => {
    try {
      const { accessToken } = await signUpRequest({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();

      await login(accessToken);
      toast.success("Вы успешно зарегистрировались");
      onSubmitSuccess?.(values);
      navigate(ROUTES.home, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Неизвестная ошибка при регистрации"));
    }
  };

  return (
    <Card className={styles.wideCard}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <PageHeader as="h2">Регистрация</PageHeader>

        <FormField label="Имя пользователя" name="name" register={register} error={errors.name} />

        <FormField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
        />

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

        {/* POST /auth/register социальные ссылки не принимает — в запрос не попадают */}
        <SocialLinks control={control} errors={errors} />

        <Button type="submit" size="block" variant="primary" disabled={isLoading}>
          {isLoading ? "Регистрация…" : "Зарегистрироваться"}
        </Button>
      </form>
    </Card>
  );
};
