import { createSlice } from "@reduxjs/toolkit";
import { createNewOrderThunk, getOrdersThunk } from "./thunks";
import { IInitStateOrders } from "./types";
import { PENDING, REJECTED, FULFILLED } from "../../constants/status";

const initialState: IInitStateOrders = {
  orders: [],
  status: "",
  error: "",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrderThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(createNewOrderThunk.fulfilled, (state) => {
        state.status = FULFILLED;
      })
      .addCase(createNewOrderThunk.rejected, (state) => {
        state.error = "Error orders/createOrder";
        state.status = REJECTED;
      });
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.status = FULFILLED;
        state.orders = action.payload.items;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.error = "Error orders/getOrders";
        state.status = REJECTED;
      });
  },
});

export default ordersSlice.reducer;
