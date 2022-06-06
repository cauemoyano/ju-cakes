import React from "react";
import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props extends LinkProps {
  href: string;
  active?: { [x: string]: string };
}

const CustomLink = ({ href, active, children, ...rest }: Props) => {
  const router = useRouter();

  console.log(router.asPath, href);

  return (
    <NextLink href={href} passHref>
      <Link {...rest} /* sx={router.asPath == href && active ? active : {}} */>
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;
