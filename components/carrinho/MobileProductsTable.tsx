import { Box, Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { CartItem } from "../../utilities/Types/Cart";
import MobileTableItem from "./MobileTableItem";

const MobileProductsTable = ({ cart }: { cart: CartItem[] }) => {
  return (
    <VStack as="section" align="left" px={4}>
      <Heading
        as="h2"
        fontWeight="bold"
        color="primary.dark"
        fontSize="xl"
        fontFamily="inter"
      >
        Produtos
      </Heading>
      <Box as="ul">
        {cart.map((item) => (
          <MobileTableItem key={`${item.id}-${item.variant}`} item={item} />
        ))}
        {/*  <MobileTableItem />
        <MobileTableItem />
        <MobileTableItem /> */}
      </Box>
    </VStack>
  );
};

export default MobileProductsTable;
