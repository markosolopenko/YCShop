import React, { useCallback, useState } from "react";

import { formatMoney } from "helpers/formatMoney";

import { useDispatch } from "react-redux";

import { IProductsInCart } from "types/types";
import {
  addToCartAction,
  changeCartCountsAtion,
  deleteFromCart,
} from "features/products/productsSlice";
import { Counter } from "../../components/Counter/Counter";
import { DeleteButton } from "../../common/DeleteButton/DeleteButton";
import s from "./ProductInCart.module.scss";

type IProps = {
  item: IProductsInCart;
};

export const ProductInCart: React.FC<IProps> = ({ item }) => {
  const [value, setValue] = useState(item.amount);

  const dispatch = useDispatch();

  const handleDeleteProduct = useCallback(() => {
    dispatch(deleteFromCart(item.product.id));
    dispatch(changeCartCountsAtion());
  }, []);

  const handleInputChange = useCallback((inputValue: number) => {
    setValue(inputValue);

    dispatch(addToCartAction({ product: item.product, amount: inputValue }));
    dispatch(changeCartCountsAtion());
  }, []);

  return (
    <div className={s["product-in-cart"]}>
      <div className={s["product-in-cart__name"]}>
        <span>Name: </span>
        {item.product.name}
      </div>
      <Counter startValue={value} onChange={handleInputChange} />
      <div className={s["product-in-cart__total"]}>
        {item.product.price}$ x {item.amount} ={formatMoney(item.product.price * item.amount)}
      </div>
      <div className={s["product-in-cart__delete"]}>
        <DeleteButton onClick={handleDeleteProduct} />
      </div>
    </div>
  );
};
