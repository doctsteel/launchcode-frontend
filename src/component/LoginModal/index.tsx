import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Field, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import AuthService from "../../services/auth.service";

interface loginDto {
  username: string;
  password: string;
}

export const LoginModal = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authService = new AuthService();

  const loginMutation = useMutation(async (loginInfo: loginDto) => {
    authService.signin(loginInfo.username, loginInfo.password);
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await loginMutation.mutateAsync(values);
        setIsLogged(true);
      } catch (error: any) {
        alert("fail");
      }
    },
  });
  return (
    <Modal isOpen={!isLogged} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader> Log In</ModalHeader>

        <ModalBody>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel>User name</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </FormControl>

                <Button type="submit" colorScheme="green" w="full">
                  Login
                </Button>
              </VStack>
            </form>
          </FormikProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
