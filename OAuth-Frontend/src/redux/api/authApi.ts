import { indexApi } from "./indexApi";

export const authApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      authTypes.apiResponse,
      authTypes.loginRegisterParams
    >({
      query: (data) => ({
        url: "Auth/Login",
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
        url: "Auth/Register",
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
        url: `Auth/ConfirmUserEmail?UserId=${id}&Token=${token}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    forgotPassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.forgotPasswordParams
    >({
      query: (data) => ({
        url: "Auth/ForgotPassword",
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
        url: `Auth/ResetPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    googleLogin: builder.mutation<unknown, { token: string }>({
      query: (data) => ({
        url: "Auth/GoogleSignIn",
        method: "Post",
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
  useGoogleLoginMutation,
} = authApi;
