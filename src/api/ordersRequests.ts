import { TOrderGet, TOrder } from "features/orders/types";
import { axiosInstance } from "./api";
import { API_ENDPOINTS } from "../constants/endpoints";

const { ORDERS } = API_ENDPOINTS;

export const createOrder = async (data: TOrder[]): Promise<{ data: string }> => {
  return await axiosInstance.post(ORDERS, { order: { pieces: data } });
};

export const getOrders = async (): Promise<{ data: { items: TOrderGet[] } }> => {
  return await axiosInstance.get(ORDERS);
};

export const getOrderById = async (id: string): Promise<{ data: TOrderGet }> => {
  return await axiosInstance.get(`${ORDERS}/${id}`);
};
