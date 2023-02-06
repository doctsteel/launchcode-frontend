import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { FiHome } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const MySideBar = () => {
  return (
    <Box minH="100vh">
      <Box
        bg={"gray.200"}
        display={{ base: "none", md: "block" }}
        w={{ base: "full", sm: 36 }}
        //pos="fixed"
        h="full"
      >
        {SideBarContent.map((item) => (
          <SideItem key={item.name} icon={item.icon} route={item.route}>
            {item.name}
          </SideItem>
        ))}
      </Box>
    </Box>
  );
};

const SideBarContent = [
  { route: "/home", name: "Home", icon: FiHome },
  { route: "/quotes", name: "Quotes", icon: FiHome },
  { route: "/", name: "Leads", icon: FiHome },
  { route: "/", name: "Tours", icon: FiHome },
  { route: "/", name: "Invoices", icon: FiHome },
  { route: "/", name: "Analytics", icon: FiHome },
  { route: "/", name: "Team", icon: FiHome },
  { route: "/", name: "Admin", icon: FiHome },
  { route: "/", name: "Support", icon: FiHome },
];

interface SideItemProps {
  route: string;
  icon: IconType;
  children: string;
}

const SideItem = ({ route, icon, children }: SideItemProps) => {
  return (
    <Box
      as="button"
      w="100%"
      bg="#e6e6e6"
      _hover={{ bg: "#CCD0DC" }}
      _focus={{ bg: "gray.350" }}
    >
      <Link
        as={RouterLink}
        to={route}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          role="group"
          cursor="pointer"
          color="#5F6CAF"
          fontSize="13"
          fontWeight="semibold"
        >
          {icon && <Icon mr="3" fontSize="15" as={icon} />}
          {children}
        </Flex>
      </Link>
    </Box>
  );
};

export default MySideBar;
