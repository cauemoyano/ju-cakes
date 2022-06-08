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
import ProductsTable from "./ProductsTable";

const AdminProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <ProductsTable onOpen={onOpen} onDeleteOpen={onDeleteOpen} />
          </TabPanel>
          <TabPanel>
            <Button leftIcon={<AddIcon />} mb={4} colorScheme="primaryNumbered">
              Adicionar Categoria
            </Button>
            <CategoriesTable onOpen={onOpen} onDeleteOpen={onDeleteOpen} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SimpleModal
        onClose={onClose}
        isOpen={isOpen}
        header={<Heading fontFamily="inter">Adicionar/Editar Produto</Heading>}
        footer={
          <HStack>
            <Button colorScheme="primaryNumbered" mr={3}>
              Salvar
            </Button>
            <Button
              colorScheme="primaryNumbered"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Fechar
            </Button>
          </HStack>
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
      </SimpleModal>
      <AlertModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        header={<Text>Deletar produto/categoria</Text>}
        body={<Text>Tem certeza que deseja deletar esse item?</Text>}
      />
    </Container>
  );
};

export default AdminProducts;
