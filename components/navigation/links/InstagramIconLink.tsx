import React from "react";
import IconLink from "../../primitives/IconLink";
import { BsInstagram } from "react-icons/bs";

const InstagramIconLink = () => {
  return (
    <IconLink
      href="https://www.facebook.com"
      ariaLabel="Facebook external link"
    >
      <BsInstagram />
    </IconLink>
  );
};

export default InstagramIconLink;
