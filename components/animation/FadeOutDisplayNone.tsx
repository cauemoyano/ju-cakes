import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const FadeOutDisplayNone = ({
  move,
  children,
}: {
  move: boolean;
  children: React.ReactNode;
}) => {
  let variants = {};
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      variants = {
        visible: { opacity: 1, y: 0, display: "block" },
        hidden: { opacity: 0, y: "-10px", display: "none" },
      };
    }
  }

  return (
    <Box
      as={motion.div}
      variants={variants}
      animate={move ? "hidden" : "visible"}
    >
      {children}
    </Box>
  );
};

export default FadeOutDisplayNone;
