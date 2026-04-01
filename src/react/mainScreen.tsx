import { StockGraph } from "./stockGraph.tsx";
import { TransactionArea } from "./transactionArea.tsx";
import { CurrencyProvider, CurrencySelection } from "./currencySelection.tsx";

export type Props = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<"main" | "bank">>;
};

export const MainScreen = ({ setCurrentMenu }: Props) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [customBuyValue, setCustomBuyValue] = useState(0);
  // const [customSellValue, setCustomSellValue] = useState(0);
  //
  // const [autoBuyStatus, setAutoBuyStatus] = useState(false);
  // const [autoSellStatus, setAutoSellStatus] = useState(false);

  // const [autoBuyValue, useAutoBuyValue] = useState(0)
  // const [autoSellValue , useAutoSellValue] = useState(0)

  return (
    <>
      <div
        id={"mainScreen"}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          background: "grey",
          opacity: "80%",
          padding: "0px",
          overflow: "hidden",
        }}
      >
        <CurrencyProvider>
          <CurrencySelection></CurrencySelection>
          <StockGraph></StockGraph>
          <TransactionArea></TransactionArea>
        </CurrencyProvider>

        <div
          id={"inter-diplomacy"}
          style={{
            left: "75%",
            top: "0%",
            position: "absolute",
            height: "100%",
            width: "25%",
            backgroundColor: "#02095e",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(100, 255, 5, 1)" }}
          >
            Calender
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(255, 240, 5, 1)" }}
            onClick={() => {
              setCurrentMenu("bank");
            }}
          >
            Bank
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "blue" }}>
            Government
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "cyan" }}>
            Policies
          </button>
          <button className={"rightTab"} style={{ backgroundColor: "#6b6b51" }}>
            News
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "honeydew" }}
          >
            Casino
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "indianred" }}
          >
            Licenses
          </button>
          <button
            className={"rightTab"}
            style={{ backgroundColor: "rgba(255, 240, 5, 1)" }}
          >
            Income summary
          </button>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
