import {
  Box,
  Divider,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useCheckout from "../../services/useCheckout/useCheckout";
import { formatCurrency } from "../../utilities/auxFunctions";

const CheckoutSummary = () => {
  const { cart, subtotal, dateAndPeriod } = useCheckout();
  console.log(dateAndPeriod);
  return (
    <VStack p={4} shadow="md" spacing={4} borderWidth="1px" borderRadius="5px">
      <Heading fontSize="2xl" mb={4}>
        Resumo do Pedido
      </Heading>
      {cart.map(({ id, quantity, name, variant, price }) => (
        <Flex key={id} justifyContent="space-between" w="full">
          <Text fontWeight={500}>
            {quantity}x {name}{" "}
            <Text as="span" fontWeight={400}>
              ({variant})
            </Text>
          </Text>
          <Text>{formatCurrency(quantity * price)}</Text>
        </Flex>
      ))}
      <Divider />
      <Flex w="full" justifyContent="space-between">
        <Text fontWeight={500}>Data da Retirada:</Text>
        <Text>
          {dateAndPeriod?.date.toLocaleDateString("pt-Br")} -{" "}
          {dateAndPeriod?.period}
        </Text>
      </Flex>
      <Divider />
      <Flex w="full" justifyContent="space-between" fontWeight={600}>
        <Text>Total</Text>
        <Text>{formatCurrency(subtotal)}</Text>
      </Flex>
    </VStack>
  );
};

export default CheckoutSummary;
