import { RootState } from "core/store";
import { TOrderGet } from "./types";

export const selectOrdersList = (state: RootState): TOrderGet[] => state.orders.orders;
export const selectStatus = (state: RootState): string => state.orders.status;
export const selectError = (state: RootState): string => state.orders.error;
export const selectIfOrderCreated = (state: RootState): boolean => state.orders.orderCreated;
