import type { ReactElement, ReactNode } from "react";
import { cloneElement, createElement } from "react";
import { add, clamp } from "./math";
import { capitalize, camelCase } from "./string";

export type BadgeTone = "neutral" | "success" | "danger";

export interface BadgeProps {
  count: number;
  label: string;
  tone?: BadgeTone;
}

export const formatCount = (count: number): string =>
  count > 99 ? "99+" : String(clamp(count, 0, 99));

export const badgeTitle = (label: string, count: number): string =>
  `${capitalize(label)}: ${formatCount(add(count, 0))}`;

export const Badge = ({ count, label, tone = "neutral" }: BadgeProps): ReactElement =>
  createElement(
    "span",
    {
      className: camelCase(`badge badge-${tone}`),
      title: badgeTitle(label, count),
    },
    formatCount(count),
  );

export const withBadge = (
  element: ReactElement<{ children?: ReactNode }>,
  props: BadgeProps,
): ReactElement =>
  cloneElement(element, {
    children: [
      ...(Array.isArray(element.props.children)
        ? element.props.children
        : [element.props.children]),
      createElement(Badge, { key: "badge", ...props }),
    ],
  });
