import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrigins, getProductById, getProducts, TGetProductsParams } from "api/productsRequests";

export const fetchProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (data: TGetProductsParams) => {
    const { page, perPage, origins, minPrice, maxPrice } = data;
    const response = await getProducts({ page, perPage, origins, minPrice, maxPrice });

    return response.data;
  }
);

export const fetchProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async (id: string) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const getOriginsThunk = createAsyncThunk("products/getOrigins", async () => {
  const response = await getOrigins();
  return response.data;
});
