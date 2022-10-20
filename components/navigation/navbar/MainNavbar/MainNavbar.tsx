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
  Button,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import FadeOutDisplayNone from "../../../animation/FadeOutDisplayNone";
import CustomLink from "../../../primitives/CustomLink";
import CartAuthBox from "./CartAuthBox";
import LinksBox from "./LinksBox";
import MobileLinks from "./MobileLinks";
import SocialBox from "./SocialBox";

const MainNavbar = ({ move }: { move: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let smallIconVariants = {};

  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      smallIconVariants = {
        visible: { opacity: 1, y: 0, display: "block" },
        hidden: { opacity: 0, y: "-10px", display: "none" },
      };
    }
  }

  return (
    <Container
      px={4}
      py={2}
      maxWidth="container.xl"
      bg="light.main"
      display={move ? { md: "flex" } : "block"}
      alignItems="center"
      flexDirection="row-reverse"
      justifyContent={"space-between"}
    >
      <Flex alignItems={"start"} justifyContent={"space-between"}>
        <FadeOutDisplayNone move={move}>
          <Flex
            w="250px"
            justifyContent={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <SocialBox />
          </Flex>
        </FadeOutDisplayNone>
        <FadeOutDisplayNone move={move}>
          <CustomLink href={"/"} aria-label="inicio">
            <Image
              src="/main-logo.svg"
              boxSize={{ base: "50px", md: "100px" }}
              alt="Ju Cakes"
            />
          </CustomLink>
        </FadeOutDisplayNone>

        <Box w={{ md: "250px" }} ml={{ base: "auto", md: "0" }}>
          <CartAuthBox />
        </Box>
        <IconButton
          size={"md"}
          icon={
            isOpen ? (
              <motion.div
                animate="visible"
                initial="hidden"
                transition={{ duration: 0.3 }}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0 },
                }}
              >
                <CloseIcon />
              </motion.div>
            ) : (
              <HamburgerIcon />
            )
          }
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="primaryInverted"
          fontSize={"2xl"}
        />
      </Flex>
      <LinksBox move={move} />
      <Box
        as={motion.div}
        variants={smallIconVariants}
        animate={move ? "visible" : "hidden"}
      >
        <CustomLink href={"/"} aria-label="inicio">
          <Image
            src="/main-logo.svg"
            display={{ base: "none", md: "block" }}
            boxSize={{ base: "50px" }}
            alt="Ju Cakes"
          />
        </CustomLink>
      </Box>
      <AnimatePresence>{isOpen && <MobileLinks />}</AnimatePresence>
    </Container>
  );
};

export default MainNavbar;
