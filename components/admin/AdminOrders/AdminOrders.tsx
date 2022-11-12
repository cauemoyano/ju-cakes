import { Container, Divider, Heading, VStack } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import FilterBox from "./FilterBox";
import useOrders from "../../../services/useOrders/useOrders";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { OrderData } from "../../../utilities/Types/Orders";

export const initialFilterState = {
  query: "",
  status: "all",
  startDate: "",
  endDate: "",
  sort: "deliveryDate",
};
export type TOrdersAdminContext = {
  orders: OrderData[];
  setOrders: React.Dispatch<React.SetStateAction<OrderData[]>>;
  filter: typeof initialFilterState;
  setFilter: React.Dispatch<React.SetStateAction<typeof initialFilterState>>;
};

export const OrdersAdminContext = createContext<TOrdersAdminContext | {}>({});

const AdminOrders = () => {
  const [orders, setOrders] = useState<TOrdersAdminContext["orders"]>([]);
  const [filter, setFilter] = useState(initialFilterState);
  const { getAllOrders } = useOrdersAdmin();
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Pedidos
      </Heading>
      <OrdersAdminContext.Provider
        value={{ orders, setOrders, filter, setFilter }}
      >
        <VStack spacing={5}>
          <FilterBox />
          <OrdersList />
        </VStack>
      </OrdersAdminContext.Provider>
    </Container>
  );
};

export default AdminOrders;
