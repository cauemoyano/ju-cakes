import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { ContactSchema } from "../../utilities/yup/Schemas";
import PhoneInput from "../primitives/PhoneInput";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContatoForm = () => {
  const handleSubmit = () => {};
  return (
    <VStack spacing={4} mb={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
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
              <FormControl isInvalid={!!(errors.email && touched.email)}>
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
            </Stack>
            <FormControl
              isInvalid={!!(errors.message && touched.message)}
              mb={8}
            >
              <FormLabel htmlFor="message">Mensagem</FormLabel>
              <Textarea
                name="message"
                id="message"
                value={values.message}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="full" colorScheme="primaryNumbered">
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default ContatoForm;
