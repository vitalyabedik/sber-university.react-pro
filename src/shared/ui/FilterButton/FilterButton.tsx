import { Button } from "shared/ui/Button";

type Props<T extends string> = {
  value: T;
  label: string;
  active: boolean;
  onClick: (value: T) => void;
};

export const FilterButton = <T extends string>({
  value,
  label,
  active,
  onClick,
}: Props<T>) => (
  <Button
    variant={active ? "primary" : "default"}
    onClick={() => onClick(value)}
  >
    {label}
  </Button>
);
