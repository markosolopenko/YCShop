import { IProduct, IProducts } from "types/types";
import { ISelectedOrigins } from "features/products/types";
import { IFormData } from "components/CreateNewProductModal/types";
import { axiosInstance } from "./api";

import { API_ENDPOINTS } from "../constants/endpoints";

const { PRODUCTS, PRODUCTS_ORIGINS } = API_ENDPOINTS;

export type TGetOriginsParams = {
  value: string;
  displayName: string;
};

export type TGetProductsParams = {
  page?: number;
  perPage?: number;
  origins: ISelectedOrigins[] | [];
  minPrice?: string;
  maxPrice?: string;
  isEditable?: boolean;
};

export const getProducts = async ({
  page,
  perPage,
  origins,
  minPrice,
  maxPrice,
  isEditable,
}: TGetProductsParams): Promise<{ data: IProducts }> => {
  const selecedOrigins = origins.map((origin) => origin.value).join(",");
  return await axiosInstance.get(PRODUCTS, {
    params: { page, perPage, origins: selecedOrigins, minPrice, maxPrice, editable: isEditable },
  });
};

export const getProductById = async (id: string): Promise<{ data: IProduct }> => {
  return await axiosInstance.get(`${PRODUCTS}/${id}`);
};

export const getOrigins = async (): Promise<{ data: { items: TGetOriginsParams[] } }> => {
  return await axiosInstance.get(PRODUCTS_ORIGINS);
};

export const createProduct = async (data: IFormData): Promise<{ data: string }> => {
  return await axiosInstance.post(PRODUCTS, { product: data });
};
