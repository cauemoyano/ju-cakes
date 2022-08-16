import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { PassRecoverySchema } from "../../../utilities/yup/Schemas";

const RecoveryPass = ({
  setPassRecovery,
}: {
  setPassRecovery: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { sendPassRecoveryEmail } = useAuth();
  const { setError } = useErrorHandler();
  const [submitted, setSubmitted] = useState(false);

  return (
    <VStack spacing={4}>
      <Text>
        Insire seu email abaixo e enviaremos um link para recuperar sua senha.
      </Text>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={PassRecoverySchema}
        onSubmit={async (values, actions) => {
          try {
            const res = await sendPassRecoveryEmail(values.email);
          } catch (error: any) {
            setError(error);
          } finally {
            actions.setSubmitting(false);
            setSubmitted(true);
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
            {submitted && (
              <Alert status="info" mb={4}>
                <AlertIcon />
                Enviaremos um email de recuperação caso seja um email
                registrado. Confira sua caixa de entrada/spam.
              </Alert>
            )}
            {submitted ? (
              <Center>
                <Button
                  type="button"
                  variant="ghost"
                  colorScheme="secondaryNumbered"
                  onClick={() => setPassRecovery(false)}
                  mx="auto"
                >
                  Voltar
                </Button>
              </Center>
            ) : (
              <Flex alignItems="center" justifyContent="space-between" mt={8}>
                <Button
                  colorScheme="primaryNumbered"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Recuperar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  colorScheme="secondaryNumbered"
                  onClick={() => setPassRecovery(false)}
                >
                  Cancelar
                </Button>
              </Flex>
            )}
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default RecoveryPass;
