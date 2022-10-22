import {
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import ContatoForm from "../components/contato/ContatoForm";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Contato = () => {
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
      textAlign="center"
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize={{ base: "4xl", md: "5xl" }}
        mb={{ base: 4, md: 8 }}
        mt={8}
      >
        Contato
      </Heading>
      <Text mb={8}>
        Entre em contato pelo Whatsapp ou se preferir enviando uma mensagem
        atraves do formulario abaixo.
      </Text>
      <ContatoForm />
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(5, 1fr)"
        gap={0}
      >
        <GridItem colStart={1} colEnd={6} rowStart={2} rowEnd={6} bg="tomato">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.2353691165677!2d-46.33865234911066!3d-23.95211578441421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce036e8c225607%3A0xeec7ee1e6f6daf4e!2sR.%20Dr.%20Adolpho%20Assis%2C%20101%20-%20Vila%20Belmiro%2C%20Santos%20-%20SP%2C%2011075-360%2C%20Brasil!5e0!3m2!1spt-PT!2sca!4v1666398287039!5m2!1spt-PT!2sca"
            width="600"
            height="450"
            style={{ border: "0", width: "100%", height: "100%" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </GridItem>
        <GridItem
          colStart={3}
          colEnd={4}
          rowStart={1}
          rowEnd={3}
          bg="light.alternative"
          p={4}
          borderRadius="md"
          boxShadow={"md"}
        >
          <Flex direction={"column"} gap={4} minWidth={"250px"}>
            <Flex justifyContent="space-between">
              <Heading as="h2" fontSize="2xl" color="primary.dark">
                Whatsapp
              </Heading>
              <Icon color="green.500" as={BsWhatsapp} fontSize="2xl" />
            </Flex>
            <Text textAlign="right">(13) 99999-9999</Text>
            <VStack alignItems="left" textAlign="left" spacing={1}>
              <Text fontWeight="semibold" fontSize={"large"}>
                Endereço
              </Text>
              <Text>Rua xx de xx, 999</Text>
              <Text>Apartamento 99</Text>
              <Text>Santos - SP</Text>
              <Text>CEP 11000-009</Text>
            </VStack>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Contato;
