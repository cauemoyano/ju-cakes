import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CalendarDaysSelection from "./CalendarDaysSelection";
import CalendarTable from "./CalendarTable";
import ScheduleSummary from "./ScheduleSummary";

const AdminCalendar = () => {
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Agenda
      </Heading>
      <VStack align="left" spacing={4}>
        <Flex direction={{ base: "column-reverse", xl: "row" }}>
          <Box width={{ xl: "60%" }}>
            <CalendarTable />
          </Box>
          <VStack minHeight="300px" mb={6} width={{ xl: "40%" }}>
            <ScheduleSummary />
          </VStack>
        </Flex>
        <CalendarDaysSelection />
      </VStack>
    </Container>
  );
};

export default AdminCalendar;
