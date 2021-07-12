import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrders, getOrderById } from "../../api/ordersRequests";
import { TOrder } from "./types";

export const createNewOrderThunk = createAsyncThunk(
  "orders/createNewOrder",
  async (data: TOrder[]) => {
    const response = await createOrder(data);

    return response.data;
  }
);

export const getOrdersThunk = createAsyncThunk("orders/getOrders", async () => {
  const response = await getOrders();

  return response.data;
});

export const getOrderByIdThunk = createAsyncThunk("orders/getOrderById", async (id: string) => {
  const response = await getOrderById(id);

  return response.data;
});
