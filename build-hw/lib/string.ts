export const toUpperCase = (value: string): string => value.toUpperCase();

export const toLowerCase = (value: string): string => value.toLowerCase();

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export const reverse = (value: string): string => value.split("").reverse().join("");

export const countWords = (value: string): number =>
  value.trim() === "" ? 0 : value.trim().split(/\s+/).length;

export const camelCase = (value: string): string =>
  value
    .trim()
    .split(/[\s_-]+/)
    .map((word, index) => (index === 0 ? toLowerCase(word) : capitalize(word)))
    .join("");

export const isPalindrome = (value: string): boolean => {
  const normalized = value.toLowerCase().replace(/[^a-zа-я0-9]/gi, "");

  return normalized === reverse(normalized);
};
