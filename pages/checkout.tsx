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
import React, { useEffect, useLayoutEffect, useState } from "react";
import AmountSelection from "../components/checkout/AmountSelection";
import Payment from "../components/checkout/Payment";
import StepsContainer from "../components/checkout/StepsContainer";
import UserIdentification from "../components/checkout/UserIdentification";
import useCart from "../services/useCart/useCart";
import useCheckout from "../services/useCheckout/useCheckout";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Checkout = () => {
  const { isCartEmpty, customer, setGuest } = useCheckout();
  const { clearCart, setShowModal } = useCart();
  const router = useRouter();

  useEffect(() => {
    isCartEmpty() && router.push("/");
    return () => {
      console.log("runs");
      setGuest(null);
      clearCart();
      setShowModal(false);
    };
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
      {customer ? <StepsContainer /> : <UserIdentification />}
    </Container>
  );
};

export default Checkout;
