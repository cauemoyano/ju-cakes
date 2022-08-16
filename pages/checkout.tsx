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
import Script from "next/script";
import React, { useState } from "react";
import AmountSelection from "../components/checkout/AmountSelection";
import Payment from "../components/checkout/Payment";
import { NAV_PAGE_PADDING } from "../utilities/constants";

const Checkout = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const goNextTab = () => {
    setTabIndex((index) => index + 1);
  };
  return (
    <Container
      paddingTop={NAV_PAGE_PADDING}
      px={0}
      maxWidth="container.lg"
      minHeight={"100vh"}
      display="flex"
      flexDirection={"column"}
    >
      <Center>
        <Tabs
          variant="unstyled"
          p={4}
          display="flex"
          flexDirection="column"
          index={tabIndex}
        >
          <TabList mx="auto">
            <CustomTab mr={12}>1</CustomTab>
            <CustomTab mr={12}>2</CustomTab>
            <CustomTab>3</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AmountSelection goNextTab={goNextTab} />
            </TabPanel>
            <TabPanel>
              <Payment goNextTab={goNextTab} />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
      <Script src="https://sdk.mercadopago.com/js/v2" />
    </Container>
  );
};

const CustomTab = ({
  children,
  ...props
}: { children: React.ReactNode } & TabProps) => {
  return (
    <Tab
      borderRadius="full"
      bg="secondary.light"
      border="1px"
      borderColor="secondary.dark"
      {...props}
    >
      {children}
    </Tab>
  );
};

export default Checkout;
