import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuantityContextType {
  quantity: number;
  setQuantity: (qty: number) => void;
}

const QuantityContext = createContext<QuantityContextType>({
  quantity: 0,
  setQuantity: () => {},
});

interface QuantityProviderProps {
  children: ReactNode;
}

export const QuantityProvider: React.FC<QuantityProviderProps> = ({
  children,
}) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => {
  const context = useContext(QuantityContext);
  return context;
};
