export const world = {
  width: screen.width,
  height: screen.height,
};

export const random = (minValue: number, maxValue: number, round = false) => {
  const number = Math.random() * (maxValue - minValue) + minValue;
  return round ? Math.round(number) : number;
};
