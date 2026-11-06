import { ROUTES } from "shared/config/routes";

export interface HeaderLink {
  to: string;
  title: string;
}

export const AUTHORIZED_LINKS: HeaderLink[] = [
  { to: ROUTES.public, title: "Публичная" },
  { to: ROUTES.profile, title: "Профиль" },
  { to: ROUTES.portalShowcase, title: "Portal Showcase" },
  { to: ROUTES.react19Examples, title: "React 19" },
];

export const UNAUTHORIZED_LINKS: HeaderLink[] = [
  { to: ROUTES.public, title: "Публичная" },
  { to: ROUTES.register, title: "Регистрация" },
  { to: ROUTES.portalShowcase, title: "Portal Showcase" },
  { to: ROUTES.react19Examples, title: "React 19" },
];
