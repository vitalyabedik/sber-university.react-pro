import type { ComponentType } from "react";

export const compose =
  (...hocs: Array<(Component: ComponentType) => ComponentType>) =>
  (Component: ComponentType) =>
    hocs.reduceRight((AccumulatedComponent, hoc) => hoc(AccumulatedComponent), Component);
