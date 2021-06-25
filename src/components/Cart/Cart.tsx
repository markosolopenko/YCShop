import { Routes } from "constants/routes";
import { RootState } from "core/store";
import { formatMoney } from "helpers/formatMoney";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/cart.svg";

import s from "./Cart.module.scss";

export const Cart: React.FC = () => {
  const { allItemsInCartAmount, allItemsInCartSum } = useSelector(
    (state: RootState) => state.products
  );

  return (
    <div className={s["cart-component"]}>
      <Link to={Routes.PRODUCTS_CART}>
        <div className={s.cart}>
          <CartIcon className={s.cart__icon} />
          <div className={s.cart__counter}>{allItemsInCartAmount}</div>
        </div>
      </Link>
      <div className={s.amountOfMoney}>{formatMoney(allItemsInCartSum)}</div>
    </div>
  );
};
