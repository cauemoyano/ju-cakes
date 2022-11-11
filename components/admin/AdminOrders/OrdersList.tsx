import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useOrdersAdmin from "../../../services/useOrdersAdmin/useOrdersAdmin";
import { OrderData } from "../../../utilities/Types/Orders";
import SimpleModal from "../../layout/modal/SimpleModal";
import AdminOrderDetails from "./AdminOrderDetails";
import OrdersMobile from "./OrdersMobile";
import OrdersTable from "./OrdersTable";

const OrdersList = () => {
  return (
    <Box bg="whiteAlpha.100" borderRadius={"md"} boxShadow="md" w="full">
      {/* <OrdersTable /> */}
      <OrdersMobile />
    </Box>
  );
};

export default OrdersList;
