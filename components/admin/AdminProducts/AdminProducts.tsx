import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import AlertModal from "../../layout/modal/AlertModal";
import SimpleModal from "../../layout/modal/SimpleModal";
import CategoriesTable from "./CategoriesTable";
import ProductModal from "./ProductModal";
import ProductsTable from "./ProductsTable";

const AdminProducts = () => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
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
            <Button leftIcon={<AddIcon />} mb={4} colorScheme="primaryNumbered">
              Adicionar Produto
            </Button>
            <ProductsTable onDeleteOpen={onDeleteOpen} />
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
