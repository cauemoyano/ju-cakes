import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { formatCurrency } from "../../utilities/auxFunctions";
import { OrderData } from "../../utilities/Types/Orders";

type Props = {
  orders: OrderData[];
};

type CommonProps = {
  setShowOrderDetails: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      value: null | string;
    }>
  >;
};

const OrdersList = (props: Props & CommonProps) => {
  const { orders, setShowOrderDetails } = props;
  return (
    <>
      <SimpleGrid columns={3} mb={4} fontSize="xl">
        <Text color="primary.dark">Data Pedido</Text>
        <Text color="primary.dark" textAlign="center">
          Data Entrega
        </Text>
        <Text color="primary.dark" textAlign="end" mr={6}>
          Valor
        </Text>
      </SimpleGrid>
      <Box as="ul">
        {orders.map((item) => (
          <OrderItem
            key={item.id}
            orderItem={item}
            setShowOrderDetails={setShowOrderDetails}
          />
        ))}
      </Box>
    </>
  );
};

const OrderItem = (props: { orderItem: OrderData } & CommonProps) => {
  const { orderItem, setShowOrderDetails } = props;
  const {
    status,
    dateAndPeriod,
    transaction_details,
    id,
    createdAt,
    createAt,
  } = orderItem;

  const creationDate = createdAt?.seconds || createAt?.seconds || 0;
  const creationDateString = new Date(creationDate * 1000).toLocaleDateString(
    "pt-BR"
  );
  const { date, period } = dateAndPeriod;
  const deliveryDate = new Date(date).toLocaleDateString("pt-BR");
  return (
    <SimpleGrid
      as="li"
      columns={3}
      cursor={"pointer"}
      _hover={{ bg: "gray.100" }}
      px={2}
      sx={{ transition: "0.4s all ease" }}
      onClick={() => setShowOrderDetails({ state: true, value: id })}
    >
      <Text py={2}>{creationDateString}</Text>
      <Text py={2} textAlign="center">
        {deliveryDate} - {period}
      </Text>
      <Flex justifyContent={"end"}>
        <Text py={2}>
          {formatCurrency(transaction_details?.total_paid_amount)}
        </Text>
        <IconButton
          aria-label="ver mais"
          icon={<SearchIcon />}
          variant={"ghost"}
        />
      </Flex>
    </SimpleGrid>
  );
};

export default OrdersList;
