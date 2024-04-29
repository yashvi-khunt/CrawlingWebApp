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
    browserHelper: builder.query<Global.helperList, void>({
      query: () => ({
        url: "LoginHistory/BrowserHelper",
      }),
      providesTags: ["LoginHistory", "User"],
    }),
    osHelper: builder.query<Global.helperList, void>({
      query: () => ({
        url: "LoginHistory/OSHelper",
      }),
      providesTags: ["LoginHistory", "User"],
    }),
    deviceHelper: builder.query<Global.helperList, void>({
      query: () => ({
        url: "LoginHistory/DeviceHelper",
      }),
      providesTags: ["LoginHistory", "User"],
    }),
  }),
});

export const {
  useGetLoginHistoriesQuery,
  useBrowserHelperQuery,
  useDeviceHelperQuery,
  useOsHelperQuery,
} = loginHistoryApi;
