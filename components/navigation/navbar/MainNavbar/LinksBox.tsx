import { Box, Flex, HStack, Image, Link, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import OrnamentLeftSide from "../../../layout/ornament/OrnamentLeftSide";
import OrnamentLine from "../../../layout/ornament/OrnamentLine";
import OrnamentRightSide from "../../../layout/ornament/OrnamentRightSide";
import OrnamentAnimatedBox from "./OrnamentAnimatedBox";

export const Links = [
  { name: "INICIO", path: "/" },
  { name: "PRODUTOS", path: "/produtos" },
  { name: "SOBRE", path: "/sobre" },
  { name: "AJUDA", path: "/ajuda" },
  { name: "CONTATO", path: "/contato" },
];

const LinksBox = ({ move }: { move: boolean }) => {
  return (
    <VStack>
      <HStack
        as={"nav"}
        spacing={move ? 1 : 3}
        display={{ base: "none", md: "flex" }}
      >
        <OrnamentAnimatedBox move={move}>
          <OrnamentLeftSide width="40px" />
        </OrnamentAnimatedBox>
        <OrnamentAnimatedBox move={move}>
          <OrnamentLine width="10px" height="5px" />
        </OrnamentAnimatedBox>
        {Links.map((link, i) => (
          <Flex alignItems="center" key={i}>
            <NavLink key={i} path={link.path}>
              {link.name}
            </NavLink>
            <OrnamentAnimatedBox move={move}>
              <OrnamentLine width="10px" height="5px" />
            </OrnamentAnimatedBox>
          </Flex>
        ))}
        <OrnamentAnimatedBox move={move}>
          <OrnamentRightSide width="40px" />
        </OrnamentAnimatedBox>
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

export default LinksBox;
