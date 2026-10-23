import { ROUTES } from "shared/config/routes";

export interface HeaderLink {
  to: string;
  title: string;
}

export const AUTHORIZED_LINKS: HeaderLink[] = [
  { to: ROUTES.public, title: "Публичная" },
  { to: ROUTES.profile, title: "Профиль" },
];

export const UNAUTHORIZED_LINKS: HeaderLink[] = [
  { to: ROUTES.public, title: "Публичная" },
  { to: ROUTES.register, title: "Регистрация" },
];
