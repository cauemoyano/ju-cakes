import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UrlObject } from "url";

type Props = NextLinkProps & Omit<LinkProps, "href">;

const CustomLink = ({ href, children, ...rest }: Props) => {
  const router = useRouter();

  const splittedRoute = router.asPath.split("/");
  const slug = splittedRoute[splittedRoute.length - 1];
  return (
    <NextLink href={href} passHref>
      <Link {...rest} /* sx={slug == href && active ? active : {}} */>
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;
