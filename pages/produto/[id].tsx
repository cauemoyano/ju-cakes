import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React, { useState } from "react";
import { BsCart } from "react-icons/bs";
import CartModal from "../../components/cartModal/CartModal";
import NumberInputWithButtonControl from "../../components/primitives/NumberInputWithButtonControl";
import ProductVariantSelection from "../../components/productPage/ProductVariantSelection";
import CategoriesCarousel from "../../components/slider/CategoriesCarousel";
import ProductsCarousel from "../../components/slider/ProductsCarousel";
import {
  getCollection,
  getDocument,
} from "../../services/FirebaseStorageService/FirebaseStorageService";
import useCart from "../../services/useCart/useCart";
import { formatCurrency } from "../../utilities/auxFunctions";
import { NAV_PAGE_PADDING } from "../../utilities/constants";
import { Product, ProductVariant } from "../../utilities/Types/Products";

const ProductPage: NextPage = ({
  product,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, image, description, variants, ingredients, id } =
    product as Product;
  const sortedVariants = variants?.sort((a, b) => a.name.localeCompare(b.name));
  const [variantSelected, setVariant] = useState<ProductVariant | null>(
    sortedVariants ? sortedVariants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const { setShowModal, addItem } = useCart();

  const handleItem = () => {
    if (!id || !variantSelected || !image || !name) return;
    addItem({
      id,
      quantity,
      variant: variantSelected.name,
      image,
      name,
      price: variantSelected.price,
    });
    setShowModal(true);
  };

  const otherProductsInCat = (products as Product[]).filter((p) => p.id !== id);
  return (
    <Box paddingTop={NAV_PAGE_PADDING}>
      <Container px={0} maxWidth="container.lg">
        <Flex direction={{ base: "column", md: "row" }} mt={{ base: 4, md: 8 }}>
          <Box width={{ md: "50%" }}>
            <Image src={image} alt={name} />
          </Box>
          <Flex
            direction={"column"}
            justifyContent={"space-between"}
            padding={{ base: "1rem", md: "0 1rem 0 2rem" }}
            width={{ md: "50%" }}
          >
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}>
              {name}
            </Heading>
            <Text>{description}</Text>
            <ProductVariantSelection
              variants={sortedVariants}
              setVariant={setVariant}
            />
            <VStack align="start" width="100%">
              <HStack fontSize="xl" mb={4}>
                <Text>
                  {formatCurrency((variantSelected?.price || 0) * quantity)}
                </Text>
              </HStack>
              <Flex
                justifyContent="space-between"
                maxWidth="300px"
                width="100%"
              >
                <NumberInputWithButtonControl
                  value={quantity}
                  handleDecrease={() =>
                    quantity >= 2 ? setQuantity(quantity - 1) : 1
                  }
                  handleIncrease={() => setQuantity(quantity + 1)}
                />
                <Button
                  onClick={handleItem}
                  colorScheme={"primaryNumbered"}
                  leftIcon={<BsCart />}
                >
                  Adicionar
                </Button>
              </Flex>
            </VStack>
          </Flex>
        </Flex>
        <Box p={4} mt={{ md: 4, lg: 6 }}>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}>
            Ingredientes
          </Heading>
          <Text mb={4}>{ingredients}</Text>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}>
            Como comprar
          </Heading>
          <Text>
            We’ve got you covered for any holiday, special occasion, or cause
            for celebration. We’ve got you covered for any holiday, special
            occasion, or cause for celebration.{" "}
          </Text>
        </Box>
      </Container>
      <Box
        w="100%"
        h={{ base: "5vh", lg: "10vh" }}
        bgGradient="linear(to-b, light.main, secondary.light)"
      />
      {otherProductsInCat.length > 0 && (
        <Box bg="secondary.light">
          <Container maxWidth="container.xl" p={0}>
            <Flex direction={{ base: "column", md: "row" }}>
              <Box width={{ md: "30%" }} position="relative">
                <Heading
                  pl={8}
                  fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
                >
                  Veja tambem:
                </Heading>
              </Box>
              <Box width={{ md: "70%" }}>
                <ProductsCarousel products={otherProductsInCat} />
              </Box>
            </Flex>
          </Container>
        </Box>
      )}
      <CartModal />
    </Box>
  );
};

export async function getStaticPaths() {
  const products = await getCollection("products");
  const paths = products.map((product) => ({ params: { id: product.id } }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let products = null;
  let product = null;
  if (params?.id) {
    products = await getCollection("products");
    product = products.find((product) => product.id === params?.id);
  }

  return {
    props: { products, product },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};

export default ProductPage;
