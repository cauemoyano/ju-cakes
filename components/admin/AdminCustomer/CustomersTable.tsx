import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useCustomer } from "../../../context/Admin/CustomersContext";
import AdminModal from "../../layout/modal/SimpleModal";
import OrdersTableModal from "./OrdersTableModal";

const CustomersTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, customers } = useCustomer();

  if (!loading && !customers.length) {
    return <Text>Não há clientes para exibir</Text>;
  } else {
    return (
      <>
        <TableContainer bg="gray.50">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontFamily={"inter"} color="primary.dark">
                  Nome
                </Th>
                <Th fontFamily={"inter"} color="primary.dark">
                  Telefone
                </Th>
                <Th fontFamily={"inter"} color="primary.dark">
                  Última Ordem
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <CustomerRow key={customer.uid} onOpen={onOpen} {...customer} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <AdminModal
          isOpen={isOpen}
          onClose={onClose}
          header={
            <Heading as="h1" fontFamily="inter">
              Joao da Silva
            </Heading>
          }
          footer={
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          }
        >
          <VStack align="left" spacing={4} mb={4}>
            <VStack align="left">
              <Text fontWeight={600}>Email</Text>
              <Text>joaodasilva@email.com</Text>
            </VStack>
            <VStack align="left">
              <Text fontWeight={600}>Telefone</Text>
              <Text>(13) 99999-9999</Text>
            </VStack>
          </VStack>
          <Heading fontFamily="inter" as="h2" fontSize="xl" mb={4}>
            Ordens
          </Heading>
          <OrdersTableModal />
        </AdminModal>
      </>
    );
  }
};

const CustomerRow = (
  props: {
    name: string;
    phone: string;
    lastOrder: string;
    email?: string;
  } & UseDisclosureProps
) => {
  const { name, phone, lastOrder, onOpen, email } = props;
  return (
    <Tr
      role="button"
      onClick={onOpen}
      _hover={{ bg: "gray.100", transition: "0.3s ease-out" }}
    >
      <Td>
        <Flex direction="column">
          <Text fontWeight={600}>{name}</Text>
          <Text color="gray.600">{email}</Text>
        </Flex>
      </Td>
      <Td>{phone}</Td>
      <Td>{lastOrder}</Td>
    </Tr>
  );
};

export default CustomersTable;
