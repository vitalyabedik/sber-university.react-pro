import { baseApi } from "shared/api/baseApi";
import type { AuthDto, AuthResponseDto, SignUpDto, User } from "shared/model/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponseDto, AuthDto>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: build.mutation<AuthResponseDto, SignUpDto>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
    getMe: build.query<User, void>({
      query: () => "users/me",
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation, useGetMeQuery } = authApi;
