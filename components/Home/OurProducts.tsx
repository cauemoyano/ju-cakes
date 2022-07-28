import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  UnorderedList,
  useDimensions,
  VStack,
} from "@chakra-ui/react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { getCollection } from "../../services/FirebaseStorageService/FirebaseStorageService";
import { Category } from "../../utilities/Types/Category";
import CategoryMainCard from "../card/CategoryMainCard";

const cardItems = [
  { title: "Pao de Mel", image: "/products-card.png" },
  { title: "Brownie", image: "/products-card.png" },
  { title: "Dia das Maes", image: "/products-card.png" },
];

const OurProducts = ({ categories }: { categories: Category[] }) => {
  return (
    <Box bg="primary.light">
      <Container
        maxWidth="container.xl"
        display="flex"
        flexDirection="column"
        height="100%"
        px={0}
        paddingTop={{ base: "3vh", lg: "5vh" }}
      >
        <Box alignItems="start">
          <Heading
            fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
            px={4}
            textAlign="center"
            mb={4}
          >
            Nossos Produtos
          </Heading>
          <Text px={4} maxWidth="500px" textAlign="center" mx={"auto"}>
            We’ve got you covered for any holiday, special occasion, or cause
            for celebration. We’ve got you covered for any holiday, special
            occasion, or cause for celebration.
          </Text>
        </Box>
        <Container
          p={0}
          flex="1"
          display={"flex"}
          alignItems="center"
          maxWidth="container.xl"
          position="relative"
        >
          <Image
            src="/face-8.svg"
            alt=""
            position="absolute"
            top="1rem"
            left="0"
            width="max(15vw, 150px)"
          />
          <Image
            src="/cupcake.svg"
            alt=""
            position="absolute"
            top="1rem"
            right="0"
            width="max(15vw, 150px)"
          />
          <Box overflow="auto" mx={"auto"}>
            <Box
              as="ul"
              display="flex"
              gap="1rem"
              p={6}
              padding={{
                base: "calc(max(15vw, 150px)*0.9) calc(max(15vw, 100px)*0.5) 5vh",
                md: "calc(max(15vw, 150px)*0.9) 1rem 5vh",
              }}
              sx={{
                li: { listStyleType: "none" },
                "@media (max-width: 767px)": {
                  "li:last-child": {
                    paddingRight: "calc(max(15vw, 100px)*0.5)",
                  },
                },
              }}
            >
              {categories.map((card, index) => (
                <li key={index}>
                  <CategoryMainCard key={index} {...card} />
                </li>
              ))}
            </Box>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default OurProducts;
