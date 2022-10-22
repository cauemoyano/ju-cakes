import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import useMessage from "../../services/useMessage/useMessage";
import { IMessage } from "../../utilities/Types/Message";
import { ContactSchema } from "../../utilities/yup/Schemas";
import PhoneInput from "../primitives/PhoneInput";

const initialValues: IMessage = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContatoForm = () => {
  const { postMessage, loading } = useMessage();
  const toast = useToast();
  const handleSubmit = async (
    values: IMessage,
    actions: FormikHelpers<IMessage>
  ) => {
    //todo - limit request and add captcha
    const { resetForm } = actions;
    try {
      await postMessage({ ...values, isRead: false });
      toast({
        title: "Sucesso",
        description: "Mensagem foi enviada, retornaremos em breve.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Desculpa, ocorreu um erro. Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <VStack spacing={4} mb={8}>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange }) => (
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
            <Button
              disabled={loading}
              type="submit"
              w="full"
              colorScheme="primaryNumbered"
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default ContatoForm;
