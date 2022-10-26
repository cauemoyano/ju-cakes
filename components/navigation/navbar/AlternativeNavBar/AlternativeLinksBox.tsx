import {
  Box,
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

import React, { useEffect, useState } from "react";
import { getCollection } from "../../../../services/FirebaseStorageService/FirebaseStorageService";
import { attachProductsCategoriesToLinks } from "../../../../utilities/auxFunctions";
import CustomLink from "../../../primitives/CustomLink";
import {
  INavLink,
  Links as ParentLinks,
  NavLink,
  NavSubLink,
} from "../MainNavbar/LinksBox";

const AlternativeLinksBox = () => {
  const [links, setLinks] = useState<INavLink[]>([]);
  useEffect(() => {
    (async () => {
      const links = await attachProductsCategoriesToLinks(ParentLinks);
      setLinks(links);
    })();
  }, []);
  return (
    <VStack>
      <HStack as={"nav"} spacing={1} display={{ base: "none", md: "flex" }}>
        {links.map((link, i) => (
          <Flex alignItems="center" key={i}>
            <NavLink {...link} />
          </Flex>
        ))}
      </HStack>
    </VStack>
  );
};

export default AlternativeLinksBox;
