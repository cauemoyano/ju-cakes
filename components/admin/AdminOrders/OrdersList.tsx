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
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import OrdersMobile from "./OrdersMobile";
import OrdersTable from "./OrdersTable";

const OrdersList = () => {
  const [isMdOrLarger] = useMediaQuery("(min-width: 768px)");
  return (
    <Box bg="whiteAlpha.100" borderRadius={"md"} boxShadow="md" w="full">
      {isMdOrLarger ? <OrdersTable /> : <OrdersMobile />}
    </Box>
  );
};

export default OrdersList;
