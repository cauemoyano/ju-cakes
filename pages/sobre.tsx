import { Container, Heading } from "@chakra-ui/react";
import React from "react";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Sobre = () => {
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl" }}
        mb={{ base: 4, md: 8 }}
        mt={8}
      >
        SObre
      </Heading>
    </Container>
  );
};

export default Sobre;
