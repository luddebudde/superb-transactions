import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainScreen from "./mainScreen.tsx";

const prepareGame = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MainScreen />
    </StrictMode>,
  );
};

prepareGame();
