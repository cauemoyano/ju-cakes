import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import PhoneInput from "../../primitives/PhoneInput";
import { RegisterSchema } from "../../../utilities/yup/Schemas";
import ButtonWithPopOver from "../../primitives/ButtonWithPopOver";
import { useAuth } from "../../../context/AuthContext";

const RegisterComponent = () => {
  const [show, setShow] = useState(false);
  const [termsAndPolicies, setTermsAndPolicies] = useState(false);
  const [newsAndOffers, setNewsAndOffers] = useState(false);
  const { signup, setUserData } = useAuth();

  return (
    <VStack spacing={4}>
      <Formik
        initialValues={{
          name: "",
          emailRegister: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          try {
            const credentials = await signup(
              values.emailRegister,
              values.password
            );
            await setUserData(credentials.user.uid, {
              phone: values.phone,
              name: values.name,
              newsAndOffers,
            });
          } catch (error) {
            console.log(error);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form>
            <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                name="name"
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
              <FormControl
                isInvalid={!!(errors.emailRegister && touched.emailRegister)}
              >
                <FormLabel htmlFor="emailRegister">Email</FormLabel>
                <Input
                  name="emailRegister"
                  id="emailRegister"
                  type="email"
                  value={values.emailRegister}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.emailRegister}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!(errors.phone && touched.phone)} mb={4}>
                <FormLabel htmlFor="phone">Telefone</FormLabel>
                <PhoneInput value={values.phone} handleChange={handleChange} />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={8}>
              <FormControl isInvalid={!!(errors.password && touched.password)}>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!(errors.confirmPassword && touched.confirmPassword)
                }
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirme sua senha
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction={{ base: "column" }} spacing={4} mb={8}>
              <Checkbox
                colorScheme="primaryNumbered"
                spacing="1rem"
                checked={termsAndPolicies}
                onChange={(e) => setTermsAndPolicies(e.target.checked)}
              >
                Eu li e concordo com os Termos de uso e Politicas de
                Privacidade.
              </Checkbox>
              <Checkbox
                colorScheme="primaryNumbered"
                spacing="1rem"
                checked={newsAndOffers}
                onChange={(e) => setNewsAndOffers(e.target.checked)}
              >
                Desejo receber alerta de novos produtos e promocoes por email.
              </Checkbox>
            </Stack>
            <Flex alignItems="center" justifyContent="center" mt={4}>
              {termsAndPolicies ? (
                <Button
                  colorScheme="primaryNumbered"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Criar Conta
                </Button>
              ) : (
                <ButtonWithPopOver popoverBody="Voce deve concordar com os termos de uso e Politicas de Privacidade antes de prosseguir.">
                  <Button colorScheme="primaryNumbered">Criar Conta</Button>
                </ButtonWithPopOver>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default RegisterComponent;
