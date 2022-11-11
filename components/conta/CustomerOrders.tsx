import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useOrders from "../../services/useOrders/useOrders";
import { OrderData } from "../../utilities/Types/Orders";
import SimpleModal from "../layout/modal/SimpleModal";
import OrderDetails from "./OrderDetails";
import OrdersList from "./OrdersList";

const initialShowOrderDetails: { state: boolean; value: null | string } = {
  state: false,
  value: null,
};

const CustomerOrders = () => {
  const { getAllCustomerOrders } = useOrders();
  const [orders, setOrders] = useState<OrderData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(
    initialShowOrderDetails
  );

  useEffect(() => {
    getAllCustomerOrders().then((res) => {
      setOrders(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (!orders || !orders.length) return <Text>No orders to display.</Text>;

  const header = <Heading fontSize={"3xl"}>Detalhes da Ordem</Heading>;
  const footer = (
    <Button onClick={() => setShowOrderDetails(initialShowOrderDetails)}>
      Fechar
    </Button>
  );

  return (
    <Box width="min(100%, 600px)" mx="auto">
      <Heading
        as="h2"
        fontSize="2xl"
        mb={4}
        fontFamily="inter"
        whiteSpace={"nowrap"}
      >
        Minhas Ordens
      </Heading>
      <OrdersList orders={orders} setShowOrderDetails={setShowOrderDetails} />
      <SimpleModal
        header={header}
        footer={footer}
        isOpen={showOrderDetails.state}
        onClose={() => setShowOrderDetails(initialShowOrderDetails)}
      >
        <OrderDetails orders={orders} id={showOrderDetails.value} />
      </SimpleModal>
    </Box>
  );
};

export default CustomerOrders;
