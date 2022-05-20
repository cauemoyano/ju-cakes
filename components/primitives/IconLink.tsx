import { Link } from "@chakra-ui/react";
import React from "react";

const IconLink = ({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      isExternal
      aria-label={ariaLabel}
      fontSize="2xl"
      color="secondary.dark"
    >
      {children}
    </Link>
  );
};

export default IconLink;
