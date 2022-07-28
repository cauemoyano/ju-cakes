import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CartItem } from "../utilities/Types/Cart";
import { Product } from "../utilities/Types/Products";

export type DateAndPeriod = {
  date: Date;
  period: string;
};

export type CheckoutContextType = {
  dateAndPeriod: DateAndPeriod | null;
  setDateAndPeriod: Dispatch<SetStateAction<DateAndPeriod | null>>;
};

export const CheckoutContext = createContext<CheckoutContextType | []>([]);

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dateAndPeriod, setDateAndPeriod] = useState<DateAndPeriod | null>(
    null
  );

  return (
    <CheckoutContext.Provider value={{ dateAndPeriod, setDateAndPeriod }}>
      {children}
    </CheckoutContext.Provider>
  );
};
