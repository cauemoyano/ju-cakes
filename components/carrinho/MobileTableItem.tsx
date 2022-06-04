import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import NumberInputWithButtonControl from "../primitives/NumberInputWithButtonControl";

const MobileTableItem = () => {
  return (
    <VStack pt={4} as="li" position="relative">
      <IconButton
        colorScheme="red"
        variant={"ghost"}
        aria-label="Remover produto do carrinho"
        icon={<CloseIcon />}
        isRound={true}
        position="absolute"
        top={0}
        right={0}
      />
      <Flex alignItems="center" pb={2}>
        <Box width="50%" maxWidth="150px">
          <Image src="/brownie-product-page.png" alt="product name" />
        </Box>
        <VStack width="50%" align="left" px={4}>
          <Heading as="h3" fontSize="xl">
            Brownie de morango e recheio de doce de leite
          </Heading>
          <Text fontSize="md">20 Unidades</Text>
        </VStack>
      </Flex>
      <Divider />
      <Flex
        justifyContent="space-between"
        width="100%"
        alignItems={"center"}
        py={2}
      >
        <Text fontSize="lg" fontWeight="bold">
          Quantidade
        </Text>
        <NumberInputWithButtonControl />
      </Flex>
      <Divider />
      <Flex
        justifyContent="space-between"
        width="100%"
        alignItems={"center"}
        py={2}
      >
        <Text fontSize="lg">
          <strong>Total</strong> (2 items)
        </Text>
        <Text fontSize="lg">
          <strong>R$</strong> 50,00
        </Text>
      </Flex>
      <Box height="3px" w="full" bg="primary.dark"></Box>
    </VStack>
  );
};

export default MobileTableItem;
