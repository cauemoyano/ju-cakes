import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { OrderData } from "../../utilities/Types/Orders";
import {
  getDocsByQuery,
  getDocument,
} from "../FirebaseStorageService/FirebaseStorageService";

const useOrders = () => {
  const { user } = useAuth();

  const getOrder = async (id: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
      try {
        const doc = getDocument("orders", id);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });

  const getAllOrders = async () => {
    if (!user) return [];

    const orders = (await getDocsByQuery(
      "orders",
      "customerId",
      user.uid
    )) as unknown;
    return orders as OrderData[];
  };
  return { getOrder, getAllOrders };
};

export default useOrders;
