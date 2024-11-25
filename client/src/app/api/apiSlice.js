import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_BACKEND_URL, 
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {

        const token = getState()?.auth?.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
        
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
   
    if (result.error?.status === 403) {
        // send refresh token request to get new access token
        const refreshResult = await baseQuery({ url: "/api/user/refresh" }, api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState()?.auth?.user;
            // store new access token in redux store
            api.dispatch(setCredentials({ user:user, ...refreshResult?.data?.Data }));
            // retry the original request with the new access token
            result = await baseQuery(args, api, extraOptions);
        }else{
            api.dispatch(logOut());
        }
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});