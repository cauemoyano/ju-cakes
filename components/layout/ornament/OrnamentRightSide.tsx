import { Image } from "@chakra-ui/react";
import React from "react";

import { OrnamentProps } from "../../../utilities/Types/OrnamentProps";

const OrnamentRightSide = (props: OrnamentProps) => {
  return (
    <Image
      src="/ornament-right.svg"
      htmlHeight={props.height}
      htmlWidth={props.width}
    />
  );
};

export default OrnamentRightSide;
