import { useState } from "react";
import { BankScreen } from "./bankScreen.tsx";
import MainScreen from "./mainScreen/mainScreen.tsx";

export const ScreenHandler = () => {
  const [currentMenu, setCurrentMenu] = useState("main");
  // const [currentMenu, setCurrentMenu] = useState("bank");

  // const screens = {
  //   main: <MainScreen setCurrentMenu={setCurrentMenu} />,
  //   bank: <BankScreen setCurrentMenu={setCurrentMenu} />,
  // };
  return (
    <>
      <div
        style={{ visibility: currentMenu === "main" ? "visible" : "hidden" }}
      >
        <MainScreen setCurrentMenu={setCurrentMenu} />
      </div>

      <div
        style={{ visibility: currentMenu === "bank" ? "visible" : "hidden" }}
      >
        <BankScreen setCurrentMenu={setCurrentMenu} />
      </div>
    </>
  );
};
