import { indexApi } from "./indexApi";

export const authApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      authTypes.apiResponse,
      authTypes.loginRegisterParams
    >({
      query: (data) => ({
        url: "Auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<
      authTypes.apiResponse,
      authTypes.loginRegisterParams
    >({
      query: (data) => ({
        url: "Auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    confirmEmail: builder.query<
      authTypes.apiResponse,
      authTypes.confirmEmailParams
    >({
      query: ({ id, token }) => ({
        url: `Auth/confirmUserEmail?UserId=${id}&Token=${token}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.forgotPasswordParams
    >({
      query: (data) => ({
        url: "Auth/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.resetPasswordParams
    >({
      query: (data) => ({
        url: `Auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useConfirmEmailQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation,
} = authApi;
