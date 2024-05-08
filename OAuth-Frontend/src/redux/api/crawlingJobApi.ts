import { indexApi } from "./indexApi";

export const crawlingJobApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    addCrawlingJob: builder.mutation<
      authTypes.apiResponse,
      ApiTypes.AddCrawlingJobParams
    >({
      query: (data) => ({
        method: "POST",
        url: "Crawler/AddJob",
        body: data,
      }),
    }),
  }),
});

export const { useAddCrawlingJobMutation } = crawlingJobApi;
