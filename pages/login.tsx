import {
  Box,
  Center,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import LoginComponent from "../components/layout/auth/LoginComponent";
import RegisterComponent from "../components/layout/auth/RegisterComponent";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Login = () => {
  return (
    <Container
      maxWidth="container.lg"
      paddingTop={NAV_PAGE_PADDING}
      minHeight="100vh"
      display={"flex"}
      flexDirection="column"
      pb={8}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl" }}
        mb={{ base: 4, md: 8 }}
        mt={8}
      >
        Entre ou crie uma conta
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
              Entrar
            </Heading>
          </Tab>
          <Tab
            _selected={{
              borderBottom: "3px solid #690233",
              h2: { transform: "scale(1.2)", color: "gray.900" },
            }}
          >
            <Heading as="h2" fontSize="xl" color="gray.600" fontFamily="inter">
              Criar Conta
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginComponent />
          </TabPanel>
          <TabPanel>
            <RegisterComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Login;
