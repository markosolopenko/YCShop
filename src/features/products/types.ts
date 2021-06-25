import { IProduct, IProductsInCart } from "../../types/types";

export interface IProductsSliceState {
  status: string | null;
  products: IProduct[];
  product: IProduct | null;
  productsAddedToCart: IProductsInCart[];
  currentPage: number;
  perPage: number;
  totalItems: number;
  allItemsInCartAmount: number;
  allItemsInCartSum: number;
  error: string | null;
}
