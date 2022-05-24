import { Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Hero from "../components/home/Hero";
import OurProducts from "../components/home/OurProducts";
import FacebookIconLink from "../components/navigation/links/FacebookIconLink";
import InstagramIconLink from "../components/navigation/links/InstagramIconLink";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <OurProducts />
    </>
  );
};

export default Home;
