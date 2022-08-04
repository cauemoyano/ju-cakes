import React, { Context, useContext, useState } from "react";
import {
  CheckoutContext,
  CheckoutContextType,
} from "../../context/CheckoutContext";
import useCart from "../useCart/useCart";

const useCheckout = () => {
  const { cart, subtotal } = useCart();
  const { dateAndPeriod, setDateAndPeriod, paymentRate, setPaymentRate } =
    useContext(CheckoutContext as Context<CheckoutContextType>);

  return {
    dateAndPeriod,
    setDateAndPeriod,
    cart,
    subtotal,
    paymentRate,
    setPaymentRate,
  };
};

export default useCheckout;
