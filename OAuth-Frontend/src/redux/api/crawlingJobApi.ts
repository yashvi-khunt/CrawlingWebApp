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
      invalidatesTags: ["CrawlingJob"],
    }),
    getCrawlingJobs: builder.query<
      ApiTypes.GetCrawlingJobProps,
      Global.SearchParams
    >({
      query: (data) => ({
        url: "Crawler/GetCrawlingJobs",
        params: data,
      }),
      providesTags: ["CrawlingJob"],
    }),
    getCrawlingJobResponse: builder.query<
      ApiTypes.GetCrawlingJobResponse,
      number
    >({
      query: (data) => ({
        url: `Crawler/GetResponseForJobId/${data}`,
        method: "GET",
      }),
      providesTags: ["CrawlingJob"],
    }),
  }),
});

export const {
  useAddCrawlingJobMutation,
  useGetCrawlingJobsQuery,
  useGetCrawlingJobResponseQuery,
} = crawlingJobApi;
