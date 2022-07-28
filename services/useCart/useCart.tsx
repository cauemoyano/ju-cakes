import React, { Context, useContext, useEffect, useState } from "react";
import { CartContext, CartContextType } from "../../context/CartContext";
import { useProducts } from "../../context/ProductsContext";
import { CartItem } from "../../utilities/Types/Cart";

const useCart = () => {
  const { cart, setCart, showModal, setShowModal } = useContext(
    CartContext as Context<CartContextType>
  );
  const [amount, setAmount] = useState(0);

  const addItem = (item: CartItem) => {
    const { id, variant, quantity } = item;
    const itemInCart = cart.find((i) => i.id === id && i.variant === variant);
    if (itemInCart) {
      const index = cart.indexOf(itemInCart);
      itemInCart.quantity += quantity;
      cart[index] = itemInCart;
      setCart([...cart]);
      return;
    }
    setCart([...cart, item]);
  };

  const updateQuantity = (item: CartItem) => {
    const { id, quantity, variant } = item;
    const cartItem = cart.find(
      (item) => item.id === id && item.variant === variant
    );
    if (!cartItem) return;
    quantity >= 1
      ? (cart[cart.indexOf(cartItem)] = item)
      : cart.slice(cart.indexOf(cartItem), 1);
    setCart([...cart]);
  };

  const removeItem = (item: CartItem) => {
    const { id, variant } = item;
    const cartItems = cart.filter((i) => i.id !== id || i.variant !== variant);
    setCart([...cartItems]);
  };

  useEffect(() => {
    const total = cart.reduce((total, item) => {
      return (total += item.quantity * item.price);
    }, 0);
    setAmount(total);
  }, [cart]);

  return {
    cart,
    addItem,
    updateQuantity,
    setShowModal,
    showModal,
    subtotal: amount,
    removeItem,
  };
};

export default useCart;
