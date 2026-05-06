import { random } from "../basic.ts";

export const people = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  money: random(5000, 50000),
  income: random(1000, 10000),
  crypto: {
    first: 0,
    second: 0,
  },
}));
