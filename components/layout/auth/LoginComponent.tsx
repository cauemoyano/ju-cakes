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
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { LoginSchema } from "../../../utilities/yup/Schemas";
import { useAuth } from "../../../context/AuthContext";
import useErrorHandler, {
  firebaseErrorMap,
} from "../../../services/useErrorHandler/useErrorHandler";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const { setError } = useErrorHandler();

  return (
    <VStack spacing={4}>
      <Formik
        initialValues={{ email: "", senha: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          try {
            const res = await login(values.email, values.senha);
            //todo - redirect to user page, hide logins page/btns if admin to admin page
          } catch (error: any) {
            if (
              error.code === "auth/user-not-found" ||
              error.code === "auth/wrong-password"
            ) {
              actions.setFieldError(
                "email",
                firebaseErrorMap["auth/user-not-found"]
              );
            }
            setError(error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form>
            <FormControl isInvalid={!!(errors.email && touched.email)} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!(errors.senha && touched.senha)}>
              <FormLabel htmlFor="senha">Senha</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="senha"
                  id="senha"
                  value={values.senha}
                  onChange={handleChange}
                  type={show ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.senha}</FormErrorMessage>
            </FormControl>
            <Flex alignItems="center" justifyContent="space-between" mt={8}>
              <Button
                colorScheme="primaryNumbered"
                isLoading={isSubmitting}
                type="submit"
              >
                Entrar
              </Button>
              <Button
                type="button"
                variant="ghost"
                colorScheme="secondaryNumbered"
              >
                Esqueceu a senha?
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default LoginComponent;
