import { IProps } from "./types";
import { Product } from "./Product";

import s from "./ProductsList.module.scss";

export const ProductsList: React.FC<IProps> = ({ productsList }) => {
  return (
    <div className={s["products-list"]}>
      {productsList.map((item) => {
        return <Product key={item.id} item={item} />;
      })}
    </div>
  );
};
