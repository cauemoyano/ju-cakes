import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  isEditing: boolean;
  toggleEdit: () => void;
};

const EditSave = (props: Props) => {
  const { isEditing, toggleEdit } = props;
  return (
    <HStack w={"full"} justifyContent={"end"}>
      {isEditing ? (
        <>
          <Button onClick={toggleEdit} colorScheme="primaryNumbered">
            Salvar
          </Button>
          <Button
            onClick={toggleEdit}
            variant="outline"
            colorScheme="primaryNumbered"
          >
            Cancelar
          </Button>
        </>
      ) : (
        <Button onClick={toggleEdit} colorScheme="primaryNumbered">
          Editar dados
        </Button>
      )}
    </HStack>
  );
};

export default EditSave;
