import { RootState } from "core/store";
import { IProduct } from "types/types";

export const selectOrdersList = (state: RootState): IProduct[] => state.orders.orders;
export const selectStatus = (state: RootState): string => state.orders.status;
export const selectError = (state: RootState): string => state.orders.error;
