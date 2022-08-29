import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { formatCurrency } from "../../utilities/auxFunctions";
import { OrderData } from "../../utilities/Types/Orders";

type TOrderpayment = {
  transaction_amount: OrderData["transaction_amount"];
  paymentRate: OrderData["paymentRate"];
  transaction_details: OrderData["transaction_details"];
};

const getInstallments = (totalPaid: number, installment: number) => {
  return Math.round(totalPaid / installment);
};

const OrderpaymentDetails = (props: TOrderpayment) => {
  const {
    transaction_amount,
    paymentRate,
    transaction_details: { installment_amount, total_paid_amount },
  } = props;

  const isPaidInInstallments = installment_amount !== transaction_amount;

  return (
    <>
      {isPaidInInstallments ? (
        <InstallmentsDetails
          installment_amount={installment_amount}
          total_paid_amount={total_paid_amount}
        />
      ) : (
        <PaidInFullDetails transaction_amount={transaction_amount} />
      )}
      {paymentRate === "50%" ? (
        <Text mt={4}>
          Você pagou parcialmente o valor da ordem. Na retirada dos produtos o
          valor restante ({formatCurrency(transaction_amount)}) deverá ser
          quitado integralmente.
        </Text>
      ) : null}
    </>
  );
};

const InstallmentsDetails = ({
  installment_amount,
  total_paid_amount,
}: TOrderpayment["transaction_details"]) => {
  return (
    <Flex justifyContent="space-between" my={2}>
      <Text fontWeight={600}>Pagamento:</Text>
      <Text>
        {getInstallments(total_paid_amount, installment_amount)} parcelas de{" "}
        {formatCurrency(installment_amount)}
      </Text>
    </Flex>
  );
};

const PaidInFullDetails = ({
  transaction_amount,
}: {
  transaction_amount: TOrderpayment["transaction_amount"];
}) => {
  return (
    <Flex justifyContent="space-between" fontWeight={600} my={2}>
      <Text>Total pago</Text>
      <Text>{formatCurrency(transaction_amount)}</Text>
    </Flex>
  );
};

export default OrderpaymentDetails;
