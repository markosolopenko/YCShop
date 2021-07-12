import { IProduct } from "types/types";

export type TOrder = {
  productId: string;
  count: number;
};
export type TOrderGet = {
  createdAt: Date | string;
  id: string;
  pieces: { id: string; count: number; product: IProduct }[];
};

export interface IInitStateOrders {
  orders: TOrderGet[];
  status: string;
  error: string;
  orderCreated: boolean;
}
