export const world = {
  width: screen.width,
  height: screen.height,
};

export const random = (minValue: number, maxValue: number, round = false) => {
  const number = Math.random() * (maxValue - minValue) + minValue;
  return round ? Math.round(number) : number;
};

export const convertPrefix: string = (value: number) => {
  const prefixes = ["", "k", "m", "b", "t", "q"];
  const stringified = JSON.stringify(Math.round(value));

  // Fix so that 100s work as well
  const selectedPrefix = prefixes[Math.floor(stringified.length / 3)];

  console.log(stringified, selectedPrefix);

  return stringified.concat(selectedPrefix);
};
