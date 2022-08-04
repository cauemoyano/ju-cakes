import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import CheckoutSummary from "./CheckoutSummary";

const Payment = ({ goNextTab }: { goNextTab: () => void }) => {
  return (
    <VStack p={4}>
      <Heading as="h1" textAlign="center" mb={6}>
        Insira seus dados para pagamento
      </Heading>
      <Flex w="full">
        <Box width="60%"></Box>
        <Box width="40%">
          <CheckoutSummary />
        </Box>
      </Flex>
      <Button colorScheme="primaryNumbered" onClick={goNextTab}>
        Continuar
      </Button>
    </VStack>
  );
};

export default Payment;
