import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Sobre = () => {
  return (
    <Box overflowX={"hidden"}>
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
          Sobre nós
        </Heading>
        <Box
          w="1000vw"
          transform={"translateX(-50%)"}
          h={{ base: "3vh", lg: "5vh" }}
          bgGradient="linear(to-b, light.main, primary.light)"
        />
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          position="relative"
          zIndex="1"
          _before={{
            bg: "primary.light",
            position: "absolute",
            content: "''",
            width: "1000vw",
            height: "100%",
            zIndex: "-1",
            transform: "translateX(-50%)",
          }}
        >
          <GridItem w="full">
            <Heading color="primary.dark" mb={4}>
              Uma história antiga...
            </Heading>
            <Text width={{ base: "100%", md: "80%" }}>
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum. Nulla Lorem mollit cupidatat
              irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum.
            </Text>
          </GridItem>
          <GridItem w="full">
            <Image src="/about-us-1.jpg" alt="sobre nos" />
          </GridItem>
        </Grid>
        <Box
          w="1000vw"
          transform={"translateX(-50%)"}
          h={{ base: "5vh", lg: "10vh" }}
          bgGradient="linear(to-b, primary.light, secondary.light)"
        />
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          position="relative"
          zIndex="1"
          _before={{
            bg: "secondary.light",
            position: "absolute",
            content: "''",
            width: "1000vw",
            height: "100%",
            zIndex: "-1",
            transform: "translateX(-50%)",
          }}
          pb={16}
        >
          <GridItem w="full">
            <Image src="/about-us-2.jpg" alt="sobre nos" />
          </GridItem>
          <GridItem w="full">
            <Heading color="secondary.dark" mb={4}>
              Produtos de Qualidade
            </Heading>
            <Text width={{ base: "100%", md: "80%" }}>
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
              ullamco cillum dolor. Voluptate exercitation incididunt aliquip
              deserunt reprehenderit elit laborum. Nulla Lorem mollit cupidatat
              irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum. Laborum magna nulla duis ullamco cillum dolor. Voluptate
              exercitation incididunt aliquip deserunt reprehenderit elit
              laborum.
            </Text>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Sobre;
