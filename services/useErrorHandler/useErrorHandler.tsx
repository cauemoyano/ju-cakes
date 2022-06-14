import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";

export const firebaseErrorMap = {
  "auth/email-already-in-use": "Email inválido",
  "auth/user-not-found": "Usuário ou senha inválido",
};

const useErrorHandler = () => {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!error) return;
    report(error);
    cleanup();
  }, [error]);

  const cleanup = () => setError(null);

  const report = (err: FirebaseError) => console.log(err.code);

  return {
    error,
    setError,
  };
};

export default useErrorHandler;
