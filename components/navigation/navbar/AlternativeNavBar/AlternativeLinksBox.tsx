import { Box, Flex, HStack, Image, Link, VStack } from "@chakra-ui/react";

import React from "react";

export const Links = [
  { name: "INICIO", path: "/" },
  { name: "PRODUTOS", path: "/produtos" },
  { name: "SOBRE", path: "/sobre" },
  { name: "AJUDA", path: "/ajuda" },
  { name: "CONTATO", path: "/contato" },
];

const AlternativeLinksBox = () => {
  return (
    <VStack>
      <HStack as={"nav"} spacing={1} display={{ base: "none", md: "flex" }}>
        {Links.map((link, i) => (
          <Flex alignItems="center" key={i}>
            <NavLink path={link.path} key={i}>
              {link.name}
            </NavLink>
          </Flex>
        ))}
      </HStack>
    </VStack>
  );
};

export const NavLink = ({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) => {
  return (
    <Link
      px={2}
      py={1}
      _hover={{
        textDecoration: "none",
      }}
      href={path}
    >
      {children}
    </Link>
  );
};

export default AlternativeLinksBox;
