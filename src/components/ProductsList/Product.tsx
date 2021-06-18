import { FETCH_PRODUCT_BY_ID } from "actionTypes/products";
import { IProduct } from "common/types/types";
import { Routes } from "constants/routes";
import { ProductsContextDispatch } from "context/ProductsContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getProductById } from "../../api/productsRequests";

import s from "./Product.module.scss";

type IProps = {
  item: IProduct;
  handleAddToCartClick: (item: IProduct) => void;
};

export const Product: React.FC<IProps> = ({ item, handleAddToCartClick }) => {
  const dispatch = useContext(ProductsContextDispatch);

  const handleDetailButtonClick = (id: string) => {
    getProductById(id).then((data) => {
      dispatch({ type: FETCH_PRODUCT_BY_ID, payload: data });
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
        <button
          onClick={() => handleAddToCartClick(item)}
          className={s.product__buttons__addToCartBtn}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
