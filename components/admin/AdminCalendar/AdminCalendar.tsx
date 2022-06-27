import { Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import CalendarDaysSelection from "./CalendarDaysSelection";
import CalendarTable from "./CalendarTable";

const AdminCalendar = () => {
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Agenda
      </Heading>
      <VStack align="left" spacing={4}>
        <CalendarTable />
        <CalendarDaysSelection />
      </VStack>
    </Container>
  );
};

export default AdminCalendar;
