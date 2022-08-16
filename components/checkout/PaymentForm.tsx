import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import Script from "next/script";
import React, { useEffect } from "react";
import { functions } from "../../config/firebase";
import { formConfig } from "../../config/mercadopago";
import useCheckout from "../../services/useCheckout/useCheckout";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const PaymentForm = () => {
  const { cart, paymentRate, dateAndPeriod, getCheckoutAmount } = useCheckout();
  useEffect(() => {
    console.log(!!window.MercadoPago);
    if (!window.MercadoPago) return;

    (async () => {
      try {
        const amount = await getCheckoutAmount();

        const MP = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
          {
            locales: "pt_BR",
          }
        );

        const cardForm = MP.cardForm({
          amount,
          iframe: true,
          form: formConfig,
          callbacks: {
            onFormMounted: (error: any) => {
              if (error)
                return console.warn("Form Mounted handling error: ", error);
              console.log("Form mounted");
            },
            onSubmit: (event: any) => {
              event.preventDefault();

              const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();
              const data = {
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Descrição do produto",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              };

              const createPayment = httpsCallable(functions, "createPayment");
              createPayment(data)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
              return;
            },
            onFetching: (resource: any) => {
              console.log("Fetching resource: ", resource);

              // Animate progress bar
              /*   const progressBar = document.querySelector(".progress-bar");
              progressBar?.removeAttribute("value");

              return () => {
                progressBar?.setAttribute("value", "0");
              }; */
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box px={4}>
      <form id="form-checkout">
        <FormControl /* isInvalid={!!(errors.name && touched.name)} */ mb={4}>
          <Input as="div" id="form-checkout__cardNumber" />
          {/* <FormErrorMessage>{errors.name}</FormErrorMessage> */}
        </FormControl>
        <Flex justifyContent="space-between" gap={4}>
          <FormControl mb={4}>
            <Input as="div" id="form-checkout__expirationDate" />
          </FormControl>
          <FormControl mb={4}>
            <Input as="div" id="form-checkout__securityCode" />
          </FormControl>
        </Flex>
        <FormControl mb={4}>
          <Input type="text" id="form-checkout__cardholderName" />
        </FormControl>
        <Flex justifyContent="space-between" gap={4}>
          <FormControl mb={4}>
            <Select id="form-checkout__issuer"></Select>
          </FormControl>
          <FormControl mb={4}>
            <Select id="form-checkout__identificationType"></Select>
          </FormControl>
        </Flex>
        <FormControl mb={4}>
          <Input type="text" id="form-checkout__identificationNumber" />
        </FormControl>
        <FormControl mb={4}>
          <Select id="form-checkout__installments"></Select>
        </FormControl>
        <FormControl mb={4}>
          <Input type="email" id="form-checkout__cardholderEmail" />
        </FormControl>
        {/* <progress value="0" className="progress-bar">
          Carregando...
        </progress> */}
        <Button
          colorScheme="primaryNumbered"
          type="submit"
          id="form-checkout__submit"
        >
          Pagar
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;
