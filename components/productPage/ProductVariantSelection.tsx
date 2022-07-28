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
import { ProductVariant } from "../../utilities/Types/Products";
import VariantBox from "../primitives/VariantBox";

const ProductVariantSelection = ({
  variants,
  setVariant,
}: {
  variants: ProductVariant[] | undefined;
  setVariant: React.Dispatch<React.SetStateAction<ProductVariant | null>>;
}) => {
  /* const options = ["20 Unidades", "30 unidades", "50 unidades"]; */

  if (!variants) return <Text>Produto indisponível</Text>;

  const handleChange = (name: string) => {
    const variant = variants.find((v) => v.name === name);
    if (!variant) return;
    setVariant(variant);
  };

  const { getRadioProps } = useRadioGroup({
    name: "variants",
    defaultValue: variants[0].name,
    onChange: (value) => handleChange(value),
  });

  return (
    <VStack align="start" py={4} overflow="auto">
      <Text fontSize="lg" fontWeight="bold">
        Selecione a quantidade por caixa
      </Text>
      <HStack pl={2}>
        {variants.map((variant) => {
          const radio = getRadioProps({ value: variant.name });
          return (
            <VariantBox key={variant.name} {...radio}>
              {variant.name}
            </VariantBox>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default ProductVariantSelection;
