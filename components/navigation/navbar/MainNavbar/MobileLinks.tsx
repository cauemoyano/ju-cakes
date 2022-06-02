import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { MotionBox } from "../../../animation/MotionBox";
import { Links, NavLink } from "./LinksBox";

const MobileLinks = () => {
  return (
    <MotionBox
      display={{ md: "none" }}
      bg="light.main"
      as={motion.div}
      initial="hidden"
      animate="visible"
      exit={{ maxHeight: 0 }}
      overflow={"hidden"}
      variants={{ visible: { maxHeight: "100vh" }, hidden: { maxHeight: 0 } }}
      transition={{ duration: 0.3 }}
    >
      <Stack as={"nav"} spacing={1}>
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
        <Center height="20px">
          <Divider />
        </Center>

        {Links.map((link) => (
          <NavLink key={link}>{link}</NavLink>
        ))}
      </Stack>
    </MotionBox>
  );
};

export default MobileLinks;
