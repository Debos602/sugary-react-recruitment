import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/AdminAccount/Login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/Account/Register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useLoginMutation } = authApi;
