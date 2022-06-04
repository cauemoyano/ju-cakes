import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import NumberInputWithButtonControl from "../primitives/NumberInputWithButtonControl";

const DesktopTableItem = () => {
  return (
    <Tr>
      <Td px={2}>
        <Flex alignItems="center" pb={2} maxWidth="250px">
          <Box width="40%" maxWidth="100px">
            <Image src="/brownie-product-page.png" alt="product name" />
          </Box>
          <VStack width="60%" align="left" pl={4}>
            <Heading as="h3" fontSize="lg" whiteSpace={"normal"}>
              Brownie de morango e recheio de doce de leite
            </Heading>
            <Text fontSize="md">20 Unidades</Text>
          </VStack>
        </Flex>
      </Td>
      <Td px={4}>
        <NumberInputWithButtonControl />
      </Td>
      <Td px={2} position="relative">
        <Text fontSize="lg">
          <strong>R$</strong> 50,00
        </Text>
        <IconButton
          colorScheme="red"
          variant={"ghost"}
          aria-label="Remover produto do carrinho"
          icon={<CloseIcon />}
          isRound={true}
          position="absolute"
          top={0}
          right={"0.5rem"}
        />
      </Td>
    </Tr>
  );
};

export default DesktopTableItem;
