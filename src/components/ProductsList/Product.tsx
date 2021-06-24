import { ADD_TO_CART, CHANGE_CART_COUNTS, FETCH_PRODUCT_BY_ID } from "actionTypes/products";
import { Routes } from "constants/routes";
import { ProductsContextDispatch } from "context/ProductsContext";
import { formatMoney } from "helpers/formatMoney";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { operators } from "constants/operators";
import { IProduct } from "../../types/types";
import { getProductById } from "../../api/productsRequests";

import s from "./Product.module.scss";

type IProps = {
  item: IProduct;
};

export const Product: React.FC<IProps> = ({ item }) => {
  const dispatch = useContext(ProductsContextDispatch);
  const { plus } = operators;

  const handleDetailButtonClick = useCallback(() => {
    getProductById(item.id).then((data) => {
      dispatch({ type: FETCH_PRODUCT_BY_ID, payload: data });
    });
  }, []);

  const handleAddToCartClick: () => void = () => {
    dispatch({ type: ADD_TO_CART, payload: { product: item, operator: plus, amount: 1 } });
    dispatch({
      type: CHANGE_CART_COUNTS,
      payload: { count: 1, sum: item.price, operator: plus },
    });
  };

  return (
    <div className={s.product}>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Name: </span> {item.name}
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Price: </span> {formatMoney(item.price)}
      </div>
      <div className={s.product__item}>
        <span className={s.product__item__span}>Origin: </span> {item.origin.toUpperCase()}
      </div>

      <div className={s.product__buttons}>
        <Link to={Routes.PRODUCT_DEATAILS}>
          <button onClick={handleDetailButtonClick} className={s.product__buttons__detailBtn}>
            DETAIL PAGE
          </button>
        </Link>
        <button onClick={handleAddToCartClick} className={s.product__buttons__addToCartBtn}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
