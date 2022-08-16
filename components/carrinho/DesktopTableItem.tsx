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
import useCart from "../../services/useCart/useCart";
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";
import NumberInputWithButtonControl from "../primitives/NumberInputWithButtonControl";

const DesktopTableItem = ({ item }: { item: CartItem }) => {
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
    <Tr>
      <Td px={2}>
        <Flex alignItems="center" pb={2} maxWidth="250px">
          <Box width="40%" maxWidth="100px">
            <Image src={image} alt={name} />
          </Box>
          <VStack width="60%" align="left" pl={4}>
            <Heading as="h3" fontSize="lg" whiteSpace={"normal"}>
              {name}
            </Heading>
            <Text fontSize="md">{variant}</Text>
          </VStack>
        </Flex>
      </Td>
      <Td px={4} minWidth="170px">
        <NumberInputWithButtonControl
          value={quantity}
          handleDecrease={() => handleChange("decrease")}
          handleIncrease={() => handleChange("increase")}
          alignSelf="center"
        />
      </Td>
      <Td px={2} minWidth="140px" textAlign="center" position="relative">
        <Text fontSize="lg">{formatCurrency(price * quantity)}</Text>
        <IconButton
          colorScheme="red"
          variant={"ghost"}
          aria-label="Remover produto do carrinho"
          icon={<CloseIcon />}
          isRound={true}
          position="absolute"
          top={0}
          right={"0.5rem"}
          onClick={() => removeItem(item)}
        />
      </Td>
    </Tr>
  );
};

export default DesktopTableItem;
