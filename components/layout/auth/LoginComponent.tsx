import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import {
  LoginSchema,
  PassRecoverySchema,
} from "../../../utilities/yup/Schemas";
import { useAuth } from "../../../context/AuthContext";
import useErrorHandler, {
  firebaseErrorMap,
} from "../../../services/useErrorHandler/useErrorHandler";
import { useRouter } from "next/router";
import RecoveryPass from "./RecoveryPass";
import LoginForm from "./LoginForm";

const LoginComponent = () => {
  const { login, sendPassRecoveryEmail } = useAuth();
  const { setError } = useErrorHandler();
  const [passRecovery, setPassRecovery] = useState(false);

  const handleSubmit = async (
    values: { email: string; senha: string },
    actions: FormikHelpers<{
      email: string;
      senha: string;
    }>
  ) => {
    try {
      await login(values.email, values.senha);
      //todo - redirect to user page, hide logins page/btns if admin to admin page
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        actions.setFieldError("email", firebaseErrorMap["auth/user-not-found"]);
      }
      setError(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      {passRecovery ? (
        <RecoveryPass setPassRecovery={setPassRecovery} />
      ) : (
        <VStack spacing={4}>
          <LoginForm
            handleSubmit={handleSubmit}
            setPassRecovery={setPassRecovery}
          />
        </VStack>
      )}
    </>
  );
};

export default LoginComponent;
