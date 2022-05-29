import { Box, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  title: string;
  body: string;
};

const StepCard = ({ icon, title, body }: Props) => {
  return (
    <VStack mb={6}>
      <Box
        position="relative"
        sx={{
          _before: {
            content: "''",
            bg: "secondary.main",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "-1",
          },
        }}
        zIndex="1"
      >
        <Icon as={icon} fontSize="3xl" />
      </Box>
      <Heading color="secondary.dark" as="h3" fontSize="2xl">
        {title}
      </Heading>
      <Text textAlign="center">{body}</Text>
    </VStack>
  );
};

export default StepCard;
