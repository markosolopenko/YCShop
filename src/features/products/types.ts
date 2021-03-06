import { TGetOriginsParams } from "api/productsRequests";
import { IProduct, IProductsInCart } from "../../types/types";

export interface ISelectedOrigins {
  value: string;
  label: string;
}

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
  error: string | undefined | unknown;
  origins: TGetOriginsParams[];
  selectedOrigins: ISelectedOrigins[];
  minPrice: string;
  maxPrice: string;
  isEditable: boolean | null;
  createdProducts: IProduct[];
  isProductCreated: string;
  isDebouncing: boolean;
}
