import { baseApi } from "../../api/baseApi";

export const materialsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query({
            query: (params = {}) => ({
                url: "/Materials/GetAll/",
                method: "GET",
                // params: generateParams(params),
                params,
            }),
            providesTags: ["Materials"],
        }),
    }),
});

export const { useGetMaterialsQuery } = materialsApi;
