import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  useDisclosure,
  Link,
  Flex,
  Container,
  Image,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import CartAuthBox from "./CartAuthBox";
import LinksBox from "./LinksBox";
import MobileLinks from "./MobileLinks";
import SocialBox from "./SocialBox";

const MainNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      px={4}
      py={2}
      maxWidth="container.xl"
      borderBottom={{ base: "1px", md: "0" }}
      borderColor="red.100"
      bg="light.main"
    >
      <Flex alignItems={"start"} justifyContent={"space-between"}>
        <Flex
          w="250px"
          justifyContent={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <SocialBox />
        </Flex>

        <Image
          src="/main-logo.svg"
          boxSize={{ base: "50px", md: "100px" }}
          alt="Ju Cakes"
        />
        <Box w={{ md: "250px" }} ml={{ base: "auto", md: "0" }}>
          <CartAuthBox />
        </Box>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="primaryInverted"
          fontSize={"2xl"}
        />
      </Flex>
      <LinksBox />
      {isOpen && <MobileLinks />}
    </Container>
  );
};

export default MainNavbar;
