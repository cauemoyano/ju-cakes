import {
  BoxProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import useViewportChecker from "../../../utilities/hooks/useViewportChecker";

interface Props extends BoxProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SimpleModal = ({ header, footer, isOpen, onClose, children }: Props) => {
  const { moreThan } = useViewportChecker();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={moreThan.md ? "lg" : "full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SimpleModal;
