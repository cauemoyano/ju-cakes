import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CartItem } from "../utilities/Types/Cart";
import { Product } from "../utilities/Types/Products";

export type CartContextType = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextType | []>([]);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <CartContext.Provider value={{ cart, setCart, showModal, setShowModal }}>
      {children}
    </CartContext.Provider>
  );
};
