import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import CalendarTable from "./CalendarTable";

const AdminCalendar = () => {
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Agenda
      </Heading>
      <CalendarTable />
    </Container>
  );
};

export default AdminCalendar;
