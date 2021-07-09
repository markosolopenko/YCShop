import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getOrders } from "../../api/ordersRequests";
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
