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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { Product } from "../../../utilities/Types/Products";
import SimpleModal from "../../layout/modal/SimpleModal";
import ProductForm from "./AdminProductForm/AdminProductForm";

const ProductModal = ({
  isOpen,
  initialValues,
  handleClose,
}: { initialValues: Product; handleClose: () => void } & Required<
  Pick<UseDisclosureProps, "isOpen">
>) => {
  const { createOrUpdateProduct, updateProducts, uploadImage } = useProducts();
  const { setError, errorToast } = useErrorHandler();
  const toast = useToast();
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues?.image) {
      setImageSrc(initialValues.image);
    }
  }, [initialValues]);

  const cleanAndClose = () => {
    setImageFile(null);
    setImageSrc("");
    handleClose();
  };

  const handleSubmit = async (
    values: Product,
    actions: FormikHelpers<Product>
  ) => {
    try {
      if (!imageFile && !initialValues.image) {
        throw new Error("Imagem é obrigatória.");
      }
      let image = null;
      if (imageFile) {
        const imageData = await uploadImage(imageFile);
        image = (imageData as any)["secure_url"];
        if (!image) {
          return;
        }
      }
      let data: Product = {
        ...values,
      };
      if (image) {
        data = { ...values, image };
      }

      await createOrUpdateProduct({ ...data }, initialValues?.id);
      await updateProducts();
      toast({
        title: "Produto salvo.",
        description: "O Produto foi salvo com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      cleanAndClose();
      setImageSrc("");
    } catch (err: any) {
      setError(err);
      errorToast(err?.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleFileChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target) {
        setImageSrc(onLoadEvent?.target.result);
      }
    };
    if (changeEvent.target.files && changeEvent.target.files.length) {
      reader.readAsDataURL(changeEvent.target.files[0]);
      setImageFile(changeEvent.target.files[0]);
    } else {
      setImageSrc(null);
      setImageFile(null);
    }
  };

  return (
    <SimpleModal
      onClose={cleanAndClose}
      isOpen={isOpen}
      header={<Heading fontFamily="inter">Adicionar/Editar Produto</Heading>}
      footer={
        <HStack>
          <Button
            colorScheme="primaryNumbered"
            variant="outline"
            mr={3}
            onClick={cleanAndClose}
          >
            Fechar
          </Button>
        </HStack>
      }
    >
      <ProductForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        imageSrc={imageSrc}
      />
    </SimpleModal>
  );
};

export default ProductModal;
