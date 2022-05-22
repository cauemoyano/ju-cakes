import { Box, Button, Center, Divider, Stack } from "@chakra-ui/react";
import React from "react";
import { Links, NavLink } from "./LinksBox";

const MobileLinks = () => {
  return (
    <Box display={{ md: "none" }} bg="light.main">
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
          <NavLink key={link}>{link}</NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default MobileLinks;
