import { Box, Button, HStack, Icon, IconButton } from "@chakra-ui/react";
import React from "react";

import { BsCart, BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../../../../context/AuthContext";
import CustomLink from "../../../primitives/CustomLink";

const CartAuthBox = () => {
  const { logout, user } = useAuth();
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
        {!user && (
          <CustomLink
            fontWeight={400}
            variant={"primaryInverted"}
            href="/login"
            color={"primary.dark"}
            ml={4}
          >
            Entrar
          </CustomLink>
        )}
        {user && (
          <>
            <CustomLink href="/conta">
              <IconButton
                size={"md"}
                icon={<BsFillPersonFill />}
                variant={"primaryInverted"}
                fontSize={"2xl"}
                aria-label={"Minha conta"}
              />
            </CustomLink>
            <Button
              fontWeight={400}
              variant={"primaryInverted"}
              onClick={logout}
            >
              Sair
            </Button>
          </>
        )}
      </Box>
    </HStack>
  );
};

export default CartAuthBox;
