import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CategoryMainCard from "../Cards/CategoryMainCard";
import OrnamentLine from "../layout/ornament/OrnamentLine";

const OurProducts = () => {
  return (
    <Box height="100vh" bg="light.alternative">
      <Container maxWidth="container.xl" pt={8}>
        <Box alignItems="start">
          <Heading fontSize={{ base: "3xl", md: "5xl", xl: "6xl" }}>
            Nossos Produtos
          </Heading>
          <Flex alignItems="center" mt={-2} mb={6}>
            <Box width="70%" height="3px" bg="primary.dark" mr={2}></Box>
            <Image src="/ornament-right.svg" alt="" width="30px" />
          </Flex>
          <Text>
            We’ve got you covered for any holiday, special occasion, or cause
            for celebration. We’ve got you covered for any holiday, special
            occasion, or cause for celebration.
          </Text>
        </Box>
        <Box>
          <CategoryMainCard />
        </Box>
      </Container>
    </Box>
  );
};

export default OurProducts;
