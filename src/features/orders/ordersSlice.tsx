import { createSlice } from "@reduxjs/toolkit";
import { IInitStateOrders } from "./types";

const initialState: IInitStateOrders = {
  orders: [],
  status: "",
  error: "",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;
