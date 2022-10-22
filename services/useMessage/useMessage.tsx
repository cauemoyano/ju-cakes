import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import { IMessage } from "../../utilities/Types/Message";
import { createDoc } from "../FirebaseStorageService/FirebaseStorageService";

const useMessage = () => {
  const [loading, setLoading] = useState(false);
  const postMessage = async (data: IMessage) => {
    setLoading(true);
    try {
      await createDoc("messages", data);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { postMessage, loading };
};

export default useMessage;
