import { createContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "../utilities/Types/Auth";

export type DateAndPeriod = {
  date: Date;
  period: string;
};

export type Guest = {
  name: string | null;
  email: string | null;
  phone: string;
};
export type Customer = Partial<User> & Partial<Guest>;

export type CheckoutContextType = {
  dateAndPeriod: DateAndPeriod | null;
  setDateAndPeriod: Dispatch<SetStateAction<DateAndPeriod | null>>;
  paymentRate: "50%" | "100%";
  setPaymentRate: Dispatch<SetStateAction<"50%" | "100%">>;
  customer: Customer | null;
  setCustomer: Dispatch<SetStateAction<Customer | null>>;
  guest: Guest | null;
  setGuest: Dispatch<SetStateAction<Guest | null>>;
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
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [guest, setGuest] = useState<Guest | null>(null);

  return (
    <CheckoutContext.Provider
      value={{
        dateAndPeriod,
        setDateAndPeriod,
        paymentRate,
        setPaymentRate,
        customer,
        setCustomer,
        guest,
        setGuest,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
