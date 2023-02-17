import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthState } from "./authSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
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
      async transformResponse(baseQueryReturnValue: any, meta, arg) {
        await baseQueryReturnValue.childs.sort((a: any, b: any) => {
          const nameA = a.nodeType.toUpperCase()[0]; // ignore upper and lowercase
          const nameB = b.nodeType.toUpperCase()[0]; // ignore upper and lowercase
          if (nameA === nameB) return 0;
          if (nameA === "F") return -1;
          else return 1;
        });
        return baseQueryReturnValue;
      },
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
      {
        name: string;
        parentId: string;
        nodeType: string;
        url: string;
        nodeSize: number;
      }
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
    toggleStar: builder.mutation<any, { id: string; value: boolean }>({
      query: (payload) => ({
        url: `/directory/${payload.id}/star`,
        method: "PUT",
        body: {
          value: payload.value,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("running");
        const { id, value } = arg;
        const patchResult = dispatch(
          api.util.updateQueryData("getDirectory", "null", (data) => {
            data.childs.map((item: any) => {
              if (item.id === id) {
                item.isStarred = value;
              }
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddFolderMutation,
  useGetDirectoryQuery,
  useDeleteItemsMutation,
  useUploadFileMutation,
  useToggleStarMutation,
} = api;
