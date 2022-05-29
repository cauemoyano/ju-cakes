import { Box } from "@chakra-ui/react";
import React from "react";
import { stepsData } from "../HowWorks";
import StepCard from "./StepCard";

const BaseWrapperComponent = () => {
  return (
    <Box
      sx={{
        ">div:not(:last-child)": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
          paddingBottom: "1.5rem",
        },
      }}
    >
      {stepsData.map((step, index) => (
        <StepCard key={index} {...step} />
      ))}
    </Box>
  );
};

export default BaseWrapperComponent;
