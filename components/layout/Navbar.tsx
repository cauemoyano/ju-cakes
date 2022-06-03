import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AlternativeNavBar from "../navigation/navbar/AlternativeNavBar/AlternativeNavBar";
import MainNavbar from "../navigation/navbar/MainNavbar/MainNavbar";

const Navbar = () => {
  const [move, setMove] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        const distanceScrolled = window.scrollY;
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          if (distanceScrolled > 50) {
            setMove(true);
          } else {
            setMove(false);
          }
        }
      });
    }
  }, []);

  return (
    <Box
      as="header"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="10"
      bg="light.main"
      boxShadow={{ base: "md", md: move ? "md" : "none" }}
    >
      {router.route === "/" ? (
        <MainNavbar move={move} />
      ) : (
        <AlternativeNavBar />
      )}
    </Box>
  );
};

export default Navbar;
