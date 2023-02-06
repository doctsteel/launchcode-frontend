import { Box, Container, HStack } from "@chakra-ui/react";
import React from "react";
import LoginModal from "../../component/LoginModal";
import NavBar from "../../component/Navbar/NavBar";
import MySideBar from "../../component/Sidebar/MySideBar";

const BaseScreen = ({ children }: React.PropsWithChildren) => {
  return (
    <Box w="100%" h="100%" minH="100vh">
      <LoginModal />
      <NavBar />
      <HStack>
        <MySideBar />
        <Container maxW="100%">{children}</Container>
      </HStack>
    </Box>
  );
};

export default BaseScreen;
