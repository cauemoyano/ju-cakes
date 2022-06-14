import {
  Button,
  Heading,
  HStack,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import React from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import SimpleModal from "../../layout/modal/SimpleModal";
import ProductForm from "./AdminProductForm/AdminProductForm";

const ProductModal = ({
  onClose,
  isOpen,
}: Required<Pick<UseDisclosureProps, "isOpen" | "onClose">>) => {
  const { createOrUpdateProduct } = useProducts();
  const { setError } = useErrorHandler();
  const handleSubmit = async (
    values: {
      productName: string;
    },
    actions: FormikHelpers<{
      productName: string;
    }>
  ) => {
    try {
      const res = await createOrUpdateProduct({
        productName: values.productName,
      });
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <SimpleModal
      onClose={onClose}
      isOpen={isOpen}
      header={<Heading fontFamily="inter">Adicionar/Editar Produto</Heading>}
      footer={
        <HStack>
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
      <ProductForm
        initialValues={{ productName: "" }}
        handleSubmit={handleSubmit}
      />
    </SimpleModal>
  );
};

export default ProductModal;
