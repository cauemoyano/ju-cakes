import {
  Box,
  Heading,
  HStack,
  RadioGroup,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ProductVariantBox from "../primitives/ProductVariantBox";

const ProductVariantSelection = () => {
  const options = ["20 Unidades", "30 unidades", "50 unidades"];

  const { getRadioProps } = useRadioGroup({
    name: "framework",
    onChange: console.log,
  });

  return (
    <VStack align="start" py={4} overflow="auto">
      <Text fontSize="lg" fontWeight="bold">
        Selecione a quantidade por caixa
      </Text>
      <HStack>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <ProductVariantBox key={value} {...radio}>
              {value}
            </ProductVariantBox>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default ProductVariantSelection;
