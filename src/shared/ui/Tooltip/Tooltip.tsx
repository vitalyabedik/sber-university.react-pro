import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../lib/theme";
import { TooltipPosition } from "./TooltipPosition";
import { useTooltip } from "./useTooltip";
import anchorStyles from "./Anchor.module.css";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  className?: string;
  /** Кликабельное содержимое: снимает pointer-events со слоя подсказки */
  interactive?: boolean;
  children: ReactNode;
}

export const Tooltip = ({
  content,
  position = TooltipPosition.Top,
  className,
  interactive = false,
  children,
}: TooltipProps) => {
  const theme = useTheme();
  const {
    root,
    anchorRef,
    tooltipRef,
    isMounted,
    isVisible,
    style,
    handleMouseEnter,
    handleMouseLeave,
  } = useTooltip(position);

  const tooltipClassName = [
    styles.tooltip,
    styles[theme],
    interactive && styles.interactive,
    isVisible && styles.visible,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const positionCap = `${position.charAt(0).toUpperCase()}${position.slice(1)}`;

  return (
    <span
      ref={anchorRef}
      className={anchorStyles.anchor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isMounted &&
        createPortal(
          <div ref={tooltipRef} role="tooltip" className={tooltipClassName} style={style}>
            <span
              className={[styles.arrow, styles[`arrow${positionCap}`]].join(" ")}
              aria-hidden="true"
            />
            {content}
          </div>,
          root,
        )}
    </span>
  );
};
