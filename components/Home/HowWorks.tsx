import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { BsSearch, BsBox } from "react-icons/bs";
import { BiCake } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import React from "react";
import StepCard from "./HowWorks/StepCard";
import BaseWrapperComponent from "./HowWorks/BaseWrapperComponent";
import MediumWrapperComponent from "./HowWorks/MediumWrapperComponent";
import XLargeWrapper from "./HowWorks/XLargeWrapperComponent";

export const stepsData = [
  {
    icon: BsSearch,
    title: "Encontre seu produto",
    body: "Navegue por nosso mar de gostosuras e encontre seu produto favorito.",
  },
  {
    icon: BiCake,
    title: "Escolha a quantidade",
    body: "Selecione uma das opcoes com a quantidade desejada.",
  },
  {
    icon: MdOutlineWatchLater,
    title: "Agende uma data",
    body: "Escolha um dia e horario disponivel para retirada do produto.",
  },
  {
    icon: BsBox,
    title: "Retire seu produto",
    body: "Busque sua encomenda no dia e horario agendado.",
  },
];

const HowWorks = () => {
  const [isMd, isLargerThanXl] = useMediaQuery([
    "(min-width: 768px) and (max-width: 1279.9px)",
    "(min-width: 1280px)",
  ]);
  return (
    <Box bg="light.main">
      <Container maxWidth="container.xl">
        <Heading
          fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
          textAlign="center"
          mb={4}
        >
          Como funciona
        </Heading>
        <Text textAlign="center" mb={8}>
          Veja como e facil comprar conosco.
        </Text>
        {isMd ? (
          <MediumWrapperComponent />
        ) : isLargerThanXl ? (
          <XLargeWrapper />
        ) : (
          <BaseWrapperComponent />
        )}
      </Container>
    </Box>
  );
};

export default HowWorks;
