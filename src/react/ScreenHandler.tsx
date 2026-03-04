import { useState } from "react";
import { BankScreen } from "./bankScreen.tsx";
import MainScreen from "./mainScreen.tsx";

export type Props = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<"main" | "bank">>;
};

export const ScreenHandler = () => {
  const [currentMenu, setCurrentMenu] = useState("main");
  // const [currentMenu, setCurrentMenu] = useState("bank");

  const screens = {
    main: <MainScreen setCurrentMenu={setCurrentMenu} />,
    bank: <BankScreen setCurrentMenu={setCurrentMenu} />,
  };
  return <>{screens[currentMenu]}</>;
};
