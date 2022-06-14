import {
  BoxProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react";
import React from "react";
import useViewportChecker from "../../../utilities/hooks/useViewportChecker";

interface Props extends BoxProps {
  header: React.ReactNode;
  footer: React.ReactNode;
}

const SimpleModal = ({
  header,
  footer,
  isOpen,
  onClose,
  children,
}: Props & UseDisclosureProps) => {
  const { moreThan } = useViewportChecker();
  return (
    <Modal
      isOpen={isOpen!}
      onClose={onClose!}
      size={moreThan.md ? "lg" : "full"}
    >
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
