import { IProps } from "./types";

import s from "./ProductsList.module.scss";

export const ProductsList: React.FC<IProps> = ({ productsList }) => {
  return <div className={s["products-list"]}></div>;
};
