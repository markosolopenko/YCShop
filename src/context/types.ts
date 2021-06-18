import { IProduct, IProducts, IProductsInCart } from "../common/types/types";

export interface IProductsContext {
  products: IProducts;
  product: IProduct | null;
  productsAddedToCart: IProductsInCart[];
}
