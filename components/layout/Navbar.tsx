import { Box } from "@chakra-ui/react";
import React from "react";
import MainNavbar from "../navigation/navbar/MainNavbar/MainNavbar";

const Navbar = () => {
  return (
    <Box
      as="header"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      bg="light.main"
      boxShadow={"md"}
    >
      <MainNavbar />
    </Box>
  );
};

export default Navbar;
