import { indexApi } from "./indexApi";

export const userApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    userDetails: builder.query<authTypes.userDetails, string | null>({
      query: (data) => ({
        url: `User/details${
          data === "" || data === null ? "" : `?email=${data}`
        }`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    changePassword: builder.mutation<
      authTypes.apiResponse,
      authTypes.loginRegisterParams
    >({
      query: (data) => ({
        url: "User/change-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUserList: builder.query<
      ApiTypes.GetUsersProps,
      ApiTypes.GetUserQueryParams
    >({
      query: (data) => ({
        url: "User/GetUsers",
        params: data,
      }),
      providesTags: ["User"],
    }),
    editUser: builder.mutation<
      authTypes.apiResponse,
      authTypes.updateUserProps
    >({
      query: (data) => ({
        url: `User/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation<
      authTypes.apiResponse,
      authTypes.forgotPasswordParams
    >({
      query: (data) => ({
        url: "User/add-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    toggleUser: builder.mutation<authTypes.apiResponse, string>({
      query: (data) => ({
        url: `User/toggle-user-state/${data}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    usersWithNames: builder.query<Global.helperList, void>({
      query: () => ({
        url: "User/UsersList",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserRoles: builder.mutation<
      authTypes.apiResponse,
      authTypes.UpdateUserRoleParams
    >({
      query: (data) => ({
        url: "User/UpdateUserRole",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    rolesWithNames: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "User/RoleHelper",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUserDetailsQuery,
  useGetUserListQuery,
  useEditUserMutation,
  useAddUserMutation,
  useToggleUserMutation,
  useUsersWithNamesQuery,
  useRolesWithNamesQuery,
  useUpdateUserRolesMutation,
} = userApi;
