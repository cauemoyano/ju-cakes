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
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import CartAuthBox from "../MainNavbar/CartAuthBox";
import MobileLinks from "../MainNavbar/MobileLinks";
import AlternativeLinksBox from "./AlternativeLinksBox";

const AlternativeNavBar = () => {
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
      display={{ base: "block", md: "flex" }}
      alignItems="center"
      flexDirection="row-reverse"
      justifyContent={"space-between"}
    >
      <Flex alignItems={"start"} justifyContent={"space-between"}>
        <Image
          src="/main-logo.svg"
          display={{ base: "block", md: "none" }}
          boxSize={{ base: "50px" }}
          alt="Ju Cakes"
        />
        <Box ml={{ base: "auto", md: "0" }}>
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
      <AlternativeLinksBox />

      <Image
        src="/main-logo.svg"
        display={{ base: "none", md: "block" }}
        boxSize={{ base: "50px" }}
        alt="Ju Cakes"
      />

      <AnimatePresence>{isOpen && <MobileLinks />}</AnimatePresence>
    </Container>
  );
};

export default AlternativeNavBar;
