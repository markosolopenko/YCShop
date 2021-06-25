import { IProduct, IProducts } from "types/types";
import { axiosInstance } from "./api";

import { API_ENDPOINTS } from "../constants/endpoints";

const { PRODUCTS } = API_ENDPOINTS;

export const getProducts = async (page: number, perPage: number): Promise<{ data: IProducts }> => {
  return await axiosInstance.get(PRODUCTS, { params: { page, perPage } });
};

export const getProductById = async (id: string): Promise<{ data: IProduct }> => {
  return await axiosInstance.get(`${PRODUCTS}/${id}`);
};
