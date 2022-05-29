import { Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AboutUs from "../components/home/AboutUs";
import Hero from "../components/home/Hero";
import HowWorks from "../components/home/HowWorks";
import OurProducts from "../components/home/OurProducts";
import Testimonials from "../components/home/Testimonials";
import FacebookIconLink from "../components/navigation/links/FacebookIconLink";
import InstagramIconLink from "../components/navigation/links/InstagramIconLink";
import styles from "../styles/Home.module.css";
import useViewportChecker from "../utilities/hooks/useViewportChecker";

const Home: NextPage = () => {
  const { mediaQueries } = useViewportChecker();
  return (
    <>
      <Hero />
      <OurProducts />
      <AboutUs />
      <HowWorks mediaQueries={mediaQueries} />
      <Testimonials mediaQueries={mediaQueries} />
    </>
  );
};

export default Home;
