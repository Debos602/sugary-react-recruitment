import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://sugarytestapi.azurewebsites.net",
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
        // Remove type assertion and access state directly
        headers.set("Content-Type", "application/json");
        const token = getState().auth.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    // First try the original request
    let result = await baseQuery(args, api, extraOptions);

    // If there's an error and it's a 401 (Unauthorized)
    if (result?.error?.status === 401) {
        console.log("Access token might be expired, attempting refresh...");

        // Get current tokens from state or storage
        const state = api.getState().auth;
        const currentAccessToken = state.token;
        const currentRefreshToken = state.refreshToken; // Make sure you store refreshToken in your auth state

        if (!currentRefreshToken) {
            console.error("No refresh token available, logging out");
            api.dispatch(logout());
            return result;
        }

        try {
            // Make refresh token request with proper body
            const refreshResponse = await baseQuery(
                {
                    url: "/Account/RefreshToken",
                    method: "POST",
                    body: {
                        AccessToken: currentAccessToken,
                        RefreshToken: currentRefreshToken,
                    },
                },
                api,
                extraOptions
            );

            if (refreshResponse.data) {
                console.log("Token refresh successful");
                const { accessToken, refreshToken, user } =
                    refreshResponse.data;

                // Dispatch action to update tokens in store
                api.dispatch(
                    setUser({
                        user,
                        token: accessToken,
                        refreshToken: refreshToken,
                    })
                );

                // Retry the original request with new token
                result = await baseQuery(
                    {
                        ...args,
                        headers: {
                            ...args.headers,
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                    api,
                    extraOptions
                );
            } else {
                console.error("Refresh failed, logging out");
                api.dispatch(logout());
            }
        } catch (error) {
            console.error("Refresh token error:", error);
            api.dispatch(logout());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["User", "Admin"],
    endpoints: () => ({}),
});
