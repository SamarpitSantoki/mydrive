import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthState } from "./authSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const { user } = (getState() as { auth: AuthState }).auth;
      console.log("user", user);

      if (user.id) {
        headers.set("ownerId", user?.id);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Directory"],
  endpoints: (builder) => ({
    getDirectory: builder.query<any, string>({
      providesTags: (result, error, arg) => [{ type: "Directory", id: arg }],
      query: (payload = "root") => ({
        url: `/directory/${payload}`,
        method: "GET",
      }),
    }),
    addFolder: builder.mutation<any, { name: string; parentId: string }>({
      query: (payload) => ({
        url: "/directory",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Directory", id: arg.parentId },
      ],
    }),
    deleteItems: builder.mutation<any, { id: string }>({
      query: (payload) => ({
        url: `/directory/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Directory" }],
    }),
    uploadFile: builder.mutation<
      any,
      { name: string; parentId: string; nodeType: string; url: string }
    >({
      query: (payload) => ({
        url: "/directory",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Directory", id: arg.parentId },
      ],
    }),
  }),
});

export const {
  useAddFolderMutation,
  useGetDirectoryQuery,
  useDeleteItemsMutation,
  useUploadFileMutation,
} = api;
