import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "api/productsRequests";

export const fetchProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (data: { page: number; perPage: number }) => {
    const { page, perPage } = data;
    const response = await getProducts(page, perPage);

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
