import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "features/orders/ordersSlice";
import productsSlice from "features/products/productsSlice";

export const store = configureStore({ reducer: { products: productsSlice, orders: ordersSlice } });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
