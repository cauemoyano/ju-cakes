import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import {
  PayPalButtons,
  PayPalMarks,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import PaymentForm from "./PaymentForm";

const Payment = ({
  setOrderId,
  active,
  setError,
}: {
  setOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<any>;
  active: boolean;
}) => {
  return (
    <VStack p={4}>
      <Heading as="h1" textAlign="center" mb={6}>
        Insira seus dados para pagamento
      </Heading>
      <Flex w="full">
        <Box width="60%">
          {active && (
            <PaymentForm setOrderId={setOrderId} setError={setError} />
          )}
        </Box>
        <Box width="40%">
          <CheckoutSummary />
        </Box>
      </Flex>
    </VStack>
  );
};

export default Payment;
