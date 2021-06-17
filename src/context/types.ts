import { IProduct, IProducts } from "../common/types/types";

export interface IProductsContext {
  products: IProducts;
  product: IProduct | null;
}
