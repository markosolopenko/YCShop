import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrders, getOrderById } from "../../api/ordersRequests";
import { TOrder } from "./types";
import { API_ENDPOINTS } from "../../constants/endpoints";

export const createNewOrderThunk = createAsyncThunk(
  `${API_ENDPOINTS.ORDERS}/createNewOrder`,
  async (data: TOrder[]) => {
    const response = await createOrder(data);

    return response.data;
  }
);

export const getOrdersThunk = createAsyncThunk(`${API_ENDPOINTS.ORDERS}/getOrders`, async () => {
  const response = await getOrders();

  return response.data;
});

export const getOrderByIdThunk = createAsyncThunk(
  `${API_ENDPOINTS.ORDERS}/getOrderById`,
  async (id: string) => {
    const response = await getOrderById(id);

    return response.data;
  }
);
