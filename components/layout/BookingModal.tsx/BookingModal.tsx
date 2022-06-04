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
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import useViewportChecker from "../../../utilities/hooks/useViewportChecker";
import BookingDatePicker from "./BookingDatePicker";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  finalRef: any;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
};

const BookingModal = ({ isOpen, onClose, finalRef, date, setDate }: Props) => {
  const { moreThan } = useViewportChecker();
  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={moreThan.md ? "md" : "full"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading
            as="h1"
            textAlign="center"
            fontSize={{ base: "3xl", md: "4xl", xl: "5xl" }}
            my={4}
          >
            Quase la!
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Por favor escolha uma data e periodo disponivel abaixo para retirada
            do seu pedido
          </Text>
          <BookingDatePicker date={date} setDate={setDate} />
          {date && (
            <Text>
              Voce selecionou dia{" "}
              <strong>{date?.toLocaleDateString("pt-Br")}</strong> as{" "}
              <strong>
                {date?.toLocaleTimeString("pt-Br", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                h
              </strong>
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="primaryNumbered" mr={3} onClick={onClose}>
            Confirmar
          </Button>
          <Button variant="primaryInverted" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
