import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import OrnamentLeftSide from "../../../layout/ornament/OrnamentLeftSide";
import OrnamentLine from "../../../layout/ornament/OrnamentLine";
import OrnamentRightSide from "../../../layout/ornament/OrnamentRightSide";
import CustomLink from "../../../primitives/CustomLink";
import OrnamentAnimatedBox from "./OrnamentAnimatedBox";
import NextLink from "next/link";
import { attachProductsCategoriesToLinks } from "../../../../utilities/auxFunctions";

export interface INavLink {
  name: string;
  path: string | null;
  sublinks?: INavLink[] | null;
}

export const Links: INavLink[] = [
  { name: "INICIO", path: "/", sublinks: null },
  {
    name: "PRODUTOS",
    path: null,
    sublinks: [{ name: "BROWNIES", path: "/brownies" }],
  },
  { name: "SOBRE", path: "/sobre", sublinks: null },
  { name: "AJUDA", path: "/ajuda", sublinks: null },
  { name: "CONTATO", path: "/contato", sublinks: null },
];

const LinksBox = ({ move }: { move: boolean }) => {
  const [links, setLinks] = useState<INavLink[]>([]);
  useEffect(() => {
    (async () => {
      const links = await attachProductsCategoriesToLinks(Links);
      setLinks(links);
    })();
  }, []);
  return (
    <VStack>
      <HStack
        as={"nav"}
        spacing={move ? 1 : 3}
        display={{ base: "none", md: "flex" }}
      >
        <OrnamentAnimatedBox move={move}>
          <OrnamentLeftSide width="40px" />
        </OrnamentAnimatedBox>
        <OrnamentAnimatedBox move={move}>
          <OrnamentLine width="10px" height="5px" />
        </OrnamentAnimatedBox>
        {links.map((link, i) => (
          <Flex alignItems="center" key={i}>
            <NavLink key={i} {...link} />
            <OrnamentAnimatedBox move={move}>
              <OrnamentLine width="10px" height="5px" />
            </OrnamentAnimatedBox>
          </Flex>
        ))}
        <OrnamentAnimatedBox move={move}>
          <OrnamentRightSide width="40px" />
        </OrnamentAnimatedBox>
      </HStack>
    </VStack>
  );
};

export const NavLink = ({ name, path, sublinks }: INavLink) => {
  return (
    <Box>
      <Popover trigger={"hover"} placement={"bottom-start"}>
        <PopoverTrigger>
          {sublinks ? (
            <Box
              px={2}
              py={1}
              _hover={{
                textDecoration: "none",
              }}
              as="button"
            >
              {name}
            </Box>
          ) : (
            <CustomLink
              px={2}
              py={1}
              _hover={{
                textDecoration: "none",
              }}
              href={path ?? "#"}
            >
              {name}
            </CustomLink>
          )}
        </PopoverTrigger>

        {sublinks && (
          <PopoverContent
            border={0}
            boxShadow={"md"}
            p={4}
            rounded={"md"}
            minW={"sm"}
          >
            <Stack>
              {sublinks.map((sub) => (
                <NavSubLink key={sub.name} {...sub} />
              ))}
            </Stack>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  );
};
export const NavSubLink = ({ name, path }: INavLink) => {
  return (
    <Box>
      <CustomLink
        px={2}
        py={1}
        _hover={{
          textDecoration: "none",
        }}
        href={path ?? "#"}
      >
        {name}
      </CustomLink>
    </Box>
  );
};

export default LinksBox;
