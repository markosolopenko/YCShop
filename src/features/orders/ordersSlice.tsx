import { createSlice } from "@reduxjs/toolkit";
import { createNewOrderThunk, getOrdersThunk, getOrderByIdThunk } from "./thunks";
import { IInitStateOrders } from "./types";
import { PENDING, REJECTED, FULFILLED } from "../../constants/status";

const initialState: IInitStateOrders = {
  orders: [],
  status: "",
  error: "",
  orderCreated: false,
  orderId: "",
  order: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrderThunk.pending, (state) => {
        state.status = PENDING;
        state.orderCreated = false;
      })
      .addCase(createNewOrderThunk.fulfilled, (state) => {
        state.status = FULFILLED;
        state.orderCreated = true;
      })
      .addCase(createNewOrderThunk.rejected, (state) => {
        state.error = "Error orders/createOrder";
        state.status = REJECTED;
        state.orderCreated = false;
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
    builder
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.status = PENDING;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.status = FULFILLED;
        state.order = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state) => {
        state.status = REJECTED;
        state.error = "Error getOrderByID";
      });
  },
});

export default ordersSlice.reducer;

export const { setOrderId } = ordersSlice.actions;
