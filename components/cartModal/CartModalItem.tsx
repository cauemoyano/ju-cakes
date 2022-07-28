import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCart from "../../services/useCart/useCart";
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";
import NumberInputWithButtonControl from "../primitives/NumberInputWithButtonControl";

const CartModalItem = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCart();
  const { name, image, variant, price, quantity } = item;

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
    <HStack width="100%" position="relative">
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
      <Image src={image} alt={name} maxWidth="50%"></Image>
      <Flex direction={"column"} alignItems={"start"}>
        <Heading as="h2" fontSize="xl">
          {name}
        </Heading>
        <Text>{variant}</Text>
        <Text fontWeight={500}>{formatCurrency(price * quantity)}</Text>
        <NumberInputWithButtonControl
          value={quantity}
          handleIncrease={() => handleChange("increase")}
          handleDecrease={() => handleChange("decrease")}
        />
      </Flex>
    </HStack>
  );
};

export default CartModalItem;
