import { Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import FacebookIconLink from "../components/navigation/links/FacebookIconLink";
import InstagramIconLink from "../components/navigation/links/InstagramIconLink";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <Heading as="h1" color="dark.main" fontWeight="400">
        Test
      </Heading>
      <Text color="alternative.dark">Another</Text>
      <FacebookIconLink />
      <InstagramIconLink />
    </div>
  );
};

export default Home;
