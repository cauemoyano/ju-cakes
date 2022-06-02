import { Box, Flex, HStack, Image, Link, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import OrnamentLeftSide from "../../../layout/ornament/OrnamentLeftSide";
import OrnamentLine from "../../../layout/ornament/OrnamentLine";
import OrnamentRightSide from "../../../layout/ornament/OrnamentRightSide";
import OrnamentAnimatedBox from "./OrnamentAnimatedBox";

export const Links = ["INICIO", "PRODUTOS", "SOBRE", "AJUDA", "CONTATO"];

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
            <NavLink key={link}>{link}</NavLink>
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

export default LinksBox;
