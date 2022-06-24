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
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductsContext";
import useErrorHandler from "../../../services/useErrorHandler/useErrorHandler";
import { Category } from "../../../utilities/Types/Category";
import SimpleModal from "../../layout/modal/SimpleModal";
import CategoryForm from "./AdminCategoryForm/AdminCategoryForm";

type Props = {
  initialValues: Category;
  handleClose: () => void;
  setLoading: (state: boolean) => void;
};

const CategoryModal = ({
  isOpen,
  initialValues,
  handleClose,
  setLoading,
}: Props & Required<Pick<UseDisclosureProps, "isOpen">>) => {
  const { createOrUpdateCategory, updateCategories, uploadImage } =
    useProducts();
  const { setError, errorToast } = useErrorHandler();
  const toast = useToast();
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues?.image) {
      setImageSrc(initialValues.image);
    }
  }, []);

  const cleanAndClose = () => {
    setImageFile(null);
    setImageSrc("");
    handleClose();
  };

  const handleSubmit = async (
    values: {
      name: string;
    },
    actions: FormikHelpers<Category>
  ) => {
    setLoading(true);
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
      let data: Category = {
        ...values,
      };
      if (image) {
        data = { ...values, image };
      }
      await createOrUpdateCategory({ ...data }, initialValues?.id);
      await updateCategories();
      toast({
        title: "Categoria salva.",
        description: "A Categoria foi salva com sucesso.",
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
      setLoading(false);
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
      header={<Heading fontFamily="inter">Adicionar/Editar Categoria</Heading>}
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
      <CategoryForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        imageSrc={imageSrc}
      />
    </SimpleModal>
  );
};

export default CategoryModal;
