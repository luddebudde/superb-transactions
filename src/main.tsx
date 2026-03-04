import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ScreenHandler } from "./react/ScreenHandler.tsx";

const prepareGame = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ScreenHandler />
    </StrictMode>,
  );
};

prepareGame();

export type GraphPoint = {
  id: number;
  pos: {
    x: number;
    y: number;
  };
  scale: number;
  value: number;
  color: string;
};

const funCoin = {
  id: "funCoin",
  value: 5,
  points: new Array(5),
};

funCoin.points.push(1);
funCoin.points.push(1);

console.log(funCoin);
const coins = [funCoin];

// const

const game = () => {
  requestAnimationFrame(game);
};

game();
