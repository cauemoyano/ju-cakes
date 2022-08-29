import {
  Center,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import React, { useEffect, useState } from "react";
import { firebaseErrorMap } from "../../services/useErrorHandler/useErrorHandler";
import CustomLink from "../primitives/CustomLink";
import AmountSelection from "./AmountSelection";
import OrderConfirmation from "./OrderConfirmation";
import Payment from "./Payment";

const StepsContainer = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<FirebaseError | null>(null);
  const goNextTab = () => {
    setTabIndex((index) => index + 1);
  };
  useEffect(() => {
    if (!orderId) return;
    goNextTab();
  }, [orderId]);
  return (
    <VStack spacing={4}>
      {error ? (
        <VStack spacing={4}>
          <Text mt={8}>
            <Text as="strong" mr={2}>
              Erro:
            </Text>
            {firebaseErrorMap[error.code]}
          </Text>
          <CustomLink
            href="/"
            colorScheme="primaryNumbered"
            px="16"
            py="2"
            bgColor={"primary.dark"}
            color="white"
            borderRadius="md"
          >
            Página inicial
          </CustomLink>
        </VStack>
      ) : (
        <>
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
                <Payment
                  setOrderId={setOrderId}
                  setError={setError}
                  active={tabIndex === 1}
                />
              </TabPanel>
              <TabPanel>
                {orderId && <OrderConfirmation orderId={orderId} />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </VStack>
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
