import { random } from "./basic.ts";

export const cryptoDrift = {
  min: 1 / 1.1,
  max: 1.1,
  average: 1,
};

// const chaosLevel = 1;

// Calculated depending on:
// Previous 12 months of prices
// Ready stash for the people
//

export const changeCryptoDrift = () => {
  // High value === increase
  // Low value === decrease
  // console.log(cryptoDrift, "1");
  // const margin = 1.4;

  // cryptoDrift.min = random(1 / margin, 1);
  // cryptoDrift.max = random(1, margin);
  // console.log(cryptoDrift, "2");

  cryptoDrift.average = random(1 / 1.05, 1.01);
  // console.log(cryptoDrift.average);
};
