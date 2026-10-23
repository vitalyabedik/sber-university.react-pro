import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, AUTH_API_BASE_URL, AUTH_API_PREFIXES } from "./config";
import { getAuthHeaders } from "shared/lib";

const createQuery = (baseUrl: string, withAuth = false) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: withAuth
      ? (headers) => {
          Object.entries(getAuthHeaders()).forEach(([name, value]) => headers.set(name, value));

          return headers;
        }
      : undefined,
  });

const defaultBaseQuery = createQuery(API_BASE_URL);
const authBaseQuery = createQuery(AUTH_API_BASE_URL, true);

// Запросы авторизации уходят на API курса, остальные — на прежний baseUrl
const routingBaseQuery: typeof defaultBaseQuery = (args, api, extraOptions) => {
  const url = typeof args === "string" ? args : args.url;
  const isAuthRequest = AUTH_API_PREFIXES.some((prefix) => url.startsWith(prefix));

  return (isAuthRequest ? authBaseQuery : defaultBaseQuery)(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: routingBaseQuery,
  tagTypes: ["Tasks", "Auth"],
  endpoints: () => ({}),
});
