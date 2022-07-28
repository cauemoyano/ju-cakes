import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  BoxProps,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const NumberInputWithButtonControl = ({
  value,
  handleDecrease,
  handleIncrease,
  ...props
}: {
  value: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
} & BoxProps) => {
  return (
    <Flex gap={4} alignItems="center" justifyContent="center">
      <IconButton
        aria-label="Diminuir quantidade"
        onClick={handleDecrease}
        isRound={true}
        colorScheme="teal"
        bg="secondary.dark"
        color="light.main"
        icon={<MinusIcon />}
      ></IconButton>
      <Text fontSize="xl">{value}</Text>
      <IconButton
        aria-label="Aumentar quantidade"
        onClick={handleIncrease}
        isRound={true}
        colorScheme="teal"
        bg="secondary.dark"
        color="light.main"
        icon={<AddIcon />}
      ></IconButton>
    </Flex>
  );
};

export default NumberInputWithButtonControl;
