// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ScreenHandler } from "./react/ScreenHandler.tsx";

import { CurrencyProvider } from "./react/currencyContext.tsx";

export type Vec2 = {
  x: number;
  y: number;
};

const prepareGame = () => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <CurrencyProvider>
      <ScreenHandler />,
    </CurrencyProvider>,
    // </StrictMode>,
  );
};

prepareGame();

// const

const game = () => {
  requestAnimationFrame(game);
};

game();
