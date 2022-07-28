import React, { Context, useContext, useState } from "react";
import {
  CheckoutContext,
  CheckoutContextType,
} from "../../context/CheckoutContext";
import { CartItem } from "../../utilities/Types/Cart";
import useCart from "../useCart/useCart";

const useCheckout = () => {
  const { cart, subtotal } = useCart();
  const { dateAndPeriod, setDateAndPeriod } = useContext(
    CheckoutContext as Context<CheckoutContextType>
  );

  return { dateAndPeriod, setDateAndPeriod };
};

export default useCheckout;
