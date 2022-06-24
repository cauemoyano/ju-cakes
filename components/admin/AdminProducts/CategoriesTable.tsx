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
import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { Category } from "../../../utilities/Types/Category";
import AlertModal from "../../layout/modal/AlertModal";
import CategoryModal from "./CategoryModal";

const initialValues: Category = { name: "", image: "" };

const CategoriesTable = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { setError } = useErrorHandler();
  const { categories, deleteCategory, updateCategories, callTestMock } =
    useProducts();
  const [modalInputs, setModalInputs] = useState<Category>(initialValues);
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = (category: Category) => {
    setModalInputs(category);
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
    setLoading(true);
    try {
      await deleteCategory(deleteId);
      await updateCategories();
      toast({
        title: "Categoria excluída.",
        description: "A Categoria foi excluída com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      clearDelete();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearDelete = () => {
    setDeleteId("");
    onDeleteClose();
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        onClick={onOpen}
        mb={4}
        colorScheme="primaryNumbered"
        disabled={loading}
      >
        Adicionar Categoria
      </Button>
      <TableContainer bg="gray.50" overflow="auto">
        {categories.loading && (
          <Text data-testid="loading-categories">Carregando categorias...</Text>
        )}
        {!categories.loading && !categories.data.length && (
          <Text data-testid="no-categories">
            Não há categorias para exibir.
          </Text>
        )}
        {!categories.loading && categories.data.length && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontFamily={"inter"} color="primary.dark">
                  Categoria
                </Th>
                <Th color="transparent">Actions</Th>
              </Tr>
            </Thead>
            <Tbody data-testid="categories-wrapper">
              {categories.data.map((category) => (
                <Tr key={category.id} data-testid={category.id}>
                  <Td>
                    <Flex direction="row" alignItems="center">
                      {category?.image && (
                        <Image src={category.image} maxWidth="100px" mr={4} />
                      )}
                      <Text fontWeight={600}>{category.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        onClick={() => handleEdit(category)}
                        variant="ghost"
                        colorScheme={"cyan"}
                        size="lg"
                        aria-label="Editar produto"
                        icon={<EditIcon />}
                        data-testid="cat-edit-btn"
                        disabled={loading}
                      />
                      <IconButton
                        onClick={() => handleDeleteModal(category.id!)}
                        variant="ghost"
                        colorScheme={"red"}
                        size="lg"
                        aria-label="Deletar produto"
                        icon={<DeleteIcon />}
                        disabled={loading}
                        data-testid="cat-delete-btn"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      <CategoryModal
        isOpen={isOpen}
        initialValues={modalInputs}
        handleClose={handleClose}
        setLoading={setLoading}
      />
      <AlertModal
        isOpen={isDeleteOpen}
        onClose={clearDelete}
        handleDelete={handleDelete}
        header={<Text>Deletar categoria</Text>}
        body={<Text>Tem certeza que deseja deletar essa categoria?</Text>}
      />
    </>
  );
};

export default CategoriesTable;
