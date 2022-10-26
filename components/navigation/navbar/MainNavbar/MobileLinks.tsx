import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { MotionBox } from "../../../animation/MotionBox";
import CustomLink from "../../../primitives/CustomLink";
import { INavLink, Links, NavLink } from "./LinksBox";

const MobileLinks = () => {
  return (
    <MotionBox
      display={{ md: "none" }}
      bg="light.main"
      as={motion.div}
      initial="hidden"
      animate="visible"
      exit={{ maxHeight: 0 }}
      overflow={"hidden"}
      variants={{ visible: { maxHeight: "100vh" }, hidden: { maxHeight: 0 } }}
      transition={{ duration: 0.3 }}
    >
      <Stack as={"nav"} spacing={1}>
        <Button
          as={"a"}
          fontWeight={400}
          variant={"primaryInverted"}
          href={"#"}
        >
          Entrar
        </Button>
        <Button as={"a"} fontWeight={400} variant={"primary"} href={"#"}>
          Registrar
        </Button>
        <Center height="20px">
          <Divider />
        </Center>

        {Links.map((link) => (
          <MobileNavLink key={link.name} {...link} />
        ))}
      </Stack>
    </MotionBox>
  );
};

const MobileNavLink = ({ name, path, sublinks }: INavLink) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={sublinks ? onToggle : () => {}}>
      <Flex
        py={2}
        as={Link}
        href={path ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{name}</Text>
        {sublinks && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"gray.200"}
          align={"start"}
        >
          {sublinks &&
            sublinks.map((sub) => (
              <CustomLink key={sub.name} py={2} href={sub.path ?? "#"}>
                {sub.name}
              </CustomLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default MobileLinks;
