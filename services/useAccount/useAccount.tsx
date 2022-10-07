import { Toast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { User as FirebaseUser } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  updateDoc,
  updateUserEmail,
} from "../FirebaseStorageService/FirebaseStorageService";
import useErrorHandler, {
  firebaseErrorMap,
} from "../useErrorHandler/useErrorHandler";

export type TPersonalData = {
  name: string;
  email: string;
  phone: string;
};

const useAccount = () => {
  const { errorToast } = useErrorHandler();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [personalData, setPersonalData] = useState<TPersonalData | null>(null);
  const { user, firebaseUser, refreshToken } = useAuth();

  const refreshTokenRef = useRef(refreshToken);

  const handleSuccessToast = () => {
    Toast({
      title: "Sucesso",
      description: "Dados foram alterados com sucesso",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleEdit = () => setIsEditing((state) => !state);

  const updatePersonalData = async (data: TPersonalData) => {
    if (!user || !firebaseUser) return;
    const { uid, email, name, phone } = user;
    const { name: newName, phone: newPhone, email: newEmail } = data;
    setIsLoading(true);
    try {
      if (!personalData) {
        throw new FirebaseError("auth/requires-recent-login", "error occurred");
      }
      if (name !== newName || phone !== newPhone) {
        await updateDoc("customers", uid, { name: newName, phone: newPhone });
      }
      if (email !== newEmail) {
        await updateUserEmail(firebaseUser, newEmail);
      }
      setIsEditing(false);
      handleSuccessToast();
    } catch (error: any) {
      errorToast(firebaseErrorMap[error.code] || "Ocorreu um erro.");
      setPersonalData(data);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAfterLogin = async () => {
    setError(null);
    if (personalData) {
      await updatePersonalData(personalData);
      setPersonalData(null);
    }
  };

  useEffect(() => {
    if (!refreshToken || !personalData) return;

    if (refreshTokenRef.current === refreshToken) return;

    updatePersonalData(personalData).then(() => {
      setError(null);
      setPersonalData(null);
    });
  }, [refreshToken, personalData]);

  return {
    toggleEdit,
    isEditing,
    updatePersonalData,
    isLoading,
    error,
    setError,
    handleAfterLogin,
  };
};

export default useAccount;
