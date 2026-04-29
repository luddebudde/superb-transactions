import { random } from "./basic.ts";

export const cryptoDrift = {
  min: 0.8,
  max: 1.2,
};

const chaosLevel = 1;
export const changeCryptoDrift = () => {
  // High value === increase
  // Low value === decrease
  console.log(cryptoDrift, "1");
  cryptoDrift.min = random(0.6, 1);
  cryptoDrift.max = random(1, 1.4);
  console.log(cryptoDrift, "2");
};
