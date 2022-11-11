import React, { Context, useContext, useState } from "react";
import {
  OrdersAdminContext,
  TOrdersAdminContext,
} from "../../components/admin/AdminOrders/AdminOrders";
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";
import { OrderData } from "../../utilities/Types/Orders";
import {
  getCollection,
  updateDoc,
} from "../FirebaseStorageService/FirebaseStorageService";

const useOrdersAdmin = () => {
  const { orders, setOrders } = useContext(
    OrdersAdminContext as Context<TOrdersAdminContext>
  );
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const getAllOrders = async () => {
    return getCollection("orders") as unknown as OrderData[];
  };

  const getCartItemsQty = (cart: CartItem[]) => {
    if (!cart) return null;
    return cart.reduce((total, curr) => (total += curr.quantity), 0);
  };
  const getCartAmount = (cart: CartItem[]) => {
    if (!cart) return null;
    const total = cart.reduce((total, curr) => (total += curr.price), 0);
    return formatCurrency(total);
  };
  const updateOrderStatus = async (
    id: string,
    deliveryStatus: "pending" | "complete"
  ) => {
    setUpdatingStatus(true);
    try {
      await updateDoc("orders", id, { deliveryStatus }, true);
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingStatus(false);
    }
  };
  return {
    orders,
    getAllOrders,
    getCartItemsQty,
    getCartAmount,
    updatingStatus,
    updateOrderStatus,
  };
};

export default useOrdersAdmin;
