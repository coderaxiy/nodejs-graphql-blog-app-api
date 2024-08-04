import {
  Avatar,
  Box,
  chakra,
  Flex,
  Heading,
  Stack,
  Link,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { SiTheregister } from "react-icons/si";

const RegisterIcon = chakra(SiTheregister);

interface AuthLayoutProps {
  children: ReactElement;
  authType: "login" | "register";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authType }) => {
  const isLogin = authType === "login";
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        {isLogin ? <Avatar bg="teal.500" /> : <RegisterIcon size={120} />}
        <Heading color="black">{isLogin ? "Welcome" : "Register"}</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>{children}</Box>
      </Stack>
      <Box>
        {isLogin ? "New to us" : "Already have an account"}?{" "}
        <Link color="teal.500" href={isLogin ? "/register" : "login"}>
          {isLogin ? "Sign Up" : "Sign in"}
        </Link>
      </Box>
    </Flex>
  );
};

export default AuthLayout;
