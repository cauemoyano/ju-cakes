export type ProductVariant = {
  name: "20 Unidades" | "30 Unidades" | "50 Unidades";
  price: number;
};

export type Product = {
  id?: string;
  name: string;
  category?: string;
  description?: string;
  ingredients?: string;
  image?: string;
  variants?: ProductVariant[];
  published?: boolean;
};

export interface CartItem {
  id: string;
  variant: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
}

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
};
