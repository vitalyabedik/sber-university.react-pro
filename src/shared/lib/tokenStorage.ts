import { AUTH_TOKEN_LS_KEY } from "shared/config/constants";
import { loadFromLS } from "./localStorage";

// Токен приходит с префиксом "Bearer", поэтому в заголовок подставляется как есть
export const getAuthToken = (): string | null =>
  loadFromLS<string>({ key: AUTH_TOKEN_LS_KEY }) || null;

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();

  return token ? { Authorization: token } : {};
};
