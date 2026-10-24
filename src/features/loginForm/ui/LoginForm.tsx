import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginValues } from "features/loginForm/model/schema";
import { loginSchema } from "features/loginForm/model/schema";
import { useForm } from "react-hook-form";
import { Button } from "shared/ui/Button";
import { Card } from "shared/ui/Card";
import { FormField } from "shared/ui/FormField";
import { PageHeader } from "shared/ui/PageHeader";

type Props = {
  onSubmit: (values: LoginValues) => void;
  isSubmitting?: boolean;
  heading?: string;
};

export const LoginForm = ({ onSubmit, isSubmitting, heading = "Вход" }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <PageHeader>{heading}</PageHeader>

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

        <Button type="submit" size="block" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Вход…" : "Войти"}
        </Button>
      </form>
    </Card>
  );
};
