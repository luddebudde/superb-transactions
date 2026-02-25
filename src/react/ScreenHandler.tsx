import { useState } from "react";
import { BankScreen } from "./bankScreen.tsx";
import MainScreen from "./mainScreen.tsx";

export const ScreenHandler = () => {
  const [currentMenu, setCurrentMenu] = useState("bank");

  const screens = {
    main: <MainScreen />,
    bank: <BankScreen />,
  };
  return (
    <>
      {/*{currentMenu === "main" && <MainScreen />}*/}

      {/*{currentMenu === "bank" && <BankScreen />}*/}
      {screens[currentMenu]}
    </>
  );
};
