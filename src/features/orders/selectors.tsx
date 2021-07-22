import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "core/store";
import { TOrderGet } from "./types";

export const selectOrdersList = (state: RootState): TOrderGet[] => state.orders.orders;
export const selectStatus = (state: RootState): string => state.orders.status;
export const selectError = (state: RootState): string => state.orders.error;
export const selectIfOrderCreated = (state: RootState): boolean => state.orders.orderCreated;
export const selectOrderId = (state: RootState): string => state.orders.orderId;
export const selectOrder = (state: RootState): TOrderGet | null => state.orders.order;

export const selectOrdersParams = createSelector(
  [selectOrdersList, selectOrderId, selectOrder],
  (orders, orderId, order) => ({ orders, orderId, order })
);
