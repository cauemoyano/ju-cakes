import {
  Box,
  CheckboxProps,
  Flex,
  Text,
  useCheckbox,
  chakra,
} from "@chakra-ui/react";
import React from "react";

const VariantCheckBox = (props: CheckboxProps) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  return (
    <chakra.label
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      _focus={{
        boxShadow: "outline",
      }}
      bg={`${
        state.isChecked
          ? "primary.light"
          : (getInputProps() as any).disabled
          ? "gray.200"
          : ""
      }`}
      color={`${
        state.isChecked
          ? "primary.dark"
          : (getInputProps() as any).disabled
          ? "gray.300"
          : ""
      }`}
      borderColor={`${state.isChecked && "primary.dark"}`}
      px={5}
      py={3}
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Text {...getLabelProps()}>{props.value}</Text>
    </chakra.label>
  );
};

export default VariantCheckBox;
