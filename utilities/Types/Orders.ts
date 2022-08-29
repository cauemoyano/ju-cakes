import { CartItem } from "./Cart";

export type Customer = {
  uid?: string;
  name: string;
  admin?: boolean;
  email: string;
  phone?: string;
};

export type OrderData = Customer & {
  dateAndPeriod: {
    date: Date;
    period: string;
  };
  cart: CartItem[];
  paymentRate: string;
  transaction_amount: number;
  transaction_details: {
    installment_amount: number;
    total_paid_amount: number;
  };
};
