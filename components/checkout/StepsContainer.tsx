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
import { NAV_PAGE_PADDING } from "../../utilities/constants";
import AmountSelection from "./AmountSelection";
import Payment from "./Payment";

const StepsContainer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const goNextTab = () => {
    setTabIndex((index) => index + 1);
  };
  return (
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
      <Script src="https://sdk.mercadopago.com/js/v2" />
    </Center>
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

export default StepsContainer;
