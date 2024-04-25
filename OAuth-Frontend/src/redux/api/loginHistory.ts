import { indexApi } from "./indexApi";

export const loginHistoryApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoginHistories: builder.query<
      ApiTypes.GetLoginHistoriesProps,
      ApiTypes.GetLoginHistoryQueryParams
    >({
      query: (data) => ({
        url: "LoginHistory/GetLoginHistories",
        params: data,
      }),
      providesTags: ["LoginHistory"],
    }),
  }),
});

export const { useGetLoginHistoriesQuery } = loginHistoryApi;
