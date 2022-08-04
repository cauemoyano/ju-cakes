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
  paymentRate: "50%" | "100%";
  setPaymentRate: Dispatch<SetStateAction<"50%" | "100%">>;
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
  const [paymentRate, setPaymentRate] = useState<"50%" | "100%">("100%");

  return (
    <CheckoutContext.Provider
      value={{ dateAndPeriod, setDateAndPeriod, paymentRate, setPaymentRate }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
