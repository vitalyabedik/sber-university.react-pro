export const add = (a: number, b: number): number => a + b;

export const subtract = (a: number, b: number): number => a - b;

export const multiply = (a: number, b: number): number => a * b;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const factorial = (value: number): number => {
  let result = 1;

  for (let index = 2; index <= value; index += 1) {
    result *= index;
  }

  return result;
};

export const average = (numbers: number[]): number =>
  numbers.length === 0 ? 0 : numbers.reduce(add, 0) / numbers.length;

export const isEven = (value: number): boolean => value % 2 === 0;
