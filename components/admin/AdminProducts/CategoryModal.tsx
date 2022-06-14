import {
  Button,
  Heading,
  HStack,
  Text,
  UseDisclosureProps,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import React from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { Category } from "../../../utilities/Types/Category";
import SimpleModal from "../../layout/modal/SimpleModal";
import CategoryForm from "./AdminCategoryForm/AdminCategoryForm";

const CategoryModal = ({
  isOpen,
  initialValues,
  handleClose,
}: { initialValues: Category; handleClose: () => void } & Required<
  Pick<UseDisclosureProps, "isOpen">
>) => {
  const { createOrUpdateCategory, updateCategories } = useProducts();
  const { setError } = useErrorHandler();
  const toast = useToast();

  const handleSubmit = async (
    values: {
      name: string;
    },
    actions: FormikHelpers<{
      name: string;
    }>
  ) => {
    try {
      await createOrUpdateCategory(
        {
          ...values,
        },
        initialValues?.id
      );
      await updateCategories();
      toast({
        title: "Categoria salva.",
        description: "A Categoria foi salva com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleClose();
    } catch (err) {
      setError(err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SimpleModal
      onClose={handleClose}
      isOpen={isOpen}
      header={<Heading fontFamily="inter">Adicionar/Editar Produto</Heading>}
      footer={
        <HStack>
          <Button
            colorScheme="primaryNumbered"
            variant="outline"
            mr={3}
            onClick={handleClose}
          >
            Fechar
          </Button>
        </HStack>
      }
    >
      <CategoryForm initialValues={initialValues} handleSubmit={handleSubmit} />
    </SimpleModal>
  );
};

export default CategoryModal;
