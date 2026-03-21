// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ScreenHandler } from "./react/ScreenHandler.tsx";

export type Vec2 = {
  x: number;
  y: number;
};

const prepareGame = () => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <ScreenHandler />,
    // </StrictMode>,
  );
};

prepareGame();

// const

const game = () => {
  requestAnimationFrame(game);
};

game();
