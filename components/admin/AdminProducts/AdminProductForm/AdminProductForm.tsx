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
import { Product, ProductFormType } from "../../../../utilities/Types/Admin";
import { ProductSchema } from "../../../../utilities/yup/Schemas";

const ProductForm = ({ initialValues, handleSubmit }: ProductFormType) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <Form>
          <FormControl
            isInvalid={!!(errors.productName && touched.productName)}
            mb={4}
          >
            <FormLabel htmlFor="productName">Nome</FormLabel>
            <Input
              name="productName"
              id="productName"
              type="text"
              value={values.productName}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.productName}</FormErrorMessage>
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

export default ProductForm;
