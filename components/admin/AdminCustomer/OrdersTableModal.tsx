import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const OrdersTableModal = () => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text px={4} fontWeight={"bold"}>
          Numero
        </Text>
        <Text px={4} fontWeight={"bold"}>
          Data
        </Text>
      </Flex>
      <Accordion allowMultiple allowToggle>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </Accordion>
    </Box>
  );
};

const OrderItem = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton display="flex" justifyContent="space-between">
          <Text>11554454fadf</Text>
          <Text>07/06/2022</Text>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};

export default OrdersTableModal;
