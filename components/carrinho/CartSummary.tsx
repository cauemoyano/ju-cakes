import { PhoneIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import BookingModal from "../layout/BookingModal.tsx/BookingModal";
import ButtonWithPopOver from "../primitives/ButtonWithPopOver";

const CartSummary = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState<Date | null>(null);
  const finalRef = useRef(null);
  return (
    <Box
      as="section"
      p={4}
      m={4}
      borderRadius="md"
      boxShadow="lg"
      bg="light.main"
      display={"flex"}
      flexDirection="column"
      height={"min-content"}
      minWidth={{ md: "280px" }}
    >
      <Heading as="h2" fontSize="2xl" mb={4}>
        Resumo do Pedido
      </Heading>
      <Flex as="h3" justifyContent="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="lg">
          Subtotal (2 items)
        </Text>
        <Text fontSize="lg">
          <strong>R$</strong> 50,00
        </Text>
      </Flex>
      <Divider />
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <h3>
            <AccordionButton px={0} py={2}>
              <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                Cupom
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h3>
          <AccordionPanel pb={4} px={1}>
            <Flex justifyContent="space-between" width="full">
              <InputGroup maxWidth="170px">
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdOutlineLocalOffer color="gray.300" />}
                />
                <Input type="text" placeholder="Insira o codigo" />
              </InputGroup>
              <Button variant="outline" colorScheme={"teal"}>
                Aplicar
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Divider />
      <Flex
        as="h3"
        justifyContent="space-between"
        my={2}
        color="secondary.dark"
      >
        <Text fontWeight="bold" fontSize="lg">
          Total estimado
        </Text>
        <Text fontSize="lg">
          <strong>R$</strong> 50,00
        </Text>
      </Flex>
      <Flex alignItems="center" mt={4} justifyContent="space-between">
        <Button
          leftIcon={<BsCalendarEvent />}
          colorScheme="secondaryNumbered"
          onClick={onOpen}
          variant="ghost"
        >
          Escolher data
        </Button>
        <Text fontSize="sm" textAlign="right">
          {date
            ? `${date.toLocaleDateString("pt-BR")} - ${date.toLocaleTimeString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}h`
            : "Indefinida"}
        </Text>
      </Flex>
      {date ? (
        <Button ref={finalRef} mt={4} colorScheme="primaryNumbered">
          Finalizar Pedido
        </Button>
      ) : (
        <ButtonWithPopOver popoverBody="Voce deve seleionar uma data antes de prosseguir.">
          <Button ref={finalRef} mt={4} colorScheme="primaryNumbered">
            Finalizar Pedido
          </Button>
        </ButtonWithPopOver>
      )}

      <BookingModal
        isOpen={isOpen}
        onClose={onClose}
        finalRef={finalRef}
        date={date}
        setDate={setDate}
      />
    </Box>
  );
};

export default CartSummary;
