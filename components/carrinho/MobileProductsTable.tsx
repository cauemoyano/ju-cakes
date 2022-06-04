import { Box, Divider, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import MobileTableItem from "./MobileTableItem";

const MobileProductsTable = () => {
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
        <MobileTableItem />
        <MobileTableItem />
        <MobileTableItem />
      </Box>
    </VStack>
  );
};

export default MobileProductsTable;
