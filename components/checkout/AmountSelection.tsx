import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useCheckout from "../../services/useCheckout/useCheckout";
import { formatCurrency } from "../../utilities/auxFunctions";
import CheckoutSummary from "./CheckoutSummary";

const AmountSelection = ({ goNextTab }: { goNextTab: () => void }) => {
  const { paymentRate, setPaymentRate, subtotal } = useCheckout();
  return (
    <VStack p={4}>
      <Heading as="h1" textAlign="center" mb={6}>
        Escolha a forma de pagamento
      </Heading>
      <Flex>
        <Box width="60%">
          <Text mb={6}>
            Nos exigimos o pagamento de no minimo 50% do valor total para
            confirmar o pedido. Caso seja selecionada esta opcao, o valor
            restante devera ser pago no ato da retirada
          </Text>
          <RadioGroup
            value={paymentRate}
            onChange={(value: "50%" | "100%") => setPaymentRate(value)}
          >
            <Stack>
              <Radio value="50%" colorScheme="primaryNumbered">
                <Box>
                  <Text fontWeight={500}>Pagamento parcial (50%)</Text>
                  <Text>{formatCurrency(subtotal / 2)}</Text>
                </Box>
              </Radio>
              <Radio value="100%" colorScheme="primaryNumbered">
                <Box>
                  <Text fontWeight={500}>Pagamento total (100%)</Text>
                  <Text>{formatCurrency(subtotal)}</Text>
                </Box>
              </Radio>
            </Stack>
          </RadioGroup>
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

export default AmountSelection;
