import {
  Center,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useLayoutEffect, useState } from "react";
import AmountSelection from "../components/checkout/AmountSelection";
import Payment from "../components/checkout/Payment";
import StepsContainer from "../components/checkout/StepsContainer";
import UserIdentification from "../components/checkout/UserIdentification";
import useCheckout from "../services/useCheckout/useCheckout";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Checkout = () => {
  const { isCartEmpty } = useCheckout();
  const router = useRouter();

  useLayoutEffect(() => {
    isCartEmpty() && router.push("/");
  }, []);

  if (isCartEmpty()) return null;

  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <UserIdentification />
      {/*  <StepsContainer /> */}
    </Container>
  );
};

export default Checkout;
