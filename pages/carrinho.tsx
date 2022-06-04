import { Container, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import CartSummary from "../components/carrinho/CartSummary";
import DesktopProductsTable from "../components/carrinho/DesktopProductsTable";
import MobileProductsTable from "../components/carrinho/MobileProductsTable";
import { NAV_PAGE_PADDING } from "../utilities/constants";
import useViewportChecker from "../utilities/hooks/useViewportChecker";

const Carrinho = () => {
  const { mediaQueries } = useViewportChecker();
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
        my={4}
      >
        Carrinho
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} pb={4} mx="auto">
        {mediaQueries.lg || mediaQueries.xl ? (
          <DesktopProductsTable />
        ) : (
          <MobileProductsTable />
        )}

        <CartSummary />
      </Flex>
    </Container>
  );
};

export default Carrinho;
