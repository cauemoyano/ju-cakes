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

import CategoriesTable from "./CategoriesTable";

import ProductsTable from "./ProductsTable";

const AdminProducts = () => {
  return (
    <Container maxWidth="container.lg" p={0}>
      <Heading as="h1" fontFamily="inter" mb={8} mt={{ base: 4, md: 8 }}>
        Administração de Produtos
      </Heading>
      <Tabs colorScheme="primaryNumbered">
        <TabList mb="1em">
          <Tab>
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
              fontFamily="inter"
            >
              Produtos
            </Heading>
          </Tab>
          <Tab>
            <Heading
              as="h2"
              fontSize={{ base: "xl", md: "2xl" }}
              fontFamily="inter"
            >
              Categorias
            </Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductsTable />
          </TabPanel>
          <TabPanel>
            <CategoriesTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminProducts;
