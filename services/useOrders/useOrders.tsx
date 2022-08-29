import React, { useState } from "react";
import {
  getDocsByQuery,
  getDocument,
} from "../FirebaseStorageService/FirebaseStorageService";

const useOrders = () => {
  const getOrder = async (id: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
      try {
        const doc = getDocument("orders", id);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  return { getOrder };
};

export default useOrders;
