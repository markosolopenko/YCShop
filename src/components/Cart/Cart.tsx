import { ProductsContextState } from "context/ProductsContext";
import { formatMoney } from "helpers/formatMoney";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/cart.svg";

import s from "./Cart.module.scss";

export const Cart: React.FC = () => {
  const state = useContext(ProductsContextState);
  const { allItemsInCartAmount, allItemsInCartSum } = state;

  return (
    <div className={s["cart-component"]}>
      <Link to="/cart">
        <div className={s.cart}>
          <CartIcon className={s.cart__icon} />
          <div className={s.cart__counter}>{allItemsInCartAmount}</div>
        </div>
      </Link>
      <div className={s.amountOfMoney}>{formatMoney(allItemsInCartSum)}</div>
    </div>
  );
};
