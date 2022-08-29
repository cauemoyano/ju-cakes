import { httpsCallable } from "firebase/functions";
import React, {
  Context,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { functions } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import {
  CheckoutContext,
  CheckoutContextType,
  Customer,
} from "../../context/CheckoutContext";
import { createCode } from "../PagSeguro/Pagseguro";
import useCart from "../useCart/useCart";

const useCheckout = () => {
  const { cart, subtotal } = useCart();
  const { user } = useAuth();
  const {
    dateAndPeriod,
    setDateAndPeriod,
    paymentRate,
    setPaymentRate,
    customer,
    setCustomer,
    guest,
    setGuest,
  } = useContext(CheckoutContext as Context<CheckoutContextType>);

  const getPaymentAmount = httpsCallable(functions, "getPaymentAmount");

  const getCheckoutAmount = async () => {
    const cartItems = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      variantSelected: item.variant,
    }));
    try {
      const res = await getPaymentAmount({ cartItems });
      const { data: totalAmount } = res;

      const amount: number =
        paymentRate === "50%"
          ? (totalAmount as number) * 0.5
          : (totalAmount as number);

      return amount.toString();
    } catch (error) {
      throw new Error("Could not fetch amount");
    }
  };

  useEffect(() => {
    if (!user && guest) {
      setCustomer(guest);
    }
    if (user && !guest) {
      setCustomer(user);
    }
    if (!user && !guest) {
      setCustomer(null);
    }
  }, [user, guest]);

  const isCartEmpty = () => !!!cart.length;

  return {
    dateAndPeriod,
    setDateAndPeriod,
    cart,
    subtotal,
    paymentRate,
    setPaymentRate,
    getCheckoutAmount,
    isCartEmpty,
    customer,
    setGuest,
  };
};

export default useCheckout;
