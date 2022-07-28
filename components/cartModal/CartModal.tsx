import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useId, useRef } from "react";
import useCart from "../../services/useCart/useCart";
import { formatCurrency } from "../../utilities/auxFunctions";
import CartModalItem from "./CartModalItem";

const CartModal = () => {
  const { showModal, setShowModal, cart, subtotal } = useCart();

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Drawer
        isOpen={showModal}
        placement="right"
        onClose={handleClose}
        /*  finalFocusRef={btnRef} */
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            fontSize="2xl"
            fontFamily="eczar"
            mt={8}
            textAlign={"center"}
          >
            Carrinho
          </DrawerHeader>

          <DrawerBody>
            {cart.map((item) => {
              const { name, variant } = item;
              return (
                <Box key={`${name}-${variant}`}>
                  <CartModalItem item={item} />
                  <Divider my={4} />
                </Box>
              );
            })}
          </DrawerBody>

          <DrawerFooter>
            <VStack width="100%">
              <Flex
                justifyContent="space-between"
                width="100%"
                fontWeight={500}
                mb={4}
              >
                <Text>SUBTOTAL</Text>
                <Text>{formatCurrency(subtotal)}</Text>
              </Flex>
              <VStack>
                <Button colorScheme="primaryNumbered">Fechar pedido</Button>
                <Button variant="outline" mr={3} onClick={handleClose}>
                  Continuar comprando
                </Button>
              </VStack>
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartModal;
