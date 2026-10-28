export const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

export const repeat = (value: string, times: number): string => value.repeat(times);

export const sum = (numbers: number[]): number => numbers.reduce((acc, number) => acc + number, 0);

export const truncate = (value: string, maxLength: number): string =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

export const debounce = <T extends (...args: never[]) => void>(callback: T, delay: number) => {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };
};

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
