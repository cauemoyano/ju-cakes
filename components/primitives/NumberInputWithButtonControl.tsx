import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const NumberInputWithButtonControl = () => {
  const [value, setValue] = useState(1);

  const handleChange = (type: string) => {
    if (type === "increase") {
      setValue(value + 1);
    }
    if (type === "decrease" && value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <HStack spacing={4}>
      <IconButton
        aria-label="Diminuir quantidade"
        onClick={() => handleChange("decrease")}
        isRound={true}
        colorScheme="teal"
        bg="secondary.dark"
        color="light.main"
        icon={<MinusIcon />}
      ></IconButton>
      <Text fontSize="xl">{value}</Text>
      <IconButton
        aria-label="Aumentar quantidade"
        onClick={() => handleChange("increase")}
        isRound={true}
        colorScheme="teal"
        bg="secondary.dark"
        color="light.main"
        icon={<AddIcon />}
      ></IconButton>
    </HStack>
  );
};

export default NumberInputWithButtonControl;
