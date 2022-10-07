import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import useAccount from "../../services/useAccount/useAccount";

type Props = {
  isEditing: boolean;
  toggleEdit: () => void;
  handleReset: (e?: React.SyntheticEvent<any, Event> | undefined) => void;
  isLoading: boolean;
};

const EditSave = (props: Props) => {
  const { isEditing, toggleEdit, handleReset, isLoading } = props;

  const handleCancel = () => {
    handleReset();
    toggleEdit();
  };
  return (
    <HStack w={"full"} justifyContent={"end"}>
      {isEditing ? (
        <>
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="primaryNumbered"
          >
            Salvar
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            colorScheme="primaryNumbered"
            type="button"
          >
            Cancelar
          </Button>
        </>
      ) : (
        <Button
          onClick={toggleEdit}
          colorScheme="primaryNumbered"
          variant="ghost"
          type="button"
          leftIcon={<EditIcon />}
        >
          Editar dados
        </Button>
      )}
    </HStack>
  );
};

export default EditSave;
