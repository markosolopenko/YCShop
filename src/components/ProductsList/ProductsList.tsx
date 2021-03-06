import { IProps } from "./types";
import { Product } from "./Product";

import s from "./ProductsList.module.scss";

export const ProductsList: React.FC<IProps> = ({ productsList, button }) => {
  return (
    <div className={s["products-list"]}>
      {productsList.map((item, index) => {
        return <Product key={index} item={item} button={button} />;
      })}
    </div>
  );
};
