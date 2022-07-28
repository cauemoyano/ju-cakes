import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { Product } from "../../../utilities/Types/Products";
import AlertModal from "../../layout/modal/AlertModal";
import ProductModal from "./ProductModal";

const initialValues: Product = {
  name: "",
  description: "",
  ingredients: "",
  category: "",
  image: "",
  variants: [],
  published: true,
};

const ProductsTable = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { setError } = useErrorHandler();
  const { products, deleteProduct, updateProducts, categories } = useProducts();
  const [modalInputs, setModalInputs] = useState<Product>(initialValues);
  const [deleteId, setDeleteId] = useState("");

  const handleEdit = (product: Product) => {
    setModalInputs(product);
    onOpen();
  };

  const handleClose = () => {
    setModalInputs(initialValues);
    onClose();
  };

  const handleDeleteModal = async (id: string) => {
    setDeleteId(id);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId);
      await updateProducts();
      toast({
        title: "Produto excluído.",
        description: "O Produto foi excluído com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearDelete();
    } catch (err) {
      setError(err);
    }
  };

  const clearDelete = () => {
    setDeleteId("");
    onDeleteClose();
  };

  const getCategoryName = (id: string) => {
    const cat = categories.data.find((c) => c.id === id);
    return cat?.name;
  };
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        mb={4}
        colorScheme="primaryNumbered"
      >
        Adicionar Produto
      </Button>
      <TableContainer bg="gray.50" overflow="auto">
        {products.loading && (
          <Text data-testid="loading-products">Carregando produtos...</Text>
        )}
        {!products.loading && !products.data.length && (
          <Text data-testid="no-products">Não há produtos para exibir</Text>
        )}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontFamily={"inter"} color="primary.dark">
                Produto
              </Th>
              <Th display={{ base: "block", md: "none" }} color="transparent">
                Actions
              </Th>
              <Th fontFamily={"inter"} color="primary.dark" textAlign="center">
                Publicado
              </Th>
              <Th fontFamily={"inter"} color="primary.dark" textAlign="center">
                Categoria
              </Th>
              <Th display={{ base: "none", md: "block" }} color="transparent">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.data.map((product) => (
              <Tr key={product.id} data-testid={product.id}>
                <Td>
                  <Flex direction="row" alignItems="center">
                    {product?.image && (
                      <Image src={product.image} maxWidth="100px" mr={4} />
                    )}

                    <Text fontWeight={600}>{product.name}</Text>
                  </Flex>
                </Td>
                <Td display={{ base: "table-cell", md: "none" }}>
                  <HStack>
                    <IconButton
                      onClick={() => handleEdit(product)}
                      variant="ghost"
                      colorScheme={"cyan"}
                      size="lg"
                      aria-label="Editar produto"
                      icon={<EditIcon />}
                      data-testid="prod-edit-btn"
                    />
                    <IconButton
                      onClick={() => handleDeleteModal(product.id!)}
                      variant="ghost"
                      colorScheme={"red"}
                      size="lg"
                      aria-label="Deletar produto"
                      icon={<DeleteIcon />}
                      data-testid="prod-delete-btn"
                    />
                  </HStack>
                </Td>
                <Td textAlign="center">{product.published ? "Sim" : "Não"}</Td>
                <Td textAlign="center">
                  {getCategoryName(product.category as string)}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  <HStack>
                    <IconButton
                      onClick={() => handleEdit(product)}
                      variant="ghost"
                      colorScheme={"cyan"}
                      size="lg"
                      aria-label="Editar produto"
                      icon={<EditIcon />}
                    />
                    <IconButton
                      onClick={() => handleDeleteModal(product.id!)}
                      variant="ghost"
                      colorScheme={"red"}
                      size="lg"
                      aria-label="Deletar produto"
                      icon={<DeleteIcon />}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ProductModal
        isOpen={isOpen}
        initialValues={modalInputs}
        handleClose={handleClose}
      />
      <AlertModal
        isOpen={isDeleteOpen}
        onClose={clearDelete}
        handleDelete={handleDelete}
        header={<Text>Deletar produto</Text>}
        body={<Text>Tem certeza que deseja deletar esse produto?</Text>}
      />
    </>
  );
};

export default ProductsTable;
