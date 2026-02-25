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
