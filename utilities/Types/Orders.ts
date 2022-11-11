import { CartItem } from "./Cart";

export type Customer = {
  uid?: string;
  name: string;
  admin?: boolean;
  email: string;
  phone?: string;
};

type FirebaseDate = {
  seconds?: number;
  nanoseconds?: number;
};

export type OrderData = Pick<Customer, "name" | "email" | "phone"> & {
  id: string;
  customerId: string;
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
  status?: string;
  createdAt?: FirebaseDate;
  createAt?: FirebaseDate;
  deliveryStatus?: undefined | "pending" | "complete";
};
