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

  const splittedRoute = router.asPath.split("/");
  const slug = splittedRoute[splittedRoute.length - 1];
  return (
    <NextLink href={href} passHref>
      <Link {...rest} sx={slug == href && active ? active : {}}>
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;
