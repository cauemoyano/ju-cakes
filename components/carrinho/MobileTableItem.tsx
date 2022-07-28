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
import useCart from "../../services/useCart/useCart";
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";
import NumberInputWithButtonControl from "../primitives/NumberInputWithButtonControl";

const MobileTableItem = ({ item }: { item: CartItem }) => {
  const { name, variant, image, quantity, price } = item;
  const { updateQuantity, removeItem } = useCart();

  const handleChange = (type: "increase" | "decrease") => {
    const changed = { ...item };
    if (type === "increase") {
      changed.quantity = quantity + 1;
      updateQuantity(changed);
    }
    if (type === "decrease") {
      changed.quantity = quantity - 1;
      updateQuantity(changed);
    }
  };
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
        onClick={() => removeItem(item)}
      />
      <Flex alignItems="center" pb={2}>
        <Box width="50%" maxWidth="150px">
          <Image src={image} alt={name} />
        </Box>
        <VStack width="50%" align="left" px={4}>
          <Heading as="h3" fontSize="xl">
            {name}
          </Heading>
          <Text fontSize="md">{variant}</Text>
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
        <NumberInputWithButtonControl
          value={quantity}
          handleDecrease={() => handleChange("decrease")}
          handleIncrease={() => handleChange("increase")}
        />
      </Flex>
      <Divider />
      <Flex
        justifyContent="space-between"
        width="100%"
        alignItems={"center"}
        py={2}
      >
        <Text fontSize="lg">
          <strong>Total</strong> ({quantity} items)
        </Text>
        <Text fontSize="lg">{formatCurrency(quantity * price)}</Text>
      </Flex>
      <Box height="3px" w="full" bg="primary.dark"></Box>
    </VStack>
  );
};

export default MobileTableItem;
