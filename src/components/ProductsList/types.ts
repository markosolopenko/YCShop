import { IProduct } from "common/types/types";

export interface IProps {
  productsList: IProduct[];
  handleAddToCartClick: (product: IProduct) => void;
}
