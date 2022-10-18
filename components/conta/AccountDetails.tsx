import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useAccount, {
  TPersonalData,
} from "../../services/useAccount/useAccount";
import { UserDetailsSchema } from "../../utilities/yup/Schemas";
import PhoneInput from "../primitives/PhoneInput";
import EditSave from "./EditSave";
import ReloginModal from "../layout/modal/ReloginModal";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";

const AccountDetails = () => {
  const { user } = useAuth();
  const {
    toggleEdit,
    isEditing,
    updatePersonalData,
    isLoading,
    error,
    setError,
    handleAfterLogin,
  } = useAccount();

  if (!user) return null;
  const { name, email, phone } = user;
  const loginRequired = error?.code === "auth/requires-recent-login";

  return (
    <>
      <VStack
        spacing={4}
        width="min(100%, 600px)"
        mx="auto"
        align="left"
        mb={6}
      >
        <Formik
          initialValues={{ name, email, phone }}
          validationSchema={UserDetailsSchema}
          onSubmit={updatePersonalData}
        >
          {({ errors, touched, values, handleChange, handleReset }) => (
            <>
              <Flex justifyContent="space-between" width="full">
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontFamily="inter"
                  whiteSpace={"nowrap"}
                >
                  Dados Pessoais
                </Heading>
                <EditSave
                  isEditing={isEditing}
                  toggleEdit={toggleEdit}
                  handleReset={handleReset}
                  isLoading={isLoading}
                />
              </Flex>
              <Form>
                <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<BsFillPersonFill color="gray.300" />}
                    />
                    <Input
                      name="name"
                      type="text"
                      value={values.name as string}
                      onChange={handleChange}
                      variant={isEditing ? "outline" : "unstyled"}
                      readOnly={!isEditing}
                      pt={!isEditing ? "6px" : 0}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!(errors.email && touched.email)}
                  mb={4}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdOutlineAlternateEmail color="gray.300" />}
                    />
                    <Input
                      name="email"
                      type="email"
                      value={values.email as string}
                      onChange={handleChange}
                      variant={isEditing ? "outline" : "unstyled"}
                      readOnly={!isEditing}
                      pt={!isEditing ? "6px" : 0}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!(errors.phone && touched.phone)}
                  mb={4}
                >
                  <FormLabel htmlFor="phone">Telefone</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.500" />}
                    />
                    <PhoneInput
                      value={values.phone}
                      handleChange={handleChange}
                      variant={isEditing ? "outline" : "unstyled"}
                      readOnly={!isEditing}
                      pt={!isEditing ? "6px" : 0}
                      pl={"40px"}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>

                <ReloginModal
                  isOpen={loginRequired}
                  onClose={() => setError(null)}
                  handleAfterLogin={handleAfterLogin}
                />
              </Form>
            </>
          )}
        </Formik>
      </VStack>
    </>
  );
};

export default AccountDetails;
