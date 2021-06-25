import { axiosInstance } from "./api";

import { API_ENDPOINTS } from "../constants/endpoints";

const { PRODUCTS } = API_ENDPOINTS;

export const getProducts = async (page: number, perPage: number): Promise<any> => {
  return await axiosInstance.get(PRODUCTS, { params: { page, perPage } });
};

export const getProductById = async (id: string): Promise<any> => {
  return await axiosInstance.get(`${PRODUCTS}/${id}`);
};
