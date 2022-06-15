import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEvent, ChangeEventHandler, useEffect } from "react";
import { CategoryFormType } from "../../../../utilities/Types/Category";
import { CategorySchema } from "../../../../utilities/yup/Schemas";

const CategoryForm = ({
  initialValues,
  handleSubmit,
  handleFileChange,
  imageSrc,
}: {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  imageSrc: string | ArrayBuffer | null;
} & CategoryFormType) => {
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
          <FormControl mb={4}>
            <FormLabel htmlFor="categoryImg">Imagem</FormLabel>
            <Input
              accept="image/*"
              name="img"
              id="categoryImg"
              type="file"
              onChange={handleFileChange}
              variant="unstyled"
              pl={2}
            />
          </FormControl>
          {imageSrc && (
            <Box maxWidth="100px">
              <Image src={imageSrc as string} />
            </Box>
          )}

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
