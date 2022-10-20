import {
  Container,
  Heading,
  OrderedList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import AccountDetails from "../components/conta/AccountDetails";
import CustomerOrders from "../components/conta/CustomerOrders";
import useProtectedRoute from "../services/useProtectedRoute/useProtectedRoute";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const MyAccount = () => {
  const { authorized } = useProtectedRoute();

  if (!authorized) return null;
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl" }}
        mb={{ base: 4, md: 8 }}
        mt={8}
      >
        Minha Conta
      </Heading>
      <AccountDetails />
      <CustomerOrders />
    </Container>
  );
};

export default MyAccount;
