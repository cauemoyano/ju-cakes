import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { UrlObject } from "url";
import CustomLink from "../primitives/CustomLink";
import GuestForm from "./GuestForm";

const UserIdentification = () => {
  return (
    <Center height="full" my="auto">
      <VStack spacing={4}>
        <CustomLink
          href={{ pathname: "/login", query: { checkout: true } }}
          colorScheme="primaryNumbered"
          px="16"
          py="2"
          bgColor={"primary.dark"}
          color="white"
          borderRadius="md"
        >
          Entrar
        </CustomLink>
        <Heading as="p" fontSize="lg">
          OU
        </Heading>
        <GuestForm />
      </VStack>
    </Center>
  );
};

export default UserIdentification;
