import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { MediaQueriesTypes } from "../../utilities/hooks/useViewportChecker";
import TestimonialCard from "../card/TestimonialCard";
import TestimonialsCarousel from "../slider/TestimonialsCarousel";

const Testimonials = ({
  mediaQueries,
}: {
  mediaQueries: MediaQueriesTypes;
}) => {
  return (
    <Box bg="light.main" padding="10vh 0 5vh">
      <Container maxWidth="container.xl">
        <Heading
          fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
          textAlign="center"
          mb={4}
        >
          O que estao falando
        </Heading>
        <Text textAlign="center" mb={8}>
          Confira o que alguns de nossos clientes comentam nas redes sociais.
        </Text>
        <TestimonialsCarousel mediaQueries={mediaQueries} />
      </Container>
    </Box>
  );
};

export default Testimonials;
