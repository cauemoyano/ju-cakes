import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { LoginSchema } from "../../../utilities/yup/Schemas";

type Props = {
  handleSubmit: (
    values: { email: string; senha: string },
    actions: FormikHelpers<{ email: string; senha: string }>
  ) => Promise<void>;
  setPassRecovery?: Dispatch<SetStateAction<boolean>>;
  relogin?: boolean;
};

const LoginForm = (props: Props) => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const { handleSubmit, setPassRecovery, relogin } = props;
  return (
    <Formik
      initialValues={{ email: relogin && user ? user.email : "", senha: "" }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <Form>
          <FormControl
            display={relogin && user ? "none" : "block"}
            isInvalid={!!(errors.email && touched.email)}
            mb={4}
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              name="email"
              id="email"
              type="email"
              value={relogin && user ? user.email : values.email}
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
          <Flex
            alignItems="center"
            justifyContent={relogin ? "end" : "space-between"}
            mt={8}
          >
            <Button
              colorScheme="primaryNumbered"
              isLoading={isSubmitting}
              type="submit"
            >
              Entrar
            </Button>
            {setPassRecovery ? (
              <Button
                type="button"
                variant="ghost"
                colorScheme="secondaryNumbered"
                onClick={() => setPassRecovery(true)}
              >
                Esqueceu a senha?
              </Button>
            ) : null}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
