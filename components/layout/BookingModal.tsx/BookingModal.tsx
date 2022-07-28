import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Text,
  useCheckboxGroup,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import useCalendar from "../../../services/useCalendar/useCalendar";
import useViewportChecker from "../../../utilities/hooks/useViewportChecker";
import VariantCheckBox from "../../primitives/VariantCheckBox";
import BookingDatePicker from "./BookingDatePicker";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  finalRef: any;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  period: string | null;
  setPeriod: React.Dispatch<React.SetStateAction<string | null>>;
};

const BookingModal = ({
  isOpen,
  onClose,
  finalRef,
  date,
  setDate,
  period,
  setPeriod,
}: Props) => {
  const { moreThan } = useViewportChecker();
  const options = ["Manhã", "Tarde"];

  const { days, isAvailable, periodUnavailable } = useCalendar();
  const toast = useToast();

  const handleConfirm = () => {
    if (!date || !period) {
      toast({
        title: "Data inválida",
        description: "Favor selecione uma data e período válidos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    onClose();
  };

  const { getCheckboxProps } = useCheckboxGroup();
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
        <ModalCloseButton />
        <ModalBody>
          <Heading
            as="h1"
            textAlign="center"
            fontSize={{ base: "2xl", md: "4xl", xl: "5xl" }}
            my={4}
          >
            Quase la!
          </Heading>
          <Text>
            Por favor escolha uma data e periodo disponivel abaixo para retirada
            do seu pedido
          </Text>
          {days.loading ? (
            <>
              <Skeleton height="200px" my={4}></Skeleton>
              <SkeletonText mt="8" noOfLines={3} spacing="4" />
            </>
          ) : (
            <>
              <BookingDatePicker
                date={date}
                setDate={setDate}
                isAvailable={isAvailable}
              />
              <VStack align="center" py={4} overflow="auto">
                <Text>Marque o periodo que deseja reservar</Text>
                <HStack>
                  {options.map((option) => {
                    const checkbox = getCheckboxProps({
                      value: option,
                    });
                    return (
                      <VariantCheckBox
                        key={option}
                        {...checkbox}
                        isChecked={period === option}
                        onChange={(e) => setPeriod(e.target.value)}
                        isDisabled={periodUnavailable(option, date)}
                      />
                    );
                  })}
                </HStack>
              </VStack>
            </>
          )}

          {date && period && (
            <Text>
              Voce selecionou dia{" "}
              <strong>{date?.toLocaleDateString("pt-Br")}</strong> no período da{" "}
              <strong>{period}</strong>
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="primaryNumbered" mr={3} onClick={handleConfirm}>
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
