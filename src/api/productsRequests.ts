import { IProduct, IProducts } from "common/types/types";
import { axiosInstance } from "./api";

export const getProducts = async (page: number, perPage: number): Promise<IProducts[] | Error> => {
  try {
    const res = await axiosInstance.get("", { params: { page, perPage } });
    return res.data;
  } catch (e) {
    return new Error("Something went wrong");
  }
};

export const getProductById = async (id: string): Promise<IProduct | Error> => {
  try {
    const res = await axiosInstance.get(`/${id}`);
    return res.data;
  } catch (e) {
    return new Error("Something went wrong");
  }
};
