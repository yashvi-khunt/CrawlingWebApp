import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const indexApi = createApi({
  reducerPath: "indexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5041/api/",
    prepareHeaders: (headers, { getState }) => {
      const { token: token } = (getState() as RootState).auth;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "LoginHistory"],
  endpoints: (builder) => ({}),
});

export const {} = indexApi;
