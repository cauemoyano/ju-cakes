import { Image } from "@chakra-ui/react";
import React from "react";

import { OrnamentProps } from "../../../utilities/Types/OrnamentProps";

const OrnamentLeftSide = (props: OrnamentProps) => {
  return (
    <Image
      src="/ornament-left.svg"
      htmlHeight={props.height}
      htmlWidth={props.width}
    />
  );
};

export default OrnamentLeftSide;
