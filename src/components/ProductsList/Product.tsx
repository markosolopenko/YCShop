import { FETCH_PRODUCT_BY_ID } from "actionTypes/products";
import { getProductById } from "api/productsRequests";
import { Routes } from "constants/routes";
import { ProductsContextDispatch } from "context/ProductsContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import s from "./Product.module.scss";

export const Product: React.FC<any> = ({ item }) => {
  const dispatch = useContext(ProductsContextDispatch);
  const handleDetailButtonClick = (id: number) => {
    getProductById(id).then((data: any) => {
      dispatch({ type: FETCH_PRODUCT_BY_ID, payload: data.data });
    });
  };
  return (
    <div className={s.product}>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Name: </span> {item.name}
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Price: </span> {item.price}$
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Origin: </span> {item.origin.toUpperCase()}
      </div>

      <div className={s.product__buttons}>
        <Link to={Routes.PRODUCT_DEATAILS}>
          <button
            onClick={() => handleDetailButtonClick(item.id)}
            className={s.product__buttons__detailBtn}
          >
            DETAIL PAGE
          </button>
        </Link>
        <button className={s.product__buttons__addToCartBtn}>ADD TO CART</button>
      </div>
    </div>
  );
};
