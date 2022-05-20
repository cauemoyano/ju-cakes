import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { OrnamentProps } from "../../../utilities/Types/OrnamentProps";

const OrnamentLine = (props: OrnamentProps) => {
  return (
    <>
      <svg
        width={props.width}
        height={props.height}
        viewBox="0 0 26 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="1.5"
          y1="1.5"
          x2="24.5"
          y2="1.5"
          stroke="#690233"
          stroke-width={props.height}
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};

export default OrnamentLine;
