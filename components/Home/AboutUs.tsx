import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import OrnamentDivisor from "../layout/ornament/OrnamentDivisor";

const AboutUs = () => {
  return (
    <Box bg="light.main" padding="10vh 0">
      <Container maxWidth="container.xl" p={0}>
        <Heading
          fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
          textAlign="center"
          mb={4}
        >
          Quem Somos
        </Heading>
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          marginBottom={{ lg: "15vh" }}
        >
          <Box
            borderRadius="5px"
            p={{ base: 6, md: 8 }}
            display="flex"
            flexDirection="column"
            width={{ lg: "50%" }}
            mx={4}
            ml={{ md: "auto" }}
            mr={{ md: "8" }}
            position="relative"
            zIndex="3"
            bg="light.main"
            order={{ lg: "2" }}
          >
            <Heading
              as="h3"
              fontSize={{ base: "2xl", md: "4xl", xl: "5xl" }}
              fontFamily={"inter"}
              mb={4}
            >
              Nasce uma{" "}
              <Text as="span" color="primary.main">
                ideia
              </Text>
            </Heading>
            <Text mb={4} maxWidth={{ md: "450px", lg: "350px" }}>
              We’ve got you covered for any holiday, special occasion, or cause
              for celebration. We’ve got you covered for any holiday, special
              occasion, or cause for celebration. We’ve got you covered for any
              holiday, special occasion, or cause for celebration. We’ve got you
              covered for any holiday, special occasion, or cause for
              celebration. We’ve got you covered for any holiday, special
              occasion, or cause for celebration. We’ve got you covered for any
              holiday, special occasion, or cause for celebration.
            </Text>
            <Button type="button" variant="primary" width="min-content">
              Conheca Mais
            </Button>
          </Box>
          <Box
            position="relative"
            zIndex="2"
            order={{ lg: "1" }}
            width={{ lg: "50%" }}
            display={{ lg: "flex" }}
            alignItems={{ lg: "center" }}
            justifyContent={{ lg: "center" }}
          >
            <Box
              width="100%"
              height={{ base: "35vh", lg: "min(55vh, 350px)" }}
              bg="primary.light"
              position="absolute"
              zIndex="-1"
              top={{ base: "-50%", lg: "50%" }}
              left={{ lg: "50%" }}
            >
              <Image
                src={"/Hearts.svg"}
                alt=""
                position="absolute"
                bottom="-10vh"
                right={"5vw"}
                width={"150px"}
                display={{ base: "none", lg: "block" }}
              />
            </Box>
            <Image
              src="/quem-somos-img-bg.png"
              borderRadius="50%"
              alt=""
              width={{ base: "min(50vw, 300px)", lg: "350px" }}
              height={{ base: "min(50vw, 300px)", lg: "350px" }}
              marginTop={{ base: "5vh", md: "0" }}
              mx={{ base: "auto", md: "inherit" }}
              ml={{ md: 8, lg: 16 }}
              mr={{ md: "auto", lg: "0" }}
            />
            <Image
              src={"/Hearts.svg"}
              alt=""
              position="absolute"
              bottom="40%"
              right={"10vw"}
              width={"150px"}
              display={{ base: "none", md: "block", lg: "none" }}
            />
          </Box>
        </Flex>

        {/*  <Flex display={{ base: "none", lg: "flex" }} marginTop="5vh">
        <Image src="/quem-somos-img-bg.png" alt="" width="70%" />
        <Box width="30%"></Box>
      </Flex> */}
      </Container>
    </Box>
  );
};

export default AboutUs;
