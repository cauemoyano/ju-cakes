import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillPersonFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import useCart from "../../services/useCart/useCart";
import useOrders from "../../services/useOrders/useOrders";
import { formatCurrency } from "../../utilities/auxFunctions";
import { OrderData } from "../../utilities/Types/Orders";
import CustomLink from "../primitives/CustomLink";
import ItemsTable from "./ItemsTable";
import OrderpaymentDetails from "./OrderpaymentDetails";

type Props = { orderId: string };

const OrderConfirmation = (props: Props) => {
  //todo - clear cart
  const { orderId } = props;
  const { getOrder } = useOrders();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOrder(orderId)
      .then((order: OrderData) => setOrder(order))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (!order && loading) return null;
  if (!order) return <Text>Um erro ocorreu, favor entrar em contato.</Text>;
  const {
    uid,
    name,
    email,
    phone,
    cart,
    dateAndPeriod,
    transaction_amount,
    paymentRate,
    transaction_details,
  } = order;
  console.log(order);
  return (
    <VStack p={4} spacing={8}>
      <Heading as="h1" textAlign="center" mb={6}>
        Obrigado! Seu pedido foi confirmado.
      </Heading>
      <Text maxWidth="600px">
        Sua ordem número <strong>{uid}</strong> foi gerada com sucesso. Você
        receberá um email com a confirmação do pedido.
      </Text>
      <VStack alignItems="start" spacing={4} maxWidth="600px">
        <VStack alignItems="start" mb={4}>
          <Text fontWeight={600} mb={2}>
            Seus dados pessoais:
          </Text>

          <HStack>
            <Icon as={BsFillPersonFill} />
            <Text fontWeight={600}>Nome:</Text>
            <Text>{name}</Text>
          </HStack>

          <HStack>
            <Icon as={MdAlternateEmail} />
            <Text fontWeight={600}>Email:</Text>
            <Text>{email}</Text>
          </HStack>
          <HStack>
            <Icon as={BsFillTelephoneFill} />
            <Text fontWeight={600}>Telefone:</Text>
            <Text>{phone}</Text>
          </HStack>
        </VStack>
        <Box>
          <Text fontWeight={600} mb={2}>
            Items de seu pedido
          </Text>
          <ItemsTable cart={cart} />
          <OrderpaymentDetails
            transaction_amount={transaction_amount}
            paymentRate={paymentRate}
            transaction_details={transaction_details}
          />
        </Box>
        <HStack pt={4}>
          <Text fontWeight={600}>Data de retirada:</Text>
          <Text>
            {new Date(dateAndPeriod.date).toLocaleDateString("pt-BR")} -{" "}
            {dateAndPeriod.period}
          </Text>
        </HStack>
      </VStack>
      <CustomLink
        href="/"
        colorScheme="primaryNumbered"
        px="16"
        py="2"
        bgColor={"primary.dark"}
        color="white"
        borderRadius="md"
      >
        Página inicial
      </CustomLink>
    </VStack>
  );
};

export default OrderConfirmation;
