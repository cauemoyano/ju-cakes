import { HStack } from "@chakra-ui/react";
import React from "react";
import FacebookIconLink from "../../links/FacebookIconLink";
import InstagramIconLink from "../../links/InstagramIconLink";

const SocialBox = () => {
  return (
    <HStack as="nav" spacing={3}>
      <FacebookIconLink />
      <InstagramIconLink />
    </HStack>
  );
};

export default SocialBox;
