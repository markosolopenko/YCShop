import { IProduct, IProductsInCart } from "../common/types/types";

export interface IProductsContext {
  products: IProduct[];
  product: IProduct | null;
  productsAddedToCart: IProductsInCart[];
  currentPage: number;
  perPage: number;
  totalItems: number;
  allItemsInCartAmount: number;
  allItemsInCartSum: number;
}
