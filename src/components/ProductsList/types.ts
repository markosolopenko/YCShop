import { IProduct } from "../../types/types";

export interface IProps {
  productsList: IProduct[];
  button?: { text: string; handleFunction: (item: IProduct) => void };
}
