import { createContext, type ReactNode, useContext, useState } from "react";

interface BankProviderProps {
  children: ReactNode;
}

export type BankContextType = {
  depositAmount: number;
  setDepositAmount: React.Dispatch<React.SetStateAction<number>>;
  interestAmount: number;
  setInterestAmount: React.Dispatch<React.SetStateAction<number>>;
  yieldRate: number;
  setYieldRate: React.Dispatch<React.SetStateAction<number>>;
  loanHistory: number[];

  setLoanHistory: React.Dispatch<React.SetStateAction<number[]>>;
  depositHistory: number[];
  setDepositHistory: React.Dispatch<React.SetStateAction<number[]>>;
  yieldHistory: number[];
  setYieldHistory: React.Dispatch<React.SetStateAction<number[]>>;
  interestHistory: number[];
  setInterestHistory: React.Dispatch<React.SetStateAction<number[]>>;
};

export const BankContext = createContext<BankContextType | null>(null);

export const BankProvider = ({ children }: BankProviderProps) => {
  const [depositAmount, setDepositAmount] = useState(0);

  const [interestAmount, setInterestAmount] = useState(0);
  const [yieldRate, setYieldRate] = useState(1.05);

  const [loanHistory, setLoanHistory] = useState([0]);
  const [depositHistory, setDepositHistory] = useState([0]);

  const [yieldHistory, setYieldHistory] = useState([1.05]);
  const [interestHistory, setInterestHistory] = useState([0]);

  return (
    <BankContext.Provider
      value={{
        depositAmount,
        setDepositAmount,
        interestAmount,
        setInterestAmount,
        yieldRate,
        setYieldRate,
        loanHistory,
        setLoanHistory,
        depositHistory,
        setDepositHistory,
        yieldHistory,
        setYieldHistory,
        interestHistory,
        setInterestHistory,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};
