import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useViewportChecker from "../../../utilities/hooks/useViewportChecker";
import OrdensTableModal from "./OrdersTableModal";

const CustomerModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { moreThan } = useViewportChecker();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={moreThan.md ? "lg" : "full"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h1" fontFamily="inter">
            Joao da Silva
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="left" spacing={4} mb={4}>
            <VStack align="left">
              <Text fontWeight={600}>Email</Text>
              <Text>joaodasilva@email.com</Text>
            </VStack>
            <VStack align="left">
              <Text fontWeight={600}>Telefone</Text>
              <Text>(13) 99999-9999</Text>
            </VStack>
          </VStack>
          <Heading fontFamily="inter" as="h2" fontSize="xl" mb={4}>
            Ordens
          </Heading>
          <OrdensTableModal />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerModal;
