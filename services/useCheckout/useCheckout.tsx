import { httpsCallable } from "firebase/functions";
import React, { Context, useContext, useEffect, useState } from "react";
import { functions } from "../../config/firebase";
import {
  CheckoutContext,
  CheckoutContextType,
} from "../../context/CheckoutContext";
import { createCode } from "../PagSeguro/Pagseguro";
import useCart from "../useCart/useCart";

const useCheckout = () => {
  const { cart, subtotal } = useCart();
  const { dateAndPeriod, setDateAndPeriod, paymentRate, setPaymentRate } =
    useContext(CheckoutContext as Context<CheckoutContextType>);

  /*   useEffect(() => {
    createCode();
  }, []); */
  const getPaymentAmount = httpsCallable(functions, "getPaymentAmount");

  const getCheckoutAmount = async () => {
    const cartItems = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      variantSelected: item.variant,
    }));
    try {
      const amount = await getPaymentAmount({ cartItems });
      return (amount.data as number).toString();
    } catch (error) {
      throw new Error("COuld not fetch amount");
    }
  };

  return {
    dateAndPeriod,
    setDateAndPeriod,
    cart,
    subtotal,
    paymentRate,
    setPaymentRate,
    getCheckoutAmount,
  };
};

export default useCheckout;
