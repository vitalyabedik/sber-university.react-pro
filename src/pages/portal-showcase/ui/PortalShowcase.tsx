import { useState } from "react";
import type { MouseEvent } from "react";
import { useConfirmDialog } from "shared/ui/ConfirmDialog";
import { Tooltip, TooltipPosition } from "shared/ui/Tooltip";
import { ThemeProvider } from "shared/lib/theme";
import type { Theme } from "shared/lib/theme";
import styles from "./PortalShowcase.module.css";

const TOOLTIP_ITEMS: { id: number; title: string; position: TooltipPosition; hint: string }[] = [
  {
    id: 1,
    title: "Сверху",
    position: TooltipPosition.Top,
    hint: "Позиция top — подсказка над элементом",
  },
  {
    id: 2,
    title: "Снизу",
    position: TooltipPosition.Bottom,
    hint: "Позиция bottom — подсказка под элементом",
  },
  {
    id: 3,
    title: "Слева",
    position: TooltipPosition.Left,
    hint: "Позиция left — подсказка слева от элемента",
  },
  {
    id: 4,
    title: "Справа",
    position: TooltipPosition.Right,
    hint: "Позиция right — подсказка справа от элемента",
  },
];

const INITIAL_ITEMS = ["Отчёт за квартал", "Договор подряда", "Смета проекта"];

export const PortalShowcase = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [lastResult, setLastResult] = useState<string>();
  const [parentClicks, setParentClicks] = useState(0);
  const [tooltipClicks, setTooltipClicks] = useState(0);
  const [isolatedClicks, setIsolatedClicks] = useState(0);
  const { showConfirmDialog, confirmDialog } = useConfirmDialog();

  const handleParentClick = () => setParentClicks((count) => count + 1);

  const handleTooltipClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsolatedClicks((count) => count + 1);
  };

  const handleThemeToggle = () => setTheme((current) => (current === "light" ? "dark" : "light"));

  const handleDeleteClick = async () => {
    const confirmed = await showConfirmDialog({
      title: "Удалить элемент?",
      description: "Это действие необратимо.",
    });

    setLastResult(confirmed ? "Подтверждено — элемент удалён" : "Отменено — элемент остался");

    if (!confirmed) return;

    setItems((current) => current.slice(1));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.page}>
        <h1 className={styles.title}>Portal Showcase</h1>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Tooltip</h2>
          <p className={styles.text}>Наведите курсор — подсказка рендерится в #tooltip-root.</p>

          <div className={styles.tooltips}>
            {TOOLTIP_ITEMS.map(({ id, title, position, hint }) => (
              <Tooltip key={id} position={position} content={hint}>
                <button type="button" className={styles.chip}>
                  {title}
                </button>
              </Tooltip>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Всплытие событий</h2>
          <p className={styles.text}>
            Подсказка рендерится в #tooltip-root, но React-события из портала всплывают по
            React-дереву, а не по DOM: клик по её кнопке по умолчанию доходит до контейнера, а с
            stopPropagation — нет. Клик по якорю всплывает до контейнера всегда.
          </p>

          {/* Контейнер — только слушатель всплытия: управляющим элементом он не является, клавиатурных действий не имеет */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div className={styles.parentZone} onClick={handleParentClick}>
            <Tooltip
              interactive
              content={
                <button
                  type="button"
                  className={styles.tooltipButton}
                  onClick={() => setTooltipClicks((c) => c + 1)}
                >
                  Без stopPropagation: {tooltipClicks}
                </button>
              }
            >
              <button type="button" className={styles.chip}>
                Навести и кликнуть
              </button>
            </Tooltip>

            <Tooltip
              interactive
              content={
                <button type="button" className={styles.tooltipButton} onClick={handleTooltipClick}>
                  Со stopPropagation: {isolatedClicks}
                </button>
              }
            >
              <button type="button" className={styles.chip}>
                Навести и кликнуть (изолированно)
              </button>
            </Tooltip>

            <span className={styles.counter}>Кликов по контейнеру: {parentClicks}</span>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>ConfirmDialog</h2>
          <p className={styles.text}>
            Диалог открывается через портал и возвращает результат через Promise.
          </p>

          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={[styles.chip, styles.danger].join(" ")}
            onClick={handleDeleteClick}
          >
            Удалить
          </button>

          {lastResult && <p className={styles.result}>{lastResult}</p>}
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Тема из контекста</h2>
          <p className={styles.text}>
            Тема передаётся в Tooltip и ConfirmDialog через ThemeContext — внутри портала значение
            сохраняется.
          </p>

          <button type="button" className={styles.chip} onClick={handleThemeToggle}>
            Тема: {theme === "light" ? "светлая" : "тёмная"}
          </button>
        </section>

        {confirmDialog}
      </div>
    </ThemeProvider>
  );
};
