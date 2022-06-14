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
import React from "react";
import { CategoryFormType } from "../../../../utilities/Types/Category";
import { CategorySchema } from "../../../../utilities/yup/Schemas";

const CategoryForm = ({ initialValues, handleSubmit }: CategoryFormType) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CategorySchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <Form>
          <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
            <FormLabel htmlFor="categoryName">Nome</FormLabel>
            <Input
              name="name"
              id="categoryName"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <Flex alignItems="center" justifyContent="space-between" mt={8}>
            <Button
              colorScheme="primaryNumbered"
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
