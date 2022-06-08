import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import CustomersTable from "./CustomersTable";
import NameFilter from "./NameFilter";

const AdminCustomer = () => {
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Clientes
      </Heading>
      <NameFilter />
      <CustomersTable />
    </Container>
  );
};

export default AdminCustomer;
