import { Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";
import { stepsData } from "../HowWorks";
import StepCard from "./StepCard";

const MediumWrapperComponent = () => {
  return (
    <Grid
      templateColumns={"repeat(2, 1fr)"}
      templateRows={"repeat(2, 1fr)"}
      gap={6}
      position="relative"
      zIndex="2"
    >
      <Image
        src="/arrow.svg"
        alt=""
        position="absolute"
        top="0"
        left="50%"
        zIndex="-1"
        transform="translateX(-50%)"
      />
      <Image
        src="/direction.svg"
        alt=""
        position="absolute"
        top="30%"
        left="50%"
        zIndex="-1"
        transform="translateX(-50%)"
        width={"100px"}
      />
      <Image
        src="/arrow-curved.svg"
        alt=""
        position="absolute"
        bottom="-10%"
        left="50%"
        zIndex="-1"
        transform="translateX(-50%)"
      />
      {stepsData.map((step, index) => (
        <GridItem key={index}>
          <StepCard {...step} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default MediumWrapperComponent;
