import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const OrnamentAnimatedBox = ({
  move,
  children,
}: {
  move: boolean;
  children: React.ReactNode;
}) => {
  const lineVariants = {
    visible: { opacity: 1, width: "auto" },
    hidden: { opacity: 0, width: "0" },
  };
  return (
    <Box
      as={motion.div}
      variants={lineVariants}
      animate={move ? "hidden" : "visible"}
    >
      {children}
    </Box>
  );
};

export default OrnamentAnimatedBox;
