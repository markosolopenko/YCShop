import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNewOrderThunk = createAsyncThunk(
  "orders/createNewOrder",
  async (data: any) => {}
);
