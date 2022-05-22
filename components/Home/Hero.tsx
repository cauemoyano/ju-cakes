import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Center height="100vh">
      <Flex direction={{ base: "column", lg: "row" }} position="relative">
        <Box
          position="absolute"
          top="10%"
          left="30%"
          width={{ base: "50%", lg: "40%" }}
          height="80%"
          bg="primary.light"
          borderRadius="5px"
        ></Box>
        <Box
          display={{ lg: "flex" }}
          width={{ lg: "55%" }}
          justifyContent="end"
          pt={[20, null, 40, 0]}
        >
          <Stack
            spacing={3}
            px={{ base: 8, lg: 0 }}
            position="relative"
            maxWidth={{ xl: "container.sm" }}
            mx={{ md: "auto", lg: "unset" }}
            width={{ lg: "90%" }}
            pl={{ lg: 6 }}
            display={{ lg: "flex" }}
            justifyContent={{ lg: "center" }}
            paddingTop={{ lg: "10vh" }}
            pb={4}
            mt={{ md: 20, lg: "unset" }}
          >
            <Image
              src={"/Hearts.svg"}
              alt=""
              position="absolute"
              top={["35%", null, "40%", "60%"]}
              right={["10%", null, "20%"]}
              width={["80px", null, "150px"]}
            />
            <Heading
              as="h1"
              fontSize={["2xl", null, "5xl", null, "6xl"]}
              fontFamily={"inter"}
              color="dark.main"
              fontWeight="extrabold"
              maxWidth={["80%", null, "100%"]}
              lineHeight="none"
              mb={{ xl: 4 }}
            >
              <Text
                as="span"
                fontSize={["lg", null, "2xl"]}
                fontWeight="semibold"
                fontFamily={"inter"}
                color="gray.600"
              >
                Experiencia Unica<br></br>
              </Text>
              Doces de qualidade feitos com{" "}
              <Text as="span" color="primary.dark">
                amor
              </Text>{" "}
              e carinho
            </Heading>
            <Box height="1vh"></Box>
            <Text maxWidth={["70%", null, "50%"]} fontSize={{ md: "lg" }}>
              We’ve got you covered for any holiday, special occasion, or cause
              for celebration.
            </Text>
            <Button variant="primary" boxShadow={"md"} width="min-content">
              Produtos
            </Button>
          </Stack>
        </Box>
        <Box display="flex" justifyContent="end" width={{ lg: "45%" }}>
          <Box
            maxWidth={{ base: "85%", md: "70%", lg: "unset" }}
            position="relative"
            transform={{ base: "translateY(-10%)", lg: "unset" }}
            display={{ lg: "flex" }}
            alignItems={{ lg: "center" }}
          >
            <Image
              src="/Sparkle.svg"
              alt=""
              position="absolute"
              top={{ base: "0", lg: "15%" }}
              left="50%"
              width={["80px", null, "150px"]}
            />
            <Image
              src="/hero-main-image.png"
              alt=""
              paddingTop={{ lg: "10vh" }}
            />
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};

export default Hero;
