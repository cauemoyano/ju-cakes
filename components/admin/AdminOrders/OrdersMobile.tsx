import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListItem,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCashCoin, BsFillPersonFill, BsStack, BsTruck } from "react-icons/bs";
import { RiTruckFill } from "react-icons/ri";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { OrderData } from "../../../utilities/Types/Orders";
import SimpleModal from "../../layout/modal/SimpleModal";
import AdminOrderDetails from "./AdminOrderDetails";

const OrdersMobile = () => {
  const { orders } = useOrdersAdmin();
  const [showOrderDetails, setShowOrderDetails] = useState<OrderData | null>(
    null
  );
  const header = <Heading fontSize={"3xl"}>Detalhes da Ordem</Heading>;
  const footer = (
    <Button onClick={() => setShowOrderDetails(null)}>Fechar</Button>
  );
  return (
    <>
      <List>
        {orders.map((order) => (
          <OrdersMobileItem
            key={order.id}
            order={order}
            setShowOrderDetails={setShowOrderDetails}
          />
        ))}
      </List>
      <SimpleModal
        header={header}
        footer={footer}
        isOpen={!!showOrderDetails}
        onClose={() => setShowOrderDetails(null)}
      >
        {showOrderDetails ? (
          <AdminOrderDetails id={showOrderDetails.id} />
        ) : null}
      </SimpleModal>
    </>
  );
};

const OrdersMobileItem = ({
  order,
  setShowOrderDetails,
}: {
  order: OrderData;
  setShowOrderDetails: (value: React.SetStateAction<OrderData | null>) => void;
}) => {
  const { name, dateAndPeriod, email, phone, deliveryStatus, cart } = order;
  const deliveryDate = dateAndPeriod
    ? `${new Date(dateAndPeriod.date).toLocaleDateString("pt-BR")} - ${
        dateAndPeriod.period
      }`
    : null;
  const { getCartItemsQty, getCartAmount } = useOrdersAdmin();
  return (
    <ListItem
      mb={4}
      p={4}
      bg="whiteAlpha.900"
      borderRadius={"md"}
      boxShadow="md"
      onClick={() => setShowOrderDetails(order)}
    >
      <VStack align="left" spacing={3}>
        <Flex alignItems="center">
          <Icon as={RiTruckFill} mr={2} fontSize="2xl" />
          <Text>{deliveryDate}</Text>
        </Flex>
        <Flex alignItems="center">
          <Icon as={BsFillPersonFill} mr={2} fontSize="2xl" />
          <Text>{name}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Flex alignItems="center">
            <Icon as={BsStack} mr={2} fontSize="2xl" />
            <Text>{getCartItemsQty(cart)}</Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={BsCashCoin} mr={2} fontSize="2xl" />
            <Text>{getCartAmount(cart)}</Text>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          <Tag
            colorScheme={deliveryStatus === "complete" ? "green" : "red"}
            borderRadius="full"
          >
            {deliveryStatus === "complete" ? "Confirmado" : "Pendente"}
          </Tag>
          <Search2Icon />
        </Flex>
      </VStack>
    </ListItem>
  );
};

export default OrdersMobile;
