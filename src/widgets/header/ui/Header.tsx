import { ROUTES } from "shared/config/routes";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "features/authRouting";
import { Button } from "shared/ui/Button";
import { AUTHORIZED_LINKS, UNAUTHORIZED_LINKS } from "../config";
import styles from "./Header.module.css";

export const Header = () => {
  const { isAuth, isLoading, isLoggingOut, logout } = useAuth();
  const navigate = useNavigate();

  const links = isAuth ? AUTHORIZED_LINKS : UNAUTHORIZED_LINKS;

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.login, { replace: true });
  };

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <Link className={styles.home} to={ROUTES.home}>
        Главная
      </Link>

      <nav className={styles.nav}>
        {!isLoading && (
          <>
            {links.map((link) => (
              <NavLink key={link.to} className={getLinkClassName} to={link.to}>
                {link.title}
              </NavLink>
            ))}

            {isAuth ? (
              <Button className={styles.logout} disabled={isLoggingOut} onClick={handleLogout}>
                Выйти
              </Button>
            ) : (
              <Button
                variant="primary"
                className={styles.login}
                onClick={() => navigate(ROUTES.login)}
              >
                Войти
              </Button>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
