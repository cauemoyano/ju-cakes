import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";

export const firebaseErrorMap = {
  "auth/email-already-in-use": "Email inválido",
  "auth/user-not-found": "Usuário ou senha inválido",
};

const useErrorHandler = () => {
  const [error, setError] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    if (!error) return;
    report(error);
    cleanup();
  }, [error]);

  const cleanup = () => setError(null);

  const report = (err: any) => console.log(err.message);
  const errorToast = (message: string) => {
    toast({
      title: "Ocorreu um erro.",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  return {
    error,
    setError,
    errorToast,
  };
};

export default useErrorHandler;
