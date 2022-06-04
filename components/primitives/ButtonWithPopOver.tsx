import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  popoverHeader?: string;
  popoverBody: string;
  children: React.ReactNode;
};

const ButtonWithPopOver = ({
  popoverBody,
  popoverHeader = "",
  children,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{popoverHeader}</PopoverHeader>
        <PopoverBody>{popoverBody}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ButtonWithPopOver;
