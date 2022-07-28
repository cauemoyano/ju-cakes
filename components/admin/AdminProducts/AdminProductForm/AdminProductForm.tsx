import { DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FieldArray, Form, Formik, FormikHelpers, getIn } from "formik";
import React, { ChangeEventHandler, useEffect, useRef } from "react";
import { useProducts } from "../../../../context/ProductsContext";
import { ProductFormType } from "../../../../utilities/Types/Products";
import { ProductSchema } from "../../../../utilities/yup/Schemas";
import VariantsContainer from "./VariantsContainer";

const ProductForm = ({
  initialValues,
  handleSubmit,
  handleFileChange,
  imageSrc,
  published,
  setPublished,
}: {
  handleFileChange: ChangeEventHandler<HTMLInputElement>;
  imageSrc: string | ArrayBuffer | null;
} & ProductFormType) => {
  const { categories } = useProducts();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, values, handleChange }) => {
        return (
          <Form>
            <Text as="h2" fontSize="lg" mb={3} fontWeight="bold">
              Dados do produto
            </Text>
            <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
              <FormLabel htmlFor="productName">Nome</FormLabel>
              <Input
                name="name"
                id="productName"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!(errors.category && touched.category)}
              mb={4}
            >
              <FormLabel htmlFor="category">Categoria</FormLabel>
              <Select
                name="category"
                id="category"
                value={values.category}
                onChange={handleChange}
              >
                {categories.loading && (
                  <option value="" data-testid="loading-cat-options">
                    Carregando categorias
                  </option>
                )}
                {!categories.loading && categories.data.length === 0 && (
                  <option value="" data-testid="no-category-options">
                    Não há categorias para selecionar
                  </option>
                )}
                {!categories.loading && categories.data.length > 0 && (
                  <option value="">Selecione uma categoria</option>
                )}
                {!categories.loading &&
                  categories.data.length > 0 &&
                  categories.data.map((cat) => (
                    <option
                      key={cat.id}
                      data-testid="category-option"
                      value={cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}
              </Select>

              <FormErrorMessage>{errors.category}</FormErrorMessage>
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

            <Text as="h2" fontSize="lg" mb={3} fontWeight="bold">
              Variantes
            </Text>
            <FieldArray
              name="variants"
              render={(arrayHelpers) => (
                <div>
                  {values.variants && values.variants.length > 0 && (
                    <>
                      {values.variants.map((variant, index) => {
                        const name = `variants[${index}].name`;
                        const nameError = getIn(errors, name);
                        const price = `variants[${index}].price`;
                        const priceError = getIn(errors, price);
                        return (
                          <Flex key={index}>
                            <FormControl isInvalid={!!nameError} mb={4} mr={4}>
                              <FormLabel htmlFor="variantName">Nome</FormLabel>
                              <Select
                                name={name}
                                id="variantName"
                                value={variant.name}
                                onChange={handleChange}
                                placeholder={"Selecione"}
                              >
                                <option value="20 Unidades">20 Unidades</option>
                                <option value="30 Unidades">30 Unidades</option>
                                <option value="50 Unidades">50 Unidades</option>
                              </Select>
                              <FormErrorMessage>{nameError}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!priceError} mb={4}>
                              <FormLabel htmlFor="variantPrice">
                                Preço
                              </FormLabel>
                              <Input
                                name={price}
                                id="variantPrice"
                                type="number"
                                value={variant.price}
                                onChange={handleChange}
                                min={0}
                                step={0.01}
                                pattern="^\d*(\.\d{0,2})?$"
                              />
                              <FormErrorMessage>{priceError}</FormErrorMessage>
                            </FormControl>

                            <IconButton
                              onClick={() => arrayHelpers.remove(index)}
                              variant="ghost"
                              colorScheme={"red"}
                              aria-label="Deletar variante"
                              icon={<DeleteIcon />}
                              size="lg"
                              my="auto"
                              ml={4}
                            />
                          </Flex>
                        );
                      })}
                    </>
                  )}
                  {values.variants &&
                    !values.variants.length &&
                    errors.variants && (
                      <Text color="red.400">{errors.variants}</Text>
                    )}

                  <Button
                    leftIcon={<PlusSquareIcon />}
                    onClick={() => arrayHelpers.push({ name: "", price: "" })}
                    variant="ghost"
                    colorScheme={"alternativeNumbered"}
                    aria-label="Adicionar variante"
                  >
                    Adicionar
                  </Button>
                </div>
              )}
            />
            <FormControl my={4}>
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
              <Box maxWidth="100px" mb={4}>
                <Image src={imageSrc as string} />
              </Box>
            )}
            <Checkbox
              isChecked={published}
              onChange={(e) => setPublished(e.target.checked)}
              colorScheme="primaryNumbered"
            >
              Publicado
            </Checkbox>

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
        );
      }}
    </Formik>
  );
};

export default ProductForm;
