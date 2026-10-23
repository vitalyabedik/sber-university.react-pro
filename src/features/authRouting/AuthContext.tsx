import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { ReactNode } from "react";
import { AUTH_TOKEN_LS_KEY } from "shared/config/constants";
import { clearLS, loadFromLS, saveToLocalStorage } from "shared/lib/localStorage";
import type { AuthContextModel } from "shared/model/auth";
import { getErrorMessage } from "shared/lib/errors";
import { authApi, useGetMeQuery, useLogoutMutation } from "./api/authApi";

export const AuthContext = createContext<AuthContextModel>({
  user: null,
  token: null,
  isAuth: false,
  isLoading: false,
  isLoggingOut: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    () => loadFromLS<string>({ key: AUTH_TOKEN_LS_KEY }) || null,
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutRequest] = useLogoutMutation();

  // Профиль всегда запрашивается с сервера по токену — и после F5, и после логина
  const {
    data: user = null,
    isFetching,
    error: profileError,
  } = useGetMeQuery(undefined, { skip: !token });

  const clearSession = useCallback(() => {
    clearLS({ key: AUTH_TOKEN_LS_KEY });
    setToken(null);
    authApi.util.resetApiState();
  }, []);

  // Битый или истёкший токен не даёт профиль — сессию закрываем
  useEffect(() => {
    if (!profileError || isFetching || !token) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    clearSession();
    setIsLoggingOut(false);
  }, [profileError, isFetching, token, clearSession]);

  const login = useCallback(async (nextToken: string) => {
    saveToLocalStorage({ key: AUTH_TOKEN_LS_KEY, state: nextToken });
    setToken(nextToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoggingOut(true);

      await logoutRequest().unwrap();
      toast.success("Вы успешно вышли из системы");
    } catch (error) {
      toast.error(getErrorMessage(error, "Неизвестная ошибка при выходе из системы"));
    }

    clearSession();
    setIsLoggingOut(false);
  }, [logoutRequest, clearSession]);

  const value: AuthContextModel = useMemo(
    () => ({
      user,
      token,
      isAuth: Boolean(token) && Boolean(user),
      isLoading: Boolean(token) && isFetching,
      isLoggingOut,
      login,
      logout,
    }),
    [user, token, isFetching, isLoggingOut, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
