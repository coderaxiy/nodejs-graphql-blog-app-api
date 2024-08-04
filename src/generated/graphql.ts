import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import * as Urql from "urql";

// Utility types
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends "__typename" | " $fragmentName" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Scalars
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

// DTOs and Types
export type CreateUserDto = {
  firstName: Scalars["String"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type CreateResponseDto = {
  __typename?: "CreateResponseDto";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  errors?: Maybe<Array<FieldError>>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type LoginUserDto = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type LoginUserResponse = {
  __typename?: "LoginUserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type MeResponse = {
  __typename?: "MeResponse";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  error?: Maybe<RequestError>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  deletePost: Post;
  login: LoginUserResponse;
  register: CreateResponseDto;
  updatePost: Post;
};

export type MutationCreatePostArgs = {
  title: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationLoginArgs = {
  body: LoginUserDto;
};

export type MutationRegisterArgs = {
  body: CreateUserDto;
};

export type MutationUpdatePostArgs = {
  id: Scalars["Float"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Post = {
  __typename?: "Post";
  createdAt: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  createPost: Post;
  deletePost: Post;
  hello: Scalars["String"]["output"];
  me: MeResponse;
  post?: Maybe<Post>;
  posts: Array<Post>;
  updatePost: Post;
  users: Array<User>;
};

export type QueryCreatePostArgs = {
  title: Scalars["String"]["input"];
};

export type QueryDeletePostArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryPostArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryUpdatePostArgs = {
  id: Scalars["Float"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type RequestError = {
  __typename?: "RequestError";
  code: Scalars["Float"]["output"];
  message: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  lastName: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["String"]["output"]>;
  username: Scalars["String"]["output"];
};

// Login Mutation
export type LoginMutationVariables = Exact<{
  body: LoginUserDto;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginUserResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    user?: {
      __typename?: "User";
      id: number;
      firstName: string;
      lastName: string;
      username: string;
      createdAt: string;
      updatedAt?: string | null;
    } | null;
  };
};

// Register Mutation
export type RegisterMutationVariables = Exact<{
  body: CreateUserDto;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "CreateResponseDto";
    id?: number | null;
    firstName?: string | null;
    lastName?: string | null;
    createdAt?: string | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

// GraphQL Documents
export const LoginDocument = gql`
  mutation Login($body: LoginUserDto!) {
    login(body: $body) {
      errors {
        field
        message
      }
      user {
        id
        firstName
        lastName
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}

export const RegisterDocument = gql`
  mutation Register($body: CreateUserDto!) {
    register(body: $body) {
      errors {
        field
        message
      }
      id
      firstName
      lastName
      createdAt
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
