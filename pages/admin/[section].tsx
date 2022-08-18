import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useLayoutEffect, useMemo } from "react";
import MobileNav from "../../components/admin/MobileNav";
import {
  LinkItems,
  SidebarContent,
} from "../../components/admin/SidebarContent";
import { ProductsProvider } from "../../context/ProductsContext";
import CustomerProvider from "../../context/Admin/CustomersContext";
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = useAuth();

  useLayoutEffect(() => {
    if (!user || !user?.admin) router.push("/");
  }, []);

  const currentPath = router.query.section;

  const findSlugMatchingCmp = () =>
    LinkItems.find((link) => {
      return link.path === currentPath;
    }) ||
    LinkItems.find((link) => {
      return link.path === "home";
    });

  const cmp = findSlugMatchingCmp()?.component;
  if (!user || !user?.admin) return null;
  const subPagesBox = useMemo(
    () => (
      <Box ml={{ base: 0, md: 60 }} p="4">
        <CustomerProvider>{cmp}</CustomerProvider>
      </Box>
    ),
    [cmp]
  );

  return (
    <Box minH="100vh" bg="light.main">
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
      {subPagesBox}
    </Box>
  );
};

export default Admin;
