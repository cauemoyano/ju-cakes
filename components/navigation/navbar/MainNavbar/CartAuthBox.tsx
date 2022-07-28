import { Box, Button, HStack, IconButton } from "@chakra-ui/react";
import React from "react";

import { BsCart } from "react-icons/bs";
import { useAuth } from "../../../../context/AuthContext";
import CustomLink from "../../../primitives/CustomLink";

const CartAuthBox = () => {
  const { logout } = useAuth();
  return (
    <HStack as="nav" spacing={0} justifyContent="end">
      <CustomLink href="/carrinho">
        <IconButton
          size={"md"}
          icon={<BsCart />}
          variant={"primaryInverted"}
          fontSize={"2xl"}
          aria-label={"Open Cart"}
        />
      </CustomLink>
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
        <Button fontWeight={400} variant={"primaryInverted"} onClick={logout}>
          Sair
        </Button>
      </Box>
    </HStack>
  );
};

export default CartAuthBox;
