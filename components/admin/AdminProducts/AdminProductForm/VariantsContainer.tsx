import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useProducts } from "../../../../context/ProductsContext";
import { ProductVariant } from "../../../../utilities/Types/Products";
/* import { VariantSchema } from "../../../../utilities/yup/Schemas"; */

const VariantsContainer = () => {
  const { setVariants, variants } = useProducts();
  const handleSubmit = async (
    values: ProductVariant,
    actions: FormikHelpers<ProductVariant>
  ) => {
    setVariants([...variants, { ...values }]);
  };

  return (
    <Box mb={6}>
      <Text as="h2" fontSize="lg" mb={3} fontWeight="bold">
        Variantes
      </Text>
      <Box>
        <SimpleGrid columns={3} spacing={4} mb={4} fontWeight="semibold">
          <Text>Nome</Text>
          <Text>Preço</Text>
          <Text>Remover</Text>
        </SimpleGrid>
        <SimpleGrid columns={3} spacing={4}>
          <Text>20 unidades</Text>
          <Text>R$ 5.99</Text>
          <Text>botao</Text>
        </SimpleGrid>
      </Box>
      <Formik
        initialValues={{ name: "20 Unidades", price: 0 }}
        /*         validationSchema={VariantSchema} */
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values, handleChange }) => (
          <Form>
            {/* <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
              <FormLabel htmlFor="variantName">Noma da variante</FormLabel>
              <Input
                name="name"
                id="variantName"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl> */}
            <FormControl isInvalid={!!(errors.name && touched.name)} mb={4}>
              <FormLabel htmlFor="variantName">Nome</FormLabel>
              <Select
                name="name"
                id="variantName"
                value={values.name}
                onChange={handleChange}
              >
                <option value="20 Unidades">20 Unidades</option>
                <option value="30 Unidades">30 Unidades</option>
                <option value="50 Unidades">50 Unidades</option>
              </Select>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!(errors.price && touched.price)} mb={4}>
              <FormLabel htmlFor="variantPrice">Preço</FormLabel>
              <Input
                name="price"
                id="variantPrice"
                type="number"
                value={values.price}
                onChange={handleChange}
                min={0}
                step={0.01}
                pattern="^\d*(\.\d{0,2})?$"
              />
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <Flex alignItems="center" justifyContent="space-between" mt={8}>
              <Button colorScheme="alternativeNumbered" type="submit">
                Adicionar
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VariantsContainer;
