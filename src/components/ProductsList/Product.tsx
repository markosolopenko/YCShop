import { Routes } from "constants/routes";
import { formatMoney } from "helpers/formatMoney";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductByIdThunk } from "features/products/thunks";
import { IProduct } from "../../types/types";

import s from "./Product.module.scss";

type IProps = {
  item: IProduct;
  button?: { text: string; handleFunction: (item: IProduct) => void };
};

export const Product: React.FC<IProps> = ({ item, button }) => {
  const dispatch = useDispatch();

  const handleDetailButtonClick = useCallback(() => {
    dispatch(fetchProductByIdThunk(item.id));
  }, []);

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
        <button
          onClick={() => button?.handleFunction(item)}
          className={s.product__buttons__addToCartBtn}
        >
          {button?.text}
        </button>
      </div>
    </div>
  );
};
