import { Box, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";
import { stepsData } from "../HowWorks";
import StepCard from "./StepCard";

const XLargeWrapperComponent = () => {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(4, 130px)"
      gap={1}
      maxWidth={"900px"}
      mx="auto"
    >
      <GridItem colSpan={1} rowSpan={1} position="relative">
        <Box position="absolute" bottom="-30%" right="-90%" maxWidth="300px">
          <StepCard {...stepsData[3]} />
        </Box>
      </GridItem>
      <GridItem colSpan={2} rowSpan={1} />
      <GridItem colSpan={1} rowSpan={1} position="relative">
        <Box position="absolute" bottom="-30%" left="-90%" maxWidth="300px">
          <StepCard {...stepsData[0]} />
        </Box>
      </GridItem>
      <GridItem colSpan={1} rowSpan={2} position="relative">
        <Image
          src="/arrow-curved.svg"
          alt=""
          position="absolute"
          top="50%"
          right="-25%"
          transform="translateY(-50%) rotate(90deg) scaleX(-1)"
        />
      </GridItem>
      <GridItem colSpan={2} rowSpan={2} display="flex" justifyContent="center">
        <Image src="/donut-how-works.png" alt="" />
      </GridItem>
      <GridItem colSpan={1} rowSpan={2} position="relative">
        <Image
          src="/arrow-curved.svg"
          alt=""
          position="absolute"
          top="50%"
          left="-25%"
          transform="translateY(-50%) rotate(-90deg) scaleX(-1)"
        />
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} position="relative">
        <Box position="absolute" top="-30%" right="-90%" maxWidth="300px">
          <StepCard {...stepsData[2]} />
        </Box>
      </GridItem>
      <GridItem colSpan={2} rowSpan={1} position="relative">
        <Image
          src="/arrow-curved.svg"
          alt=""
          position="absolute"
          top="20%"
          left="50%"
          transform="translateX(-50%) rotate(0deg) scaleX(-1)"
        />
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} position="relative">
        <Box position="absolute" top="-30%" left="-90%" maxWidth="300px">
          <StepCard {...stepsData[1]} />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default XLargeWrapperComponent;
