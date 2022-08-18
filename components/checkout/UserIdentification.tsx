import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import GuestForm from "./GuestForm";

const UserIdentification = () => {
  return (
    <Center height="full" my="auto">
      <VStack spacing={4}>
        <Button colorScheme="primaryNumbered" px="16">
          Faça Login
        </Button>
        <Heading as="p" fontSize="lg">
          OU
        </Heading>
        <GuestForm />
      </VStack>
    </Center>
  );
};

export default UserIdentification;
