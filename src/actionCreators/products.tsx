import { IProducts } from "types/types";
import { FETCH_PRODUCTS } from "../actionTypes/products";

type ReturnTypeFP = {
  type: string;
  payload: IProducts[];
};

export const fetchProductsCreator = (data: IProducts[]): ReturnTypeFP => {
  return { type: FETCH_PRODUCTS, payload: data };
};
