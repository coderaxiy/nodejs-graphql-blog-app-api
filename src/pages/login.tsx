"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  InputGroup,
  InputLeftElement,
  chakra,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useLoginMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { useRouter } from "next/router";
import AuthLayout from "../components/layouts/auth-layout";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface loginProps {}

interface FormState {
  username: string;
  password: string;
}

const FORM_INITIAL_STATE = {
  username: "",
  password: "",
};

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const Login: React.FC<loginProps> = ({}) => {
  const [showPassword, setShowPassWord] = useState(false);
  const router = useRouter();
  const [, login] = useLoginMutation();
  const toast = useToast();

  return (
    <AuthLayout authType="login">
      <Formik
        initialValues={FORM_INITIAL_STATE}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={async (values: FormState, { setErrors }) => {
          const res = await login({ body: values });
          if (res.data?.login?.errors) {
            setErrors(errorMap(res.data?.login?.errors));
          } else if (res.data?.login?.user) {
            router.push("/");
            toast({
              position: "top-right",
              title: "Successfully signed in",
              description: "You are now logged in",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }
        }}
      >
        {(props) => (
          <Form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input {...field} placeholder="username" />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        {...field}
                        placeholder="password"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassWord(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                isLoading={props.isSubmitting}
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: false})(Login);
