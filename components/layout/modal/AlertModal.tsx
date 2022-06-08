import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  BoxProps,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface Props extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactElement;
  body: React.ReactElement;
}

const AlertModal = ({ isOpen, onClose, header, body }: Props) => {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertModal;
