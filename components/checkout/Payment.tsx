import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import {
  PayPalButtons,
  PayPalMarks,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import PaymentForm from "./PaymentForm";

const Payment = ({ goNextTab }: { goNextTab: () => void }) => {
  const initialOptions = {
    "client-id": "sb",
    currency: "USD",
    intent: "capture",
    "data-client-token": "abc123xyz==",
  };
  return (
    <VStack p={4}>
      <Heading as="h1" textAlign="center" mb={6}>
        Insira seus dados para pagamento
      </Heading>
      <Flex w="full">
        <Box width="60%">
          <PaymentForm />
        </Box>
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
