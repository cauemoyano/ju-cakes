import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { BsCalendar2Date, BsChatQuote } from "react-icons/bs";
import { FiHome, FiUsers, FiPackage, FiLayers } from "react-icons/fi";
import CustomLink from "../primitives/CustomLink";
import AdminCalendar from "./AdminCalendar";
import AdminCustomer from "./AdminCustomer";
import AdminHome from "./AdminHome";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminTestimonials from "./Admintestimonials";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
  component: ReactNode;
}
export const LinkItems: Array<LinkItemProps> = [
  {
    name: "Inicio",
    icon: FiHome,
    path: "home",
    component: <AdminHome />,
  },
  {
    name: "Clientes",
    icon: FiUsers,
    path: "customer",
    component: <AdminCustomer />,
  },
  {
    name: "Produtos",
    icon: FiPackage,
    path: "produtos",
    component: <AdminProducts />,
  },
  {
    name: "Agenda",
    icon: BsCalendar2Date,
    path: "agenda",
    component: <AdminCalendar />,
  },
  {
    name: "Ordens",
    icon: FiLayers,
    path: "orders",
    component: <AdminOrders />,
  },
  {
    name: "Testemunhos",
    icon: BsChatQuote,
    path: "testemunhos",
    component: <AdminTestimonials />,
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: string | number;
}
const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <CustomLink
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _active={{ bg: "primary.dark" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary.main",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </CustomLink>
  );
};
