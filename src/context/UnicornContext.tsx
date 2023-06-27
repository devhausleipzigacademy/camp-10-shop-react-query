import { createContext, useContext, useState } from "react";

type Unicorn = {
  phrase: string;
  setUnicornNumber: (number: number) => void;
  unicornNumber: number;
};

export const ExampleContext = createContext({} as Unicorn);

export const useUnicornContext = () => useContext(ExampleContext);

function UnicornProvider({ children }: { children: React.ReactNode }) {
  const [unicornNumber, setUnicornNumber] = useState(0);

  const phrase = `${unicornNumber} cute unicorns got counted`;

  return (
    <ExampleContext.Provider
      value={{
        phrase,
        setUnicornNumber,
        unicornNumber,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
}

export default UnicornProvider;
