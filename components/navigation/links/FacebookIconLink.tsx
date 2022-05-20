import React from "react";
import IconLink from "../../primitives/IconLink";
import { BsFacebook } from "react-icons/bs";

const FacebookIconLink = () => {
  return (
    <IconLink
      href="https://www.facebook.com"
      ariaLabel="Facebook external link"
    >
      <BsFacebook />
    </IconLink>
  );
};

export default FacebookIconLink;
