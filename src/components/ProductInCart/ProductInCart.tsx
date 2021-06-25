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
import { ReactComponent as DeleteIcon } from "../../assets/trash-alt-solid.svg";
import s from "./ProductInCart.module.scss";

type IProps = {
  item: IProductsInCart;
};

export const ProductInCart: React.FC<IProps> = ({ item }) => {
  const [value, setValue] = useState(item.amount);

  const dispatch = useDispatch();

  const handleDeleteProduct = useCallback((item: IProductsInCart) => {
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
      <Counter
        startValue={value}
        product={item.product}
        addToCart={true}
        onChange={handleInputChange}
      />
      <div className={s["product-in-cart__total"]}>
        {item.product.price}$ x {item.amount} ={formatMoney(item.product.price * item.amount)}
      </div>
      <div className={s["product-in-cart__delete"]} onClick={() => handleDeleteProduct(item)}>
        <DeleteIcon className={s["product-in-cart__delete__icon"]} />
      </div>
    </div>
  );
};
