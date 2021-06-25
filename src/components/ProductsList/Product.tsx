import { Routes } from "constants/routes";

import { formatMoney } from "helpers/formatMoney";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { operators } from "constants/operators";
import { useDispatch } from "react-redux";
import { fetchProductByIdThunk } from "features/products/thunks";
import { addToCartAction, changeCartCountsAtion } from "features/products/productsSlice";
import { IProduct } from "../../types/types";

import s from "./Product.module.scss";

type IProps = {
  item: IProduct;
};

export const Product: React.FC<IProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { plus } = operators;

  const handleDetailButtonClick = useCallback(() => {
    dispatch(fetchProductByIdThunk(item.id));
  }, []);

  const handleAddToCartClick: () => void = useCallback(() => {
    dispatch(addToCartAction({ product: item, operator: plus, amount: 1 }));
    dispatch(changeCartCountsAtion({ count: 1, sum: item.price, operator: plus }));
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
        <button onClick={handleAddToCartClick} className={s.product__buttons__addToCartBtn}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};
