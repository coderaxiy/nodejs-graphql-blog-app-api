"use client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useRegisterMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { useRouter } from "next/router";
import AuthLayout from "../components/layouts/auth-layout";

interface registerProps {}

interface FormState {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const FORM_INITIAL_STATE = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
};

const VALIDATION_SCHEMA = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().optional(),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const toast = useToast();

  return (
    <AuthLayout authType="register">
      <Formik
        initialValues={FORM_INITIAL_STATE}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={async (values: FormState, { setErrors }) => {
          const res = await register({ body: values });
          if (res.data?.register?.errors) {
            setErrors(errorMap(res.data?.register?.errors));
          } else if (res.data?.register?.id) {
            router.push("/");
            toast({
              position: "top-right",
              title: "Successfully signed up",
              description: "We've created your account for you.",
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
              <Field name="firstName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.firstName && form.touched.firstName}
                  >
                    <FormLabel>First name</FormLabel>
                    <Input {...field} placeholder="First name" />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <FormLabel>Last name</FormLabel>
                    <Input {...field} placeholder="Last name" />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input {...field} placeholder="username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
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
                Sign Up
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
