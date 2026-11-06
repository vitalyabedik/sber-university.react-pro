import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { HIDE_DELAY_MS, TOOLTIP_ROOT_ID } from "./config";
import type { TooltipPosition } from "./TooltipPosition";
import { getTooltipStyle } from "./TooltipPlacement";

const getTooltipRoot = () => document.getElementById(TOOLTIP_ROOT_ID) || document.body;

export const useTooltip = (position: TooltipPosition) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<CSSProperties>();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const positionRef = useRef<TooltipPosition>(position);

  useLayoutEffect(() => {
    positionRef.current = position;
  });

  useEffect(() => {
    if (!isMounted) return undefined;

    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;

    if (!anchor || !tooltip) return undefined;

    const updatePosition = () => {
      const { width, height } = tooltip.getBoundingClientRect();

      setStyle(
        getTooltipStyle(anchor.getBoundingClientRect(), { width, height }, positionRef.current),
      );
    };

    updatePosition();

    /* scroll не всплывает до window: слушаем в фазе capture, чтобы двигать подсказку при вложенном скролле */
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isMounted]);

  useEffect(
    () => () => {
      clearTimeout(hideTimerRef.current);
    },
    [],
  );

  const handleMouseEnter = () => {
    clearTimeout(hideTimerRef.current);
    setIsMounted(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    hideTimerRef.current = setTimeout(() => setIsMounted(false), HIDE_DELAY_MS);
  };

  return {
    root: getTooltipRoot(),
    anchorRef,
    tooltipRef,
    isMounted,
    isVisible,
    style,
    handleMouseEnter,
    handleMouseLeave,
  };
};
