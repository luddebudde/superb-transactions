// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./react/css/index.css";
import { ScreenHandler } from "./react/ScreenHandler.tsx";
import { CurrencyProvider } from "./react/mainScreen/currencyContext.tsx";
import { BankProvider } from "./react/bankScreen/bankProvider.tsx";

export type Vec2 = {
  x: number;
  y: number;
};

const prepareGame = () => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <CurrencyProvider>
      <BankProvider>
        <ScreenHandler />
      </BankProvider>
    </CurrencyProvider>,
    // </StrictMode>
  );
};

prepareGame();

// const

const game = () => {
  requestAnimationFrame(game);
};

game();
