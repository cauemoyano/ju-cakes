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
import { UserDetailsSchema } from "../../utilities/yup/Schemas";
import PhoneInput from "../primitives/PhoneInput";
import EditSave from "./EditSave";

type Props = {};

const handleSubmit = () => {};

const AccountDetails = (props: Props) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((state) => !state);

  if (!user) return null;
  const { name, email, phone } = user;
  return (
    <VStack spacing={4}>
      <EditSave isEditing={isEditing} toggleEdit={toggleEdit} />
      <Formik
        initialValues={{ name, email, phone }}
        validationSchema={UserDetailsSchema}
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
                id="email"
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
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default AccountDetails;
