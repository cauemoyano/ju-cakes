import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import AccountDetails from "../components/conta/AccountDetails";
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
      <Tabs width="100%" isFitted variant="unstyled" maxWidth="500px" mx="auto">
        <TabList mb="1em">
          <Tab
            _selected={{
              borderBottom: "3px solid #690233",
              h2: { transform: "scale(1.2)", color: "gray.900" },
            }}
          >
            <Heading as="h2" fontSize="xl" color="gray.600" fontFamily="inter">
              Dados pessoais
            </Heading>
          </Tab>
          <Tab
            _selected={{
              borderBottom: "3px solid #690233",
              h2: { transform: "scale(1.2)", color: "gray.900" },
            }}
          >
            <Heading as="h2" fontSize="xl" color="gray.600" fontFamily="inter">
              Ordens
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AccountDetails />
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default MyAccount;
