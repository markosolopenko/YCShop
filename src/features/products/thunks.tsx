import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getOrigins,
  getProductById,
  getProducts,
  TGetProductsParams,
} from "api/productsRequests";
import { IFormData } from "components/ProductForm/types";
import { IUpdateProduct } from "types/types";
import { updateProduct } from "../../api/productsRequests";
import { API_ENDPOINTS } from "../../constants/endpoints";
const { PRODUCTS, PRODUCTS_ORIGINS } = API_ENDPOINTS;

export const fetchProductsThunk = createAsyncThunk(
  `${PRODUCTS}/getProducts`,
  async (data: TGetProductsParams) => {
    const { page, perPage, origins, minPrice, maxPrice, isEditable } = data;
    const response = await getProducts({ page, perPage, origins, minPrice, maxPrice, isEditable });

    return response.data;
  }
);

export const fetchProductByIdThunk = createAsyncThunk(
  `${PRODUCTS}/getProductById`,
  async (id: string) => {
    const response = await getProductById(id);
    return response.data;
  }
);

export const getOriginsThunk = createAsyncThunk(`${PRODUCTS_ORIGINS}/getOrigins`, async () => {
  const response = await getOrigins();
  return response.data;
});

export const createProductThunk = createAsyncThunk(
  `${PRODUCTS}/createProduct`,
  async (data: IFormData) => {
    const response = await createProduct(data);

    return response.data;
  }
);

export const updateProductThunk = createAsyncThunk(
  `${PRODUCTS}/updateProduct`,
  async (data: IUpdateProduct) => {
    const response = await updateProduct(data);

    return response.data;
  }
);
