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
import React from "react";
import { BsCart } from "react-icons/bs";
import NumberInputWithButtonControl from "../../components/primitives/NumberInputWithButtonControl";
import ProductVariantSelection from "../../components/productPage/ProductVariantSelection";
import CategoriesCarousel from "../../components/slider/CategoriesCarousel";
import ProductsCarousel from "../../components/slider/ProductsCarousel";
import { NAV_PAGE_PADDING } from "../../utilities/constants";

const ProductPage = () => {
  return (
    <Box paddingTop={NAV_PAGE_PADDING}>
      <Container px={0} maxWidth="container.lg">
        <Flex direction={{ base: "column", md: "row" }} mt={{ md: 4 }}>
          <Box width={{ md: "50%" }}>
            <Image src="/brownie-product-page.png" alt="" />
          </Box>
          <Flex
            direction={"column"}
            justifyContent={"space-between"}
            px={4}
            py={{ base: 4, md: 0 }}
            padding={{ base: "1rem", md: "0 1rem 0 1rem" }}
            width={{ md: "50%" }}
          >
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}>
              Brownie 1
            </Heading>
            <Text>
              We make our bake-sale bestsellers in small batches and from
              top-shelf ingredients, just the way Mom made ‘em—perhaps even
              better? Either way, our selection of brownies and bars can’t be
              beat.
            </Text>
            <ProductVariantSelection />
            <VStack align="start" width="100%">
              <HStack fontSize="xl" mb={4}>
                <Text fontWeight={600}>R$</Text>
                <Text>50,00</Text>
              </HStack>
              <Flex
                justifyContent="space-between"
                maxWidth="300px"
                width="100%"
              >
                <NumberInputWithButtonControl />
                <Button
                  bg="primary.dark"
                  color="light.main"
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
          <Text mb={4}>
            We’ve got you covered for any holiday, special occasion, or cause
            for celebration. We’ve got you covered for any holiday, special
            occasion, or cause for celebration.{" "}
          </Text>
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
      <Box bg="secondary.light">
        <Container maxWidth="container.xl" p={0}>
          <Flex direction={{ base: "column", md: "row" }}>
            <Box width={{ md: "30%" }} position="relative">
              <Heading pl={8} fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}>
                Veja tambem:
              </Heading>
            </Box>
            <Box width={{ md: "70%" }}>
              <ProductsCarousel />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductPage;
