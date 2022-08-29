import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import useCheckout from "../../services/useCheckout/useCheckout";
import { GuestSchema } from "../../utilities/yup/Schemas";
import ButtonWithPopOver from "../primitives/ButtonWithPopOver";
import PhoneInput from "../primitives/PhoneInput";

const GuestForm = () => {
  const [termsAndPolicies, setTermsAndPolicies] = useState(false);
  const { setGuest } = useCheckout();
  return (
    <VStack>
      <Heading fontFamily="inter" fontSize="lg" fontWeight="normal" mb={4}>
        Compre como visitante. So precisamos de algumas informações
      </Heading>
      <Formik
        initialValues={{ email: "", name: "", phone: "" }}
        validationSchema={GuestSchema}
        onSubmit={(values) => {
          console.log(`submit`);
          setGuest(values);
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
            <FormControl isInvalid={!!(errors.phone && touched.phone)} mb={4}>
              <FormLabel htmlFor="phone">Telefone</FormLabel>
              <PhoneInput value={values.phone} handleChange={handleChange} />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>
            <Checkbox
              colorScheme="primaryNumbered"
              spacing="1rem"
              checked={termsAndPolicies}
              onChange={(e) => setTermsAndPolicies(e.target.checked)}
              mb={4}
            >
              Eu li e concordo com os Termos de uso e Politicas de Privacidade.
            </Checkbox>
            <Flex alignItems="center" justifyContent="center" mt={4}>
              {termsAndPolicies ? (
                <Button
                  colorScheme="primaryNumbered"
                  isLoading={isSubmitting}
                  type="submit"
                  variant="outline"
                >
                  Continuar como visitante
                </Button>
              ) : (
                <ButtonWithPopOver popoverBody="Voce deve concordar com os termos de uso e Politicas de Privacidade antes de prosseguir.">
                  <Button colorScheme="primaryNumbered" variant="outline">
                    Continuar como visitante
                  </Button>
                </ButtonWithPopOver>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default GuestForm;
