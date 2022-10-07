import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
    <VStack spacing={4}>
      <Formik
        initialValues={{ name, email, phone }}
        validationSchema={UserDetailsSchema}
        onSubmit={updatePersonalData}
      >
        {({ errors, touched, values, handleChange, handleReset }) => (
          <Form>
            <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                name="name"
                type="text"
                value={values.name as string}
                onChange={handleChange}
                variant={isEditing ? "outline" : "unstyled"}
                readOnly={!isEditing}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!(errors.email && touched.email)} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={values.email as string}
                onChange={handleChange}
                variant={isEditing ? "outline" : "unstyled"}
                readOnly={!isEditing}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!(errors.phone && touched.phone)} mb={4}>
              <FormLabel htmlFor="phone">Telefone</FormLabel>
              <PhoneInput
                value={values.phone}
                handleChange={handleChange}
                variant={isEditing ? "outline" : "unstyled"}
                readOnly={!isEditing}
              />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>
            <EditSave
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              handleReset={handleReset}
              isLoading={isLoading}
            />
            <ReloginModal
              isOpen={loginRequired}
              onClose={() => setError(null)}
              handleAfterLogin={handleAfterLogin}
            />
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default AccountDetails;
