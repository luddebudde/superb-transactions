import { useState } from "react";
import { BankScreen } from "./bankScreen.tsx";
import MainScreen from "./mainScreen.tsx";

export const ScreenHandler = () => {
  const [currentMenu, setCurrentMenu] = useState("main");
  // const [currentMenu, setCurrentMenu] = useState("bank");

  const screens = {
    main: <MainScreen setCurrentMenu={setCurrentMenu} />,
    bank: <BankScreen setCurrentMenu={setCurrentMenu} />,
  };
  return <>{screens[currentMenu]}</>;
};
