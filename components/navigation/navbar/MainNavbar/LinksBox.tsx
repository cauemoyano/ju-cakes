import { HStack, Image, Link, VStack } from "@chakra-ui/react";
import React from "react";
import OrnamentLeftSide from "../../../layout/ornament/OrnamentLeftSide";
import OrnamentLine from "../../../layout/ornament/OrnamentLine";
import OrnamentRightSide from "../../../layout/ornament/OrnamentRightSide";

export const Links = ["INICIO", "PRODUTOS", "SOBRE", "AJUDA", "CONTATO"];

const LinksBox = () => {
  return (
    <VStack>
      <HStack as={"nav"} spacing={3} display={{ base: "none", md: "flex" }}>
        <OrnamentLeftSide width="40px" />
        <OrnamentLine width="10px" height="5px" />
        {Links.map((link) => (
          <>
            <NavLink key={link}>{link}</NavLink>
            <OrnamentLine width="10px" height="5px" />
          </>
        ))}
        <OrnamentRightSide width="40px" />
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
