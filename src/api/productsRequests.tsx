import { axiosInstance } from "./api";

export const getProducts = (page: number, perPage: number) => {
  try {
    return axiosInstance.get(`?page=${page}perPage=${perPage}`);
  } catch (e: any) {
    return e.message;
  }
};

export const getProductById = (id: number) => {
  try {
    return axiosInstance.get(`/${id}`);
  } catch (e: any) {
    return e.message;
  }
};
