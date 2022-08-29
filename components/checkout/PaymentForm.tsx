import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { functions } from "../../config/firebase";
import { formConfig } from "../../config/mercadopago";
import useCheckout from "../../services/useCheckout/useCheckout";
import useErrorHandler, {
  MERCADOPAGO_FORM_ERRORS,
} from "../../services/useErrorHandler/useErrorHandler";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const PaymentForm = ({
  setOrderId,
  setError,
}: {
  setOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<any>;
}) => {
  const { cart, dateAndPeriod, getCheckoutAmount, customer, paymentRate } =
    useCheckout();
  const { errorToast } = useErrorHandler();
  const [loadingPayment, setLoadingPayment] = useState(false);
  useEffect(() => {
    if (!window.MercadoPago) return;
    let cardForm: any;
    (async () => {
      try {
        const amount = await getCheckoutAmount();

        const MP = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
          {
            locales: "pt_BR",
          }
        );

        cardForm = MP.cardForm({
          amount,
          iframe: true,
          form: formConfig,
          callbacks: {
            onFormMounted: (error: any) => {
              if (error)
                return console.warn("Form Mounted handling error: ", error);
            },
            onSubmit: (event: any) => {
              event.preventDefault();
              setLoadingPayment(true);

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
              console.time("create");
              createPayment({
                mercadoData: data,
                orderData: { ...customer, dateAndPeriod, paymentRate, cart },
              })
                .then((res: any) => {
                  setOrderId(res.data);
                  console.timeEnd("create");
                })
                .catch((err) => {
                  console.log(err);
                  console.timeEnd("create");
                  setError(err);
                });
            },
            onFetching: (resource: any) => {
              console.log("Fetching resource: ", resource);
            },
            onError: (err: any) => {
              err.forEach((err: { message: string }) =>
                errorToast(MERCADOPAGO_FORM_ERRORS[err.message])
              );
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      if (cardForm) cardForm.unmount();
    };
  }, []);

  return (
    <Box px={4}>
      <form id="form-checkout">
        <FormControl mb={4}>
          <Input as="div" id="form-checkout__cardNumber" />
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
        <Button
          colorScheme="primaryNumbered"
          type="submit"
          id="form-checkout__submit"
          isLoading={loadingPayment}
          loadingText="Aguarde..."
        >
          Pagar
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;
