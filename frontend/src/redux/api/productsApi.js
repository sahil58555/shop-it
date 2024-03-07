import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://shopit-api-q9ib.onrender.com/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => "/products",
    }),
    getProductDetails: builder.query({
      query: (id) => `/getProduct/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
