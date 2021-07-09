import { IProduct } from "types/types";

export interface IInitStateOrders {
  orders: IProduct[];
  status: string;
  error: string;
}
