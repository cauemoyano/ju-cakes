import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsCashCoin, BsTruck } from "react-icons/bs";
import { formatCurrency } from "../../utilities/auxFunctions";
import { CartItem } from "../../utilities/Types/Cart";
import { OrderData } from "../../utilities/Types/Orders";

type Props = {
  id: string | null;
  orders: OrderData[] | null;
};

export const getOrderDetails = (id: string, orders: OrderData[]) => {
  return orders.find((order) => order.id === id);
};

const OrderDetails = (props: Props) => {
  const { id, orders } = props;

  if (!orders || !id) return null;
  const details = getOrderDetails(id, orders);
  if (!details) return null;

  const {
    paymentRate,
    dateAndPeriod,
    createAt,
    createdAt,
    transaction_details,
    cart,
  } = details;

  const { date, period } = dateAndPeriod;
  const deliveryDate = new Date(date).toLocaleDateString("pt-BR");

  const { installment_amount, total_paid_amount } = transaction_details;
  const installments = Math.round(total_paid_amount / installment_amount);
  return (
    <VStack spacing={4} alignItems="flex-start">
      <Text>
        <strong>ORDEM </strong>
        {id}
      </Text>
      <Box>
        <Text fontWeight="bold" mb={2}>
          DATA DE RETIRADA
        </Text>
        <Flex alignItems="center">
          <Icon as={BsTruck} mr={2} fontSize="2xl" />
          <Text>
            {deliveryDate} - {period}
          </Text>
        </Flex>
      </Box>
      <Box>
        <Text fontWeight="bold" mb={2}>
          ITEMS
        </Text>
        <List>
          {cart.map((item) => (
            <OrderItem key={item.id} {...item} />
          ))}
        </List>
      </Box>
      <Box>
        <Text fontWeight="bold" mb={2}>
          PAGAMENTO
        </Text>
        <Text mb={2}>
          {installments}x {formatCurrency(installment_amount)}{" "}
          {installments > 1 ? "(Inclui juros)" : ""}
        </Text>
        <HStack spacing={4}>
          <Icon
            fontSize={"2xl"}
            as={BsCashCoin}
            color={paymentRate === "50%" ? "yellow.300" : "green.500"}
          />
          <Box>
            <Text>Pagamento {paymentRate === "50%" ? "Parcial" : "Total"}</Text>
            {paymentRate === "50%" ? (
              <Text fontSize="small" color="gray.700">
                O valor restante deverá ser pago na retirada
              </Text>
            ) : null}
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
};

export const OrderItem = ({
  name,
  price,
  quantity,
  variant,
  image,
}: CartItem) => {
  return (
    <ListItem>
      <Flex align="center" gap={"4"}>
        <Center w="clamp(50px, 20%, 100px)">
          <Image src={image} alt={name} />
        </Center>
        <VStack flex="1" align={"flex-start"}>
          <Text fontWeight="semibold">
            {quantity}x {name}
          </Text>
          <Text>{variant}</Text>
        </VStack>
        <Center>{formatCurrency(price)}</Center>
      </Flex>
    </ListItem>
  );
};

export default OrderDetails;
