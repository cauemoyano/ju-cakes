import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import MobileNav from "../../components/admin/MobileNav";
import {
  LinkItems,
  SidebarContent,
} from "../../components/admin/SidebarContent";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const currentPath = router.query.section;

  const findSlugMatchingCmp = () =>
    LinkItems.find((link) => {
      return link.path === currentPath;
    });

  useEffect(() => {
    const foundComponent = findSlugMatchingCmp();

    if (currentPath && !foundComponent) router.push("/admin/home");
  }, [router]);

  const cmp = findSlugMatchingCmp()?.component;

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {cmp}
      </Box>
    </Box>
  );
};

export default Admin;
