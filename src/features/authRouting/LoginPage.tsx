/* eslint-disable boundaries/dependencies */ //  TODO чтобы соблюсти структуру из ДЗ
import type { LoginValues } from "features/loginForm";
import { LoginForm } from "features/loginForm";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "shared/config/routes";
import { getErrorMessage } from "shared/lib/errors";
import { Page } from "shared/ui/Page";
import { useLoginMutation } from "./api/authApi";
import { useAuth } from "./useAuth";

export const LoginPage = () => {
  const { isAuth, login, isLoading } = useAuth();
  const [loginRequest, { isLoading: isSubmitting }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || ROUTES.profile;
  if (!isLoading && isAuth) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async ({ email, password }: LoginValues) => {
    try {
      const { accessToken } = await loginRequest({ email, password }).unwrap();

      await login(accessToken);
      toast.success("Вы успешно вошли в систему");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Неизвестная ошибка при входе в систему"));
    }
  };

  return (
    <Page>
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Page>
  );
};
