import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getOrigins,
  getProductById,
  getProducts,
  TGetProductsParams,
} from "api/productsRequests";
import { IFormData } from "components/CreateNewProductModal/types";

export const fetchProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (data: TGetProductsParams) => {
    const { page, perPage, origins, minPrice, maxPrice, isEditable } = data;
    const response = await getProducts({ page, perPage, origins, minPrice, maxPrice, isEditable });

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

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (data: IFormData) => {
    const response = await createProduct(data);

    return response.data;
  }
);
