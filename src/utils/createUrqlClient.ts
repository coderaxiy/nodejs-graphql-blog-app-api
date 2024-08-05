import { debugExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

function queryUpdate<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  res: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(res, data as any) as any);
}

export const createUrqlClient = (ssrExch: any) => ({
  url: "http://localhost:8080/graphql",
  exchanges: [
    debugExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {
            queryUpdate<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (res, query) => {
                if (res.login.errors) {
                  return query;
                } else {
                  const { __typename, ...data } = res.login.user;
                  return {
                    me: data,
                  };
                }
              }
            );
          },

          logout: (result, args, cache, info) => {
            queryUpdate<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (res, query) => {
                if (!res.logout) {
                  return query;
                } else {
                  return {
                    me: {},
                  };
                }
              }
            );
          },

          register: (result, args, cache, info) => {
            queryUpdate<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              result,
              (res, query) => {
                if (res.register.errors) {
                  return query;
                } else {
                  const { __typename, ...data } = res.register;
                  return { me: data };
                }
              }
            );
          },
        },
      },
    }),
    ssrExch,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include" as const,
  },
});
