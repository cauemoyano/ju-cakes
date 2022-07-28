import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import CartSummary from "../components/carrinho/CartSummary";
import DesktopProductsTable from "../components/carrinho/DesktopProductsTable";
import MobileProductsTable from "../components/carrinho/MobileProductsTable";
import { CalendarProvider } from "../context/CalendarContext";
import useCart from "../services/useCart/useCart";
import { NAV_PAGE_PADDING } from "../utilities/constants";
import useViewportChecker from "../utilities/hooks/useViewportChecker";

const Carrinho = () => {
  const { mediaQueries } = useViewportChecker();
  const { cart, subtotal } = useCart();
  return (
    <CalendarProvider>
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
        {cart.length > 0 ? (
          <Flex direction={{ base: "column", md: "row" }} pb={4} mx="auto">
            {mediaQueries.lg || mediaQueries.xl ? (
              <DesktopProductsTable cart={cart} />
            ) : (
              <MobileProductsTable cart={cart} />
            )}
            <CartSummary items={cart.length} subtotal={subtotal} />
          </Flex>
        ) : (
          <Text fontSize="xl" textAlign="center">
            O carrinho está vazio
          </Text>
        )}
      </Container>
    </CalendarProvider>
  );
};

export default Carrinho;
