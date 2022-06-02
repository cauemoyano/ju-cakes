import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsEnvelope,
} from "react-icons/bs";

const Footer = () => {
  return (
    <Box as="footer" bg="light.alternative">
      <Container maxWidth="container.xl" py={10} px={8}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Image src="main-logo.svg" alt="" maxWidth="100px" />
            </Box>
            <Text fontSize="sm">
              © 2022 Ju Cakes Ltda. Todos os direitos reservados.
            </Text>
          </Stack>
          <Box as="nav" aria-labelledby="redes-sociais">
            <Stack align={"flex-start"}>
              <Text
                id="redes-sociais"
                fontWeight={"500"}
                fontSize={"lg"}
                mb={2}
                color="secondary.dark"
              >
                Redes Sociais
              </Text>
              <Link href={"#"}>
                <Flex alignItems={"center"}>
                  <Icon
                    color="secondary.dark"
                    as={BsFacebook}
                    fontSize="xl"
                    mr={2}
                  />
                  <Text>Facebook</Text>
                </Flex>
              </Link>
              <Link href={"#"}>
                <Flex alignItems={"center"}>
                  <Icon
                    color="secondary.dark"
                    as={BsInstagram}
                    fontSize="xl"
                    mr={2}
                  />
                  <Text>Instagram</Text>
                </Flex>
              </Link>
            </Stack>
          </Box>
          <Box as="nav" aria-labelledby="contato">
            <Stack align={"flex-start"}>
              <Text
                id="contato"
                fontWeight={"500"}
                fontSize={"lg"}
                mb={2}
                color="secondary.dark"
              >
                Contato
              </Text>
              <Link href={"#"}>
                <Flex alignItems={"center"}>
                  <Icon
                    color="secondary.dark"
                    as={BsWhatsapp}
                    fontSize="xl"
                    mr={2}
                  />
                  <Text>(13) 99999-9999</Text>
                </Flex>
              </Link>
              <Link href={"#"}>
                <Flex alignItems={"center"}>
                  <Icon
                    color="secondary.dark"
                    as={BsEnvelope}
                    fontSize="xl"
                    mr={2}
                  />
                  <Text>ju.cakes@email.com</Text>
                </Flex>
              </Link>
            </Stack>
          </Box>
          <Box as="nav" aria-labelledby="links-uteis">
            <Stack align={"flex-start"}>
              <Text
                id="links-uteis"
                color="secondary.dark"
                fontWeight={"500"}
                fontSize={"lg"}
                mb={2}
              >
                Links Uteis
              </Text>
              <Link href={"#"}>Politicas de Privacidade</Link>
              <Link href={"#"}>Mapa do site</Link>
              <Link href={"#"}>Mapa do site</Link>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
