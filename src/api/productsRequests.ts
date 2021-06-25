import { IProduct, IProducts } from "../types/types";
import { axiosInstance } from "./api";

import { API_ENDPOINTS } from "../constants/endpoints";

const { PRODUCTS } = API_ENDPOINTS;

export const getProducts = async (page: number, perPage: number): Promise<IProducts[] | Error> => {
  try {
    const res = await axiosInstance.get(PRODUCTS, { params: { page, perPage } });
    return res.data;
  } catch (e) {
    return new Error("Something went wrong");
  }
};

export const getProductById = async (id: string): Promise<IProduct | Error> => {
  try {
    const res = await axiosInstance.get(`${PRODUCTS}/${id}`);
    return res.data;
  } catch (e) {
    return new Error("Something went wrong");
  }
};
