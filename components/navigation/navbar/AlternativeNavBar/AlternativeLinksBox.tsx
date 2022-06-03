import { Box, Flex, HStack, Image, Link, VStack } from "@chakra-ui/react";

import React from "react";

export const Links = ["INICIO", "PRODUTOS", "SOBRE", "AJUDA", "CONTATO"];

const AlternativeLinksBox = () => {
  return (
    <VStack>
      <HStack as={"nav"} spacing={1} display={{ base: "none", md: "flex" }}>
        {Links.map((link, i) => (
          <Flex alignItems="center" key={i}>
            <NavLink key={link}>{link}</NavLink>
          </Flex>
        ))}
      </HStack>
    </VStack>
  );
};

export const NavLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link
      px={2}
      py={1}
      _hover={{
        textDecoration: "none",
      }}
      href={"#"}
    >
      {children}
    </Link>
  );
};

export default AlternativeLinksBox;
