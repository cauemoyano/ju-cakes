import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  List,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsCashCoin,
  BsClock,
  BsFillPersonFill,
  BsFillTelephoneFill,
  BsTruck,
} from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { formatCurrency } from "../../../utilities/auxFunctions";
import { OrderData } from "../../../utilities/Types/Orders";
import { getOrderDetails, OrderItem } from "../../conta/OrderDetails";

type Props = {
  id: string;
};

const AdminOrderDetails = (props: Props) => {
  const { updateOrderStatus, updatingStatus, orders } = useOrdersAdmin();
  const [order, setOrder] = useState<OrderData | null>(null);
  const { id: orderId } = props;
  useEffect(() => {
    const order = getOrderDetails(orderId, orders);
    if (!order) return;
    setOrder(order);
  }, [orders]);

  if (!order) return null;

  const {
    paymentRate,
    dateAndPeriod,
    createAt,
    createdAt,
    transaction_details,
    cart,
    id,
    deliveryStatus,
    name,
    email,
    phone,
  } = order;
  const { date, period } = dateAndPeriod;
  const deliveryDate = new Date(date).toLocaleDateString("pt-BR");

  const creationDate = createdAt?.seconds || createAt?.seconds || 0;
  const creationDateString = new Date(creationDate * 1000).toLocaleDateString(
    "pt-BR"
  );

  const { installment_amount, total_paid_amount } = transaction_details;
  const installments = Math.round(total_paid_amount / installment_amount);
  const delivered =
    deliveryStatus && deliveryStatus === "complete" ? true : false;
  return (
    <VStack spacing={4} alignItems="flex-start">
      <Text>
        <strong>ORDEM </strong>
        {id}
      </Text>
      <Text>
        <strong>PEDIDO CRIADO EM </strong>
        {creationDateString}
      </Text>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 8 }}
        bg="gray.50"
        p={4}
        borderRadius="md"
        w="full"
      >
        <Box>
          <Text fontWeight="bold" mb={2}>
            DADOS DO CLIENTE
          </Text>
          <VStack align="left">
            <Flex alignItems="center">
              <Icon as={BsFillPersonFill} mr={2} fontSize="2xl" />
              <Text>{name}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={MdAlternateEmail} mr={2} fontSize="2xl" />
              <Text>{email}</Text>
            </Flex>
            <Flex alignItems="center">
              <Icon as={BsFillTelephoneFill} mr={2} fontSize="2xl" />
              <Text>{phone}</Text>
            </Flex>
          </VStack>
        </Box>
        <Box>
          <Box mb={4}>
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
              ALTERAR ESTADO DO PEDIDO
            </Text>
            <Button
              isLoading={updatingStatus}
              colorScheme="primaryNumbered"
              leftIcon={delivered ? <BsClock /> : <CheckIcon />}
              variant={delivered ? "ghost" : "solid"}
              onClick={() =>
                updateOrderStatus(id, delivered ? "pending" : "complete")
              }
            >
              {delivered ? "Marcar como Pendente" : "Marcar como Entregue"}
            </Button>
          </Box>
        </Box>
      </Stack>

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
        {paymentRate === "50%" ? (
          <Text mt={2}>
            <strong>Valor a receber: </strong>
            {formatCurrency(total_paid_amount)}
          </Text>
        ) : null}
      </Box>
    </VStack>
  );
};

export default AdminOrderDetails;
