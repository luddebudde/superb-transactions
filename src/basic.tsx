import type { Vec2 } from "./main.tsx";

export const world = {
  width: screen.width,
  height: screen.height,
};

export const random = (
  minValue: number,
  maxValue: number,
  round = false,
): number => {
  const number = Math.random() * (maxValue - minValue) + minValue;
  return round ? Math.round(number) : number;
};

export const convertPrefix = (value: number): string => {
  const prefixes = ["", "k", "m", "b", "t", "q"];

  const stringified = JSON.stringify(Math.round(value));
  // const stringifiedFinal = JSON.stringify(Math.round(value % 1000));

  // Fix so that 100s work as well
  const selectedPrefix = prefixes[Math.floor(stringified.length / 4)];

  return stringified.concat(selectedPrefix);
};

export const lastElement = (array: []): any => {
  return array[array.length - 1];
};

export const origo: Vec2 = {
  x: 0,
  y: 0,
};
