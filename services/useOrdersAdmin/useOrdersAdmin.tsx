import React, { Context, useContext, useMemo, useState } from "react";
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
  const { orders, setOrders, filter, setFilter } = useContext(
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

  const filteredOrders = useMemo(() => {
    if (!filter) return [];
    const { query, status, startDate, endDate, sort } = filter;
    let filteredOrders = [...orders];
    if (query) {
      filteredOrders = filteredOrders.filter((order) => {
        const { name, id, email } = order;
        return (
          name?.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          id.toLocaleLowerCase().includes(query)
        );
      });
    }
    if (status !== "all") {
      filteredOrders = filteredOrders.filter((order) => {
        const { deliveryStatus } = order;
        if (status === "pending" && !deliveryStatus) return true;
        return status === deliveryStatus;
      });
    }
    if (startDate) {
      filteredOrders = filteredOrders.filter((order) => {
        const {
          dateAndPeriod: { date },
        } = order;

        return new Date(date).getTime() >= new Date(startDate).getTime();
      });
    }
    if (endDate) {
      filteredOrders = filteredOrders.filter((order) => {
        const {
          dateAndPeriod: { date },
        } = order;

        return new Date(date).getTime() <= new Date(endDate).getTime();
      });
    }
    if (sort) {
      filteredOrders = filteredOrders.sort((a, b) => {
        const {
          dateAndPeriod: { date: aDeliveryDate },
          createAt: aCreation,
          name: aName,
        } = a;
        const {
          dateAndPeriod: { date: bDeliveryDate },
          createAt: bCreation,
          name: bName,
        } = b;
        if (sort === "deliveryDate")
          return (
            new Date(aDeliveryDate).getTime() -
            new Date(bDeliveryDate).getTime()
          );
        const aCreationSeconds = aCreation?.seconds || 0;
        const bCreationSeconds = bCreation?.seconds || 0;
        if (sort === "orderDate")
          return (
            new Date(aCreationSeconds * 1000).getTime() -
            new Date(bCreationSeconds * 1000).getTime()
          );
        if (sort === "name") return aName?.localeCompare(bName);
        return 0;
      });
    }
    return filteredOrders;
  }, [filter, orders]);
  return {
    orders,
    getAllOrders,
    getCartItemsQty,
    getCartAmount,
    updatingStatus,
    updateOrderStatus,
    filter,
    setFilter,
    filteredOrders,
  };
};

export default useOrdersAdmin;
