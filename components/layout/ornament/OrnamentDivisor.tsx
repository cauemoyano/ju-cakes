import { Box, Image } from "@chakra-ui/react";
import React from "react";

const OrnamentDivisor = () => {
  return (
    <Box display="flex" alignItems="center">
      <Image src="/ornament-left.svg" alt="" width="14%" />
      <Box flex="1" height="3px" bg="primary.dark" mx={2} />
      <Image src="/logo-cake.svg" transform="translateY(-5%)" width="20%" />
      <Box flex="1" height="3px" bg="primary.dark" mx={2} />
      <Image src="/ornament-right.svg" alt="" width="14%" />
    </Box>
  );
};

export default OrnamentDivisor;
