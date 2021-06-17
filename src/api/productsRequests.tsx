import { axiosInstance } from "./api";

export const getProducts = (page: number, perPage: number) => {
  try {
    return axiosInstance.get(`?page=${page}perPage=${perPage}`);
  } catch (e: any) {
    return e.message;
  }
};
