import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import React from "react";

import { BsCart } from "react-icons/bs";

const CartAuthBox = () => {
  return (
    <HStack as="nav" spacing={0} justifyContent="end">
      <IconButton
        size={"md"}
        icon={<BsCart />}
        variant={"primaryInverted"}
        fontSize={"2xl"}
        aria-label={"Open Cart"}
        /* onClick={isOpen ? onClose : onOpen} */
      />
      <Box display={{ base: "none", md: "flex" }}>
        <Button
          as={"a"}
          fontWeight={400}
          variant={"primaryInverted"}
          href={"#"}
        >
          Entrar
        </Button>
        <Button as={"a"} fontWeight={400} variant={"primary"} href={"#"}>
          Registrar
        </Button>
      </Box>
    </HStack>
  );
};

export default CartAuthBox;
