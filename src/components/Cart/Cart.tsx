import { Routes } from "constants/routes";
import { getAllItemsInCartAmount, getAllItemsInCartSum } from "features/products/selectors";
import { formatMoney } from "helpers/formatMoney";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/cart.svg";

import s from "./Cart.module.scss";

export const Cart: React.FC = () => {
  const allItemsInCartAmount = useSelector(getAllItemsInCartAmount);
  const allItemsInCartSum = useSelector(getAllItemsInCartSum);

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
