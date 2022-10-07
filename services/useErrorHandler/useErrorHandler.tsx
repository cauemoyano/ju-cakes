import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";

type TFirebaseErrorMap = {
  [key: string]: string;
};
export const firebaseErrorMap: TFirebaseErrorMap = {
  "auth/email-already-in-use": "Email inválido",
  "auth/user-not-found": "Usuário ou senha inválido",
  "functions/aborted": "Falha ao processar pagamento.",
  "functions/unavailable": "Provedor de pagamento fora do ar.",
  "functions/internal": "Um erro interno ocorreu, entre em contato conosco.",
  "auth/requires-recent-login":
    "Favor entrar novamente com seu nome de usuário e senha.",
};
type TMercadoPagoFormErrorsMap = {
  [key: string]: string;
};
export const MERCADOPAGO_FORM_ERRORS: TMercadoPagoFormErrorsMap = {
  "cardNumber should be of length between '8' and '19'.":
    "Número do cartão deve ser entre 9 e 19 dígitos.",
  "cardNumber should be a number.":
    "Número do cartão deve conter apenas dígitos.",
  "expirationMonth should be a number.":
    "Mês de validade deve conter apenas dígitos.",
  "expirationYear should be a number.":
    "Ano de validade deve conter apenas dígitos.",
  "expirationYear should be of length '2' or '4'.":
    "Ano de validade deve conter 2 ou 4 dígitos.",
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
