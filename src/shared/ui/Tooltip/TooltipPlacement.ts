import type { CSSProperties } from "react";
import { TOOLTIP_EDGE, TOOLTIP_GAP } from "./config";
import { TooltipPosition } from "./TooltipPosition";

const clamp = (value: number, max: number) =>
  Math.min(Math.max(value, TOOLTIP_EDGE), Math.max(max, TOOLTIP_EDGE));

export const getTooltipStyle = (
  anchor: DOMRect,
  tooltip: Pick<DOMRect, "width" | "height">,
  position: TooltipPosition,
): CSSProperties => {
  const centerX = anchor.left + anchor.width / 2;
  const centerY = anchor.top + anchor.height / 2;
  const alignedLeft = clamp(centerX - tooltip.width / 2, window.innerWidth - tooltip.width);
  const alignedTop = clamp(centerY - tooltip.height / 2, window.innerHeight - tooltip.height);

  switch (position) {
    case TooltipPosition.Bottom:
      return { left: alignedLeft, top: anchor.bottom + TOOLTIP_GAP };
    case TooltipPosition.Left:
      return { left: anchor.left - tooltip.width - TOOLTIP_GAP, top: alignedTop };
    case TooltipPosition.Right:
      return { left: anchor.right + TOOLTIP_GAP, top: alignedTop };
    case TooltipPosition.Top:
    default:
      return { left: alignedLeft, top: anchor.top - tooltip.height - TOOLTIP_GAP };
  }
};
