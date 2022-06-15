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
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEventHandler } from "react";
import { ProductFormType } from "../../../../utilities/Types/Products";
import { ProductSchema } from "../../../../utilities/yup/Schemas";

const ProductForm = ({
  initialValues,
  handleSubmit,
  handleFileChange,
  imageSrc,
}: {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  imageSrc: string | ArrayBuffer | null;
} & ProductFormType) => {
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
          <FormControl
            isInvalid={!!(errors.category && touched.category)}
            mb={4}
          >
            <FormLabel htmlFor="category">Categoria</FormLabel>
            <Input
              name="category"
              id="category"
              type="text"
              value={values.category}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.category}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!(errors.price && touched.price)} mb={4}>
            <FormLabel htmlFor="price">Preço</FormLabel>
            <Input
              name="price"
              id="price"
              type="number"
              value={values.price}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.price}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!(errors.description && touched.description)}
            mb={4}
          >
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!(errors.ingredients && touched.ingredients)}
            mb={4}
          >
            <FormLabel htmlFor="ingredients">Ingredientes</FormLabel>
            <Textarea
              name="ingredients"
              id="ingredients"
              value={values.ingredients}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.ingredients}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!(errors.variant && touched.variant)} mb={4}>
            <FormLabel htmlFor="variant">Variante</FormLabel>
            <Select
              name="variant"
              id="variant"
              value={values.variant}
              onChange={handleChange}
            >
              <option value="20 Unidades">20 Unidades</option>
              <option value="30 Unidades">30 Unidades</option>
              <option value="50 Unidades">50 Unidades</option>
            </Select>
            <FormErrorMessage>{errors.variant}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="productImg">Imagem</FormLabel>
            <Input
              accept="image/*"
              name="img"
              id="productImg"
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

export default ProductForm;
