import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";

import AboutUs from "../components/home/AboutUs";
import Hero from "../components/home/Hero";
import HowWorks from "../components/home/HowWorks";
import OurProducts from "../components/home/OurProducts";
import Testimonials from "../components/home/Testimonials";
import useViewportChecker from "../utilities/hooks/useViewportChecker";

const Home: NextPage = () => {
  const { mediaQueries } = useViewportChecker();
  return (
    <>
      <Hero />
      <Box
        w="100%"
        h={{ base: "5vh", lg: "10vh" }}
        bgGradient="linear(to-b, light.main, primary.light)"
      />
      <OurProducts />
      <Box
        w="100%"
        h={{ base: "5vh", lg: "10vh" }}
        bgGradient="linear(to-t, light.main, primary.light)"
      />
      <AboutUs />
      <HowWorks mediaQueries={mediaQueries} />
      <Box
        w="100%"
        h={{ base: "5vh", lg: "10vh" }}
        bgGradient="linear(to-b, light.main, secondary.light)"
      />
      <Testimonials mediaQueries={mediaQueries} />
    </>
  );
};

export default Home;
